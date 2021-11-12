import React from "react";
import moment, { Moment } from "moment";

import { Button, DatePicker, Input, Form, Radio, InputNumber } from "antd";

type FormValues = {
  typeExpenses: string;
  dateExpenses: Moment;
  amountMoney: number;
  descriptionExpenses: string | null;
};

const dateFormat = "DD-MM-YYYY";

const FormExpenses = () => {
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
      dateExpenses: fieldValues.dateExpenses.format(dateFormat),
    };
    console.log(values);
    form.setFieldsValue({ amountMoney: null, descriptionExpenses: null });
  };

  return (
    <>
      <Form<FormValues>
        {...layout}
        name="formExpenses"
        onFinish={onFinish}
        form={form}
        onFinishFailed={(errorInfo: any) =>
          console.log("Form not send", errorInfo)
        }
        initialValues={{
          typeExpenses: "income",
          dateExpenses: moment(),
          descriptionExpenses: null,
        }}
      >
        <Form.Item
          label="Select type Expenses"
          name="typeExpenses"
          rules={[{ required: true, message: "Type Expenses is required" }]}
        >
          <Radio.Group>
            <Radio.Button
              value="income"
              style={{ width: 100, textAlign: "center" }}
            >
              Income
            </Radio.Button>
            <Radio.Button
              value="expenses"
              style={{ width: 100, textAlign: "center" }}
            >
              Expenses
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Select date expenses"
          name="dateExpenses"
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

        <Form.Item label="Description" name="descriptionExpenses">
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

export default FormExpenses;
