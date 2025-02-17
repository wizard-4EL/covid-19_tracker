import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem, Card, CardContent } from "@mui/material";
import InfoBox from "./Components/InfoBox"; 
import Map from "./Components/Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide"); 

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // e.g., United States, United Kingdom
            value: country.countryInfo.iso2, // e.g., USA, UK, FR
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("Selected Country: ", countryCode);
    setCountry(countryCode);
  };

  return (
    <div className="app">
     
     <div className="app-left">

     <div className="app-header">
        <h2>COVID-19 TRACKER</h2>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.value} value={country.value}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      
      <div className="app-stats">
         <InfoBox title="Coronavirus Cases" cases={123} total={2000} />
         <InfoBox title="Recovered" cases={1234} total={3000} />
         <InfoBox title="Deaths" cases={12345} total={4000} />
      </div>
       
      <Map />
     </div>

     <Card className="app-right">
       <CardContent>
          <h3>Live Cases by Country</h3>
          
          <h3>Worldwide new cases</h3>
       </CardContent>

     </Card>
     
    </div>
  );
}

export default App;
