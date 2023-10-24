import { PrismaClient } from "@prisma/client";
import genreData from "./genre.json";
const prisma = new PrismaClient();

async function run() {
  const genre = prisma.genre.createMany({
    data: genreData,
  });
  return genre;
}

run()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
