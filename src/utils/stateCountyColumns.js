import stateDateFormatter from './stateDateFormatter.js';

const stateCountyColumns = [{
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
  },
  {
    Header: 'Update Time',
    accessor: (d) => stateDateFormatter(d.last_update),
  }];
  
  export default stateCountyColumns;