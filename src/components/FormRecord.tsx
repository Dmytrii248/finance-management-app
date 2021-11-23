import React from "react";
import moment from "moment";
import { FormValues } from "Constants/types";
import Api from "../db/indexedDB";

import { Button, DatePicker, Input, Form, Radio, InputNumber } from "antd";

const dateFormat = "DD-MM-YYYY";

const FormRecord = () => {
  const [form] = Form.useForm<FormValues>();

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 6 },
  };

  const styleComp = {
    width: 200,
  };

  const onFinish = (fieldValues: FormValues) => {
    const values = {
      ...fieldValues,
      dateRecord: fieldValues.dateRecord.toDate(),
      amountMoney: Math.abs(+fieldValues.amountMoney),
      descriptionRecord: fieldValues.descriptionRecord || null,
    };
    Api.addObjToStore(values);
    console.log("fields", values);
    form.setFieldsValue({ amountMoney: null, descriptionRecord: null });
  };

  return (
    <>
      <Form<FormValues>
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
          descriptionExpenses: null,
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
