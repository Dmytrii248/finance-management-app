import React, { ChangeEvent, FormEvent, useState } from "react";
import moment, { Moment } from "moment";

import { Button, DatePicker, Input } from "antd";

import SelectExpenses from "./SelectExpenses";

const dateFormat = "DD-MM-YYYY";

const FormExpenses = () => {
  const [typeExpenses, setTypeExpenses] = useState("income");
  const [dateExpenses, setDateExpenses] = useState(moment().format(dateFormat));
  const [amountMoney, setAmountMoney] = useState<null | number>(null);
  const [descriptionExpenses, setDescriptionExpenses] = useState<null | string>(
    null
  );

  const onChangeDatePicker = (date: Moment, dateString: string) => {
    setDateExpenses(dateString);
  };

  const onChangeInputMoney = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmountMoney(+value);
  };

  const onChangeInputDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDescriptionExpenses(value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(typeExpenses);
    console.log(dateExpenses);
    console.log(amountMoney);
    setDateExpenses(moment().format(dateFormat));
    setAmountMoney(null);
    if (descriptionExpenses) {
      console.log(descriptionExpenses);
      setDescriptionExpenses(null);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <SelectExpenses
        typeExpenses={typeExpenses}
        changeType={setTypeExpenses}
      />
      <DatePicker
        defaultValue={moment(dateExpenses, dateFormat)}
        value={moment(dateExpenses, dateFormat)}
        format={dateFormat}
        onChange={onChangeDatePicker}
      />
      <Input
        type="number"
        value={amountMoney}
        onChange={onChangeInputMoney}
        maxLength={25}
        placeholder="Enter amount"
        required
      />
      <Input
        type="text"
        placeholder="Description"
        value={descriptionExpenses}
        onChange={onChangeInputDescription}
      />
      <Button type="primary" htmlType="submit">
        Send
      </Button>
    </form>
  );
};

export default FormExpenses;
