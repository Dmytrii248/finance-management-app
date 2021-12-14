import React, { useEffect, useState } from "react";

import CreateFormTagModal from "Components/CreateFormTagModal";

import { TagType } from "Constants/types";
import { useGlobalContext } from "../store/GlobalContext";

import { Table, Button } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const Tags = () => {
  const columns = [
    {
      title: "Tag",
      dataIndex: "nameTag",
      key: "nameTag",
    },
    {
      title: "Type",
      dataIndex: "typeTag",
      key: "typeTag",
      render: (type: string) => {
        const color = type === "Income" ? "green" : "red";
        return <span style={{ color: color }}>{type}</span>;
      },
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
      render: (e: TagType) => (
        <Button
          danger
          icon={<CloseOutlined />}
          onClick={() => removeTag(e.id)}
        />
      ),
    },
  ];

  const [tagsData, setTagsData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { tagCollection } = useGlobalContext();

  const removeTag = async (id: number) => {
    await tagCollection.reomveById(id);
    setTagsData(tagsData.filter((e: TagType) => e.id !== id));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOkModal = (tag: TagType) => {
    setTagsData([...tagsData, { ...tag, key: tag.id }]);
    setIsModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      const data = await tagCollection.getAll();
      const newData = data.map((e) => ({ ...e, key: e.id }));
      setTagsData(newData);
    })();
  }, []);

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ display: "block", width: 200, margin: "0 auto" }}
      >
        Create Tag
      </Button>

      <CreateFormTagModal
        visible={isModalVisible}
        onCreate={handleOkModal}
        onCansel={() => setIsModalVisible(false)}
      />
      <Table
        style={{ width: 428, margin: "20px auto" }}
        columns={columns}
        dataSource={tagsData}
        pagination={false}
      />
    </>
  );
};
export default Tags;
