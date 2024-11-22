import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NEXTAUTH_SECRET } from "@/config";
import { UserModel } from "@/models/user";
import { LoginSchema, LoginSchemaType } from "@/schemas/frontend";
import { ErrorHandler } from "@/utils/handlers";
import { compare } from "bcrypt";
import { connectMongoDB } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Login",
            credentials: {
                identity: {
                    type: "text",
                    placeholder: "Enter the email or username"
                },
                password: {
                    type: "password",
                    placeholder: "Enter the password"
                }
            },
            async authorize(credentials) {
                try {
                    // Connection to mongodb
                    await connectMongoDB();

                    // Get data from credentials
                    const credentialsData = credentials as LoginSchemaType;

                    // Validation of data
                    const { identity, password } =
                        LoginSchema.parse(credentialsData);

                    // Check if the user exists in the db or not
                    const userExists = await UserModel.findOne({
                        $or: [{ email: identity }, { username: identity }]
                    });
                    if (!userExists) {
                        throw new ErrorHandler("User does not exists", 404);
                    }

                    // Check if the user is verified or not
                    if (!userExists.isVerified) {
                        throw new ErrorHandler("Please verify your email", 401);
                    }

                    // Validation of password
                    const isValidPassword = await compare(
                        password,
                        userExists.password
                    );
                    if (isValidPassword) {
                        return {
                            id: userExists._id!.toString(),
                            username: userExists.username,
                            email: userExists.email,
                            isVerified: userExists.isVerified,
                            isAcceptingMessages: userExists.isAcceptingMessages
                        };
                    } else {
                        throw new ErrorHandler("Invalid Credentials", 403);
                    }
                } catch (err) {
                    if (err instanceof Error) {
                        throw new Error(err.message);
                    }
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60
    },
    jwt: {
        maxAge: 24 * 60 * 60
    },
    secret: NEXTAUTH_SECRET
};
