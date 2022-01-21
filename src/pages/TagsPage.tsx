import React, { useEffect, useState } from "react";

import FormTagModal from "Components/FormTagModal";

import { TagType } from "Constants/types";
import { useGlobalContext } from "../store/GlobalContext";

import { Table, Button } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const Tags = () => {
  const [tagsData, setTagsData] = useState<TagType[]>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialValuesModal, setInitialValuesModal] = useState<TagType>(null);
  const { tagCollection } = useGlobalContext();

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
      render: (e: TagType) => (
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
      render: (e: TagType) => (
        <Button
          danger
          icon={<CloseOutlined />}
          onClick={() => removeTag(e.id)}
        />
      ),
    },
  ];

  const removeTag = async (id: number) => {
    await tagCollection.removeById(id);
    setTagsData(tagsData.filter((e: TagType) => e.id !== id));
  };

  const showModal = () => {
    setInitialValuesModal(null);
    setIsModalVisible(true);
  };

  const showEditModal = (e: TagType) => {
    setInitialValuesModal(e);
    setIsModalVisible(true);
  };

  const handleOkModal = (tag: TagType) => {
    if (initialValuesModal) {
      const tempArrTags = tagsData.slice();
      const tmepIndexTag = tempArrTags.findIndex((e) => e.id === tag.id);
      tag.key = tag.id;
      tempArrTags[tmepIndexTag] = tag;
      setTagsData(tempArrTags);
    } else {
      setTagsData([...tagsData, { ...tag, key: tag.id }]);
    }
    setIsModalVisible(false);
  };

  const handleCanselModal = () => {
    initialValuesModal ? setInitialValuesModal(null) : null;
    setIsModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      const data = await tagCollection.getAll();
      const newData = data.map((e) => {
        e.key = e.id;
        return e;
      });
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

      <FormTagModal
        visible={isModalVisible}
        onCreate={handleOkModal}
        onCansel={handleCanselModal}
        initialValue={initialValuesModal}
      />
      <div
        style={{
          overflowY: "hidden",
          marginTop: "20px",
        }}
      >
        <Table
          style={{ width: 428, margin: "20px auto" }}
          columns={columns}
          dataSource={tagsData}
          pagination={false}
        />
      </div>
    </>
  );
};
export default Tags;
