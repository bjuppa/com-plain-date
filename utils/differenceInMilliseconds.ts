export const differenceInMilliseconds = (from: Date) => (to: Date) => {
  return to.valueOf() - from.valueOf();
};
