import React, {useState} from "react";
import "./Survey.css";
/* import {POST} from "../../api/axios.js";
import ENDPOINTS from "../../api/endpoints.js"; */
import axios from "axios";
import {Link} from "react-router-dom";

import {useHistory} from "react-router-dom";

function Survey() {
  const [username, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudos, setpseudos] = useState("");

  const baseUrl = "http://localhost:4200/auth/signup";

  const history = useHistory();

  function regroupe() {
    function home() {
      const toRedirect = (link) => {
        history.push(link);
      };
      toRedirect("/");
    }
    home();

    function signup() {
      axios.post(baseUrl, {
        email: mail,
        password: password,
        pseudo: pseudos,
      });
    }
    signup();
  }

  let pseudoerror;

  if (pseudos.trim().length < 5) {
    pseudoerror = <span style={{color: "red"}}>minimume 5 caractere</span>;
  }

  let passworderror;

  if (password.length < 5) {
    passworderror = (
      <span style={{color: "red"}}>seulement chiffres et lettres</span>
    );
  }

  let buttonDiv;

  if (pseudos.length < 5) {
    buttonDiv = <button style={{display: "none"}} id="alt"></button>;
  } else if (
    password.search(/^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i)
  ) {
    buttonDiv = <button style={{display: "none"}} id="alt"></button>;
  } else if (
    mail.search(/^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i)
  ) {
    buttonDiv = <button style={{display: "none"}} id="alt"></button>;
  } else if (password.length < 5) {
    buttonDiv = <button style={{display: "none"}} id="alt"></button>;
  } else if (
    mail.search(
      /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i
    )
  ) {
    buttonDiv = <button style={{display: "none"}} id="alt"></button>;
  } else {
    buttonDiv = (
      <button
        style={{display: "flex", margin: "auto"}}
        onClick={regroupe}
        id="alt"
      >
        S'inscrire
      </button>
    );
  }

  return (
    <form>
      <Link style={{margin: "auto", marginTop: "5%"}} to="/">
        Se connecter
      </Link>
      <div className="tab">
        <label>pseudo</label>
        <input
          type="text"
          name="lastname"
          onChange={(e) => setpseudos(e.target.value)}
          required
        ></input>
        {pseudoerror}
        <label>adresse mail</label>
        <input
          type="text"
          name="mail"
          onChange={(e) => setMail(e.target.value)}
          required
        ></input>
        <label>mot de passe</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        {passworderror}

        <div>{buttonDiv}</div>
      </div>
    </form>
  );
}

export default Survey;
