import React, { useEffect, useState } from "react";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, Legend } from 'recharts';
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page b', uv: 300, pv: 2400, amt: 2400},{name: 'Page c', uv: 200, pv: 2400, amt: 2400},{name: 'Page d', uv: 140, pv: 2400, amt: 2400} ];

const Country = () => {

  const [countryData, setcountryData] = useState(null);
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
          setTimeout(() => {
            setcountryData(geoUrl);
          }, 1000)
        })
      })
    }
  }, [countryData]);

if (countryData) {
  return (
    <>
      <div className="country">
        <div> Contentttttt</div>
      </div>
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
