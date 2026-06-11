import { openConnection } from "./db";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export async function getTasks() {
  const connection = await openConnection();

  const [tasks] = await connection.execute("SELECT * FROM task");

  await connection.end();

  return tasks as Task[];
}

export async function saveTask(title: string, description: string) {
  const connection = await openConnection();
  const completed = false;

  await connection.execute(
    "INSERT INTO task (title, description, completed) VALUES (?,?,?)",
    [title, description, completed],
  );

  connection.end();
}
