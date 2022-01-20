export const isEqualArrays = (
  firstArr: number[],
  secondArr: number[]
): boolean => {
  if (firstArr.length !== secondArr.length) return false;

  const sortedFirstArr = firstArr.sort((a: number, b: number) => a - b);
  const sortedSecondArr = secondArr.sort((a: number, b: number) => a - b);

  for (let i = 0; i < firstArr.length; i++) {
    if (sortedFirstArr[i] !== sortedSecondArr[i]) return false;
  }

  return true;
};
