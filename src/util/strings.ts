export const betweenLength = (value: string, min: number, max: number) => {
  if (!value) return false;
  return value.length >= min && value.length <= max;
}