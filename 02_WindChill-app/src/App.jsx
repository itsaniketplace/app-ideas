import { useState } from "react";
import "./App.css";

function App() {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [temperature, setTemperature] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [error, setError] = useState("");
  const [windChill, setWindChill] = useState(null);

  const handleToggle = () => {
    setUnitSystem((prev) => (prev === "metric" ? "imperial" : "metric"));
    setError("");
    setTemperature("");
    setWindSpeed("");
    setWindChill(null);
  };

  const calculateWindChill = () => {
    if (temperature === "" || windSpeed === "") {
      setError("please fill the required details");
      setWindChill(null);
      return;
    }

    let temp = parseFloat(temperature);
    let wind = parseFloat(windSpeed);

    if (isNaN(temp) || isNaN(wind)) {
      setError("please enter a valid number.");
      setWindChill(null);
      return;
    }

    if (
      (unitSystem === "metric" &&
        (temp < -50 || temp > 10 || wind < 5 || wind > 120)) ||
      (unitSystem === "imperial" &&
        (temp < -60 || temp > 50 || wind < 3 || wind > 70))
    ) {
      setError("Wind chill formula is only valid for cold conditions.");
      setWindChill(null);
      return;
    }
    let chill;
    if (unitSystem === "metric") {
      chill =
        13.12 +
        0.6215 * temp -
        11.37 * Math.pow(wind, 0.16) +
        0.3965 * temp * Math.pow(wind, 0.16);
    } else {
      chill =
        35.74 +
        0.6215 * temp -
        35.75 * Math.pow(wind, 0.16) +
        0.4275 * temp * Math.pow(wind, 0.16);
    }

    setWindChill(chill);
    console.log("WindChill:", windChill);
    console.log("error:", error);
    setError("");
  };

  return (
    <>
      <div className="flex justify-center items-center bg-white flex-col min-h-screen  p-2 ">
        <div className="w-40% flex justify-center items-center flex-col bg-orange-200 rounded-md px-16 py-8">
          <h1 className="font-bold text-xl  flex justify-center items-center mt-4">
            WindChill-App
          </h1>
          <div className="flex justify-center items-center">
            <p>Switch:</p>
            <button
              onClick={handleToggle}
              className="border rounded-md my-4 bg-red-400 p-2 ml-1 hover:bg-red-500 text-white font-bold transition "
            >
              {unitSystem === "metric"
                ? "metric (°C, km/h)"
                : "Imperial (°F, mph)"}
            </button>
          </div>

          <br />

          <label className=" font-semibold">
            <span>Temperature:{unitSystem === "metric" ? "°C" : "°F"}</span>
          </label>
          <input
            className=" border rounded-md w-full"
            type="number"
            placeholder="0"
            value={temperature}
            onChange={(e) => {
              setTemperature(e.target.value);
            }}
          />
          <label className="text-left font-semibold">
            windSpeed:{unitSystem === "metric" ? "kmp" : "mph"}
          </label>
          <input
            className=" border rounded-md w-full"
            placeholder="0"
            type="number"
            value={windSpeed}
            onChange={(e) => {
              setWindSpeed(e.target.value);
            }}
          />
          <button
            onClick={calculateWindChill}
            className="border rounded-md p-2 bg-orange-500 m-3 w-full mt-8 hover:bg-orange-700 text-white font-bold transition"
          >
            Calculate
          </button>
          {error && <p className="text-red-600 font-medium">*{error}*</p>}
        </div>
        {/* output section */}
        {windChill !== null && (
          <div className="w-40% flex justify-center items-center flex-col bg-orange-200 rounded-md mt-12 px-16 py-8">
            <h1 className="text-bold">WindChill Result</h1>
            <span>
              <h1 className="text-bold text-3xl">{windChill.toFixed(2)} WCI</h1>
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
