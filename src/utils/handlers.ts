import { HandlerFunction } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// Try catch handler
export const TryCatchHandler =
    (fn: HandlerFunction) => (req: NextRequest, params?: any) => {
        return Promise.resolve(fn(req, params)).catch((err) =>
            handleError(err)
        );
    };

// Error handler
export class ErrorHandler extends Error {
    constructor(
        public message: string,
        public statusCode: number
    ) {
        super(message);
        this.statusCode = statusCode;
    }
}

const handleError = (err: any) => {
    let message = err.message || "Internal Server Error Occurred";
    let statusCode = err.statusCode || 500;

    // MongoDB invalid id
    if (err.name === "CastError") {
        message = "Invalid ID";
        statusCode = 500;
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        statusCode = 400;
    }

    // Zod validation error
    if (err instanceof ZodError) {
        statusCode = 400;
        const errorMessages = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
        }));

        if (errorMessages.length > 1) {
            return NextResponse.json(
                {
                    success: false,
                    errors: errorMessages
                },
                { status: 400 }
            );
        } else {
            message = errorMessages[0].message;
        }
    }

    // Return the response
    return NextResponse.json(
        {
            success: false,
            message
        },
        { status: statusCode }
    );
};
