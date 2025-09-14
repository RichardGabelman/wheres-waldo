import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const image = await prisma.image.upsert({
    where: { id: 1 },
    update: {},
    create: {},
  });

  const characters = [
    { name: "Al Gore", xPercent: 19, yPercent: 26.78 },
    { name: "Barack Obama", xPercent: 64.19, yPercent: 29.78 },
    { name: "Bill Clinton", xPercent: 12.94, yPercent: 39.67 },
    { name: "Donald Trump", xPercent: 82, yPercent: 29.33 },
    { name: "Doug Emhoff", xPercent: 75.63, yPercent: 33.67 },
    { name: "George W. Bush", xPercent: 39.06, yPercent: 33.33 },
    { name: "Hillary Clinton", xPercent: 24.56, yPercent: 40.44 },
    { name: "Jill Biden", xPercent: 46.38, yPercent: 45.33 },
    { name: "Joe Biden", xPercent: 35.5, yPercent: 42.44 },
    { name: "Kamala Harris", xPercent: 61.5, yPercent: 41.33 },
    { name: "Laura Bush", xPercent: 50.31, yPercent: 37.11 },
    { name: "Melania Trump", xPercent: 90.25, yPercent: 26.78 },
    { name: "Mike Pence", xPercent: 31.69, yPercent: 26.44 },
  ];

  for (const c of characters) {
    await prisma.character.upsert({
      where: { name_imageId: { name: c.name, imageId: image.id } },
      update: { xPercent: c.xPercent, yPercent: c.yPercent },
      create: { ...c, imageId: image.id },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
