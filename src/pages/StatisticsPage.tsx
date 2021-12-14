import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../store/GlobalContext";
import { RecordType } from "Constants/types";

const StatisticsPage = () => {
  const { recordCollection } = useGlobalContext();

  const [data, setData] = useState<RecordType[]>(null);
  const [store, setStore] = useState({
    income: null,
    expenses: null,
    total: null,
  });

  useEffect(() => {
    (async () => {
      const fetchData = await recordCollection.getAll();
      setData(fetchData);
      let income = 0,
        expenses = 0,
        total = 0;
      fetchData.forEach((e) => {
        if (e.typeRecord === "Income") income += e.amountMoney;
        else expenses += e.amountMoney;
      });
      total = income - expenses;
      setStore({
        income: income,
        expenses: expenses,
        total: total,
      });
    })();
  }, []);

  return (
    <>
      <div>Income:{store.income}</div>
      <div>Expenses:{store.expenses}</div>
      <div>Total:{store.total}</div>
    </>
  );
};

export default StatisticsPage;
