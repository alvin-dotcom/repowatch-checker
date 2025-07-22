
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="py-6 bg-card border-t border-border/60 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" />
            <span className="text-lg md:text-xl font-semibold font-headline">RepoWatch</span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RepoWatch. All rights reserved.
          </p>
          <div className="flex gap-3 md:gap-4 text-xs md:text-sm">
            {/* Placeholder for future links */}
            {/* <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

