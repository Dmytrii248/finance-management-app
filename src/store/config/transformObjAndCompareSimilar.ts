import { RecordType } from "Constants/types";

type ElementType = {
  type: number;
  value: number;
};

export const transformObjAndCompareSimilar = (array: RecordType[]) => {
  const arr = [...array];
  console.log("arr in fn compare", arr);

  const callbackFn = (acc: ElementType[], value: RecordType): ElementType[] => {
    const tempAcc = [...acc];
    value.idsTagsRecord.forEach((tagId) => {
      if (tempAcc.find((el) => el.type === tagId)) {
        tempAcc[tempAcc.findIndex((el) => el.type === tagId)].value +=
          value.amountMoney;
      } else {
        tempAcc.push({ type: tagId, value: value.amountMoney });
      }
    });

    return tempAcc;
  };

  return arr.reduce(callbackFn, []);
};
