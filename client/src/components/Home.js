import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const Booking = {
    marginTop: "0",
    backgroundColor: "#7f53ac",
    backgroundImage: "linear-gradient(315deg, #7f53ac 0%, #647dee 74%)",
    textAlign: "center",
    AlignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  };

  const whitecolor = {
    padding: "4vh",
    color: "white",
  };

  const twodates = {
    display: "flex",
  };

  let [info, setinfo] = useState({
    location: "",
    fromdate: new Date().toISOString().slice(0, 10),
    todate: new Date().toISOString().slice(0, 10),
    rooms: 1,
  });

  const locationchange = (event) => {
    setinfo({ ...info, location: event.target.value });
  };

  const fromdatechange = (event) => {
    setinfo({ ...info, fromdate: event.target.value });
  };

  const todatechange = (event) => {
    setinfo({ ...info, todate: event.target.value });
  };

  const roomchange = (event) => {
    setinfo({ ...info, rooms: event.target.value });
  };

  const searchhotels = async (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:4000/hotel/")
      .then((val) => {
        console.log(val.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const white = {
    color: "white",
  };

  const [values, setvalues] = useState();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/hotel/viewallhotels")
  //     .then((val) => {
  //       console.log(val.data);
  //       console.log(".....................................................");
  //       setvalues([
  //         {
  //           name: "varsan",
  //         },
  //       ]);
  //       console.log(values);
  //     })
  //     .catch((err) => {
  //       console.log("Error in fetching details of all hotel in Home.js file");
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div>
      <div style={Booking}>
        <center>
          <h1 style={whitecolor}>Booking.com</h1>
        </center>
        <div>
          <h2>
            <center style={white}>Search Hotels</center>
          </h2>
          <center>
            <br></br>
            <label
              style={{
                color: "white",
                fontSize: "130%",
                marginLeft: "3%",
              }}
            >
              Location :
            </label>
            <input
              type="text"
              placeholder="where are you going?"
              value={info.location}
              onChange={locationchange}
            ></input>
          </center>
          <br></br>
          <center>
            <label
              style={{
                color: "white",
                fontSize: "130%",
                marginLeft: "3%",
              }}
            >
              Dates :
            </label>
            <span styles={twodates}>
              <input
                type="date"
                value={info.fromdate}
                placeholder="From Date"
                onChange={fromdatechange}
              ></input>
              <input
                type="date"
                value={info.todate}
                onChange={todatechange}
              ></input>
            </span>
          </center>
          <br></br>
          <label
            style={{
              color: "white",
              fontSize: "130%",
              marginLeft: "3%",
            }}
          >
            Rooms :
          </label>
          <input
            type="number"
            placeholder="No of rooms?"
            value={info.rooms}
            onChange={roomchange}
          ></input>
          <br></br>
          <br></br>
          <center>
            <form onSubmit={searchhotels}>
              <button type="submit" className="btn btn-dark">
                Search
              </button>
            </form>
          </center>
          <br></br>
        </div>
      </div>

      {/* <div>
        <h3>Map Values</h3>
        {values.map((val) => {
          <h4>{val.name}</h4>;
        })}
      </div> */}
    </div>
  );
}

export default Home;
