import { Moment } from "moment";

export interface FormValues {
  typeRecord: string;
  dateRecord: Moment;
  amountMoney: number;
  descriptionRecord: string | null;
}

export type RecordType = {
  typeRecord: string;
  dateRecord: Date;
  amountMoney: number;
  descriptionRecord: string | null;
  id?: number;
  key?: number;
};
