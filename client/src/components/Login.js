import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const loginimage = require("../assets/blackpool.jpeg");

function Login() {
  const cookies = new Cookies();

  const navigate = useNavigate();

  var [info, setinfo] = useState({
    gmail: "",
    password: "",
  });

  const input = {
    width: "50%",
  };

  const box = {
    borderRadius: "10%",
    width: "25%",
    height: "43%",
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

  const handleGmailChange = (event) => {
    setinfo({ ...info, gmail: event.target.value });
  };

  const handlePasswordChange = (event) => {
    setinfo({ ...info, password: event.target.value });
  };

  /* eslint eqeqeq: 0 */

  const formsubmit = async (event) => {
    event.preventDefault();
    const datas = await axios.post("http://localhost:4000/user/login", info);
    const mes = datas.data.message;
    if (mes == "No Gmail Found!!") {
      alert("No Gmail Found!!");
    } else if (mes == "Authentication success") {
      cookies.set("gmail", info.gmail);
      navigate("/home");
    } else {
      alert("Authentication failed");
    }
  };

  return (
    <div style={styles}>
      <div style={box}>
        <div>
          <center>
            <h2>LOGIN</h2>
          </center>
        </div>
        <br></br>
        <form onSubmit={formsubmit}>
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
              Login
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Login;
