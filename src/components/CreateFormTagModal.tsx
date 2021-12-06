import React from "react";

import { useGlobalContext } from "../store/GlobalContext";
import { TagType } from "Constants/types";

import { Form, Input, Radio, Modal } from "antd";

type propsType = {
  visible: boolean;
  onCreate: (values: TagType) => void;
  onCansel: () => void;
};

const CreateFormTagModal = (props: propsType) => {
  const { visible, onCreate, onCansel } = props;

  const [form] = Form.useForm<TagType>();
  const { tagCollection } = useGlobalContext();

  const handleOnOk = () => {
    (async () => {
      try {
        const fields = await form.validateFields();
        const newFields = await tagCollection.add(fields);
        console.log("fields after validate and add to bd", newFields);
        onCreate(newFields);

        form.setFieldsValue({ nameTag: "" });
      } catch (e) {
        console.log("Form tag not send", e);
      }
    })();
  };

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 6 },
  };

  return (
    <Modal visible={visible} onOk={handleOnOk} onCancel={onCansel}>
      <Form<TagType>
        {...layout}
        name="formTag"
        form={form}
        onFinishFailed={(errorInfo: any) =>
          console.log("Form not send", errorInfo)
        }
        initialValues={{ nameTag: "", typeTag: "Income" }}
      >
        <Form.Item
          label="Select type Record"
          name="typeTag"
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
      </Form>
    </Modal>
  );
};

export default CreateFormTagModal;
