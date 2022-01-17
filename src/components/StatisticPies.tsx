import React, { useEffect, useState } from "react";

import { useGlobalContext } from "../store/GlobalContext";
import { removeSimilar } from "../store/config/removeSimilar";

import { RecordType, TagType } from "Constants/types";
import PiePlotCustom from "./PiePlotCustom";
import styled from "styled-components";

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
  const { tagCollection } = useGlobalContext();

  useEffect(() => {
    (async () => {
      const fetchedTags = await tagCollection.getAll();
      setTagsData(fetchedTags);
    })();
  }, []);

  useEffect(() => {
    setIncomeData(
      removeSimilar(
        recordsData.filter((record) => record.typeRecord === "Income")
      ).map((el: RecordType) => {
        return {
          type: el.idsTagsRecord.map(
            (idTag: number) =>
              tagsData.find((tag: TagType) => tag.id === idTag).nameTag
          ),
          value: el.amountMoney,
        };
      })
    );
    setExpensesData(
      removeSimilar(
        recordsData.filter((record) => record.typeRecord === "Expenses")
      ).map((el: RecordType) => {
        return {
          type: el.idsTagsRecord.map(
            (idTag: number) =>
              tagsData.find((tag: TagType) => tag.id === idTag).nameTag
          ),
          value: el.amountMoney,
        };
      })
    );
  }, [tagsData, recordsData]);

  return (
    <div>
      <Sspan>Income</Sspan>
      <PiePlotCustom arrData={incomeData} />
      <Sspan>Expenses</Sspan>
      <PiePlotCustom arrData={expensesData} />
    </div>
  );
};

export default StatisticPies;
