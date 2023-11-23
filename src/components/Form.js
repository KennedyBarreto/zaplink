import React, { useState } from "react";
import {FaCopy} from "react-icons/fa"
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
// react-phone-number-input package
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'



export default function Form(){
    // State for managing Link generation
    const [Link, setLink] = useState(null);
    // setting state of input to react-phone-number-input package defined states
    const [value, setValue] = useState()
    const [texto, setTexto] = useState('');

    
    // Function to generate Link
    function generate(){
        const errorMessage =  document.getElementById("errorMessage");
        const customMessage = document.getElementById("customMessage");
        const res = `https://api.whatsapp.com/send?phone=${value}&text=${customMessage.value}`;
        let result = res.replace(/\s/g, '%20');
        
        // Check if Phone Number field is empty and throw error
        // let contact_value = contact.value; 
        if(value === undefined){
            return errorMessage.innerHTML = "Digite um número de celular para começar!"
        }else if(value.length <14 ){
            return errorMessage.innerHTML = "Digite um número de celular válido"
        }
        if(customMessage.value === ""){
            result = res.replace(/\s/g, '%20');
            result = res.replace("+", "")
        }
        setLink(result)
    };
    
     
    function keyPressAction(event){
        const errorMessage =  document.getElementById("errorMessage");
        const phoneNumber = document.getElementById("number");
        const customMessage = document.getElementById("customMessage");
        const res = `https://api.whatsapp.com/send?phone=${phoneNumber.value}&text=${customMessage.value}`;
        // replace white whitespaces in custom message with "%20" in order to follow the
        // default WhatsApp link design 
        const result = res.replace(/\s/g, '%20');

        // Check if Phone Number field is empty and throw error
        if(phoneNumber.value === ""){
            return errorMessage.innerHTML = "O campo número não pode estar vazio!"
        }else{
            errorMessage.innerHTML = ""
        }

        // Generate Link on Pressing Enter key
        if(event.keyCode === 13){
            setLink(result);
        }
    }

    // Copy generated link
    const copyText = () =>{
        const errorMessage =  document.getElementById("errorMessage");
        const result = document.getElementById("output");
        
        if(result === ""){
            errorMessage.innerHTML = "No Link generated!"
        }else{
            navigator.clipboard.writeText(result);
        }
    }
    
    const handleChange = (event) => {
        setTexto(event.target.value);
      };
   
// Page content
    return (
        <div id="form">
            <div>

            <div id="form-data">
                    <h4> Crie seu link agora!</h4>
                    {/* React-phone-number-input <PhoneInput /> package component*/}
                    <PhoneInput
                        className="PhoneInput"
                        id="number"
                        placeholder="Insira o número de telefone"
                        value={value}
                        onChange={setValue}
                        onKeyUp={keyPressAction}
                        defaultCountry="BR"
                        limitMaxLength={true}
                    />
                    <h3>Digite a mensagem personalizada </h3>
                    <textarea 
                        name="customMessage"
                        id="customMessage" 
                        type="text" 
                        placeholder="Insira a mensagem personalizada"
                        rows={15}
                        onChange={handleChange}
                        onKeyUp={keyPressAction}
                    />

                    <p id="errorMessage"></p>
                    <button onClick={generate}>Criar Link</button>
                    
                    {/* Result Link displayed on condition that Phone number field is not empty */}
                    {
                    Link && 
                    <div id="resultLink">
                        <a id="output" href={Link} target="_blank" rel="noreferrer">{Link}</a>
                        <p onClick={copyText}><FaCopy className="FaCopy"/></p>
                    </div>}

                </div>

                <div className="template-img">

                <div class="marvel-device iphone8 silver">
    <div class="top-bar"></div>
    <div class="sleep"></div>
    <div class="volume"></div>
    <div class="camera"></div>
    <div class="sensor"></div>
    <div class="speaker"></div>
    <div className="screen">

      <div className="status-bar"></div>
      <div className="user-bar">
            <div className="avatar"></div>
            <div className="name">
            <span>{value}</span>
            </div>
            <div className="actions more"><IoMdMore/></div>
            <div className="actions"><FaPhoneAlt/></div>
      </div>
      <div className="conversation">
        <div className="conversation-container">
            <div className="message sent">
                {texto}
            </div>
        </div>
        <div className="typebox">

        </div>
      </div>
    </div>
    <div className="home"></div>
    <div className="bottom-bar"></div>
</div>

					
                    
                </div>
                
            </div>
        </div>
    )
}