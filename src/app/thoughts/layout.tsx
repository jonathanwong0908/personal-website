import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ThoughtsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-8 px-4 py-8 font-serif md:py-32">
      <nav>
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
      </nav>
      {children}
    </div>
  );
}
