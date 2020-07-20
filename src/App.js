import React, { useState, useEffect } from 'react';
import './App.css';
import { FormControl, MenuItem, Select  } from '@material-ui/core';
import Infobox from './Infobox';
import Map from './Map';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(()=>{
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data)=>{
        const countries = data.map((country) => ({
          name: country.country, //United States, United Kingdom
          value: country.countryInfo.iso2 //UK,USA,FR
          }));
        setCountries(countries);
      })
    }
    getCountriesData();
  }, []);  

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__left">
          <div className="app_header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">

              <Select
                variant="outlined"
                value="abc"
                onChange={onCountryChange}>
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
            <Infobox title="Coronavirus cases" total={2000} />
            <Infobox title="Recovered" total={2000}/>
            <Infobox title="Deaths"  total={2000}/>

          </div>
            
           <Map />
            
      </div>
      
      <div className="app__right">
        <Card>
          <CardContent>
            <h2>Live cases by country</h2>
          </CardContent>
          {/* Graph */}
          {/* Tables */}
        </Card>
      </div>    
       
    </div>
  );
}

export default App;
