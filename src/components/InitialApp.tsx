import React, { ReactNode, useEffect, useState } from "react";

import { GlobalContext } from "../store/GlobalContext";
import { initialDB } from "../store/initialDB";
import { RecordCollection } from "../store/RecordCollection";
import { TagCollection } from "../store/TagCollectoin";
import { nameObjStoreData, nameObjStoreTags } from "Constants/names";

import Loader from "./Loader";
import { GlobalContextType } from "Constants/types";

type Props = {
  children: ReactNode;
};

const InitialApp = (props: Props) => {
  const { children } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState<GlobalContextType>({
    recordCollection: null,
    tagCollection: null,
  });

  useEffect(() => {
    (async () => {
      const db: IDBDatabase = await initialDB();
      setStore({
        recordCollection: new RecordCollection(db, nameObjStoreData),
        tagCollection: new TagCollection(db, nameObjStoreTags),
      });
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <GlobalContext.Provider value={{ ...store }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default InitialApp;
