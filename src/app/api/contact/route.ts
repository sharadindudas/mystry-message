import { ADMIN_EMAIL } from "@/config";
import { connectMongoDB } from "@/lib/mongodb";
import { ContactModel } from "@/models/contact";
import { ContactUsSchema, ContactUsSchemaType } from "@/schemas/common";
import ContactUsEmail from "@/templates/contact";
import { ErrorHandler, TryCatchHandler } from "@/utils/handlers";
import { sendMail } from "@/utils/sendMail";
import { NextResponse } from "next/server";

export const POST = TryCatchHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request body
    const requestBodyData = (await req.json()) as ContactUsSchemaType;

    // Validation of data
    const { name, email, message } = ContactUsSchema.parse(requestBodyData);

    // Send the email to admin
    const emailResponse = await sendMail({
        email: ADMIN_EMAIL,
        title: `Mystry Message | Contact us`,
        template: ContactUsEmail({ name, email, message })
    });

    // Check if the email was sent successfully or not
    if (!emailResponse.success) {
        throw new ErrorHandler(emailResponse.message, 400);
    } else {
        // Save the contact data
        await ContactModel.create({
            name,
            email,
            message
        });

        // Return the response
        return NextResponse.json(
            {
                success: true,
                message: "Contact form is sent successfully"
            },
            { status: 200 }
        );
    }
});
