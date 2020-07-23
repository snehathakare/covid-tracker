import React, { useState, useEffect } from 'react';
import './App.css';
import Infobox from './Infobox';
import Map from './Map';
import LineGraph from './LineGraph';
import Table from './Table';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { sortData, prettyPrintStat } from './util';
import { FormControl, MenuItem, Select, Avatar, BottomNavigation, BottomNavigationAction, Link  } from '@material-ui/core';
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
   document.title = "COVID-19 TRACKER";
  }, []);

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
        setMapCountries(data);
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

     fetch(url)
    .then(response => response.json())
    .then (data => {
        setCountry(countryCode);

        //all data from a country based on code
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
    })
  };

  //console.log("info", countryInfo)

  return (
    <div>
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
              <Infobox isRed
                active={casesType === 'cases'}
                onClick = {(e) => setCasesType("cases")} 
                total={prettyPrintStat(countryInfo.cases)} 
                title="Confirmed"
                cases={prettyPrintStat(countryInfo.todayCases)} />
              <Infobox 
                active={casesType === 'recovered'}
                onClick = {(e) => setCasesType("recovered")} 
                total={prettyPrintStat(countryInfo.recovered)} 
                title="Recovered"
                cases={prettyPrintStat(countryInfo.todayRecovered)}/>
              <Infobox isRed
                active={casesType === 'deaths'}
                onClick = {(e) => setCasesType("deaths")}  
                total={prettyPrintStat(countryInfo.deaths)} 
                title="Deaths" 
                cases={prettyPrintStat(countryInfo.todayDeaths)}/>

            </div>
              
            <Map countries={mapCountries} casesType={casesType} center={mapCenter}
            zoom={mapZoom}/>
              
        </div>
        
        
        <Card className="app__right">
          <CardContent>
            <h2>Live cases by country</h2>
            <Table countries={tableData} />
            <h3 className="app__graphTitle">Worldwide new cases</h3>
            <LineGraph className="app__graph" casesType={casesType} />
          </CardContent>
        </Card>
          
      </div> 
      <div className="app_info">
            <BottomNavigation>
              <Link className="app__info__link" target="_blank" href="https://www.linkedin.com/in/sneha-thakare-46750a53/" >
                Created by Sneha
              </Link>
          </BottomNavigation>
          
      </div>       
       
    </div>


  );
}

export default App;
