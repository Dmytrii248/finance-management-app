import { ElementBeforePieType, RecordType, TagType } from "Constants/types";

export const transformObjectsForPie = (
  arr: RecordType[] | ElementBeforePieType[],
  tagsData: TagType[]
) => {
  return arr.map((el: RecordType & ElementBeforePieType) => {
    const type = el?.type
      ? tagsData.find((tag) => tag.id === el.type).nameTag
      : el.idsTagsRecord.map(
          (idTag: number) =>
            // temporary fix
            tagsData.find((tag: TagType) => tag.id === idTag)?.nameTag ??
            "NOTFOUND"
        );
    const value = el?.type ? el.value : el.amountMoney;
    return {
      type: type,
      value: value,
    };
  });
};
