import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import InitialApp from "./InitialApp";
import Header from "./Header";
import HomePage from "Pages/HomePage";
import StatisticsPage from "Pages/StatisticsPage";
import SettingsPage from "Pages/SettingsPage";

import { homeLink, settingsLink, statisticsLink } from "Constants/links";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  height: 100vh;
  color: #000;
`;

const Content = styled.div`
  height: 100vh;
  background: #f2f2f2;
  padding: 15px;
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
              <Route path={settingsLink} component={SettingsPage} />
            </Switch>
          </Content>
        </Wrapper>
      </InitialApp>
    </Router>
  );
};

export default App;
