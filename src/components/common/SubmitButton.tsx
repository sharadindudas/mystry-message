import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { ComponentProps } from "react";

interface SubmitButtonProps extends ComponentProps<"button"> {
    isValid: boolean;
    isSubmitting: boolean;
    text: string;
}

const SubmitButton = ({
    isValid,
    isSubmitting,
    text,
    className
}: SubmitButtonProps) => {
    return (
        <Button
            type="submit"
            className={cn(
                "w-full bg-linear-to-r from-color-2 to-color-3 hover:from-color-5 hover:to-color-6 text-white h-11 text-sm",
                className
            )}
            disabled={!isValid || isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <Ellipsis className="mr-2" />
                    Submitting...
                </>
            ) : (
                <>{text}</>
            )}
        </Button>
    );
};

export default SubmitButton;
