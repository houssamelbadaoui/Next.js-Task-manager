"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, description: string) => void;
};

export default function TaskCard({ task, onDelete, onUpdate }: TaskCardProps) {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [open, setOpen] = useState(false);

  function update() {
    onUpdate(task.id, editTitle, editDescription);
    setOpen(false);
  }

  return (
    <Card className="w-full max-w-md shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{task.title}</CardTitle>

        <Badge
          className={
            task.completed
              ? "bg-green-500 hover:bg-green-600"
              : "bg-yellow-500 hover:bg-yellow-600"
          }
        >
          {task.completed ? "Completed" : "Pending"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">{task.description}</p>

        <div className="flex gap-2 pt-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit task</DialogTitle>
                <DialogDescription>
                  Edit any field in the task
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <FieldGroup>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Edit task title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Edit task description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                </FieldGroup>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={update}
                >
                  Edit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>

          <Button variant="outline" size="sm">
            {task.completed ? "Mark Pending" : "Mark Done"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
