import EmailTemplate from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  if (!emailInfo) return null;

  const response = await Promise.allSettled(
    emailInfo.map(async (email) => {
      if (email.to && email.subject && email.message) {
        const to = email.to;
        const subject = email.subject;
        const message = email.message;

        const sentInfo = await resend.emails.send({
          to: to,
          subject: subject,
          react: EmailTemplate({ message }),
        });

        return sentInfo;
      } else {
        new Promise((reject) => {
          return reject(
            new Error(
              `Couldn't send email, please check the ${JSON.stringify(email)}.`
            )
          );
        });
      }
    })
  );
  return response;
};
