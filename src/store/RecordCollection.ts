import { IRecordCollection } from "Constants/interfaces";
import { RecordType } from "Constants/types";
import moment from "moment";
import { DBCollection } from "./Collection";

export class RecordCollection
  extends DBCollection<RecordType>
  implements IRecordCollection
{
  getbyDate(date: Date, nameIndexStore: string): Promise<RecordType[]> {
    return new Promise(async (res, rej) => {
      const transactionRead = this.db.transaction(this.nameStore, "readonly");

      transactionRead.oncomplete = () =>
        console.log("transaction read is complete");
      transactionRead.onerror = () => {
        console.log("transaction read have error");
        rej("transaction read have error");
      };

      const objStore = transactionRead.objectStore(this.nameStore);

      const startMonth = moment(date).startOf("month").toDate();
      const endMonth = moment(date).endOf("month").toDate();
      const keyRangeValue = IDBKeyRange.bound(startMonth, endMonth, true, true);

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
