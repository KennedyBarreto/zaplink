import React from "react";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import Steps from "./Steps";
import ScrollButton from "./ScrollButton";



export default function Home(){  
     return(
        <>
            <div id="main" className="main" >

                <Header/>
                <Steps/>
                <Form/>
                <Footer/>
                <ScrollButton/>
            </div>
        </>
     )
}