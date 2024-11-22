import { FROM_DOMAIN } from "@/config";
import { ApiResponse } from "@/types/types";
import { Resend } from "resend";

interface sendMailProps {
    email: string;
    title: string;
    template: JSX.Element;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({
    email,
    title,
    template
}: sendMailProps): Promise<ApiResponse> => {
    // Send the email
    const { error } = await resend.emails.send({
        from: FROM_DOMAIN,
        to: email,
        subject: title,
        react: template
    });

    if (error) {
        return {
            success: false,
            message: error.message || "Failed to send message"
        };
    }

    return {
        success: true,
        message: "Email is sent successfully"
    };
};
