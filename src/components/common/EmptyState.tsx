import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white/60 rounded-2xl border border-cocoa/10">
      <div className="w-14 h-14 rounded-full bg-orange/15 flex items-center justify-center text-cocoa mb-4">
        {icon ?? <Inbox size={26} aria-hidden="true" />}
      </div>
      <h3 className="text-lg font-semibold text-charcoal mb-1">{title}</h3>
      {description && (
        <p className="text-charcoal/60 max-w-md mb-4 text-sm md:text-base">{description}</p>
      )}
      {action}
    </div>
  );
}
