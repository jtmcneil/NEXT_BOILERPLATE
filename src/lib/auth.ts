import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Resend from "next-auth/providers/resend";
import {
    EmailProviderSendVerificationRequestParams,
    Provider,
} from "next-auth/providers";

// Extend the NextAuth session and user types to include a role
declare module "next-auth" {
    interface Session {
        user: {
            role: string;
        } & User;
    }
    interface User {
        role?: string;
    }
}

// This boilerplate by default includes email authentication using Resend.
// You can edit this array to add or remove providers as needed.
const providers: Provider[] = [
    Resend({
        from: "onboarding@resend.dev", //TODO: replace with your verified email
        sendVerificationRequest,
    }),
];

// This is the list of providers that will be used in the UI (custom sign-in page, etc.)
export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider();
            return { id: providerData.id, name: providerData.name };
        } else {
            return { id: provider.id, name: provider.name };
        }
    })
    .filter((provider) => provider.id !== "resend");

// This is the NextAuth configuration object.
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers,
});

async function sendVerificationRequest(
    params: EmailProviderSendVerificationRequestParams
) {
    const { identifier: to, provider, url } = params;
    const { host } = new URL(url);
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: provider.from,
            to,
            subject: `Sign in to ${host}`,
            html: html({ url, host }),
            text: text({ url, host }),
        }),
    });

    if (!res.ok)
        throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

// Email HTML body
// This is the default HTML template for the email sent to the user.
function html(params: { url: string; host: string }) {
    const { url, host } = params;

    const escapedHost = host.replace(/\./g, "&#8203;.");

    const brandColor = "#346df1";
    const color = {
        background: "#f9f9f9",
        text: "#444",
        mainBackground: "#fff",
        buttonBackground: brandColor,
        buttonBorder: brandColor,
        buttonText: "#fff",
    };

    return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`;
}
