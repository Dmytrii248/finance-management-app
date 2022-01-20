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
  const [recordsData, setRecordsData] = useState<RecordType[]>(null);
  const [fetchDate, setFetchDate] = useState<Moment>(moment());
  const [initialValuesModal, setInitialValuesModal] =
    useState<RecordType>(null);
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
      render: (dateRecord: Date) => {
        return <>{dateRecord.toLocaleDateString("en-GB")}</>;
      },
    },
    {
      title: "Tags",
      dataIndex: "idsTagsRecord",
      key: "idsTagsRecord",
      render: (tagsId: number[]) => (
        <>
          {tagsId.map((tagId) => (
            <Tag key={tagId}>
              {tags.find((tag) => tag.id === tagId)?.nameTag.toUpperCase()}
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
      render: (e: RecordType) => (
        <Button
          type="primary"
          ghost
          icon={<EditOutlined />}
          onClick={() => showEditModal(e)}
        />
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

  const showEditModal = (e: RecordType) => {
    setInitialValuesModal(e);
    setIsShowModal(true);
  };

  const handleOkModal = (values: RecordType) => {
    if (moment(values.dateRecord).month() === fetchDate.month()) {
      if (initialValuesModal) {
        values.key = values.id;
        const tempArrRecords = recordsData.slice();
        const tempId = tempArrRecords.findIndex((e) => e.id === values.id);
        tempArrRecords[tempId] = values;
        setRecordsData(tempArrRecords);
      } else {
        setRecordsData([
          ...recordsData,
          {
            ...values,
            dateRecord: values.dateRecord,
            key: values.id,
          },
        ]);
        getTagsData();
      }
    } else {
      const tempArrRecords = recordsData.slice();
      const tempId = tempArrRecords.findIndex((e) => e.id === values.id);
      tempArrRecords.splice(tempId, 1);
      setRecordsData(tempArrRecords);
    }
    setIsShowModal(false);
  };

  const handleCanselModal = () => {
    initialValuesModal ? setInitialValuesModal(null) : null;
    setIsShowModal(false);
  };

  const removeNote = async (id: number) => {
    await recordCollection.reomveById(id);
    setRecordsData(recordsData.filter((e: RecordType) => e.id !== id));
  };

  const getTagsData = async () => {
    const tagsData = await tagCollection.getAll();
    setTags(tagsData);
  };

  useEffect(() => {
    getTagsData();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await recordCollection.getByDate(
        fetchDate.toDate(),
        nameIndexData,
        "month"
      );
      const newData = data.map((e) => ({
        ...e,
        dateRecord: e.dateRecord,
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
          onCansel={handleCanselModal}
          initialValue={initialValuesModal}
        />
      </div>
      <div>
        <MonthPagination changeDate={setFetchDate} todayDate={fetchDate} />
        <div style={{ overflowY: "hidden", backgroundColor: "white" }}>
          <Table
            columns={columns}
            dataSource={recordsData?.slice().reverse()}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};
export default HomePage;
