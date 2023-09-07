import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loginimage = require("../assets/blackpool.jpeg");

function Signup() {
  const navigate = useNavigate();

  var [info, setinfo] = useState({
    name: "",
    gmail: "",
    password: "",
  });

  const input = {
    width: "50%",
  };

  const box = {
    borderRadius: "10%",
    width: "25%",
    height: "50%",
    backgroundColor: "#000000",
    backgroundImage: "linear-gradient(147deg, #000000 0%, #2c3e50 74%)",
    backgroundSize: "100% 100%",
    marginTop: "12%",
  };

  const button = {
    width: "30%",
    height: "1.5%",
    backgroundColor: "white",
    color: "black",
  };

  const styles = {
    backgroundImage: `url(${loginimage})`,
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
    display: "flex",
    AlignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    color: "white",
    // flexDirection: "column",
  };

  const handleUsernameChange = (event) => {
    setinfo({ ...info, name: event.target.value });
  };

  /* eslint eqeqeq: 0 */

  const handleGmailChange = (event) => {
    setinfo({ ...info, gmail: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setinfo({ ...info, password: event.target.value });
  };

  const formsubmit = async (event) => {
    event.preventDefault();
    const datas = await axios.post("http://localhost:4000/user/signup", info);
    var mes = datas.data.message;
    if (mes == "Email Address Already Exits.Please use Other Email") {
      alert("Email Address Already Exits.Please use Other Email");
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={styles}>
      <div style={box}>
        <div>
          <center>
            <h2>SIGNUP</h2>
          </center>
        </div>
        <br></br>
        <form onSubmit={formsubmit}>
          <center>
            <div>
              <label>Username: </label>
              <input
                type="text"
                value={info.name}
                onChange={handleUsernameChange}
              />
            </div>
          </center>
          <br></br>
          <br></br>
          <center>
            <div>
              <label>Gmail: </label>
              <input
                type="gmail"
                style={input}
                value={info.gmail}
                onChange={handleGmailChange}
              />
            </div>
          </center>
          <center>
            <div>
              <br></br>
              <br></br>
              <label>Password: </label>
              <input
                type="password"
                value={info.password}
                onChange={handlePasswordChange}
              />
            </div>
          </center>
          <br></br>
          <br></br>
          <center>
            <button type="submit" style={button}>
              Signup
            </button>
          </center>
          <br></br>
          <br></br>
        </form>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default Signup;
