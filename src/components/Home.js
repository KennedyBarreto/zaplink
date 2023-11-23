import React from "react";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import Steps from "./Steps";

export default function Home(){  
     return(
        <>
            <div id="main" className="main" >
                <Header/>
                <Form />
                <Footer />
            </div>
        </>
     )
}