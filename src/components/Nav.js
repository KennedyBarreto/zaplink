import React from "react";
import {FaBars, FaCaretLeft} from "react-icons/fa";


export default function Nav(){
    // const body = document.getElementById("main");

    
    // Mobile Navigation setup
    function showHideNav(){
        const hamburger = document.getElementById("hamburger") 
        const closeNav = document.getElementById("closeNav");
        const mNav = document.getElementById("mNav");
        if(mNav.style.display !== "block"){
            mNav.style.display = "block"
            closeNav.style.display = "block"
            hamburger.style.display = "none"
        }else{
            mNav.style.display = "none"
            closeNav.style.display = "none"
            hamburger.style.display = "block"

        }
        
    }
    // Hide Nav on body click
    // function bodyHide(){
    //     if(mNav.style.display == "block"){
    //         mNav.style.display = "none"
    //     }
    // }
    // body.addEventListener("click", bodyHide);
// Function end

    return(
        <>
        <nav>
        <a href="#header"><h2 className="site-title">ZapLink</h2></a>
            <ul>
               
            <a href="#form">CRIE SEU LINK</a>
                <a href="#steps"><li>PASSO-A-PASSO</li></a>
                <li><a href="mailto:">ENTRE EM CONTATO</a></li>
            </ul>
            <FaBars id="hamburger" className="bars" onClick={showHideNav}/>
        </nav>

        <div id="mNav">
            <FaCaretLeft id="closeNav" className="close" onClick={showHideNav}/>
            <ul>
            <ul>
            <a href="#header"></a>
            <a href="#form">CRIE SEU LINK</a>
                <a href="#steps"><li>PASSO-A-PASSO</li></a>
                <li><a href="mailto:">ENTRE EM CONTATO</a></li>
            </ul>
            </ul>
        </div>
        </>
    )
}