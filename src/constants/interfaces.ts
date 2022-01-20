import { RecordType, TagType } from "./types";

export interface ICollection<T> {
  add(item: T): Promise<T>;
  getAll(): Promise<T[]>;
  getOne(id: number): Promise<T>;
  put(id: number, element: T): Promise<T>;
  reomveById(id: number): Promise<T>;
}

export interface MyIDBVersionChangeEvent extends IDBVersionChangeEvent {
  target: IDBOpenDBRequest;
}

export interface IRecordCollection extends ICollection<RecordType> {
  getByDate(
    date: Date,
    nameIndexStore: string,
    fetchBy: "month" | "year"
  ): Promise<RecordType[]>;
}

export interface ITagCollection extends ICollection<TagType> {}
