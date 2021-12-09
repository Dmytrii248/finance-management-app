import { ITagCollection } from "Constants/interfaces";

export const handlerArrTagsId = (
  arrTagId: number[],
  typeTag: string,
  tagCollection: ITagCollection
): Promise<number[]> => {
  const arrayPromiseDataTags = arrTagId
    .filter((id) => !id.toString().startsWith("id:"))
    .map(async (tagsId) => {
      const createdTag = await tagCollection.add({
        typeTag: typeTag,
        nameTag: tagsId.toString(),
      });
      return createdTag.id;
    });

  return Promise.all(arrayPromiseDataTags);
};
