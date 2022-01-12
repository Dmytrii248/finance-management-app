import { IRecordCollection } from "Constants/interfaces";
import { RecordType } from "Constants/types";
import moment from "moment";
import { DBCollection } from "./Collection";

export class RecordCollection
  extends DBCollection<RecordType>
  implements IRecordCollection
{
  getByDate(
    date: Date,
    nameIndexStore: string,
    fetchBy: "month" | "year"
  ): Promise<RecordType[]> {
    return new Promise(async (res, rej) => {
      const transactionRead = this.db.transaction(this.nameStore, "readonly");

      transactionRead.oncomplete = () =>
        console.log("transaction read is complete");
      transactionRead.onerror = () => {
        console.log("transaction read have error");
        rej("transaction read have error");
      };

      const objStore = transactionRead.objectStore(this.nameStore);

      const startFetchDate = moment(date).startOf(fetchBy).toDate();
      const endFetchDate = moment(date).endOf(fetchBy).toDate();
      const keyRangeValue = IDBKeyRange.bound(
        startFetchDate,
        endFetchDate,
        true,
        true
      );

      const getByIndex = objStore.index(nameIndexStore);
      const reqCursor = getByIndex.openCursor(keyRangeValue);
      const arrEntries: RecordType[] = [];

      reqCursor.onsuccess = (e) => {
        const cursor: IDBCursorWithValue = (e.target as IDBRequest).result;
        if (cursor) {
          arrEntries.push(cursor.value);
          cursor.continue();
        } else {
          console.log("Entries all displayed");
          res(arrEntries);
        }
      };

      reqCursor.onerror = () => {
        console.log("request to cursor have error");
        rej("request to cursor have error");
      };
    });
  }
}
