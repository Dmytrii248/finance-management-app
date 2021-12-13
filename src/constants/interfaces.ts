import { RecordType, TagType } from "./types";

export interface ICollection<T> {
  add(item: T): Promise<T>;
  getAll(): Promise<T[]>;
  reomveById(id: number): Promise<T>;
}

export interface MyIDBVersionChangeEvent extends IDBVersionChangeEvent {
  target: IDBOpenDBRequest;
}

export interface IRecordCollection extends ICollection<RecordType> {
  getbyDate(date: Date, nameIndexStore: string): Promise<RecordType[]>;
}

export interface ITagCollection extends ICollection<TagType> {}
