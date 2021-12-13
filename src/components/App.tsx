import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import InitialApp from "./InitialApp";
import Header from "./Header";
import HomePage from "Pages/HomePage";
import StatisticsPage from "Pages/StatisticsPage";
import Tags from "Pages/TagsPage";

import { homeLink, tagsLink, statisticsLink } from "Constants/links";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 960px;
  margin: 0 auto;
  height: 100vh;
`;

const Content = styled.div`
  background: #f2f2f2;
  padding: 15px;
  flex: 1 1 auto;
`;
const App = () => {
  return (
    <Router>
      <InitialApp>
        <Wrapper>
          <Header />
          <Content>
            <Switch>
              <Route path={homeLink} exact component={HomePage} />
              <Route path={statisticsLink} component={StatisticsPage} />
              <Route path={tagsLink} component={Tags} />
            </Switch>
          </Content>
        </Wrapper>
      </InitialApp>
    </Router>
  );
};

export default App;
