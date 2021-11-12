import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Layout } from "antd";

import { settingsLink, homeLink, statisticsLink } from "Constants/links";

const { Header: AntdHeader } = Layout;

const SLink = styled(Link)`
  margin: 0 20px;
  color: white;
  bold: 700;
  font-size: 16px;
`;

const Header = () => {
  return (
    <AntdHeader>
      <SLink to={homeLink}>Home</SLink>
      <SLink to={statisticsLink}>Statistics</SLink>
      <SLink to={settingsLink}>Settings</SLink>
    </AntdHeader>
  );
};

export default Header;
