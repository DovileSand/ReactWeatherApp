import React from 'react';
import './App.css';

const API_KEY = "";

class App extends React.Component {
  state = {
    location: '',
    data: {},
  };

  fetchData = (evt) => {
    evt.preventDefault();
    console.log('fetch data for', this.state.location );

    if(!API_KEY) {
      console.log('Enter your API Key to fetch data')
      return;
    }

    let location = encodeURIComponent(this.state.location);
    let urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    let urlSuffix = '&APPID=' + API_KEY + '&units=metric';
    let url = urlPrefix + location + urlSuffix;

    fetch(url).then(r => r.json())
              .then(json => this.setState({
                data: json
              }))
              .catch(e => console.log("error"))
  };

  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };

  render() {
    let currentTemp = 'Specify a location';

    const { data, location } = this.state;

    if (data.list) {
      currentTemp = data.list[0].main.temp;
    }

    return (
      <div>
        <h1>Weather</h1>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
              placeholder={"City, Country"}
              type="text"
              value={location}
              onChange={this.changeLocation}
            />
          </label>
        </form>
        <p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
      </div>
    );
  };
};

export default App;
