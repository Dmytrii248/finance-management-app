import { RecordType, TagType } from "Constants/types";

export const transformObjectsForPie = (
  arr: RecordType[],
  tagsData: TagType[]
) => {
  return arr.map((el: RecordType) => {
    return {
      type: el.idsTagsRecord.map(
        (idTag: number) =>
          tagsData.find((tag: TagType) => tag.id === idTag).nameTag
      ),
      value: el.amountMoney,
    };
  });
};
