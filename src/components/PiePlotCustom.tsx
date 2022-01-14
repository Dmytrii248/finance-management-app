import React, { useMemo } from "react";

import { ElementDataMoneyShowType } from "Constants/types";

import { Pie } from "@ant-design/plots";

type propsType = {
  arrData: ElementDataMoneyShowType[];
};

const PiePlotCustom: React.FC<propsType> = (props) => {
  const dataConfig = props.arrData;

  const pieDataConfig = useMemo(() => {
    return {
      appendPadding: 10,
      data: dataConfig,
      angleField: "value",
      colorField: "type",
      radius: 0.75,
      label: {
        type: "spider",
        labelHeight: 28,
        content: "{name}\n{percentage}",
      },
      interactions: [{ type: "element-selected" }, { type: "element-active" }],
    };
  }, [dataConfig]);

  return <Pie {...pieDataConfig} />;
};

export default PiePlotCustom;
