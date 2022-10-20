import {Link} from "react-router-dom";
import styled from "styled-components";
import "./Style.css";
import groupama from "../../assets/icon-left-font-monochrome-black.svg";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Header() {
  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem(`access_token`)}`;
  }, []);

  return (
    <div>
      <img
        src={groupama}
        id="groupama"
        alt="groupama"
        className="Headers-containe"
      />
      <div className="link-center"></div>
    </div>
  );
}

export default Header;
