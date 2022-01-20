import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../store/GlobalContext";
import { removeSimilar } from "../store/config/removeSimilar";
import { transformObjectsForPie } from "../store/config/transformObjectsForPie";
import { transformObjAndCompareSimilar } from "../store/config/transformObjAndCompareSimilar";
import { RecordType } from "Constants/types";

import PiesForReccords from "./PiesForReccords";

import styled from "styled-components";
import { Button } from "antd";

const Sspan = styled.span`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: center;
`;

type propsType = {
  recordsData: RecordType[];
};

const StatisticPies: React.FC<propsType> = (props) => {
  const { recordsData } = props;

  const [incomeData, setIncomeData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [tagsData, setTagsData] = useState(null);
  const [switchModePies, setSwitchModePies] = useState<
    "ByCombineTags" | "BySingleTags"
  >("ByCombineTags");
  const { tagCollection } = useGlobalContext();

  const changeModePies = () => {
    if (switchModePies === "ByCombineTags") setSwitchModePies("BySingleTags");
    else setSwitchModePies("ByCombineTags");
  };

  useEffect(() => {
    (async () => {
      const fetchedTags = await tagCollection.getAll();
      setTagsData(fetchedTags);
    })();
  }, []);

  useEffect(() => {
    if (switchModePies === "ByCombineTags") {
      setIncomeData(
        transformObjectsForPie(
          removeSimilar(
            recordsData.filter((record) => record.typeRecord === "Income")
          ),
          tagsData
        )
      );
      setExpensesData(
        transformObjectsForPie(
          removeSimilar(
            recordsData.filter((record) => record.typeRecord === "Expenses")
          ),
          tagsData
        )
      );
    } else {
      setIncomeData(
        transformObjectsForPie(
          transformObjAndCompareSimilar(
            recordsData.filter((record) => record.typeRecord === "Income")
          ),
          tagsData
        )
      );
      setExpensesData(
        transformObjectsForPie(
          transformObjAndCompareSimilar(
            recordsData.filter((record) => record.typeRecord === "Expenses")
          ),
          tagsData
        )
      );
    }
  }, [tagsData, recordsData, switchModePies]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          margin: "1em 2em 0 0",
        }}
      >
        <Button onClick={changeModePies}>Change Mode Pies</Button>
      </div>
      <Sspan>Income</Sspan>
      <PiesForReccords arrData={incomeData} />
      <Sspan>Expenses</Sspan>
      <PiesForReccords arrData={expensesData} />
    </div>
  );
};

export default StatisticPies;
