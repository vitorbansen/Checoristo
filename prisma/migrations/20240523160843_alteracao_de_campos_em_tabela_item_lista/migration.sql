-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItensLista" (
    "idItem" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idLista" INTEGER,
    "nomeItem" TEXT NOT NULL,
    "quantidade" INTEGER,
    "descricao" TEXT NOT NULL,
    "comprado" BOOLEAN NOT NULL DEFAULT false,
    "idCategoria" INTEGER
);
INSERT INTO "new_ItensLista" ("comprado", "descricao", "idCategoria", "idItem", "idLista", "nomeItem", "quantidade") SELECT "comprado", "descricao", "idCategoria", "idItem", "idLista", "nomeItem", "quantidade" FROM "ItensLista";
DROP TABLE "ItensLista";
ALTER TABLE "new_ItensLista" RENAME TO "ItensLista";
CREATE INDEX "IDX_ItensLista_idLista" ON "ItensLista"("idLista");
CREATE INDEX "IDX_ItensLista_idCategoria" ON "ItensLista"("idCategoria");
CREATE UNIQUE INDEX "ItensLista_idItem_idLista_key" ON "ItensLista"("idItem", "idLista");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
