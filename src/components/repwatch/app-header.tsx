import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-border/60 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">RepoWatch</h1>
        </Link>
        <nav>
          {/* Future navigation links can go here */}
        </nav>
      </div>
    </header>
  );
}
