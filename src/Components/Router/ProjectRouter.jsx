import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MapChart from '../Map/MapChart';
import Country from '../Country/Country'
import USMapByCounty from '../Map/USMapByCounty';
import State from '../State/State';

const ProjectRouter = ({
  setTooltipContent,
}) => (
  <>
    <Switch>
      <Route
        path={`/country/:name`}
        render={() => <Country setTooltipContent={setTooltipContent} />}
      />
      <Route
        path={`/country/United%20States%20of%20America`}
        render={() => <USMapByCounty setTooltipContent={setTooltipContent} />}
      />
      <Route
        path={`/state/:name`}
        render={() => <State />}
      />
      <Route path='/paul-linkedin' component={() => { 
        window.location.href = 'https://www.linkedin.com/in/paul-soniat/'; 
        return null;
      }}/>
      <Route
        path={`/`}
        render={() => <MapChart setTooltipContent={setTooltipContent}/>}
      />
    </Switch>
  </>
);


export default ProjectRouter;