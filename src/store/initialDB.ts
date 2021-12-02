import {
  nameDB,
  nameObjStoreData,
  nameIndexData,
  nameObjStoreTags,
} from "Constants/names";

import { MyIDBVersionChangeEvent } from "Constants/interfaces";

export const initialDB = (): Promise<IDBDatabase> => {
  return new Promise(async (res, rej) => {
    console.log("db started");
    const openRequest = window.indexedDB.open(nameDB, 1);

    openRequest.onupgradeneeded = (e: MyIDBVersionChangeEvent) => {
      if (e.oldVersion < 1) {
        console.log("not found db, need initialize it");

        const objStoreRecords = e.target.result.createObjectStore(
          nameObjStoreData,
          {
            autoIncrement: true,
            keyPath: "id",
          }
        );
        objStoreRecords.createIndex(nameIndexData, nameIndexData, {
          unique: false,
        });

        e.target.result.createObjectStore(nameObjStoreTags, {
          autoIncrement: true,
          keyPath: "id",
        });
      } else {
        switch (e.newVersion) {
          case 2:
            console.log("update version to 2");
        }
      }
    };

    openRequest.onerror = (e) => rej(e);
    openRequest.onsuccess = (e: MyIDBVersionChangeEvent) => {
      console.log("initialized");
      const DB = e.target.result;
      res(DB);

      DB.onversionchange = () => {
        DB.close();
        alert("База даних застаріла, оновіть сторінку.");
      };
    };
  });
};
