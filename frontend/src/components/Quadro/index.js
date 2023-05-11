import React, { useState, useEffect } from "react";
import "./index.css";
import Moeda from "../Moeda";
import axios from "axios";


export default function Quadro() {

    const [data,setData] = useState("");

    function generatePairs(lista, currency) {
        if (lista.length === 0) {
            return "";
        }

        if (lista.includes(currency)) {
            let index = lista.indexOf(currency);
            if (index > -1) {
                lista.splice(index, 1);
            }
        }
        return lista.map((item) => item + "-" + currency).join(",");
    }
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/favs/")
            .then((res) => {
                const moedas = res.data.moedas; // acessa o array "moedas" dentro da resposta
                setFavs(moedas); // define esse array como o estado da lista de favoritos
            });
    }, []);

    let stringMoedas = generatePairs(favs, "BRL");

    const [moedas, setMoedas] = useState([]);

    useEffect(() => {
        if (stringMoedas !== "") {
            axios
                .get(`http://localhost:8000/api/money/${stringMoedas}/`)
                .then((res) => {
                    const moedasArray = Object.keys(res.data).map((key) => {
                        return {
                            id: key,
                            code: res.data[key].code,
                            bid: res.data[key].bid,
                            ask: res.data[key].ask
                        };
                    });
                    if(res.status === 200){
                        setData(new Date().toLocaleString());
                        setMoedas(moedasArray);
                    }
                    
                });
        }
    }, [stringMoedas]);

    for (let i = 0; i < moedas.length; i++) {
        moedas[i].bid = parseFloat(moedas[i].bid).toFixed(4);
        moedas[i].ask = parseFloat(moedas[i].ask).toFixed(4);
    }

    return (
        <>
        <div className="data">
            <p className="date-string">{data!==undefined?data:"--"}</p>
        </div>
        <div className="quadro">
            {moedas.map((moeda) => (
                <Moeda key={moeda.id} nome={moeda.code} compra={moeda.bid} venda={moeda.ask} />
            ))}
        </div>
        <p className="refresh" onClick={(e) => window.location.reload()}>refresh</p>
        </>
    );
}

