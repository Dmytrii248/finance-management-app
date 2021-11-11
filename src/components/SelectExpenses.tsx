import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  changeType: (value: string) => void;
  typeExpenses: string;
}

const SSelect = styled.div`
  background-color: grey;
`;

const SSelectIn = styled(SSelect)`
  background-color: ${(props) => (props.theme === "income" ? "green" : null)};
`;

const SSelectEx = styled(SSelect)`
  background-color: ${(props) => (props.theme === "expenses" ? "red" : null)};
`;

const SelectExpenses: FC<Props> = (props) => {
  const { changeType, typeExpenses } = props;
  return (
    <div>
      <SSelectIn theme={typeExpenses} onClick={() => changeType("income")}>
        Income
      </SSelectIn>
      <SSelectEx theme={typeExpenses} onClick={() => changeType("expenses")}>
        Expenses
      </SSelectEx>
    </div>
  );
};

export default SelectExpenses;
