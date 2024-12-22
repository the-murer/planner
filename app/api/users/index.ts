import { NextApiRequest, NextApiResponse } from "next";

import Company from "@/database/models/Company";
import User from "@/database/models/User";
import bcrypt from "bcrypt";
import dbConnect from "@/database/dbConnect";

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

        const users = await User.find({
          "companies.companyId": { $in: user.companies[0].companyId },
        });

        res.status(200).json({ success: true, users });
      } catch (error: any) {
        console.log("🚀 ~ error => ", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const body = JSON.parse(req.body);

        const { companyId, isAdmin } = body;

        const company = await Company.findById(companyId);

        if (!company) return res.status(400).json({ success: false });


        const companies = [
          {
            name: company.name,
            companyId: company._id,
            isAdmin,
          },
        ];
      
        const passwordHash = await bcrypt.hash(body.password, 10);
      
      
        await User.create({
          _id: new mongoose.Types.ObjectId(),
          ...body,
          password: passwordHash,
          companies,
        });


        res.status(200).json({
          success: true,
        });
      } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
