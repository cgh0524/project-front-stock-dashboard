export function logError(event: string, detail: Record<string, unknown>) {
  console.error(`[${event}]`, {
    ...detail,
    timestamp: new Date().toISOString(),
  });
}
