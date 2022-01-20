import { ElementBeforePieType, RecordType } from "Constants/types";

export const transformObjAndCompareSimilar = (array: RecordType[]) => {
  const callbackFn = (
    acc: ElementBeforePieType[],
    value: RecordType
  ): ElementBeforePieType[] => {
    value.idsTagsRecord.forEach((tagId) => {
      const foundIndex = acc.findIndex((el) => el.type === tagId);
      if (foundIndex !== -1) {
        acc[foundIndex].value += value.amountMoney;
      } else {
        acc.push({ type: tagId, value: value.amountMoney });
      }
    });

    return acc;
  };

  return array.reduce(callbackFn, []);
};
