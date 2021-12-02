import React from "react";

import { useGlobalContext } from "../store/GlobalContext";
import { TagType } from "Constants/types";

import { Button, Form, Input } from "antd";

const FormTag = () => {
  const [form] = Form.useForm<TagType>();
  const { tagCollection } = useGlobalContext();

  const onFinish = (fieldsValue: TagType) => {
    console.log("finish", fieldsValue);
    tagCollection.add(fieldsValue);
    form.setFieldsValue({ tagName: "" });
  };

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 6 },
  };

  return (
    <Form<TagType>
      {...layout}
      name="formTag"
      onFinish={onFinish}
      form={form}
      initialValues={{ tagName: "" }}
    >
      <Form.Item
        label="Tag name"
        name="tagName"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input placeholder="Tag Name" style={{ width: 200 }} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ textAlign: "center", width: 200 }}
        >
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormTag;
