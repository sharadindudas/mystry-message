import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Container,
    Button
} from "@react-email/components";

interface ForgotPasswordEmailProps {
    username: string;
    resetLink: string;
}

const ForgotPasswordEmail = ({
    username,
    resetLink
}: ForgotPasswordEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Mystry Message - Reset Your Password</title>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
                        format: "woff2"
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>
                Mystry Message: Click the link to reset your password and unlock
                the mystery!
            </Preview>
            <Container style={container}>
                <Section style={main}>
                    <Row>
                        <Text style={logo}>Mystry Message</Text>
                    </Row>
                    <Row>
                        <Heading as="h1" style={header}>
                            Forgot Your Password?
                        </Heading>
                    </Row>
                    <Row>
                        <Text style={greeting}>Hello {username},</Text>
                    </Row>
                    <Row>
                        <Text style={paragraph}>
                            We received a request to reset your password.
                            Don&apos;t worry, it happens to the best of us! To
                            regain access to your mysterious conversations,
                            click the button below:
                        </Text>
                    </Row>
                    <Row style={buttonContainer}>
                        <Button style={button} href={resetLink}>
                            Reset Password
                        </Button>
                    </Row>
                    <Row>
                        <Text style={paragraph}>
                            If the button doesn&apos;t work, you can also copy
                            and paste this link into your browser:
                        </Text>
                    </Row>
                    <Row>
                        <Text style={link}>{resetLink}</Text>
                    </Row>
                    <Row>
                        <Text style={footer}>
                            This link will expire in 10 minutes. If you
                            didn&apos;t request a password reset, please ignore
                            this email or contact our support team.
                        </Text>
                    </Row>
                    <Row>
                        <Text style={signature}>
                            Mysteriously yours,
                            <br />
                            The Mystery Message Team
                        </Text>
                    </Row>
                    <Row>
                        <Text style={disclaimer}>
                            This email was sent by Mystry Message - where every
                            message holds a secret.
                        </Text>
                    </Row>
                </Section>
            </Container>
        </Html>
    );
};

// Styles
const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "580px"
};

const main = {
    backgroundColor: "#050b1f",
    borderRadius: "8px",
    padding: "40px 32px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    color: "#ffffff"
};

const logo = {
    fontSize: "28px",
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center" as const,
    padding: "12px 0",
    fontFamily: "Inter, Arial, sans-serif",
    backgroundColor: "#0d9488",
    backgroundImage: "linear-gradient(90deg, #0d9488, #38bdf8)",
    width: "100%",
    marginBottom: "24px"
};

const header = {
    fontSize: "24px",
    lineHeight: "24px",
    fontWeight: "600",
    color: "#ffffff",
    padding: "0 0 12px",
    textAlign: "center" as const
};

const greeting = {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#ffffff",
    fontWeight: "500",
    padding: "0 0 20px"
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#e2e8f0"
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0"
};

const button = {
    backgroundColor: "#0d9488",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    padding: "16px 20px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block"
};

const link = {
    fontSize: "14px",
    lineHeight: "24px",
    color: "#38bdf8",
    wordBreak: "break-all" as const
};

const footer = {
    fontSize: "14px",
    lineHeight: "24px",
    color: "#a3a3a3",
    fontStyle: "italic",
    marginTop: "32px"
};

const signature = {
    fontSize: "14px",
    lineHeight: "24px",
    color: "#e2e8f0",
    marginTop: "32px"
};

const disclaimer = {
    fontSize: "12px",
    lineHeight: "20px",
    color: "#666666",
    textAlign: "center" as const,
    marginTop: "32px",
    borderTop: "1px solid #333333",
    paddingTop: "24px"
};

export default ForgotPasswordEmail;
