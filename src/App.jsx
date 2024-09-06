import { useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
  const [citiesArr, setCitiesArr] = useState([]);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const inputValue = useRef(null);

function getInputValue () {
    if (inputValue.current.value !== '') {
      console.log(inputValue.current.value);
      setCity(inputValue.current.value);
    } else {
      alert('Please fill the input field');
    }
  };

  const handleInputChange = () => {
    setCity(inputValue.current.value);
    getInputValue()
  };

  useEffect(() => {
    const getData = async () => {
      console.log("🚀 ~ getData ~ city:", city)
      if(city === '' || city === null){
        return
      }
        try {
          const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=dae9933c87e147abadb51806241406&q=${city}&aqi=no`);
          const dataFromApi = await weatherResponse.json();
          console.log(dataFromApi);
          setWeatherData(dataFromApi);
        } catch (error) {
          console.log("Error fetching weather data:", error);
        }
      
    };

    getData();
  }, [city]);

  return (
    <>
      <div>
        <h1 className='text-center text-3xl font-medium mt-[20px]'>Weather App</h1>
        <div className='mt-[50px] border-[1px] border-[gray] p-[20px] w-[550px] rounded mx-auto flex flex-col justify-center gap-[20px]  bg-sky-500 py-[30px]'>

          <form className='flex flex-col justify-center'>
            <input
              type="text"
              className='p-[5px] text-xl border-[1px] border-[gray] rounded '
              placeholder='Enter city name'
              ref={inputValue}
            />
          </form>
          <button
            className='text-md border-[1px] border-black p-[5px] w-fit mx-auto rounded bg-white'
            onClick={handleInputChange}
          >
            Check Weather
          </button>
        </div>

        {weatherData ?
          <div className='mt-4 text-center'>
            <h2 className='text-xl font-bold'>{weatherData.location.name}</h2>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
        : <h1>No data found</h1>}
      </div>
    </>
  );
};

export default App;
