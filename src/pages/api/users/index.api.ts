// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { prisma } from "@/lib/prisma";
// import type { NextApiRequest, NextApiResponse } from "next";



// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { email, senha, name } = req.body
//   if (!email || !senha || !name){
//     return res.status(400).json({
//       status: 400,
//       description: "Bad Request"
//     })
//   }

//   const user = await prisma.user.create({
//     data: {
//       email,
//       name,
//       senha,
//     }
//   })


//   return res.status(200).json(user)
// }

import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'POST':
      try {
        const { email, senha, name } = body;
        const newUser = await prisma.user.create({
          data: {
            email,
            name,
            senha,
          }
        });
        return res.status(200).json(newUser);
      } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'PUT':
      try {
        const { idUsuarios } = query;
        
        if (!idUsuarios || typeof idUsuarios !== 'string') {
          return res.status(400).json({
            status: 400,
            description: "Invalid ID"
          });
        }

        const { email, senha, name } = body;
        const updatedUser = await prisma.user.update({
          where: { idUsuarios },
          data: { email, senha, name }
        });
        return res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'DELETE':
      try {
        const { idUsuarios } = query;
        
        if (!idUsuarios || typeof idUsuarios !== 'string') {
          return res.status(400).json({
            status: 400,
            description: "Invalid ID"
          });
        }

        const deletedUser = await prisma.user.delete({
          where: { idUsuarios }
        });
        return res.status(200).json(deletedUser);
      } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    default:
      return res.status(405).json({
        status: 405,
        description: "Method Not Allowed"
      });
  }
}
