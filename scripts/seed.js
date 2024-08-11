import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const postToCreate = [
  {
    id: 1,
    title: 'First Post :)',
    content: 'The first post I made',
  },
  {
    id: 2,
    title: 'My Second Post :)',
    content: 'Only my second post, still working on it',
  },
  {
    id: 3,
    title: 'My Third Post :)',
    content: 'This is my third post, I am getting better',
  },
  {
    id: 4,
    title: 'Final Post, Thank You',
    content: 'This should be enough for now',
  },
];

const seed = async (posts) => {
  console.info('Seeding posts...');

  for (const post of posts) {
    await client.post.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }
};

seed(postToCreate)
  .then(() => {
    console.info('Seeding complete!');
  })
  .catch((error) => {
    console.error('Seeding failed!');
    console.error(error);
  })
  .finally(async () => {
    await client.$disconnect();
    console.log('Disconnected from database');
  });
