const stateTableColumns = [{
  Header: 'state',
  accessor: 'state',
},
{
  Header: 'pos',
  accessor: 'positive',
}, {
  Header: 'neg',
  accessor: 'negative',
},
{
  Header: 'recov',
  accessor: 'recovered',
},
{
  Header: 'onVentCur',
  accessor: 'onVentilatorCurrently',
},
{
  Header: 'Deceased',
  accessor: 'death',
},
{
  Header: 'FGM-A',
  accessor: 'sssstatus',
},
{
  Header: '3PM-A',
  accessor: 'stttttatus',
},
{
  Header: 'FTM-A',
  accessor: 'satus',
},
{
  Header: 'Off',
  accessor: 'reboundsOffensive',
},
{
  Header: 'Def',
  accessor: 'reboundsDefensive',
},
{
  Header: 'Reb',
  accessor: 'rebounds',
},
{
  Header: 'Ast',
  accessor: 'assists',
},
{
  Header: 'PF',
  accessor: 'fouls',
},
{
  Header: 'Stl',
  accessor: 'steals',
},
{
  Header: 'TO',
  accessor: 'turnovers',
},
{
  Header: 'Blk',
  accessor: 'blocks',
},
{
  Header: 'Pts',
  accessor: 'points',
}];

export default stateTableColumns;
