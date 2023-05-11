import React from "react";
import "./index.css";

export default function Moeda(props) {
  return (
    <div className="box">
        <div className="moeda">
            <p>{props.nome}</p>
        </div>
        <div className="compravenda">
            <div className="compra">
                <p className="bid">bid&nbsp;</p>
                <p>R${props.compra}</p>
            </div>
            <div className="venda">
                <p className="ask">ask&nbsp;</p>
                <p>R${props.venda}</p>
            </div>
        </div>
    </div>
  );
}

