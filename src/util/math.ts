export const crop = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
}

export const minmax = (value1: number, value2: number) => {
  return [Math.min(value1, value2), Math.max(value1, value2)];
}
