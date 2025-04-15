import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 创建用户
  const user = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      profile: {
        create: {
          bio: "I am a developer.",
        },
      },
      posts: {
        create: {
          title: "My First Post",
          content: "This is the content of my first post.",
          published: true,
        },
      },
    },
    include: {
      posts: true,
      profile: true,
    },
  });

  console.log("Created user:", user);

  // 你可以在这里添加更多的数据操作
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
