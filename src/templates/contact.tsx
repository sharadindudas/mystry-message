import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Container
} from "@react-email/components";

interface ContactUsEmailProps {
    name: string;
    email: string;
    message: string;
}

const ContactUsEmail = ({ name, email, message }: ContactUsEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>Mystry Message - New Contact Form Submission</title>
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
            <Preview>New contact form submission from {name}</Preview>
            <Container style={container}>
                <Section style={main}>
                    <Row>
                        <Text style={logo}>Mystry Message</Text>
                    </Row>
                    <Row>
                        <Heading as="h1" style={header}>
                            New Contact Form Submission
                        </Heading>
                    </Row>
                    <Row>
                        <Text style={paragraph}>
                            You have received a new contact form submission.
                            Here are the details:
                        </Text>
                    </Row>
                    <Row>
                        <Text style={label}>Name:</Text>
                        <Text style={value}>{name}</Text>
                    </Row>
                    <Row>
                        <Text style={label}>Email:</Text>
                        <Text style={value}>{email}</Text>
                    </Row>
                    <Row>
                        <Text style={label}>Message:</Text>
                        <Text style={messageStyle}>{message}</Text>
                    </Row>
                    <Row>
                        <Text style={footer}>
                            This is an automated email. Please do not reply
                            directly to this message.
                        </Text>
                    </Row>
                    <Row>
                        <Text style={signature}>
                            Best regards,
                            <br />
                            The Mystery Message Team
                        </Text>
                    </Row>
                    <Row>
                        <Text style={disclaimer}>
                            This email contains confidential information. Please
                            handle it accordingly.
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

const paragraph = {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#e2e8f0",
    marginBottom: "24px"
};

const label = {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "600",
    color: "#0d9488",
    marginBottom: "4px"
};

const value = {
    fontSize: "16px",
    lineHeight: "24px",
    color: "#ffffff",
    marginBottom: "16px"
};

const messageStyle = {
    ...value,
    whiteSpace: "pre-wrap" as const,
    marginBottom: "24px"
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

export default ContactUsEmail;
