import { PrismaClient } from "@prisma/client";

let prisma = null;

if (typeof window === "undefined") {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: `mysql://root:@localhost:3306/manpro`,
      },
    },
  });
}

export default prisma;
