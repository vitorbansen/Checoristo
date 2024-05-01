import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  switch (method) {
    case 'GET':
      try {
        const items = await prisma.itemLista.findMany();
        return res.status(200).json(items);
      } catch (error) {
        console.error("Error fetching items:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'POST':
      try {
        const { idLista, nomeItem, quantidade, descricao, comprado, idCategoria } = body;
        const newItem = await prisma.itemLista.create({
          data: {
            idLista,
            nomeItem,
            quantidade,
            descricao,
            comprado,
            idCategoria,
          }
        });
        return res.status(200).json(newItem);
      } catch (error) {
        console.error("Error creating item:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'PUT':
      try {
        const { idItem } = query;
        const id = parseInt(idItem as string); // Convertendo o ID para número
        if (!id || isNaN(id)) {
          return res.status(400).json({
            status: 400,
            description: "Invalid ID"
          });
        }

        const { idLista, nomeItem, quantidade, descricao, comprado, idCategoria } = body;
        const updatedItem = await prisma.itemLista.update({
          where: { idItem: id },
          data: { idLista, nomeItem, quantidade, descricao, comprado, idCategoria }
        });
        return res.status(200).json(updatedItem);
      } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({
          status: 500,
          description: "Internal Server Error"
        });
      }

    case 'DELETE':
      try {
        const { idItem } = query;
        const id = parseInt(idItem as string); // Convertendo o ID para número
        if (!id || isNaN(id)) {
          return res.status(400).json({
            status: 400,
            description: "Invalid ID"
          });
        }

        const deletedItem = await prisma.itemLista.delete({
          where: { idItem: id }
        });
        return res.status(200).json(deletedItem);
      } catch (error) {
        console.error("Error deleting item:", error);
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
