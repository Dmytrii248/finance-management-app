import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";

import MonthPagination from "Components/MonthPagination";

import { useGlobalContext } from "../store/GlobalContext";
import { nameIndexData } from "Constants/names";
import { RecordType } from "Constants/types";

import { Table, Button } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const StatisticsPage = () => {
  const columns = [
    {
      title: "Type",
      dataIndex: "typeRecord",
      key: "typeRecord",
      render: (type: string) => {
        const color = type === "Income" ? "green" : "red";
        return <span style={{ color: color }}>{type}</span>;
      },
    },
    {
      title: "Amount",
      dataIndex: "amountMoney",
      key: "amountMoney",
    },
    {
      title: "Date",
      dataIndex: "dateRecord",
      key: "dateRecord",
    },
    {
      title: "Description",
      dataIndex: "descriptionRecord",
      key: "descriptionRecord",
    },
    {
      title: "Edit",
      dataIndex: "",
      key: "x",
      align: "center" as const,
      render: () => (
        <Button type="primary" ghost icon={<EditOutlined />} disabled />
      ),
    },
    {
      title: "Remove",
      dataIndex: "",
      key: "x",
      align: "center" as const,
      render: (e: RecordType) => {
        return (
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => rmeoveNote(e.id)}
          />
        );
      },
    },
  ];

  const [recordsData, setRecordsData] = useState(null);
  const [fetchDate, setFetchDate] = useState<Moment>(moment());
  const { recordCollection } = useGlobalContext();

  const rmeoveNote = async (id: number) => {
    const removeRequest = await recordCollection.reomveById(id);
    setRecordsData(recordsData.filter((e: RecordType) => e.id !== id));
    console.log("Remove request is successful", removeRequest);
  };

  useEffect(() => {
    (async () => {
      const data = await recordCollection.getbyDate(
        fetchDate.toDate(),
        nameIndexData
      );
      const newData = data.map((e) => ({
        ...e,
        dateRecord: e.dateRecord.toLocaleDateString("en-GB"),
        descriptionRecord: e.descriptionRecord || "Description...",
        key: e.id,
      }));
      setRecordsData(newData);
    })();
  }, [fetchDate, recordCollection]);

  return (
    <>
      <MonthPagination changeDate={setFetchDate} todayDate={fetchDate} />
      <Table
        columns={columns}
        dataSource={recordsData?.reverse()}
        pagination={false}
      />
    </>
  );
};

export default StatisticsPage;
