import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h1 className="text-4xl font-extrabold tracking-tight">404 — Page Not Found</h1>
      <p className="text-slate-600 text-sm max-w-sm">
        The requested storytelling page could not be located.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
