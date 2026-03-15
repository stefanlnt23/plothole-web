"use client";

export function PrintButton() {
  return (
    <button onClick={() => window.print()} className="rounded-md border border-border px-4 py-2">
      Download Report
    </button>
  );
}
