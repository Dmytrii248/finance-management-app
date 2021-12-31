import React, { useMemo } from "react";
import moment, { Moment } from "moment";

import { Button } from "antd";
import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const WrapperPagination = styled.div`
  display: flex;
  padding: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const SButton = styled(Button)`
  margin: 5px;
`;

type typeProps = {
  todayDate: Moment;
  changeDate: (val: Moment) => void;
};

const selectYear = 2023;
const selectPrevYear = 2015;

const MonthPagination = (porps: typeProps) => {
  const { todayDate, changeDate: setTodayDate } = porps;

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
    <WrapperPagination>
      <SButton
        name="prevYear"
        onClick={prevYear}
        disabled={objDisButtons.prevYear}
      >
        <DoubleLeftOutlined />
        {moment(todayDate).subtract(1, "y").format("YYYY")}
      </SButton>
      <SButton onClick={prevMonth} disabled={objDisButtons.prevMonth}>
        <LeftOutlined />
        {moment(todayDate).subtract(1, "M").format("MMM")}
      </SButton>
      <SButton onClick={reset}>{todayDate.format("MMMM YYYY")}</SButton>
      <SButton onClick={forwardMonth} disabled={objDisButtons.forwardMonth}>
        {moment(todayDate).add(1, "M").format("MMM")}
        <RightOutlined />
      </SButton>
      <SButton onClick={forwardYear} disabled={objDisButtons.forwardYear}>
        {moment(todayDate).add(1, "y").format("YYYY")}
        <DoubleRightOutlined />
      </SButton>
    </WrapperPagination>
  );
};

export default MonthPagination;
