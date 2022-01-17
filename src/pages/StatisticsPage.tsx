import React, { useEffect, useMemo, useState } from "react";
import moment, { Moment } from "moment";

import MonthPagination from "Components/MonthPagination";
import CountMoneyFlow from "Components/CountMoneyFlow";
import StatisticPies from "Components/StatisticPies";

import { useGlobalContext } from "../store/GlobalContext";
import { nameIndexData } from "Constants/names";
import { RecordType } from "Constants/types";

const StatisticsPage = () => {
  const { recordCollection } = useGlobalContext();

  const [fetchDate, setFetchDate] = useState<Moment>(moment());
  const [selectedMode, setSelectedMode] = useState<"month" | "year">("month");
  const [recordData, setRecorddata] = useState<RecordType[]>([]);

  const dataMoneyFlow = useMemo(() => {
    return recordData.map((e) => {
      return { type: e.typeRecord, value: e.amountMoney };
    });
  }, [recordData]);

  useEffect(() => {
    (async () => {
      const fetchData = await recordCollection.getByDate(
        fetchDate.toDate(),
        nameIndexData,
        selectedMode
      );
      setRecorddata(fetchData);
    })();
  }, [fetchDate, selectedMode]);

  return (
    <>
      <MonthPagination
        changeDate={setFetchDate}
        todayDate={fetchDate}
        switchMode={true}
        setSelectedMode={setSelectedMode}
      />

      <StatisticPies recordsData={recordData} />

      <CountMoneyFlow data={dataMoneyFlow} />
    </>
  );
};

export default StatisticsPage;
