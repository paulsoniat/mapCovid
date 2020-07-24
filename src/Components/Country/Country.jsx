import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import USMapByCounty from "../Map/USMapByCounty";
import { useParams } from 'react-router-dom';
import OtherCountry from './OtherCountry';

const Country = ( { setTooltipContent } ) => {

  const [countryData, setcountryData] = useState(null);
  const { name } = useParams();

  useEffect(()=>{
    if(!countryData) {
      let countries;
      let geoData;
      let geoUrlRes;
      let geoUrl;
      axios.get('https://api.covid19api.com/summary')
      .then((res, err) => {
        countries = res.data.Countries;
      })
      .then(() => {
        axios.get('https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json')
        .then((res, err) => {
          geoUrlRes = res.data;
          geoData = res.data.objects.ne_110m_admin_0_countries.geometries;
          geoData = geoData.map((geoCountry, geoIndex) => {
            countries.map((country, countryIndex) => {
              if (geoCountry.properties.NAME === country.Country) {
                geoCountry.properties.newCases = country.NewConfirmed;
                geoCountry.properties.countryCode = country.CountryCode;
                geoCountry.properties.slug = country.Slug;
                geoCountry.properties.newDeaths = country.NewDeaths
                geoCountry.properties.newRecovered = country.NewRecovered
                geoCountry.properties.totalConfirmed = country.TotalConfirmed
                geoCountry.properties.totalDeaths = country.TotalDeaths
                geoCountry.properties.totalRecovered = country.TotalRecovered
              }
              else {
              }
            })
          })
          const allGeoData = geoUrlRes
          geoUrl = allGeoData;
            setcountryData(geoUrl);
        })
      })
    }
  }, [countryData]);

if (countryData) {
  return (
    <>
        {
        (name === 'United States of America') 
          ? (
          <USMapByCounty setTooltipContent={setTooltipContent} />
          ) : 
          <OtherCountry />
        }
    </>
  );
}
else {
  return (
    <BacteriaLoader />
  )
}
};

export default Country;
