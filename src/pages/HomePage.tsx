import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";

import FormRecordModal from "Components/FormRecordModal";
import MonthPagination from "Components/MonthPagination";

import { useGlobalContext } from "../store/GlobalContext";
import { RecordType, TagType } from "Constants/types";
import { nameIndexData } from "Constants/names";

import { Button, Table, Tag } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [tags, setTags] = useState<TagType[]>(null);
  const [recordsData, setRecordsData] = useState(null);
  const [fetchDate, setFetchDate] = useState<Moment>(moment());
  const { recordCollection, tagCollection } = useGlobalContext();

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
      title: "Tags",
      dataIndex: "idsTagsRecord",
      key: "idsTagsRecord",
      render: (tagsId: number[]) => (
        <>
          {tagsId.map((tagId) => (
            <Tag key={tagId}>
              {tags.find((tag) => tag.id === tagId).nameTag.toUpperCase()}
            </Tag>
          ))}
        </>
      ),
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
      render: (e: RecordType) => (
        <Button
          danger
          icon={<CloseOutlined />}
          onClick={() => removeNote(e.id)}
        />
      ),
    },
  ];

  const showModal = () => {
    setIsShowModal(true);
  };

  const handleOkModal = (values: RecordType) => {
    if (moment(values.dateRecord).month() === moment().month()) {
      console.log(values.dateRecord, "set to arr");
      setRecordsData([
        ...recordsData,
        {
          ...values,
          dateRecord: values.dateRecord.toLocaleDateString("en-GB"),
          key: values.id,
        },
      ]);
    }
    setIsShowModal(false);
  };

  const removeNote = async (id: number) => {
    await recordCollection.reomveById(id);
    setRecordsData(recordsData.filter((e: RecordType) => e.id !== id));
  };

  useEffect(() => {
    (async () => {
      const tags = await tagCollection.getAll();
      setTags(tags);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await recordCollection.getByDate(
        fetchDate.toDate(),
        nameIndexData
      );
      const newData = data.map((e) => ({
        ...e,
        dateRecord: e.dateRecord.toLocaleDateString("en-GB"),
        key: e.id,
      }));
      setRecordsData(newData);
    })();
  }, [fetchDate, recordCollection]);

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={showModal}
          style={{ display: "block", width: 200, margin: "0 auto 20px auto" }}
        >
          Create Record
        </Button>

        <FormRecordModal
          visible={isShowModal}
          onCreate={handleOkModal}
          onCansel={() => setIsShowModal(false)}
        />
      </div>
      <div>
        <MonthPagination changeDate={setFetchDate} todayDate={fetchDate} />
        <Table
          columns={columns}
          dataSource={recordsData?.reverse()}
          pagination={false}
        />
      </div>
    </>
  );
};
export default HomePage;
