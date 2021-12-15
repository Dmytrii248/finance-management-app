import React, { useEffect } from "react";

import { useGlobalContext } from "../store/GlobalContext";
import { TagType } from "Constants/types";

import { Form, Input, Radio, Modal } from "antd";

type propsType = {
  visible: boolean;
  onCreate: (values: TagType) => void;
  onCansel: () => void;
  initialValue: TagType;
};

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 16 },
};

const CreateFormTagModal = (props: propsType) => {
  const { visible, onCreate, onCansel, initialValue } = props;

  const [form] = Form.useForm<TagType>();
  const { tagCollection } = useGlobalContext();

  const handleOnOk = async () => {
    try {
      const fields = await form.validateFields();
      if (initialValue) {
        const oldTag = await tagCollection.put(initialValue.id, {
          ...fields,
          id: initialValue.id,
        });
        onCreate(oldTag);
      } else {
        const newTag = await tagCollection.add(fields);
        onCreate(newTag);
      }
      form.resetFields();
    } catch (e) {
      console.log("Form tag not send", e);
    }
  };

  const handleOnCansel = () => {
    form.resetFields();
    onCansel();
  };

  useEffect(() => {
    if (initialValue && form) {
      form.setFieldsValue({
        nameTag: initialValue.nameTag,
        typeTag: initialValue.typeTag,
      });
    }
  }, [initialValue]);

  return (
    <Modal
      visible={visible}
      onOk={handleOnOk}
      onCancel={handleOnCansel}
      width={448}
    >
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
