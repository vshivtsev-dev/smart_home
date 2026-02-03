import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {admin} from "better-auth/plugins";
import {prismaAuth} from "utils/db/prisma/prismaAuth";

export const auth = betterAuth({
  database: prismaAdapter(prismaAuth, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
});
