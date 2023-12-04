import React from "react";
import Nav from "./Nav";
import chart from "../Assets/images/chart.png" 

export default function Header(){
    return(
        <header>
            <Nav />
            <div id="header">
                <div>
                    <h1>ZapLink</h1>
                    <h2>Crie o seu link de contato pessoal do WhatsApp em um clique!</h2>
<h3>Facilite o contato dos seus clientes com você.</h3>
                    <a href="#form-data">
                        <button>Criar Link</button>
                    </a>
                </div>
                <div id="headerImg">
                    <img src={chart} alt="Charts, graph, stock" />
                </div>
            </div>
        </header>
    )
}