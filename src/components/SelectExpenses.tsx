import React, { ChangeEvent, FC } from "react";
import { Radio } from "antd";

interface Props {
  changeType: (value: string) => void;
  typeExpenses: string;
}
const SelectExpenses: FC<Props> = (props) => {
  const { typeExpenses, changeType } = props;

  const options = [
    { label: "Income", value: "income" },
    { label: "Expenses", value: "expenses" },
  ];

  const onChange = (value: string) => {
    changeType(value);
  };

  return (
    <Radio.Group
      options={options}
      onChange={(e) => onChange(e.target.value)}
      value={typeExpenses}
      optionType="button"
    />
  );
};

export default SelectExpenses;
