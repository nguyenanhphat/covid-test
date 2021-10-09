import { useEffect, useState } from 'react';
import { ListCovid } from './components';
import './App.css';
const API_SUMMARY = 'https://api.covid19api.com/summary';

function App() {
  const [listCovidData, setListCovidData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _toggleLoading();
    fetch(API_SUMMARY)
      .then(res => res.json())
      .then(data => {
        const contries = data.Countries;
        if (contries && contries.length) {
          contries.sort((firstEl, secondEl) => {
            return (
              secondEl.TotalConfirmed - firstEl.TotalConfirmed ||
              secondEl.TotalDeaths - firstEl.TotalDeaths ||
              secondEl.TotalRecovered - firstEl.TotalRecovered
            );
          });
        }
        setListCovidData(contries);
        _toggleLoading();
      });
  }, []);

  const _toggleLoading = () => {
    setLoading(prev => !prev);
  }

  return (
    <div className="root">
      <h2 className='header'>COVID INFORMATION</h2>
      <ListCovid 
        toggleLoading={_toggleLoading} 
        loading={loading} 
        data={listCovidData} 
      />
    </div>
  );
}

export default App;
