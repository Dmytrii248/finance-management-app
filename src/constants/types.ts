import { Moment } from "moment";
import { IRecordCollection, ITagCollection } from "./interfaces";

export type FormRecordValues = {
  typeRecord: string;
  dateRecord: Moment;
  idsTagsRecord: number[];
  amountMoney: number;
  descriptionRecord: string | null;
};

export type RecordType = {
  typeRecord: string;
  dateRecord: Date;
  idsTagsRecord: number[];
  amountMoney: number;
  descriptionRecord: string | null;
  id?: number;
  key?: number;
};

export type TagType = {
  typeTag: string;
  nameTag: string;
  id?: number;
  key?: number;
};

export type GlobalContextType = {
  recordCollection: IRecordCollection;
  tagCollection: ITagCollection;
};

export type ElementDataMoneyShowType = {
  type: string;
  value: number;
};
