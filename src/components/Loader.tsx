import React from "react";

import styled from "styled-components";

const SLoader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 96px;
  bold: 800;
`;
const Loader = () => {
  return (
    <SLoader>
      <span>Loading...</span>
    </SLoader>
  );
};

export default Loader;
