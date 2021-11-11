import React, { useState } from "react";
import moment, { Moment } from "moment";

import { Button, DatePicker } from "antd";

import SelectExpenses from "./SelectExpenses";

const dateFormat = "DD-MM-YYYY";

const FormExpenses = () => {
  const [typeExpenses, setTypeExpenses] = useState("income");
  const [dateExpenses, setDateExpenses] = useState(moment().format(dateFormat));

  const onChange = (date: Moment, dateString: string) => {
    setDateExpenses(dateString);
  };

  const onSubmit = () => {
    console.log(typeExpenses);
    console.log(dateExpenses);
    setDateExpenses(moment().format(dateFormat));
  };

  return (
    <div>
      <SelectExpenses
        typeExpenses={typeExpenses}
        changeType={setTypeExpenses}
      />
      <DatePicker
        defaultValue={moment(dateExpenses, dateFormat)}
        value={moment(dateExpenses, dateFormat)}
        format={dateFormat}
        onChange={onChange}
      />
      <Button type="primary" onClick={onSubmit}>
        Send
      </Button>
    </div>
  );
};

export default FormExpenses;
