import React, { useMemo } from "react";

import { ElementDataMoneyShowType } from "Constants/types";

import { Pie } from "@ant-design/plots";

type propsType = {
  arrData: ElementDataMoneyShowType[];
};

const PiesForReccords: React.FC<propsType> = ({ arrData }) => {
  const dataConfig = useMemo(() => {
    return arrData.length === 0
      ? [{ type: "", value: 0 }]
      : arrData.map((element: ElementDataMoneyShowType) => {
          if (typeof element.type === "string") {
            return element;
          } else {
            return {
              ...element,
              type: element.type.join(", "),
            };
          }
        });
  }, [arrData]);

  return (
    <Pie
      data={dataConfig}
      appendPadding={10}
      angleField="value"
      colorField="type"
      radius={0.75}
      label={{
        type: "outer",
        labelHeight: 30,
        content: "{name}\n{percentage}",
      }}
      interactions={[{ type: "element-selected" }, { type: "element-active" }]}
    />
  );
};

export default PiesForReccords;
