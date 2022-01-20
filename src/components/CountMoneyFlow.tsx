import React, { useEffect, useState } from "react";

import PiesForReccords from "./PiesForReccords";

import { ElementDataMoneyShowType } from "Constants/types";

import styled from "styled-components";
import { Button } from "antd";

type propsType = {
  data: ElementDataMoneyShowType[];
};

const WrapperStatistic = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  margin: 10px 0;
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

const CountMoneyFlow: React.FC<propsType> = (props) => {
  const { data } = props;

  const [isShowDiagram, setIsShowDiagram] = useState<boolean>(false);

  const [store, setStore] = useState({
    income: null,
    expenses: null,
    total: null,
  });

  const toggleDiagram = () => {
    setIsShowDiagram(!isShowDiagram);
  };

  useEffect(() => {
    let income = 0,
      expenses = 0,
      total = 0;
    data.forEach((e) => {
      if (e.type === "Income") income += e.value;
      else expenses += e.value;
    });
    total = income - expenses;
    setStore({
      income: income,
      expenses: expenses,
      total: total,
    });
  }, [data]);

  return (
    <>
      {isShowDiagram && (
        <PiesForReccords
          arrData={[
            { type: "Income", value: store.income },
            { type: "Expenses", value: store.expenses },
          ]}
        />
      )}
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
      {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
      <Button
        style={{ display: "block", margin: "20px auto" }}
        onClick={toggleDiagram}
      >
        {isShowDiagram ? "Hide Diagram" : "Show Diagram"}
      </Button>
      {/* </div> */}
    </>
  );
};

export default CountMoneyFlow;
