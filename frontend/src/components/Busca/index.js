import React, { useState } from "react";
import "./index.css";
import axios from "axios";


export default function Busca() {

    const moedas = {
        "USD": "Dólar Americano",
        "CAD": "Dólar Canadense",
        "EUR": "Euro",
        "GBP": "Libra Esterlina",
        "ARS": "Peso Argentino",
        "BTC": "Bitcoin",
        "LTC": "Litecoin",
        "JPY": "Iene Japonês",
        "CHF": "Franco Suíço",
        "AUD": "Dólar Australiano",
        "CNY": "Yuan Chinês",
        "ILS": "Novo Shekel Israelense",
        "ETH": "Ethereum",
        "XRP": "XRP",
        "SGD": "Dólar de Cingapura",
        "AED": "Dirham dos Emirados",
        "DKK": "Coroa Dinamarquesa",
        "HKD": "Dólar de Hong Kong",
        "MXN": "Peso Mexicano",
        "NOK": "Coroa Norueguesa",
        "NZD": "Dólar Neozelandês",
        "PLN": "Zlóti Polonês",
        "SAR": "Riyal Saudita",
        "SEK": "Coroa Sueca",
        "THB": "Baht Tailandês",
        "TRY": "Nova Lira Turca",
        "TWD": "Dólar Taiuanês",
        "VEF": "Bolívar Venezuelano",
        "ZAR": "Rand Sul-Africano",
        "CLP": "Peso Chileno",
        "PYG": "Guarani Paraguaio",
        "UYU": "Peso Uruguaio",
        "COP": "Peso Colombiano",
        "PEN": "Sol do Peru",
        "BOB": "Boliviano",
        "RUB": "Rublo Russo",
        "INR": "Rúpia Indiana"
    };

    const [moedaSelecionada, setMoedaSelecionada] = useState("0");

    const [parSelecionado, setParSelecionado] = useState("0");

    const [mostraInfo, setMostraInfo] = useState(false);

    const [selecionado, setSelecionado] = useState(false);

    const [infoMoeda, setInfoMoeda] = useState({});

    function pegaMoeda(valor) {
        setMoedaSelecionada(valor);
        setParSelecionado(valor+"BRL");
        setMostraInfo(false);
    }

    function consultaMoeda() {
        if (moedaSelecionada === "0") {
            alert("Selecione uma moeda!");
            return;
        }
        axios
            .get(`http://localhost:8000/api/money/${moedaSelecionada}-BRL/`)
            .then((res) => {
                console.log("retorno API: ", res.data[parSelecionado]);
                console.log(parSelecionado);
                setInfoMoeda(res.data[parSelecionado]);
                setMostraInfo(true);
                });
        axios
            .get(`http://localhost:8000/api/favs`)
            .then((res) => {
                let favs = res.data["moedas"];
                if (favs.includes(moedaSelecionada)) {
                    setSelecionado(true);
                } else {
                    setSelecionado(false);
                }
                });
    }

    function renderMoedas(moedasDict){
        return Object.entries(moedasDict).map(([sigla, nome]) => {
            return <option value={sigla}>{sigla} - {nome}</option>;
        });
    }

    function favorita(moeda){
        axios
            .post("http://localhost:8000/api/fav/", { "sigla": moedaSelecionada })
            .then((res) => {
                console.log(moedaSelecionada);
                });
        setSelecionado(!selecionado);
    }

  return (
    <div className="busca">
        <select className="seletor" onChange={(e)=>pegaMoeda(e.target.value)}>
            <option value="0">Selecione uma moeda</option>
            {renderMoedas(moedas)}
        </select>
        <button className="botao" onClick={(e)=>consultaMoeda()}>Consultar</button>
        {mostraInfo ?
        <div className="info">
            <div className="bloco">
                <p className="sigla">{infoMoeda.code}</p>
                <p className="txt">{infoMoeda.create_date}</p>
            </div>
            <div className="bloco">
                <div className="txt"><p className="verde">bid&nbsp;</p><p>R${infoMoeda.bid}</p></div>
                <div className="txt"><p className="verm">ask&nbsp;</p><p>R${infoMoeda.ask}</p></div>
            </div>
            <div className="bloco">
                <div className="txt"><p className="verde">high&nbsp;</p><p>R${infoMoeda.high}</p></div>
                <div className="txt"><p className="verm">low&nbsp;</p><p>R${infoMoeda.low}</p></div>
            </div>
            <div className="bloco">
                <label class="container">fixado
                    <input type="checkbox" checked={selecionado} onChange={(e)=>favorita(moedaSelecionada)}/>
                    <span class="checkmark"></span>
                </label>
                {/* <p className="fav">fav</p>
                <input type="checkbox" className="checkbox" checked={selecionado} onChange={(e)=>favorita(moedaSelecionada)}/> */}
            </div>
        </div> : <div style={{height: '150px'}}></div>}
    </div>
  );
}

