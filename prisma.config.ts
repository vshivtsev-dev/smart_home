import "dotenv/config";
import {defineConfig} from "prisma/config";

export const DATABASE_URL = `postgresql://
${process.env.POSTGRES_USER}:
${process.env.POSTGRES_PASSWORD}@
${process.env.POSTGRES_URL}:
${process.env.POSTGRES_PORT}/
${process.env.POSTGRES_DB}`;

export default defineConfig({
  schema: "prisma/",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: DATABASE_URL || process.env.DATABASE_URL,
  },
});
