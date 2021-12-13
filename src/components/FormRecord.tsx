import React, { useEffect, useState } from "react";
import moment from "moment";

import { FormRecordValues, TagType } from "Constants/types";
import { startValueIdInOption } from "Constants/anotherConstant";
import { useGlobalContext } from "../store/GlobalContext";

import {
  Button,
  DatePicker,
  Input,
  Form,
  Radio,
  InputNumber,
  Select,
  RadioChangeEvent,
} from "antd";

const dateFormat = "DD-MM-YYYY";

const FormRecord = () => {
  const [form] = Form.useForm<FormRecordValues>();
  const [type, setType] = useState<string>("Income");
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

  const onFinish = async (fieldValues: FormRecordValues) => {
    const newArrTagsId = await Promise.all(
      fieldValues.idsTagsRecord.map(async (tagsId) => {
        if (!tagsId.toString().startsWith(startValueIdInOption)) {
          const createdTag = await tagCollection.add({
            typeTag: fieldValues.typeRecord,
            nameTag: tagsId.toString(),
          });
          return createdTag.id;
        } else return +tagsId.toString().slice(3);
      })
    );

    const values = {
      ...fieldValues,
      dateRecord: fieldValues.dateRecord.toDate(),
      idsTagsRecord: newArrTagsId,
      amountMoney: Math.abs(+fieldValues.amountMoney),
      descriptionRecord: fieldValues.descriptionRecord || null,
    };

    recordCollection.add(values);

    form.setFieldsValue({
      amountMoney: null,
      descriptionRecord: null,
      idsTagsRecord: newArrTagsId.map((id) => `${startValueIdInOption}${id}`),
    });
  };

  const onChangeType = (e: RadioChangeEvent) => {
    setType(e.target.value);
    form.setFieldsValue({ idsTagsRecord: undefined });
  };

  useEffect(() => {
    (async () => {
      const tags = await tagCollection.getAll();
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
          <Radio.Group onChange={onChangeType}>
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
          name="idsTagsRecord"
          rules={[{ required: true, message: "Tag is required" }]}
        >
          <Select
            mode="tags"
            tokenSeparators={[","]}
            allowClear
            placeholder="Please select"
            style={styleComp}
          >
            {tagsRecord
              ?.filter((e) => e.typeTag === type)
              .map((e) => (
                <Option key={e.id} value={`${startValueIdInOption}${e.id}`}>
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
