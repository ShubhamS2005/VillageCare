import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../main';

const Lobby = () => {
  useEffect(() => {
    // Array of script sources
    const scriptSources = [
        "/src/js/lobby.js",
    ];

    function clearStorage() {

      let session = sessionStorage.getItem('notes');
  
      if (session == null) {
      
          localStorage.removeItem('remove');
  
      }
      sessionStorage.setItem('notes', 1);
  }
  window.addEventListener('load', clearStorage);
    // Function to dynamically append a script tag for each source
    const appendScripts = () => {
      scriptSources.forEach(src => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.body.appendChild(script);
      });
    };

    // Call the function to append all scripts
    appendScripts();

    // Cleanup: remove the scripts on component unmount
    return () => {
      scriptSources.forEach(src => {
        const scripts = document.querySelectorAll(`script[src="${src}"]`);
        scripts.forEach(script => {
          document.body.removeChild(script);
        });
      });
    };
  }, []);
    return (
        <>
  <div className="nav--list">
    <Link href="/lobby">
      <h3 id="logo" style={{display:"flex", marginTop:"45px",marginLeft:"20px"}}>
        <span>Video Confrence</span>
      </h3>
    </Link>
  </div>
  
  <main id="room__lobby__container">
    <div id="form__container">
      <div id="form__container__header">
        <p>👋 Create or Join Room</p>
      </div>
      <form id="lobby__form">
        <div className="form__field__wrapper">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            required=""
            placeholder="Enter your display name..."
          />
        </div>
        <div className="form__field__wrapper">
          <label>Room Name</label>
          <input
            type="text"
            name="room"
            required=""
            placeholder="Enter room name..."
          />
        </div>
        <div className="form__field__wrapper">
          <button type="submit">
            Go to Room
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  </main>
</>
    );
}

export default Lobby;
