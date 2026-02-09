import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {nextCookies} from "better-auth/next-js";
import {admin} from "better-auth/plugins";
import {prisma} from "@/utils/db/prisma/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), nextCookies()],
  trustedOrigins: [
    `http://localhost:${process.env.PORT}`,
    `http://192.168.0.*:${process.env.PORT}`,
    `http://${process.env.URL}:${process.env.PORT}`,
    `https://${process.env.DOMAIN}`,
  ],
});
