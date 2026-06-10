export function delay(delayInMilliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayInMilliseconds);
  });
}
