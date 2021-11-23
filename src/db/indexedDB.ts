import { RecordType } from "Constants/types";
import moment from "moment";

interface MyIDBVersionChangeEvent extends IDBVersionChangeEvent {
  target: IDBOpenDBRequest;
}

const nameDB = "RecordDB";
const nameObjStore = "RecordsList";
const nameIndexStore = "dateRecord";

class Api {
  _activeDB: IDBDatabase;

  get activeDB(): Promise<IDBDatabase> {
    return new Promise((res, rej) => {
      if (this._activeDB) {
        return res(this._activeDB);
      }

      console.log("db started");
      const openRequest = window.indexedDB.open(nameDB, 1);

      openRequest.onupgradeneeded = (e: MyIDBVersionChangeEvent) => {
        if (e.oldVersion < 1) {
          console.log("not found db, need initialize it");
          const objStore = e.target.result.createObjectStore(nameObjStore, {
            autoIncrement: true,
            keyPath: "id",
          });
          objStore.createIndex(nameIndexStore, nameIndexStore, {
            unique: false,
          });
        } else {
          switch (e.newVersion) {
            case 2:
              console.log("update version to 2");
          }
        }
        // console.log("e", e);
        // console.log("e2", e.target);
        // console.log("e3", e.target.result);
      };

      openRequest.onerror = (e) => rej(e);
      openRequest.onsuccess = (e: MyIDBVersionChangeEvent) => {
        console.log("initialized");
        this._activeDB = e.target.result;
        res(this._activeDB);

        this._activeDB.onversionchange = () => {
          this._activeDB.close();
          alert("База даних застаріла, оновіть сторінку.");
        };
      };
    });
  }

  // createOBJStore = (nameObjStore: string) => {
  //   this.activeDB.createObjectStore(nameObjStore, {
  //     autoIncrement: true,
  //   });
  // };

  // removeOBJStore = (nameOBJStore: string) => {
  //   this.activeDB.deleteObjectStore(nameOBJStore);
  // };

  addObjToStore = (dataRecord: RecordType): Promise<RecordType> => {
    return new Promise(async (res, rej) => {
      const transactionAdd = (await this.activeDB).transaction(
        nameObjStore,
        "readwrite"
      );

      transactionAdd.oncomplete = () =>
        console.log("transaction write is complete");
      transactionAdd.onerror = () => console.log("transaction write is error");

      const getStoreObj = transactionAdd.objectStore(nameObjStore);
      const requestAddObj = getStoreObj.add(dataRecord);

      requestAddObj.onsuccess = (e: MyIDBVersionChangeEvent) => {
        console.log("add obj with key", dataRecord);
        res({ ...dataRecord, id: +e.target.result });
      };
      requestAddObj.onerror = (e) => rej(e);
    });
  };

  getObjFromStore = (): Promise<RecordType[]> => {
    return new Promise(async (res, rej) => {
      const transactionRead = (await this.activeDB).transaction(
        nameObjStore,
        "readonly"
      );

      transactionRead.oncomplete = () =>
        console.log("transaction read is complete");
      transactionRead.onerror = () => {
        console.log("transaction read have error");
        rej("transaction read have error");
      };

      const getObjectStore = transactionRead.objectStore(nameObjStore);

      const date = new Date();
      const startMonth = moment(date).startOf("month").toDate();
      const endMonth = moment(date).endOf("month").toDate();
      const keyRangeValue = IDBKeyRange.bound(startMonth, endMonth, true, true);

      const getByIndex = getObjectStore.index(nameIndexStore);
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
  };

  removeObjFromStore = (id: number): Promise<RecordType> => {
    return new Promise(async (res, rej) => {
      const removeTransaction = (await this.activeDB).transaction(
        nameObjStore,
        "readwrite"
      );

      removeTransaction.onerror = (e) => {
        console.log("transaction remove is error");
        rej({ type: "transaction remove", error: e });
      };
      removeTransaction.oncomplete = (e) => {
        console.log("transaction is completed", e);
      };

      const getStoreObj = removeTransaction.objectStore(nameObjStore);
      const requestRemoveObj = getStoreObj.delete(id);

      requestRemoveObj.onerror = (e) => {
        rej({ type: "request remove", error: e });
      };
      requestRemoveObj.onsuccess = (e) => {
        console.log("request remove is success", e);
        res(undefined);
      };

      console.log("requ", requestRemoveObj);
    });
  };

  close = async () => {
    (await this.activeDB).close(); // роз'єднуємо бд і сервер
  };

  // removeDB = () => { // not need maybe
  //   console.log("In removeDB");
  //   const removeRequest = window.indexedDB.deleteDatabase(name);
  //   removeRequest.onerror = () => {
  //     console.log("dataBase don't remove");
  //   };
  //   removeRequest.onsuccess = () => {
  //     console.log("database succcess removed");
  //   };
  // };
}

export default new Api();
