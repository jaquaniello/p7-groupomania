import {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import "./Home.css";
import {Link} from "react-router-dom";

const baseUrl = "http://localhost:4200/auth/login";

function Home() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function home() {
    const toRedirect = (link) => {
      history.push(link);
    };
    toRedirect("/contact");
  }

  function signup() {
    axios
      .post(baseUrl, {
        email: mail,
        password: password,
      })
      .then((res) => {
        console.log(res);
        /* localStorage.token = JSON.stringify(res.data.token); */
        localStorage.pseudo = JSON.stringify(res.data.pseudo);
        localStorage.user = JSON.stringify(res.data.userId);
        localStorage.access_token = res.data.token;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        function home() {
          const toRedirect = (link) => {
            history.push(link);
          };
          toRedirect("/contact");
        }

        home();
      });
  }

  let buttonDiv = (
    <button style={{display: "flex", margin: "auto"}} onClick={signup} id="alt">
      Se connecter
    </button>
  );

  return (
    <div className="groupe">
      <Link style={{margin: "auto"}} to="/survey">
        Créer un compte
      </Link>
      <div id="label">
        <label>email</label>
        <input
          type="text"
          name="mail"
          onChange={(e) => setMail(e.target.value)}
        ></input>
        <label>password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {buttonDiv}
      </div>
    </div>
  );
}

export default Home;
