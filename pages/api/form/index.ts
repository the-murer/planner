import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/database/dbConnect";
import Form from "@/database/models/Form";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    query: { id, companyId },
    body,
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const form = await Form.findById(id);

        if (form.companyId !== companyId)
          return res.status(404).json({ success: false });

        if (!form) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, form });
      } catch (error) {
        console.log("🚀 ~ error => ", error);
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const form = await Form.findByIdAndUpdate(id, body, {
          new: true,
        });

        if (form.companyId !== body.companyId)
          return res.status(404).json({ success: false });

        if (!form) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, form });
      } catch (error) {
        console.log("🚀 ~ error => ", error);
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedForm = await Form.deleteOne({ _id: id, companyId });

        if (!deletedForm) return res.status(400).json({ success: false });

        res.status(200).json({ success: true, form: deletedForm });
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
