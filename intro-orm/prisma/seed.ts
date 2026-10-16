import { prisma } from '../src/configs/prisma-client.config';

const branches = [
  {
    name: 'Library GOP-09',
    location: 'BSD',
  },
  {
    name: 'Library Jakarta Sudirman',
    location: 'JAKARTA',
  },
];

const shifts = [
  {
    startTime: new Date('1995-10-20 09:00:00'),
    endTime: new Date('2026-10-16 18:00:00'),
  },
];

async function main() {
  await prisma.branch.createMany({ data: branches });
  await prisma.shift.createMany({ data: shifts });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
