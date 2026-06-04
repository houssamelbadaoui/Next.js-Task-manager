import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-grandient-to-br from-white via-gray-50 to-indigo-100">
      <div className="text-center max-w-2xl space-y-6 px-6 ">
        <h1 className="text-gray-900 md:text-5xl font-bold tracking-tight">
          Organize your day better
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Plan your tasks, stay focused, and get more done every day. A simple
          and intuitive task manager built to help you organize work without
          stress. Turn your goals into clear actions and track your progress
          effortlessly.
        </p>
        <Link href="/dashboard">
          <Button className="bg-indigo-600 font-medium px-6 py-3 hover:bg-indigo-700 ">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </main>
  );
}
