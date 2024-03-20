/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `alteradoEm` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - The required column `idUsuarios` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `senha` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ListasCompras" (
    "idLista" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" TEXT NOT NULL,
    "tituloLista" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ListasCompras_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users" ("idUsuarios") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categorias" (
    "idCategoria" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCategoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ItensLista" (
    "idItem" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLista" INTEGER NOT NULL,
    "nomeItem" TEXT NOT NULL,
    "quantidade" INTEGER,
    "descricao" TEXT NOT NULL,
    "comprado" BOOLEAN NOT NULL DEFAULT false,
    "idCategoria" INTEGER NOT NULL,
    CONSTRAINT "ItensLista_idLista_fkey" FOREIGN KEY ("idLista") REFERENCES "ListasCompras" ("idLista") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItensLista_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "Categorias" ("idCategoria") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistoricoCompras" (
    "idCompra" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" TEXT NOT NULL,
    "idItem" INTEGER NOT NULL,
    "dataCompra" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HistoricoCompras_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "users" ("idUsuarios") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HistoricoCompras_idItem_fkey" FOREIGN KEY ("idItem") REFERENCES "ItensLista" ("idItem") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "idUsuarios" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alteradoEm" DATETIME NOT NULL
);
INSERT INTO "new_users" ("name") SELECT "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "IDX_ListasCompras_idUsuario" ON "ListasCompras"("idUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "ListasCompras_idLista_idUsuario_key" ON "ListasCompras"("idLista", "idUsuario");

-- CreateIndex
CREATE INDEX "IDX_ItensLista_idLista" ON "ItensLista"("idLista");

-- CreateIndex
CREATE INDEX "IDX_ItensLista_idCategoria" ON "ItensLista"("idCategoria");

-- CreateIndex
CREATE UNIQUE INDEX "ItensLista_idItem_idLista_key" ON "ItensLista"("idItem", "idLista");

-- CreateIndex
CREATE INDEX "IDX_HistoricoCompras_idUsuario" ON "HistoricoCompras"("idUsuario");

-- CreateIndex
CREATE INDEX "IDX_HistoricoCompras_idItem" ON "HistoricoCompras"("idItem");
