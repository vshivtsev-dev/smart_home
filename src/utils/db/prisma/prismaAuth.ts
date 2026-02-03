import "dotenv/config";
import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "generated/prisma/auth/client";
import {DATABASE_URL} from "../../../../prisma.config";

const connectionString = `${DATABASE_URL}?schema=auth"`;

const adapter = new PrismaPg({ connectionString });
const prismaAuth = new PrismaClient({ adapter });

export { prismaAuth };
