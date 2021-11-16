import { openDB, DBSchema } from "idb";
import { Moment } from "moment";

interface IExpenses {
  typeExpenses: string;
  dateExpenses: Date | Moment;
  amountMoney: number;
  descriptionExpenses: string | null;
}

const nameDB = "ExpensesDB";
const nameObjStore = "ExpensesList";

class Api {
  isSuccess: boolean;
  activeDB: IDBDatabase;

  constructor() {
    this.check();
  }

  check = () => {
    const openRequest = window.indexedDB.open(nameDB, 1);

    openRequest.onupgradeneeded = (e) => {
      if (e.oldVersion < 1) {
        console.log("not found db, need initialize it");
        (e.target as IDBOpenDBRequest).result.createObjectStore(nameObjStore, {
          autoIncrement: true,
        });
      } else {
        switch (e.newVersion) {
          case 2:
            console.log("update version to 2");
        }
      }
      // console.log("e", e);
      // console.log("e2", e.target);
      // console.log("e3", (e.target as IDBOpenDBRequest).result);
    };

    openRequest.onerror = (e: any) => {
      this.isSuccess = false;
      console.log("has error", e);
    };

    openRequest.onsuccess = (e) => {
      this.activeDB = (e.target as IDBOpenDBRequest).result;

      this.activeDB.onversionchange = () => {
        this.activeDB.close();
        alert("База даних застаріла, оновіть сторінку.");
      };
    };
  };

  // createOBJStore = (nameObjStore: string) => {
  //   this.activeDB.createObjectStore(nameObjStore, {
  //     autoIncrement: true,
  //   });
  // };

  // removeOBJStore = (nameOBJStore: string) => {
  //   this.activeDB.deleteObjectStore(nameOBJStore);
  // };

  addObjToStore = (dataExpenses: IExpenses) => {
    const transactionAdd = this.activeDB.transaction(nameObjStore, "readwrite");

    transactionAdd.oncomplete = () => console.log("transaction is complete");
    transactionAdd.onerror = () => console.log("transaction have error");

    const getStoreObj = transactionAdd.objectStore(nameObjStore);
    const requestAddObj = getStoreObj.add(dataExpenses);

    requestAddObj.onsuccess = () => console.log("Object added", requestAddObj);
    requestAddObj.onerror = () => console.log("Error", requestAddObj.error);
  };

  close = () => {
    this.activeDB.close(); // роз'єднуємо бд і сервер
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
