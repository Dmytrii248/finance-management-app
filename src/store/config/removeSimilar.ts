import { RecordType } from "Constants/types";
import { isEqualArrays } from "./equalsArrays";

export const removeSimilar = (array: RecordType[]): RecordType[] => {
  const arr = [...array];

  const callbackFn: (acc: RecordType[], value: RecordType) => RecordType[] = (
    acc,
    value
  ) => {
    if (
      acc.find((el) => isEqualArrays(el.idsTagsRecord, value.idsTagsRecord))
    ) {
      acc[
        acc.findIndex((el) =>
          isEqualArrays(el.idsTagsRecord, value.idsTagsRecord)
        )
      ].amountMoney += value.amountMoney;
      return acc;
    } else {
      return [...acc, value];
    }
  };
  return arr.reduce(callbackFn, []);
};
