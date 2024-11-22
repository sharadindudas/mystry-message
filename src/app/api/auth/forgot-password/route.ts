import { connectMongoDB } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import {
    ForgotPasswordSchema,
    ForgotPasswordSchemaType
} from "@/schemas/common";
import { EXPIRY_TIME } from "@/utils/constants";
import { ErrorHandler, TryCatchHandler } from "@/utils/handlers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectRedis, redisClient } from "@/lib/redis";
import { sendMail } from "@/utils/sendMail";
import ForgotPasswordEmail from "@/templates/forgot-password";
import {
    ForgotPasswordTokenSchema,
    ForgotPasswordTokenSchemaType
} from "@/schemas/backend";
import { hash } from "bcrypt";

// Forgot password
export const POST = TryCatchHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();
    await connectRedis();

    // Get data from request body
    const requestBodyData = (await req.json()) as ForgotPasswordSchemaType;

    // Validation of data
    const { email } = ForgotPasswordSchema.parse(requestBodyData);

    // Check if the user exists in the db or not
    const userExists = await UserModel.findOne({ email });
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the user is verified or not
    if (!userExists.isVerified) {
        throw new ErrorHandler("Please verify your email", 401);
    }

    // Generate the forgot password token and hash it
    const forgotPasswordToken = crypto.randomBytes(32).toString("hex");
    const hashedForgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotPasswordToken)
        .digest("hex");

    // Create a reset password link for user
    const host = req.headers.get("host");
    const protocol = host?.includes("localhost") ? "http" : "https";
    const forgotPasswordLink = `${protocol}://${host}/forgot-password/${forgotPasswordToken}`;

    // Send an email to the user
    const emailResponse = await sendMail({
        email,
        title: `Mystry Message | Reset Password`,
        template: ForgotPasswordEmail({
            username: userExists.username,
            resetLink: forgotPasswordLink
        })
    });

    // Check if the email is sent successfully or not
    if (!emailResponse.success) {
        throw new ErrorHandler(emailResponse.message, 400);
    } else {
        // Store the user id in redis
        await redisClient.set(
            `forgotPasswordToken:${hashedForgotPasswordToken}`,
            userExists._id!.toString(),
            {
                EX: EXPIRY_TIME
            }
        );

        // Return the response
        return NextResponse.json(
            {
                success: true,
                message: "Reset password link sent to email successfully"
            },
            { status: 200 }
        );
    }
});

// Forgot password token
export const PUT = TryCatchHandler(async (req) => {
    // Connection to mongodb and redis
    await connectMongoDB();
    await connectRedis();

    // Get data from request body
    const requestBodyData = (await req.json()) as ForgotPasswordTokenSchemaType;

    // Validation of data
    const { token, newPassword } =
        ForgotPasswordTokenSchema.parse(requestBodyData);

    // Hash the forgot password token
    const hashedForgotPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    // Validation of token
    const userid = await redisClient.get(
        `forgotPasswordToken:${hashedForgotPasswordToken}`
    );
    if (!userid) {
        throw new ErrorHandler("Invalid token or token has expired", 403);
    }

    // Get the user data
    const userExists = await UserModel.findById(userid);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Hash the new password and update the password for user
    const hashedPassword = await hash(newPassword, 10);
    userExists.password = hashedPassword;
    await userExists.save({ validateBeforeSave: false });

    // Remove the forgot password token and token expiry from redis
    await redisClient.del(`forgotPasswordToken:${hashedForgotPasswordToken}`);

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Password is updated successfully"
        },
        { status: 200 }
    );
});
