// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, senha, name } = req.body
  if (!email || !senha || !name){
    return res.status(400).json({
      status: 400,
      description: "Bad Request"
    })
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      senha,
    }
  })


  return res.status(200).json(user)
}
