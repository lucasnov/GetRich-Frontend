import React from "react";
import "./index.css";
import Menu from "../Menu";
import Quadro from "../Quadro";
import Busca from "../Busca";

export default function Painel() {
  return (
    <div className="painel">
        <Menu />
        <Quadro />
        <Busca />
    </div>
  );
}

