import { Moment } from "moment";
import { IRecordCollection, ITagCollection } from "./interfaces";

export type FormRecordValues = {
  typeRecord: string;
  dateRecord: Moment;
  amountMoney: number;
  descriptionRecord: string | null;
};

export type RecordType = {
  typeRecord: string;
  dateRecord: Date;
  amountMoney: number;
  descriptionRecord: string | null;
  id?: number;
  key?: number;
};

export type TagType = {
  tagName: string;
  id?: number;
};

export type GlobalContextType = {
  recordCollection: IRecordCollection;
  tagCollection: ITagCollection;
};
