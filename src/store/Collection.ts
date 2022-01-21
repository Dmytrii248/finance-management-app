import { ICollection, MyIDBVersionChangeEvent } from "Constants/interfaces";

export abstract class DBCollection<T> implements ICollection<T> {
  constructor(protected db: IDBDatabase, protected nameStore: string) {}

  add(item: T): Promise<T> {
    return new Promise(async (res, rej) => {
      const addTransaction = this.db.transaction(this.nameStore, "readwrite");

      addTransaction.onerror = (e) => {
        console.log("Transaction add is error");
        rej({ type: "Transaction Add", error: e });
      };
      addTransaction.oncomplete = () =>
        console.log("Transaction add is complete");

      const getStoreObj = addTransaction.objectStore(this.nameStore);
      const requestAddObj = getStoreObj.add(item);

      requestAddObj.onsuccess = (e: MyIDBVersionChangeEvent) =>
        res({ ...item, id: +e.target.result });

      requestAddObj.onerror = (e) =>
        rej({ type: "Request add have error", error: e });
    });
  }

  getAll(): Promise<T[]> {
    return new Promise(async (res, rej) => {
      const getTransaction = this.db.transaction(this.nameStore, "readonly");

      getTransaction.oncomplete = () =>
        console.log("Transaction get is complete");
      getTransaction.onerror = (e) => {
        console.log("Transaction get have error");
        rej({ type: "Transaction Get", error: e });
      };

      const objStore = getTransaction.objectStore(this.nameStore);
      const request = objStore.getAll();

      request.onerror = (e) => rej({ type: "Request get", error: e });
      request.onsuccess = (e) => {
        const result = (e.target as IDBRequest).result;
        res(result);
      };
    });
  }

  getOne(id: number): Promise<T> {
    return new Promise(async (res, rej) => {
      const getOneTransaction = this.db.transaction(this.nameStore, "readonly");

      getOneTransaction.oncomplete = () =>
        console.log("Transaction getOne is complete");
      getOneTransaction.onerror = (e) => {
        console.log("Transaction getOne have error");
        rej({ type: "Transaction Get One", error: e });
      };

      const objStore = getOneTransaction.objectStore(this.nameStore);
      const request = objStore.get(id);

      request.onerror = (e) => rej({ type: "Request getOne", error: e });
      request.onsuccess = (e) => {
        const result = (e.target as IDBRequest).result;
        res(result);
      };
    });
  }

  put(id: number, element: T): Promise<T> {
    return new Promise(async (res, rej) => {
      const putTransaction = this.db.transaction(this.nameStore, "readwrite");

      putTransaction.oncomplete = () =>
        console.log("Transaction put is complete");
      putTransaction.onerror = (e) => {
        console.log("Transaction put have error");
        rej({ type: "Transaction Put", error: e });
      };
      const objStore = putTransaction.objectStore(this.nameStore);
      const objStoreRequest = objStore.get(id);

      objStoreRequest.onerror = () =>
        console.log("Error in object store request");

      objStoreRequest.onsuccess = () => {
        const updataData = objStore.put(element);

        updataData.onerror = () => console.log("Update data is unseccsess");

        updataData.onsuccess = () => {
          console.log("Updata data is succsess");
          res(element);
        };
      };
    });
  }

  removeById(id: number): Promise<T> {
    return new Promise(async (res, rej) => {
      const removeTransaction = (await this.db).transaction(
        this.nameStore,
        "readwrite"
      );

      removeTransaction.onerror = (e) => {
        console.log("Transaction remove is error");
        rej({ type: "Transaction Remove", error: e });
      };
      removeTransaction.oncomplete = () =>
        console.log("Transaction is completed");

      const getStoreObj = removeTransaction.objectStore(this.nameStore);
      const requestRemoveObj = getStoreObj.delete(id);

      requestRemoveObj.onerror = (e) => {
        rej({ type: "Request Remove", error: e });
      };
      requestRemoveObj.onsuccess = (e) => {
        console.log("request remove is completed", e);
        res(undefined);
      };
    });
  }
}
