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

export default function Dashboard() {
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

          <Dialog>
            <DialogTrigger asChild>
              <Button>+ Add Task</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>Create a new Task here</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <FieldGroup>
                  <label htmlFor="title">Title</label>
                  <Input id="title" placeholder="Enter task title" />
                </FieldGroup>

                <FieldGroup>
                  <label htmlFor="description">Description</label>
                  <Input
                    id="description"
                    placeholder="Enter task description"
                  />
                </FieldGroup>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  Add Task
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>
        <section className="p-6"></section>
      </main>
    </div>
  );
}
