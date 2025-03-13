/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const characters = [
    {
      illustration: 'convention',
      name: 'Benson',
      minX: 1588,
      maxX: 1655,
      minY: 410,
      maxY: 557,
    },

    {
      illustration: 'convention',
      name: 'Kermit the Frog',
      minX: 2818,
      maxX: 2885,
      minY: 1831,
      maxY: 1991,
    },

    {
      illustration: 'convention',
      name: 'Waylon Smithers',
      minX: 715,
      maxX: 791,
      minY: 1924,
      maxY: 2054,
    },

    {
      illustration: 'cyberpunkCity',
      name: 'Batman',
      minX: 185,
      maxX: 255,
      minY: 964,
      maxY: 1037,
    },

    {
      illustration: 'cyberpunkCity',
      name: 'Jabba the Hutt',
      minX: 1203,
      maxX: 1306,
      minY: 1067,
      maxY: 1164,
    },

    {
      illustration: 'cyberpunkCity',
      name: 'Tom Cat',
      minX: 1683,
      maxX: 1757,
      minY: 3243,
      maxY: 3345,
    },

    {
      illustration: 'undergroundLab',
      name: 'Godzilla',
      minX: 1501,
      maxX: 1642,
      minY: 1709,
      maxY: 1824,
    },

    {
      illustration: 'undergroundLab',
      name: 'R2D2',
      minX: 1411,
      maxX: 1455,
      minY: 2107,
      maxY: 2165,
    },

    {
      illustration: 'undergroundLab',
      name: 'Waldo',
      minX: 268,
      maxX: 307,
      minY: 1699,
      maxY: 1778,
    },
  ];

  const characterPromises = characters.map((character) =>
    prisma.character.create({ data: character }),
  );

  console.log('Creating characters...');
  await Promise.all(characterPromises);
  console.log('Seeding complete');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
