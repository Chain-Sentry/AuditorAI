import React, { useRef } from 'react';
import styles from '../styles/Home.module.css'
import Image from 'next/image';

function AuditButton() {
  const chatBoxBodyRef = useRef(null);
  const inputFieldRef = useRef(null);
  const submitBtnRef = useRef(null);
  const clearBtnRef = useRef(null);

  const clearInputField = () => {
    inputFieldRef.current.value = '';

    // Clear the audit report
    const previousResponse = chatBoxBodyRef.current.querySelector('.response');
    if (previousResponse) {
      previousResponse.remove();
    }
  };

  function clearChatContainer() {
    chatBoxBodyRef.current.innerHTML = "";
  }

  const sendMessage = () => {
    const chatBoxBody = chatBoxBodyRef.current;
    const inputField = inputFieldRef.current;
    const submitBtn = submitBtnRef.current;
    const clearBtn = clearBtnRef.current;

    const message = inputField.value;

    // Remove the previous error messages
    const previousError = chatBoxBody.querySelector('.error');
    if (previousError) {
      previousError.remove();
    }

    if (!message || message.length < 23) {
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error');
      errorMessage.innerHTML = '<p>Please enter a valid Solidity code.</p>';
      chatBoxBody.appendChild(errorMessage);
      scrollToBottom();
      return;
    }

    submitBtn.innerHTML = 'Auditing...';
    submitBtn.disabled = true;

    // Remove the previous response element
    const previousResponse = chatBoxBody.querySelector('.response');
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
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        submitBtn.innerHTML = 'Audit';
        submitBtn.disabled = false;
        chatBoxBody.classList.add('information');
        chatBoxBody.innerHTML = `<h3>Audited Report</h3><br><p>${data.message}</p>`;
        scrollToBottom();
      });
  };

  const scrollToBottom = () => {
    const chatBoxBody = chatBoxBodyRef.current;
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
  };



  return (
    <>
      <div id="audit" className=' my-10 mt-28   text-white mx-auto 
    max-w-screen-md flex flex-col justify-center items-center' >

        <div className="text-center gap-y-10  items-center justify-center flex flex-col  mt-5 ">
          {/* <div className="flex justify-center h-16 w-64 sm:w-auto sm:h-24 lg:h-32 items-center">
            <img className="animate-pulse" src="/cg.png" alt="Your image description" />
          </div> */}
          <div className="flex justify-center h-16 w-64 sm:w-auto sm:h-24 lg:h-32 items-center">
            <Image
              src="/cg.png"
              alt="Hero image"
              width={64}
              height={32}
              layout="responsive"
              className="animate-pulse"
            />
          </div>
          <p className="text-xl w-64 sm:w-auto justify-center text-[#52f700] text-blend-overlay ">A Solidity Smart Contract Auditor
            powered by AI that analyzes and audits the code of smart contracts, detects errors and
            vulnerabilities, and generates through reports for safe and error-free smart contracts. </p>
        </div>

        {/* ---------------Input------------------------*/}
        <div className="w-66 mt-14 sm:w-96 h-24 sm:h-32 
      bg-opacity-20 border-2 border-green-400
       backdrop-filter backdrop-blur-lg rounded-xl p-4  text-black">
          <input
            type="text"
            id="question-input"
            ref={inputFieldRef}
            className="w-full h-full  sm:text-lg text-center text-green-400
           border-[1px] border-green-400 rounded-lg bg-transparent focus:outline-none"
            placeholder="Enter your Solidity code here..."

          />
        </div>

        {/* ------------buttons------------------------------------*/}

        <div className="my-11 flex flex-row gap-8 sm:flex-row justify-center 
       items-center space-x-0 sm:space-x-4">
          <button
            id="submit-button"
            className="btn-main w-20 h-10 sm:w-28 text-center items-center 
          font-bold  bg-opacity-20 border-x-2 border-green-400 backdrop-filter 
          backdrop-blur-lg text-[#48f600] rounded-xl   "
            onClick={sendMessage}
            ref={submitBtnRef}
          >
            Audit
          </button>

          <button
            id="clear-button"
            className="btn-secondary text-center items-center 
          h-10 w-20 sm:w-28  font-bold bg-opacity-40 bg-gradient-to-t  backdrop-filter
           backdrop-blur-lg text-[#48f600] rounded-xl border-x-2 border-green-400 "
            onClick={clearInputField}
            ref={clearBtnRef}
          >
            Clear
          </button>

        </div>
        {/* -----------------Reply box--------------------- */}
        <div
          id="chat-container"
          ref={chatBoxBodyRef}
          className="my-6 border-2 h-auto w-78 sm:w-[900px] 
        bg-opacity-60 bg-black border-green-400 backdrop-filter
         backdrop-blur-lg rounded-md p-7  text-[#48f600] "
        ></div>

        <button
          id="clear-chat-button"
          className="btn-secondary w-36 h-10 sm:w-38 my-6 items-center  
        bg-opacity-60 bg-[#062426]   backdrop-filter 
        backdrop-blur-lg text-[#48f600]  border-x-2 border-green-400 rounded-xl font-semibold"
          onClick={clearChatContainer}
        > Clear Report
        </button>


        <div className='p-12'></div>
        {/* -----------footer-------------------- */}
        <footer className="  ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> </div>
          <p className="text-center font-black text-[#48f600]">
            © 2023 ContractGuardianAi, Inc.All rights reserved.Built by ChainSentry.
          </p>

        </footer>


      </div>

    </>
  );
}

export default AuditButton;
