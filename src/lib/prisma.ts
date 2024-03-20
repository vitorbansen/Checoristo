import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client/extension";

// vai ver automatico as conexoes que precisa
export const prisma = new PrismaClient({
    log:['query']
}) 