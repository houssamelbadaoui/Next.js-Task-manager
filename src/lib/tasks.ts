import prisma from "../../lib/prisma";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export async function getTasks() {
  return prisma.task.findMany({
    orderBy: {
      id: "desc",
    },
  });
}

export async function saveTask(title: string, description: string) {
  await prisma.task.create({
    data: {
      title,
      description,
    },
  });
}

export async function deleteTask(id: number) {
  await prisma.task.delete({
    where: {
      id: id,
    },
  });
}

export async function updateTask(
  id: number,
  title: string,
  description: string,
) {
  await prisma.task.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
    },
  });
}

export async function toggleTaskStatus(id: number, completed: boolean) {
  await prisma.task.update({
    where: {
      id: id,
    },

    data: {
      completed: completed,
    },
  });
}
