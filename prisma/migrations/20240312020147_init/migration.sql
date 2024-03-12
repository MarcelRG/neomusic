-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "hex" TEXT NOT NULL,
    "playlist" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "emergence" INTEGER,
    "modernity" INTEGER,
    "youth" INTEGER,
    "femininity" INTEGER,
    "background" INTEGER NOT NULL,
    "tempo" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "color" INTEGER NOT NULL,
    "added" INTEGER NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
