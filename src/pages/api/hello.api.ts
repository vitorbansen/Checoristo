// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  user: string;
  password: String;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>,)
 { res.status(200).json({ user: "admin" , password: "admin"   }) ;}
