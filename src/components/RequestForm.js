import { useState } from "react";
import axios from "axios";

export default function RequestForm() {
  const [message, setMessage] = useState("");
  //  const [result, setResult] = useState("");
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
    //   setResult(message);

    const geoCoderURL =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
        console.log(res2.data.list);
        //        var list = res2.data.list;

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

  function parseDate(datesecs) {
    var dummy = parseInt(datesecs)*1000;
    const d = new Date(dummy);
    //d.setUTCSeconds(dummy,0);
    console.log(d);
    return (<div><td>{d.toISOString().substring(0,10)}</td></div>)
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <label className="mr-2">City, State</label>
        <input className="mr-2" type="text" name="name" onChange={onChange} />
        <button type="submit">Submit</button>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp</th>
         </tr>
        </thead>
        <tbody>
          {temps.map((item) => (
            <tr key={Math.random()}>
              <td>{parseDate(item.dt)}</td>
              <td>{item.temp.max} / {item.temp.min} ºF</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
