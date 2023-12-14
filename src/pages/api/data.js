// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/util/prisma";
import Papa from "papaparse";

const notInt = ["Education", "Marital_Status", "Income", "Dt_Customer"];

export default async function handler(req, res) {
  if (req.method === "POST") {
    let data = Papa.parse(req.body).data.slice(4, -3);
    let newData = data.slice(1).map((values) => ({
      ...Object.assign(
        ...data[0].map((k, i) => {
          if (i === 0) return {};
          if (notInt.includes(k)) return { [k]: values[i] };
          return { [k]: parseInt(values[i]) };
        })
      ),
      ID: parseInt(values[0]),
    }));

    const test = await prisma.marketing_campaign.createMany({
      data: newData,
      skipDuplicates: true,
    });

    return res.json(test);
  }
  // if (req.method === 'DELETE') // kalau mau delete request
}
