import { useState } from "react";
import axios from "axios";

export default function RequestForm() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [temps, setTemps] = useState([]);
  //const [lat, setLat] = useState("");
  //const [lon, setLon] = useState("");

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
    axios.get(geoCoderURL).then((res) => {
      let lat = res.data[0].lat;
      let lon = res.data[0].lon;
      let dailyAPIURL =
        "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" +
        lat +
        "&lon=" +
        lon +
        "&cnt=16&units=imperial&appid=2d41c22ae78b3bd082fd3f0eda60e983";
      console.log(dailyAPIURL);
      axios.get(dailyAPIURL).then((res2) => {
        //console.log(res2.data.list);
        setTemps(res2.data.list);
      });
    });

    //const dailyAPIURL =
    //  "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" +
    //  lat +
    //  "&lon=" +
    //  lon +
    //  "&cnt=16&units=imperial&appid=2d41c22ae78b3bd082fd3f0eda60e983";
    //console.log(dailyAPIURL);
    //axios.get(dailyAPIURL).then((res) => {
    //  console.log(res);
    //});
    //});
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label>City, State</label>
        <input type="text" name="name" onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
      <label>{result}</label>
      <ul>
        {temps.map((item) => (
          <li key={Math.random()}>High: {item.temp.max}</li>
        ))}
      </ul>
    </div>
  );
}
