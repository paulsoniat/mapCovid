import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MapChart from '../Map/MapChart';
import Country from '../Country/Country'
import USMapByCounty from '../Map/USMapByCounty';
import State from '../State/State';
import stateTableColumns from '../../utils/stateTableColumns';

const ProjectRouter = ({
  setTooltipContent,
}) => (
  <>
    <Switch>
      <Route
        path={`/country/:id`}
        render={() => <Country setTooltipContent={setTooltipContent} setrootPath={`/Country`} />}
      />
      <Route
        path={`/country/United%20States%20of%20America`}
        render={() => <USMapByCounty setTooltipContent={setTooltipContent} />}
      />
      <Route
        path={`/state/:name`}
        render={() => <State />}
      />
      <Route
        path={`/`}
        render={() => <MapChart setTooltipContent={setTooltipContent}/>}
      />
    </Switch>
  </>
);


export default ProjectRouter;