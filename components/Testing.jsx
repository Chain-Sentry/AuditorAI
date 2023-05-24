// Its an testing file for your modifications

import React, { useRef } from 'react';


function AuditButton() {
  const chatBoxBodyRef = useRef(null);
  const inputFieldRef = useRef(null);
  const submitBtnRef = useRef(null);
  const clearBtnRef = useRef(null);

  function clearInputField() {
    inputFieldRef.current.value = "";

    // Clear the audit report
    const previousResponse = chatBoxBodyRef.current.querySelector(".response");
    if (previousResponse) {
      previousResponse.remove();
    }
  }

  function clearChatContainer() {
    chatBoxBodyRef.current.innerHTML = "";
  }

  function sendMessage() {
    const chatBoxBody = chatBoxBodyRef.current;
    const inputField = inputFieldRef.current;
    const submitBtn = submitBtnRef.current;

    const message = inputField.value;

    // Remove the previous error messages
    const previousError = chatBoxBody.querySelector(".error");
    if (previousError) {
      previousError.remove();
    }

    if (!message || message.length < 23) {
      const errorMessage = document.createElement("div");
      errorMessage.classList.add("error");
      errorMessage.innerHTML = `<p>Please enter a valid Solidity code.</p>`;
      chatBoxBody.appendChild(errorMessage);
      scrollToBottom();
      return;
    }

    submitBtn.innerHTML = "Auditing...";
    submitBtn.disabled = true;

    // Remove the previous response element
    const previousResponse = chatBoxBody.querySelector(".response");
    if (previousResponse) {
      previousResponse.remove();
    }

    fetch('https://api.0x0.ai/message', {
      method: 'POST',
      headers: {
        accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    }).then(response => {
      return response.json();
    }).then(data => {
      submitBtn.innerHTML = "Audit";
      submitBtn.disabled = false;
      chatBoxBody.classList.add("information");
      chatBoxBody.innerHTML = `<h3>Audited Report</h3><br><p>${data.message}</p>`;
      scrollToBottom();
    });
  }

  function scrollToBottom() {
    const chatBoxBody = chatBoxBodyRef.current;
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
  }

  return (
    <div id="audit" className="mt10">
      <button id="submit-button" className="btn-main" onClick={sendMessage} ref={submitBtnRef}>Audit</button>
      <button id="clear-button" className="btn-secondary" onClick={clearInputField} ref={clearBtnRef}>Clear</button>
      <button id="clear-chat-button" className="btn-secondary" onClick={clearChatContainer}>Clear Chat</button>
      <div id="chat-container" ref={chatBoxBodyRef}></div>
      <input type="text" id="question-input" ref={inputFieldRef}></input>
    </div>
  );
}

export default AuditButton;


<div id="audit" className='mt-60 flex  flex-col justify-center items-center'  >
  {/* i want to add text and text to be in center */}
  <div className="w-96 h-24 bg-opacity-20 border-2 border-green-400
       bg-white backdrop-filter backdrop-blur-lg rounded-xl p-4">

    <input
      type="text"
      id="question-input"
      ref={inputFieldRef}
      className="bg-transparent w-full h-full text-lg focus:outline-none"
      placeholder="Enter your Solidity code here..."
    />
  </div>

  <div className="mt-4 flex flex-row justify-center ${styles.eclipse} 
      items-center space-x-4">
    <button
      id="submit-button"
      className="btn-main w-28"
      onClick={sendMessage}
      ref={submitBtnRef}
    >
      Audit
    </button>

    <button
      id="clear-button"
      className="btn-secondary w-28"
      onClick={clearInputField}
      ref={clearBtnRef}
    >
      Clear
    </button>

  </div>

  <div
    id="chat-container"
    ref={chatBoxBodyRef}
    className="mt-14 border-2 h-auto :w-auto w-[900px] bg-opacity-10  bg-green-300 
         border-green-400 backdrop-filter backdrop-blur-lg rounded-md p-7 animate-pulse"
  ></div>

  <button
    id="clear-chat-button"
    className="btn-secondary w-28   mt-6 items-center"
    onClick={clearChatContainer}
  > Clear Report
  </button>
  {/* <div className={` animate-pulse ${styles.eclipse}`}></div> */}


  {/* -----------footer-------------------- */}
  <div className='p-12  ' ></div>

  <footer className="bg-frost sm:p-12 ">
    {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
    <p className="text-center text-gray-400">
      © 2023 ContractGuardianAi, Inc. All rights reserved.
    </p>
    {/* </div> */}
  </footer>


</div>