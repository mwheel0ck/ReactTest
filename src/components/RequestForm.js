import { useEffect, useState } from "react";
import axios from "axios";

export default function RequestForm() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //alert(`You sent the message: ${message}`);
    console.log(message);
    setResult(message);

    const geoCoderURL =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      message +
      ",US&limit=1&appid=2d41c22ae78b3bd082fd3f0eda60e983";
    console.log(geoCoderURL);
    axios.get(geoCoderURL).then((res) => {
      console.log(res);
    });

    const dailyAPIURL =
      "https://api.openweathermap.org/data/2.5/forecast/daily?lat=32.7762719&lon=-96.7968559&cnt=16&units=imperial&appid=2d41c22ae78b3bd082fd3f0eda60e983";
    axios.get(dailyAPIURL).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>City, State</label>
        <input type="text" name="name" onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
      <label>{result}</label>
    </div>
  );
}
