// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/util/prisma";
import Papa from "papaparse";

const notInt = ["Education", "Marital_Status", "Dt_Customer"];

export default async function handler(req, res) {
  // kalau mau get request
  if (req.method === "GET") {
    // console.log(req.query);
    // if there's aggregate request
    if (Object.keys(req.query).length > 0) {
      const { group, sum, agg } = req.query;

      let data;

      if (!agg) {
        data = await prisma.marketing_campaign.findMany({
          select: {
            [group]: true,
            [sum]: true,
          },
        });

        return res.json(data);
      } else
        data = await prisma.marketing_campaign.groupBy({
          by: [group],
          [`_${agg.toLowerCase()}`]: {
            [sum]: true,
          },
        });

      data = data.map((c) => ({
        [group]: c[group],
        [sum]: c[`_${agg.toLowerCase()}`][sum],
      }));

      // console.log(data);
      return res.json(data);
    } else {
      const data = await prisma.marketing_campaign.findMany();

      return res.json(data);
    }
    // kalau mau post request
  } else if (req.method === "POST") {
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
