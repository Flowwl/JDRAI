/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (callback: (...args: any) => void, wait: number) => {
  // @ts-expect-error
  let timeout: Timeout;
  return (...args: any) => {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
};
