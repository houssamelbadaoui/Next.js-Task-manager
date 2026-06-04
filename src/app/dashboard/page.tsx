import { Button } from "@/components/ui/button";

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
          <Button>+ Add Task</Button>
        </header>
        <section className="p-6"></section>
      </main>
    </div>
  );
}
