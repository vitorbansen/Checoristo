import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req; // Obter método, corpo e query da requisição

  switch (method) {
    case 'GET':
      try {
        const users = await prisma.user.findMany(); // Consultar todos os usuários no banco de dados
        return res.status(200).json(users); // Retornar os usuários como resposta
      } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'POST':
      try {
        const { email, senha, name } = body; // Extrair dados do corpo da requisição
        const newUser = await prisma.user.create({ // Criar um novo usuário no banco de dados
          data: {
            email,
            name,
            senha,
          }
        });
        return res.status(200).json(newUser); // Retornar o novo usuário como resposta
      } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'PUT':
      try {
        const { idUsuarios } = query; // Obter o ID do usuário a ser atualizado
        if (!idUsuarios || typeof idUsuarios !== 'string') {
          return res.status(400).json({
            status: 400,
            description: "Invalid ID"
          });
        }

        const { email, senha, name } = body; // Extrair dados do corpo da requisição
        const updatedUser = await prisma.user.update({ // Atualizar o usuário no banco de dados
          where: { idUsuarios },
          data: { email, senha, name }
        });
        return res.status(200).json(updatedUser); // Retornar o usuário atualizado como resposta
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'DELETE':
      try {
        const { idUsuarios } = query; // Obter o ID do usuário a ser excluído
        if (!idUsuarios || typeof idUsuarios !== 'string') {
          return res.status(400).json({
            status: 400,
            description: "Invalid ID"
          });
        }

        const deletedUser = await prisma.user.delete({ // Excluir o usuário do banco de dados
          where: { idUsuarios }
        });
        return res.status(200).json(deletedUser); // Retornar o usuário excluído como resposta
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
