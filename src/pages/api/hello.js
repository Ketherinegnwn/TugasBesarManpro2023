// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `mysql://root:@localhost:3306/manpro`,
    },
  },
});

export default async function handler(req, res) {
  const data = await prisma.marketing_campaign.findMany();
  res.json(data);
  // res.status(200).json({ name: "John Doe" });
}
