import React from "react";

import { useGlobalContext } from "../store/GlobalContext";
import { TagType } from "Constants/types";

import { Button, Form, Input, Radio } from "antd";

const FormTag = () => {
  const [form] = Form.useForm<TagType>();
  const { tagCollection } = useGlobalContext();

  const onFinish = (fieldsValue: TagType) => {
    console.log("finish", fieldsValue);
    tagCollection.add(fieldsValue);
    form.setFieldsValue({ nameTag: "" });
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
      initialValues={{ nameTag: "", typetag: "Income" }}
    >
      <Form.Item
        label="Select type Record"
        name="typetag"
        rules={[{ required: true, message: "Type Rocord is required" }]}
      >
        <Radio.Group>
          <Radio.Button
            value="Income"
            style={{ width: 100, textAlign: "center" }}
          >
            Income
          </Radio.Button>
          <Radio.Button
            value="Expenses"
            style={{ width: 100, textAlign: "center" }}
          >
            Expenses
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Create Tag"
        name="nameTag"
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
