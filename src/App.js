import React, { useState, useEffect } from 'react';
import './App.css';
import Infobox from './Infobox';
import Map from './Map';
import LineGraph from './LineGraph';
import Table from './Table';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { sortData } from './util';
import { FormControl, MenuItem, Select  } from '@material-ui/core';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);


  useEffect(() => {
    
     fetch("https://disease.sh/v3/covid-19/all")
     .then(response => response.json())
     .then(data => {
        setCountryInfo(data);
     })

  }, []); 


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=>{
        const countries = data.map((country) => ({
          name: country.country, //United States, United Kingdom
          value: country.countryInfo.iso2 //UK,USA,FR
          }));

        const sortedData = sortData(data) //sort data by cases
        setTableData(sortedData);
        setCountries(countries);
      })
    }
    getCountriesData();
  }, []);  

  
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    //pull info for a particular country
    const url = countryCode === 'worldwide' ? "https://disease.sh/v3/covid-19/all" :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then (data => {
        setCountry(countryCode);

        //all data from a country based on code
        setCountryInfo(data);
    })
  };

  //console.log("info", countryInfo)

  return (
    <div className="app">
      
      <div className="app__left">
          <div className="app__header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown"> 
              <Select variant="outlined" value={country} onChange={onCountryChange}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {
                  countries.map(country =>(
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>   

          <div className="app_stats">
            <Infobox title="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
            <Infobox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
            <Infobox title="Deaths"  total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>

          </div>
            
          <Map />
            
      </div>
      
      <div className="app__right">
        <Card>
          <CardContent>
            <h2>Live cases by country</h2>
            <h2>Worldwide new cases</h2>
            <Table countries={tableData} />
            //<LineGraph />
          </CardContent>
          {/* Graph */}
        </Card>
      </div>    
       
    </div>
  );
}

export default App;
