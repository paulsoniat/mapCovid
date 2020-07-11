import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import MapChart from './MapChart';
import Country from './Country';

import history from './utils/history';

const ProjectRouter = ({
  setTooltipContent,
}) => (
  <>
    <Switch>
      <Route
        path={`/country/:id`}
        render={() => <Country rootPath={`/Country`} />}
      />
      <Route
        path={`/`}
        render={() => <MapChart setTooltipContent={setTooltipContent}/>}
      />
    </Switch>
  </>
);


export default ProjectRouter;