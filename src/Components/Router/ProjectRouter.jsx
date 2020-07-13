import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MapChart from '../Map/MapChart';
import Country from '../Country/Country'

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