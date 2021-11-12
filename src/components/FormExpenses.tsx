import React from "react";
import moment from "moment";

import { Button, DatePicker, Input, Form, Radio, InputNumber } from "antd";

const dateFormat = "DD-MM-YYYY";

const FormExpenses = () => {
  const [form] = Form.useForm();

  const onFinish = (fieldValues: any) => {
    const values = {
      ...fieldValues,
      dateExpenses: fieldValues["dateExpenses"].format(dateFormat),
    };
    console.log(values);
    form.setFieldsValue({ amountMoney: null, descriptionExpenses: null });
  };

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 6 },
  };

  const styleComp = {
    width: 200,
  };

  return (
    <>
      <Form
        {...layout}
        name="formExpenses"
        onFinish={onFinish}
        form={form}
        onFinishFailed={(errorInfo: any) =>
          console.log("Form not send", errorInfo)
        }
      >
        <Form.Item
          label="Select type Expenses"
          name="typeExpenses"
          rules={[{ required: true, message: "Type Expenses is required" }]}
          initialValue={"income"}
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
          initialValue={moment()}
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

        <Form.Item
          label="Description"
          name="descriptionExpenses"
          initialValue={null}
        >
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
