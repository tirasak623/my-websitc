export function LoadingState({ label = "กำลังโหลดข้อมูล..." }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-16 gap-3 text-cocoa"
    >
      <span className="h-8 w-8 rounded-full border-2 border-cocoa/30 border-t-cocoa animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
