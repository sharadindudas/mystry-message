import { NextResponse } from "next/server";

export const GET = () => {
    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Api Endpoints are working properly :)"
        },
        { status: 200 }
    );
};
