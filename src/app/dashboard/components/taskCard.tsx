"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type TaskCardProps = {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export default function TaskCard({ task, onDelete, onToggle }: TaskCardProps) {
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
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>

          <Button variant="outline" size="sm" onClick={() => onToggle(task.id)}>
            {task.completed ? "Mark Pending" : "Mark Done"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
