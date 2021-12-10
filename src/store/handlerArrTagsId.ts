import { ITagCollection } from "Constants/interfaces";

export const handlerArrTagsId = (
  arrTagId: number[],
  typeTag: string,
  tagCollection: ITagCollection
): Promise<number[]> => {
  const arrayPromiseDataTags = arrTagId.map(async (tagsId) => {
    if (!tagsId.toString().startsWith("id:")) {
      const createdTag = await tagCollection.add({
        typeTag: typeTag,
        nameTag: tagsId.toString(),
      });
      return createdTag.id;
    } else return +tagsId.toString().slice(3);
  });
  return Promise.all(arrayPromiseDataTags);
};
