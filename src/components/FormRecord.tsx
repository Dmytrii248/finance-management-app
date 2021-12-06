import React, { useEffect, useState } from "react";
import moment from "moment";

import { FormRecordValues, TagType } from "Constants/types";
import { useGlobalContext } from "../store/GlobalContext";

import {
  Button,
  DatePicker,
  Input,
  Form,
  Radio,
  InputNumber,
  Select,
} from "antd";

const dateFormat = "DD-MM-YYYY";

const FormRecord = () => {
  const [form] = Form.useForm<FormRecordValues>();
  const [tagsRecord, setTagsRecord] = useState<TagType[]>(null);
  const { recordCollection, tagCollection } = useGlobalContext();
  const { Option } = Select;

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 6 },
  };

  const styleComp = {
    width: 200,
  };

  const onFinish = (fieldValues: FormRecordValues) => {
    const values = {
      ...fieldValues,
      dateRecord: fieldValues.dateRecord.toDate(),
      tagsRecord: fieldValues.tagsRecord.map((e) => +e),
      amountMoney: Math.abs(+fieldValues.amountMoney),
      descriptionRecord: fieldValues.descriptionRecord || null,
    };
    recordCollection.add(values);
    form.setFieldsValue({ amountMoney: null, descriptionRecord: null });
  };

  useEffect(() => {
    (async () => {
      const tags = await tagCollection.getAll();
      console.log("tags", tags);
      setTagsRecord(tags);
    })();
  }, []);

  return (
    <>
      <Form<FormRecordValues>
        {...layout}
        name="formRecord"
        onFinish={onFinish}
        form={form}
        onFinishFailed={(errorInfo: any) =>
          console.log("Form not send", errorInfo)
        }
        initialValues={{
          typeRecord: "Income",
          dateRecord: moment(),
          descriptionRecord: null,
        }}
      >
        <Form.Item
          label="Select type Record"
          name="typeRecord"
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
          label="Select date record"
          name="dateRecord"
          rules={[
            {
              type: "object" as const,
              required: true,
              message: "Date is required",
            },
          ]}
        >
          <DatePicker format={dateFormat} style={styleComp} />
        </Form.Item>

        <Form.Item
          label="Select tag"
          name="tagsRecord"
          rules={[{ required: true, message: "Tag is required" }]}
        >
          <Select
            mode="tags"
            tokenSeparators={[","]}
            allowClear
            placeholder="Please select"
            style={styleComp}
          >
            {tagsRecord?.map((e) => (
              <Option key={e.id} value={e.id.toString()}>
                {e.nameTag}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amountMoney"
          rules={[{ required: true, message: "Amount is required" }]}
        >
          <InputNumber placeholder="Amount" type="number" style={styleComp} />
        </Form.Item>

        <Form.Item label="Description" name="descriptionRecord">
          <Input placeholder="Description" style={styleComp} />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ ...styleComp, textAlign: "center" }}
          >
            Send
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormRecord;
