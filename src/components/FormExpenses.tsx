import React, { ChangeEvent, useState } from "react";
import moment, { Moment } from "moment";

import { Button, DatePicker, Input } from "antd";

import SelectExpenses from "./SelectExpenses";

const dateFormat = "DD-MM-YYYY";

const FormExpenses = () => {
  const [typeExpenses, setTypeExpenses] = useState("income");
  const [dateExpenses, setDateExpenses] = useState(moment().format(dateFormat));
  const [amountMoney, setAmountMoney] = useState<null | number>(null);

  const onChangeDatePicker = (date: Moment, dateString: string) => {
    setDateExpenses(dateString);
  };

  const onChangeInputMoney = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAmountMoney(+value);
  };

  const onSubmit = () => {
    console.log(typeExpenses);
    console.log(dateExpenses);
    console.log(amountMoney);
    setDateExpenses(moment().format(dateFormat));
    setAmountMoney(null);
  };

  return (
    <form>
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
      <Button type="primary" onClick={onSubmit}>
        Send
      </Button>
    </form>
  );
};

export default FormExpenses;
