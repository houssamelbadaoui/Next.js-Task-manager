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

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState(false);

  // function to add a task
  function handleAddTask() {
    if (title.trim() === "" || description.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);

    setTitle("");
    setDescription("");

    setOpen(false);
  }
  // a function to handle to remove a task from array of tasks
  function handleDeleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  // function to toggle a task
  function handleToggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 h-full px-3 py-4 bg-neutral-primary-soft border-e border-default">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
        <ul className="space-y-2 font-medium">
          <li className="text-center mb-4">All tasks</li>
          <li className="text-center mb-4">Completed</li>
          <li className="text-center mb-4">Pending</li>
        </ul>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between w-full px-6 py-4 border-b bg-white">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your daily tasks</p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)}>+ Add Task</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>Create a new Task here</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <FieldGroup>
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FieldGroup>

                <FieldGroup>
                  <label htmlFor="description">Description</label>
                  <Textarea
                    id="description"
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FieldGroup>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleAddTask}
                >
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <section className="p-6">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTask}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
