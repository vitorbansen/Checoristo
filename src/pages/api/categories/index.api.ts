import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

async function ensureDefaultCategory() {
  const existingDefaultCategory = await prisma.categorias.findFirst({
    where: { nomeCategoria: "Padrão" } // Nome da categoria padrão
  });

  if (!existingDefaultCategory) {
    // Se a categoria padrão ainda não existir, crie-a
    await prisma.categorias.create({
      data: {
        nomeCategoria: "Padrão" // Nome da categoria padrão
      }
    });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  // Garante que a categoria padrão esteja presente no banco de dados
  await ensureDefaultCategory();

  switch (method) {
    case 'GET':
      try {
        const categorias = await prisma.categorias.findMany();
        return res.status(200).json(categorias);
      } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'POST':
      try {
        const { nomeCategoria } = body;
        const novaCategoria = await prisma.categorias.create({
          data: {
            nomeCategoria,
          }
        });
        return res.status(200).json(novaCategoria);
      } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'PUT':
      try {
        const { idCategoria } = query;
        const id = parseInt(idCategoria as string);
        if (!id || isNaN(id)) {
          return res.status(400).json({
            status: 400,
            description: "Invalid ID"
          });
        }

        const { nomeCategoria } = body;
        const updatedCategory = await prisma.categorias.update({
          where: { idCategoria: id },
          data: { nomeCategoria }
        });
        return res.status(200).json(updatedCategory);
      } catch (error) {
        console.error("Error updating category:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'DELETE':
      try {
        const { idCategoria } = query;
        const id = parseInt(idCategoria as string);
        if (!id || isNaN(id)) {
          return res.status(400).json({
            status: 400,
            description: "Invalid ID"
          });
        }

        const deletedCategory = await prisma.categorias.delete({
          where: { idCategoria: id }
        });
        return res.status(200).json(deletedCategory);
      } catch (error) {
        console.error("Error deleting category:", error);
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
