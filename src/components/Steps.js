import React from "react";
import {FaWhatsapp, FaLink, FaRocketchat, FaAngleDoubleRight, FaAngleDoubleDown} from "react-icons/fa"


export default function Steps(){
    return(
        <div id="steps">
            <div>
                <div className="step1">
                    <h2> Crie seu link em 3 passos </h2>
                    <div>
                        <FaAngleDoubleRight className="FaAngleDoubleRight"/>
                        <FaAngleDoubleDown className="FaAngleDoubleDown"/>
                    </div>
                </div>
                
                <div className="steps">
                    <div>
                        <FaWhatsapp className="step-icons"/>
                        <h2> Abra o ZapLink </h2>
                        <p>Abra o ZapLink pelo seu navegador e clique em "Criar Link".</p>
                    </div>
                    <div>
                        <FaRocketchat className="step-icons"/>
                        <h2> Digite seu número &amp; e mensagem personalizada... </h2>
                        <p>Preencha o formulário com seu número e uma mensagem.</p>
                    </div>
                    <div>
                        <FaLink className="step-icons"/>
                        <h2> Copie o Link </h2>
                        <p>Clique no botão "Gerar Link" e Voila!🥳 , seu link pessoal está pronto para uso!.</p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}