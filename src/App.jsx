import { useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  let [weatherData, setWeatherData] = useState([]);
  let [alertCondition, setCondition] = useState(false);
  let [btnCondition, setBtnCondition] = useState(false);
  const inputValue = useRef(null);
  let [oldestFilter,setOldestFilter] = useState(false);
  let [newestFilter,setNewestFilter] = useState(true);
  let [oldestFilterAlertCondition,setOldestFilterAlertCondition] = useState(false);
  let [newestFilterAlertCondition, setNewestFilterAlertCondition] = useState(false);

  async function getInputValue() {
    if (inputValue.current.value === "" || inputValue.current.value === null) {
      setCondition(true);
      setTimeout(() => {
        setCondition(false);
      }, 2000);
      return;
    }
    try {
      setBtnCondition(true);
      const weatherResponse = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=dae9933c87e147abadb51806241406&q=${inputValue.current.value}&aqi=no`
      );
      const dataFromApi = await weatherResponse.json();
      weatherData.push(dataFromApi);
      setWeatherData([...weatherData]);
      setBtnCondition(false);
      console.log(weatherData);
      inputValue.current.value = "";
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
    console.log(inputValue.current.value);
  }

  const filterSelect = (e) => {
    if (e.target.value === null || e.target.value === "") {
      return;
    }
    console.log(e.target.value);
    if (e.target.value === 'oldest') {
      setOldestFilter(true);
      setNewestFilter(false);
    } else if (e.target.value === 'newest') {
      setOldestFilter(false);
      setNewestFilter(true);
    }
//     if(e.target.value === 'oldest'){
//       setOldestFilter(true)
//     }
//    if(oldestFilter === true && e.target.value === 'oldest'){
// console.log('oldest alert condition checking')
//    }

  };



  return (
    <>
    {oldestFilterAlertCondition ?   <div className="fixed inset-0 flex justify-center mt-[80px] bg-success  w-fit mx-auto h-fit p-[20px] rounded-lg text-white">
    <div className="mx-auto text-xl">New mail arrived.</div>
</div>: null }
      
      <div
        className="min-h-screen mt-[-45px] bg-no-repeat bg-cover bg-center text-white "
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHdlYXRoZXxlbnwwfHx8fDE2MDk0MDU5OTg&ixlib=rb-1.2.1&q=80&w=1080)",
            backgroundColor: "#f0f0f0",
          }}
      >
        <h1 className="text-center text-4xl font-semibold mt-12">
          Weather App
        </h1>
        {alertCondition ? (
          <div className="max-w-lg mx-auto  absolute left-1/2 transform -translate-x-1/2 mt-[20px]">
            <div className="flex items-start bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 p-4 rounded-lg shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 mr-3 mt-1 text-yellow-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01m-6.938 4h13.856c1.118 0 1.67-1.35.914-2.243L13.914 5.757c-.753-.893-2.075-.893-2.828 0L5.22 17.757c-.755.893-.204 2.243.913 2.243z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-lg">Input Required</h3>
                <p className="text-md">
                  Please fill out the input field to continue.
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div className="mt-12 border border-gray-300 p-4 w-full rounded-lg mx-auto flex flex-col justify-center gap-6 bg-white/20 backdrop-blur-md shadow-2xl mt-[100px]">
          <input
            type="text"
            className="p-2 text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Enter city name"
            ref={inputValue}
          />
          <div className="flex justify-center items-center gap-[20px] py-[20px]">
            {btnCondition === true ? (
              <button className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex gap-[10px] text-md font-semibold bg-white hover:bg-gray-200 transition-colors">
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button
                className="text-md font-semibold border border-black p-2 w-fit rounded bg-white hover:bg-gray-200 transition-colors text-black"
                onClick={getInputValue}
              >
                Check Weather
              </button>
            )}

            {weatherData.length > 0 ? (
              <div className="flex justify-center items-center">
                <select
                  className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                  onChange={filterSelect}
                >
                  <option value="">Sort By Time</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center flex-wrap gap-[50px] mt-[60px]">
          {weatherData.length > 0 && newestFilter === true ?   [...weatherData].reverse().map((item, index) => (
              <div
                className="relative mt-8 p-6 text-center bg-transparent backdrop-blur-lg rounded-xl shadow-xl w-[300px] xs:w-[330px] sm:w-[350px] md:w-[400px] lg:w-[400px]"
                key={index}
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {item.location.name}
                </h2>
                <p className="text-lg text-white font-medium">
                  Temperature In Celsius: {item.current.temp_c}°C
                </p>
                <p className="text-lg text-white font-medium">
                  Temperature In Fahrenhiet: {item.current.temp_f}°F
                </p>
                <div className="flex justify-center mt-4">
                  <img
                    src={item.current.condition.icon}
                    alt="Weather Icon"
                    className="w-20 h-20 p-[10px] bg-sky-500 rounded-lg"
                  />
                </div>
                <p className="text-lg text-white font-medium mt-[10px]">
                  {item.current.condition.text}
                </p>
              </div>
            )): weatherData.map((item, index) => (
              <div
                className="relative mt-8 p-6 text-center bg-transparent backdrop-blur-lg rounded-xl shadow-xl w-[300px] xs:w-[330px] sm:w-[350px] md:w-[400px] lg:w-[400px]"
                key={index}
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {item.location.name}
                </h2>
                <p className="text-lg text-white font-medium">
                  Temperature In Celsius: {item.current.temp_c}°C
                </p>
                <p className="text-lg text-white font-medium">
                  Temperature In Fahrenhiet: {item.current.temp_f}°F
                </p>
                <div className="flex justify-center mt-4">
                  <img
                    src={item.current.condition.icon}
                    alt="Weather Icon"
                    className="w-20 h-20 p-[10px] bg-sky-500 rounded-lg"
                  />
                </div>
                <p className="text-lg text-white font-medium mt-[10px]">
                  {item.current.condition.text}
                </p>
              </div>))}
          
        </div>
      </div>
    </>
  );
};

export default App;
