import { saveTask, getTasks } from "@/lib/tasks";
import { revalidatePath } from "next/cache";
import TaskManagerClient from "./taskmanagerClient";

export default async function Dashboard() {
  // get tasks from database
  const tasks = await getTasks();
  // function to add a task
  async function handleAddTask(formData: FormData) {
    "use server";

    const title = formData.get("title");
    const description = formData.get("description");

    if (typeof title !== "string" || typeof description !== "string") {
      return;
    }
    if (title.trim() === "" || description.trim() === "") return;

    await saveTask(title, description);

    revalidatePath("/dashboard");
  }

  return <TaskManagerClient initialTasks={tasks} onAddTask={handleAddTask} />;
}
