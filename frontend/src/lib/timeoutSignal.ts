export function timeoutSignal<T>(value: T, ms = 3000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
