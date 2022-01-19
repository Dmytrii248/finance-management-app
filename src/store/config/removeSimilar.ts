import { RecordType } from "Constants/types";
import { isEqualArrays } from "./equalsArrays";

export const removeSimilar = (array: RecordType[]): RecordType[] => {
  const callbackFn = (acc: RecordType[], value: RecordType): RecordType[] => {
    const foundIndex = acc.findIndex((el) =>
      isEqualArrays(el.idsTagsRecord, value.idsTagsRecord)
    );
    if (foundIndex !== -1) {
      acc[foundIndex].amountMoney += value.amountMoney;
    } else {
      acc.push({ ...value });
    }
    return acc;
  };
  return array.reduce(callbackFn, []);
};
