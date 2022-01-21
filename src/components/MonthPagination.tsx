import React, { useMemo, useState } from "react";
import moment, { Moment } from "moment";

import {
  numberOfAvailableYearsToFuture,
  numberOfAvailableYearsToPast,
} from "Constants/anotherConstant";

import { Tooltip, Button } from "antd";
import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const WrapperPagination = styled.div`
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SButton = styled(Button)`
  margin: 5px;
`;

type typeProps = {
  todayDate: Moment;
  changeDate: (val: Moment) => void;
  switchMode?: boolean;
  setSelectedMode?: (val: "month" | "year") => void;
};

const selectYear = new Date().getFullYear() + numberOfAvailableYearsToFuture;
const selectPrevYear = new Date().getFullYear() - numberOfAvailableYearsToPast;

const MonthPagination: React.FC<typeProps> = (props) => {
  const {
    todayDate,
    changeDate: setTodayDate,
    switchMode = false,
    setSelectedMode,
  } = props;
  const [isSwapToYear, setIsSwapToYear] = useState<boolean>(
    switchMode === false ? null : false
  );

  const onClickCentreButton = () => {
    if (switchMode) {
      setIsSwapToYear(!isSwapToYear);
      setSelectedMode(!isSwapToYear ? "year" : "month");
    } else reset();
  };

  const reset = () => {
    setTodayDate(moment());
  };

  const prevYear = () => {
    setTodayDate(moment(todayDate).subtract(1, "y"));
  };

  const prevMonth = () => {
    setTodayDate(moment(todayDate.subtract(1, "M")));
  };
  const forwardMonth = () => {
    setTodayDate(moment(todayDate.add(1, "M")));
  };

  const forwardYear = () => {
    setTodayDate(moment(todayDate).add(1, "y"));
  };

  const objDisButtons = useMemo(() => {
    const data = moment(todayDate);
    return {
      prevYear: data.year() === selectPrevYear,
      prevMonth: data.month() === 0 && data.year() === selectPrevYear,
      forwardMonth: data.month() === 11 && data.year() === selectYear,
      forwardYear: data.year() === selectYear,
    };
  }, [todayDate]);

  return (
    <>
      <WrapperPagination>
        {(isSwapToYear === null || isSwapToYear) && (
          <SButton
            name="prevYear"
            onClick={prevYear}
            disabled={objDisButtons.prevYear}
          >
            <DoubleLeftOutlined />
            {moment(todayDate).subtract(1, "y").format("YYYY")}
          </SButton>
        )}
        {!isSwapToYear && (
          <SButton onClick={prevMonth} disabled={objDisButtons.prevMonth}>
            <LeftOutlined />
            {moment(todayDate).subtract(1, "M").format("MMM")}
          </SButton>
        )}
        <Tooltip
          placement="top"
          title={
            isSwapToYear === null
              ? null
              : isSwapToYear
              ? "Click to swap to Month"
              : "Click to swap to Year"
          }
        >
          <SButton onClick={onClickCentreButton} style={{ height: "auto" }}>
            {isSwapToYear === null
              ? todayDate.format("MMMM YYYY")
              : isSwapToYear
              ? todayDate.format("YYYY")
              : todayDate.format("MMMM")}
          </SButton>
        </Tooltip>
        {!isSwapToYear && (
          <SButton onClick={forwardMonth} disabled={objDisButtons.forwardMonth}>
            {moment(todayDate).add(1, "M").format("MMM")}
            <RightOutlined />
          </SButton>
        )}
        {(isSwapToYear === null || isSwapToYear) && (
          <SButton onClick={forwardYear} disabled={objDisButtons.forwardYear}>
            {moment(todayDate).add(1, "y").format("YYYY")}
            <DoubleRightOutlined />
          </SButton>
        )}
      </WrapperPagination>
      {switchMode && (
        <WrapperPagination style={{ padding: "0px" }}>
          <Button onClick={reset}>Back to Today</Button>
        </WrapperPagination>
      )}
    </>
  );
};

export default MonthPagination;
