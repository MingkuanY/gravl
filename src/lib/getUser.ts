import prisma from "@/lib/prisma";

export async function getUser(id: string | undefined) {
  if (!id) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}
