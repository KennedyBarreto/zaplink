import React, { useState, useRef } from "react";
import { FaCopy } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { FaRegSmile } from "react-icons/fa";
// react-phone-number-input package
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config";

export default function Form() {
  // State for managing Link generation
  const [Link, setLink] = useState(null);
  const [value, setValue] = useState("");
  const [texto, setTexto] = useState("");
  const [title, setTitle] = useState(""); //novo state de teste pro titulo
  const [trimmedValue, setTrimmedValue] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^A-Za-z0-9-]/g, "");
    const trimmed = filteredValue.slice(0, 15);

    setTitle(trimmed.toLowerCase()); // Transforma para minúsculas
    setTrimmedValue(trimmed.toLowerCase());
  };
  // Function to generate Link
  function generate() {
    const errorMessage = document.getElementById("errorMessage");
    const customMessage = document.getElementById("customMessage");
    const titleUrl = document.getElementById("title").value; // Obtém o valor do título do input

    // Verifica se o número de telefone está preenchido

    if (!value) {
      const notify = () =>
        toast.error("Digite um número de celular para começar!");
      notify();
      return (errorMessage.innerHTML =
        "Digite um número de celular para começar!");
    } else if (value.length < 14) {
      const notify = () => toast.error("Digite um número de celular válido!");
      notify();
      return (errorMessage.innerHTML = "Digite um número de celular válido!");
    }

    let res = `https://api.whatsapp.com/send?phone=${value}&text=${customMessage.value}`;
    let result = res.replace(/\s/g, "%20");
    // Cria o objeto com os dados a serem enviados para o endpoint de encurtamento
    const data = {
      origUrl: result,
      shortTitle: titleUrl, // Utiliza o valor do título como shortTitle
    };

    axios
      .post(`${config.apiUrl}/check-url`, { urlId: trimmedValue })
      .then((res) => {
        // Se o URL estiver disponível (não existe no banco de dados), então pode enviar os dados para criar o URL encurtado
        axios
          .post(`${config.apiUrl}/short`, data)
          .then((response) => {
            const shortenedUrl = response.data.shortUrl; // Obtém o URL encurtado da resposta
            const notify = () => toast.success("Link criado com sucesso!");
            notify();
            // Atualiza o estado Link com o URL encurtado retornado pelo servidor
            setLink(shortenedUrl);

            // Limpa a mensagem de erro, se houver
            errorMessage.textContent = "";
          })
          .catch((error) => {
            console.error("Erro ao encurtar URL:", error);
            errorMessage.textContent =
              "Erro ao encurtar URL. Por favor, tente novamente.";
          });
      })
      .catch((err) => {
        const notify = () => toast.error("Titulo já existe no banco!");
        notify();
        return (errorMessage.innerHTML = "Titulo já existe no banco");
        // Trate o erro caso ocorra uma falha na verificação do URL
      });
  }

  // Copy generated link
  const copyText = () => {
    const errorMessage = document.getElementById("errorMessage");
    const result = document.getElementById("output");

    if (result === "") {
      errorMessage.innerHTML = "No Link generated!";
    } else {
      navigator.clipboard.writeText(result);
    }
  };

  const handleChange = (event) => {
    setTexto(event.target.value);
  };
  // Referência para a área de texto usando o hook useRef
  const textAreaRef = useRef(null);

  // Função para adicionar negrito ao texto selecionado na área de texto
  const addBoldToTextArea = () => {
    const textarea = textAreaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(startPos, endPos);
    const newText = `*${selectedText}*`;

    const updatedText =
      text.substring(0, startPos) + newText + text.substring(endPos);

    textarea.value = updatedText;
  };

  // Função para adicionar itálico ao texto selecionado na área de texto
  const addItalToTextArea = () => {
    const textarea = textAreaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(startPos, endPos);
    const newText = `_${selectedText}_`;

    const updatedText =
      text.substring(0, startPos) + newText + text.substring(endPos);

    textarea.value = updatedText;
  };

  // Função para adicionar tachado ao texto selecionado na área de texto
  const addTachToTextArea = () => {
    const textarea = textAreaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const text = textarea.value;

    const selectedText = text.substring(startPos, endPos);
    const newText = `~${selectedText}~`;

    const updatedText =
      text.substring(0, startPos) + newText + text.substring(endPos);

    textarea.value = updatedText;
  };

  // Função para formatar o texto com tags HTML correspondentes ao negrito, itálico e tachado
  const formatarTexto = (texto) => {
    let novoTexto = texto;

    // Substituir "*" por <b> (negrito)
    novoTexto = novoTexto.replace(/\*(.*?)\*/g, "<b>$1</b>");

    // Substituir "_" por <i> (itálico)
    novoTexto = novoTexto.replace(/_(.*?)_/g, "<i>$1</i>");

    // Substituir "~" por <strike> (tachado)
    novoTexto = novoTexto.replace(/~(.*?)~/g, "<strike>$1</strike>");

    return novoTexto;
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
            defaultCountry="BR"
            limitMaxLength={true}
          />
          <h3>Digite a mensagem personalizada </h3>
          <div className="toolbox">
            <button id="bold" onClick={addBoldToTextArea}>
              Negrito
            </button>
            <button id="ital" onClick={addItalToTextArea}>
              Italico
            </button>
            <button id="tach" onClick={addTachToTextArea}>
              Hachurado
            </button>
          </div>
          <textarea
            name="customMessage"
            id="customMessage"
            type="text"
            placeholder="Insira a mensagem personalizada"
            rows={15}
            onChange={handleChange}
            ref={textAreaRef}
          />

          <h3>Link personalizado (opcional) </h3>
          <div>
            <input
              disabled
              style={{
                maxWidth: "45%",
              }}
              value={config.apiUrl + "/"}
            ></input>
            <input
              id="title"
              style={{
                marginLeft: "10px",
                maxWidth: "50%",
              }}
              value={title}
              title="Máximo 15 caracteres, apenas letras, números e traços"
              onChange={handleInputChange}
            ></input>
          </div>
          <p id="errorMessage"></p>
          <ToastContainer theme="colored" />
          <button onClick={generate}>Criar Link</button>

          {/* Result Link displayed on condition that Phone number field is not empty */}
          {Link && (
            <div id="resultLink">
              <a id="output" href={Link} target="_blank" rel="noreferrer">
                {Link}
              </a>
              <p onClick={copyText}>
                <FaCopy className="FaCopy" />
              </p>
            </div>
          )}
        </div>

        <div className="template-img">
          <div className="marvel-device iphone8 silver">
            <div className="top-bar"></div>
            <div className="sleep"></div>
            <div className="volume"></div>
            <div className="camera"></div>
            <div className="sensor"></div>
            <div className="speaker"></div>
            <div className="screen">
              <div className="status-bar"></div>
              <div className="user-bar">
                <div className="avatar"></div>
                <div className="name">
                  <span>{value}</span>
                </div>
                <div className="actions more">
                  <IoMdMore />
                </div>
                <div className="actions">
                  <FaPhoneAlt />
                </div>
              </div>
              <div className="conversation">
                <div className="conversation-container">
                  <div
                    className="message sent"
                    dangerouslySetInnerHTML={{ __html: formatarTexto(texto) }}
                  ></div>
                </div>
                <div className="typebox">
                  <div className="conversation-compose">
                    <div className="emoji">
                      <FaRegSmile />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home"></div>
            <div className="bottom-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
