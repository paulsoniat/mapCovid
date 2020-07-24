/* info:
code: "US"
ourid: 167
source: "https://thevirustracker.com/usa-coronavirus-information-us"
title: "USA"
__proto__: Object
total_active_cases: 0
total_cases: 3770012
total_danger_rank: 1
total_deaths: 142064
total_new_cases_today: 0
total_new_deaths_today: 0
total_recovered: 1741233
total_serious_cases: 1886715
total_unresolved: 0 */
const countryColumns = [{
    Header: 'County',
    accessor: 'county_name',
  },
  {
    Header: 'Confirmed',
    accessor: 'confirmed',
  }, {
    Header: 'New Cases',
    accessor: 'new',
  },
  {
    Header: 'New Deaths',
    accessor: 'new_death',
  },
  {
    Header: 'Fatality Rate',
    accessor: 'fatality_rate',
  }];
  
  export default countryColumns;