"use session";
import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/database/dbConnect";
import Meet from "@/database/models/Meet";
import User from "@/database/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "PATCH":
      try {
        const { userId } = JSON.parse(req.body);

        const user = await User.findById(userId);

        if (!user) return res.status(400).json({ success: false });
        const companyId = user.companies[0].companyId;

        const meets = await Meet.find({ companyId });

        res.status(200).json({ success: true, meets });
      } catch (error: any) {
        console.log("🚀 ~ error => ", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const body = JSON.parse(req.body);

        const user = await User.findById(body.userId);

        if (!user) return res.status(400).json({ success: false });

        const companyId = user.companies[0].companyId;

        const meet = await Meet.create({
          name: body.name,
          timeOfDay: body.timeOfDay,
          weekDay: body.weekDay,
          local: body.local,
          form: body.form,
          companyId,
        });

        res.status(200).json({
          success: true,
          meet,
        });
      } catch (error) {
        console.log("🚀 ~ error => ", error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
