import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 创建标签
  const tag1 = await prisma.tag.create({
    data: { name: "技术" },
  });
  const tag2 = await prisma.tag.create({
    data: { name: "编程" },
  });

  // 创建文章并关联标签
  const post = await prisma.post.create({
    data: {
      title: "带标签的文章",
      content: "这篇文章有一些标签。",
      published: true,
      author: {
        connect: { id: 1 }, // 假设存在 id 为 1 的用户
      },
      tags: {
        connect: [{ id: tag1.id }, { id: tag2.id }],
      },
    },
    include: {
      tags: true,
    },
  });

  console.log("创建带标签的文章:", post);
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
