import { openConnection } from "./db";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export async function getTasks() {
  const connection = await openConnection();

  try {
    const [tasks] = await connection.execute("SELECT * FROM task");

    return tasks as Task[];
  } finally {
    await connection.end();
  }
}

export async function saveTask(title: string, description: string) {
  const connection = await openConnection();
  try {
    const completed = false;

    await connection.execute(
      "INSERT INTO task (title, description, completed) VALUES (?,?,?)",
      [title, description, completed],
    );
  } finally {
    connection.end();
  }
}

export async function deleteTask(id: number) {
  const connection = await openConnection();
  try {
    connection.execute("DELETE FROM task WHERE id = ?", [id]);
  } finally {
    await connection.end();
  }
}

export async function updateTask(
  id: number,
  title: string,
  description: string,
) {
  const connection = await openConnection();

  try {
    connection.execute(
      "UPDATE task SET title = ?, description = ? WHERE id = ?",
      [title, description, id],
    );
  } finally {
    connection.end();
  }
}

export async function toggleTaskStatus(id: number, completed: boolean) {
  const connection = await openConnection();

  try {
    const statusValue = completed ? 1 : 0;
    connection.execute("UPDATE task set completed = ? WHERE id = ?", [
      statusValue,
      id,
    ]);
  } finally {
    connection.end();
  }
}
