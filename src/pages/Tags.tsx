import React, { useEffect, useState } from "react";

import { Table, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import styled from "styled-components";
import { TagType } from "Constants/types";
import { useGlobalContext } from "../store/GlobalContext";

const STags = styled.div`
  color: black;
`;

const Tags = () => {
  const columns = [
    {
      title: "Tag",
      dataIndex: "nameTag",
      key: "nameTag",
    },
    {
      title: "Remove",
      dataIndex: "",
      key: "x",
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
  const { tagCollection } = useGlobalContext();

  const removeTag = async (id: number) => {
    const removeRequest = await tagCollection.reomveById(id);
    setTagsData(tagsData.filter((e: TagType) => e.id !== id));
    console.log("Remove request is successful", removeRequest);
  };

  useEffect(() => {
    (async () => {
      const data = await tagCollection.getAll();
      const newData = data.map((e) => ({ ...e, key: e.id }));
      console.log(newData);
      setTagsData(newData);
    })();
  }, []);

  return (
    <Table
      style={{ width: 428, margin: "auto" }}
      columns={columns}
      dataSource={tagsData}
      pagination={false}
    />
  );
};
export default Tags;
