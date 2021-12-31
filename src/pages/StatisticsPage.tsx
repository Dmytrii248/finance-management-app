import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../store/GlobalContext";

import { Pie } from "@antv/g2plot";

const StatisticsPage = () => {
  const { recordCollection } = useGlobalContext();

  const [store, setStore] = useState({
    income: null,
    expenses: null,
    total: null,
  });

  useEffect(() => {
    (async () => {
      const fetchData = await recordCollection.getAll();
      console.log(fetchData);
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

      const piePlot = new Pie("container", {
        appendPadding: 10,
        data: [
          { type: "Income", value: income },
          { type: "Expenses", value: expenses },
        ],
        angleField: "value",
        colorField: "type",
        radius: 0.75,
        label: {
          type: "spider",
          labelHeight: 28,
          content: "{name}\n{percentage}",
        },
        interactions: [
          { type: "element-selected" },
          { type: "element-active" },
        ],
      });

      piePlot.render();
    })();
  }, []);

  return (
    <>
      <div id="container"></div>
      <div style={{ color: "green" }}>Income: {store.income}</div>
      <div style={{ color: "red" }}>Expenses: {store.expenses}</div>
      <div style={{ color: "black" }}>Total: {store.total}</div>
    </>
  );
};

export default StatisticsPage;
