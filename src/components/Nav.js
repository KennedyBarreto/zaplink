import React from "react";
import {FaBars, FaCaretLeft} from "react-icons/fa";


export default function Nav(){
    function showHideNav() {
        const hamburger = document.getElementById("hamburger");
        const closeNav = document.getElementById("closeNav");
        const mNav = document.getElementById("mNav");
      
        if (mNav.style.display !== "block") {
          mNav.style.display = "block";
          closeNav.style.display = "block";
          hamburger.style.display = "none";
          // Adicione outras lógicas necessárias
        } else {
          mNav.style.display = "none";
          closeNav.style.display = "none";
          hamburger.style.display = "block";
          // Adicione outras lógicas necessárias
        }
      }
      
      // Fecha a navegação móvel se o clique for fora dela
      document.addEventListener("click", function(event) {
        const mNav = document.getElementById("mNav");
        const hamburger = document.getElementById("hamburger");
      
        if (!mNav.contains(event.target) && event.target !== hamburger) {
          mNav.style.display = "none";
          hamburger.style.display = "block"; // Mostra o hamburger quando a navegação é fechada
          // Adicione outras lógicas necessárias
        }
      });


const scrollToForm = () => {
    const formSection = document.getElementById('form-data');

    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    }
};

    return(
        <>
        <nav>
        <a href="#header"><h2 className="site-title">ZapLink</h2></a>
            <ul>
            <a href="#form-data" onClick={scrollToForm}>CRIE SEU LINK</a>
                <a href="#steps"><li>PASSO-A-PASSO</li></a>
                <li><a href="mailto:">ENTRE EM CONTATO</a></li>
            </ul>
            <FaBars id="hamburger" className="bars" onClick={showHideNav}/>
        </nav>

        <div id="mNav">
            <FaCaretLeft id="closeNav" className="close" onClick={showHideNav}/>
            <ul>
            <ul>
            <a href="#header"><h2 className="site-title">ZapLink</h2></a>
            <a href="#form-data" onClick={scrollToForm}>CRIE SEU LINK</a>
                <a href="#steps"><li>PASSO-A-PASSO</li></a>
                <li><a href="mailto:">ENTRE EM CONTATO</a></li>
            </ul>
            </ul>
        </div>
        </>
    )
}