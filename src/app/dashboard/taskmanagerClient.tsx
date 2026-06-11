"use client";
import { useState } from "react";

import TaskCard from "./components/taskCard";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { promises } from "dns";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type Props = {
  initialTasks: Task[];
  onAddTask: (formData: FormData) => Promise<void>;
  onDeleteTask: (id: number) => Promise<void>;
  onUpdateTask: (
    id: number,
    title: string,
    description: string,
  ) => Promise<void>;
};
export default function TaskManagerClient({
  initialTasks,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: Props) {
  // States
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [isOpen, setIsOpen] = useState(false);

  // we use a filter array to return tasks depends on filter state
  const filteredTasks = initialTasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // function to send data to database and close modal
  async function handleSubmit(formData: FormData) {
    await onAddTask(formData);

    setIsOpen(false);
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 h-full px-3 py-4 bg-neutral-primary-soft border-e border-default">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
        <div className=" flex flex-col space-y-2 font-medium">
          <Button
            variant={filter === "all" ? "default" : "ghost"}
            onClick={() => setFilter("all")}
          >
            All Tasks
          </Button>

          <Button
            variant={filter === "completed" ? "default" : "ghost"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>

          <Button
            variant={filter === "pending" ? "default" : "ghost"}
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between w-full px-6 py-4 border-b bg-white">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your daily tasks</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>+ Add Task</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>Create a new Task here</DialogDescription>
              </DialogHeader>

              <form className="space-y-6 py-4" action={handleSubmit}>
                <FieldGroup>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    name="title"
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter task description"
                    name="description"
                  />
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>

                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700"
                    type="submit"
                  >
                    Add Task
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </header>
        <section className="p-6">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={onDeleteTask}
                  onUpdate={onUpdateTask}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
