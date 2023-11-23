import React from "react";
import {FaInfo, FaBars, FaCaretLeft} from "react-icons/fa";
import { HashLink } from "react-router-hash-link"

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
        <HashLink to="#header"><h2 className="site-title">ZapLink</h2></HashLink>
            <ul>
               
                <HashLink to="#form">CRIE SEU LINK</HashLink>
                <li>SOBRE NÓS</li>
                <li><a href="mailto:">ENTRE EM CONTATO</a></li>
            </ul>
            <FaBars id="hamburger" className="bars" onClick={showHideNav}/>
        </nav>

        <div id="mNav">
            <FaCaretLeft id="closeNav" className="close" onClick={showHideNav}/>
            <ul>
            <ul>
                <HashLink to="#header"></HashLink>
                <HashLink to="#form">CRIE SEU LINK</HashLink>
                <li>SOBRE NÓS</li>
                <li><a href="mailto:">ENTRE EM CONTATO</a></li>
            </ul>
            </ul>
        </div>
        </>
    )
}