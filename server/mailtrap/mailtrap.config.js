import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv'

dotenv.config()
const TOKEN = process.env.MAINTRAP_TOKEN;

export const Mailtrapclient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Sample Test Email",
};
