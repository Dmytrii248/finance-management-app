import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../store/GlobalContext";

import { Pie } from "@antv/g2plot";
import styled from "styled-components";

const WrapperStatistic = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
`;

const InfoColumn = styled.div`
  margin-right: 5px;
`;

const ValueColumb = styled.div`
  margin-left: 10px;
`;

const green = { color: "green" };
const red = { color: "red" };
const black = { color: "black" };

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
      <WrapperStatistic>
        <InfoColumn>
          <div style={green}>Income:</div>
          <div style={red}>Expenses:</div>
          <div style={black}>Total:</div>
        </InfoColumn>
        <ValueColumb>
          <div style={green}>{store.income}</div>
          <div style={red}>{store.expenses}</div>
          <div style={black}>{store.total}</div>
        </ValueColumb>
      </WrapperStatistic>
    </>
  );
};

export default StatisticsPage;
