import React, { useState } from "react";

import { Button } from "antd";

import SelectExpenses from "./SelectExpenses";

const FormExpenses = () => {
  const [typeExpenses, setTypeExpenses] = useState("income");

  return (
    <div>
      <SelectExpenses
        typeExpenses={typeExpenses}
        changeType={setTypeExpenses}
      />
      <Button type="primary" onClick={() => console.log(typeExpenses)}>
        Send
      </Button>
    </div>
  );
};

export default FormExpenses;
