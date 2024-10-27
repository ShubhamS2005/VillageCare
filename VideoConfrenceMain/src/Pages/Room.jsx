import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../js/AgoraRTC_N-4.22.0";

const Room = () => {
    const [message, setMessage] = useState("");
    const handleNotes = (e) => {
        handleAddItem();
        console.log("done");
        e.preventDefault();
    };

    const [items, setItems] = useState(() => {
        // Retrieve the list from localStorage when the component mounts
        const storedItems = localStorage.getItem("notes");
        return storedItems ? JSON.parse(storedItems) : [];
    });

    const handleAddItem = () => {
        // Create a new list with the added item
        const updatedItems = [...items, message];

        // Update the state and save the updated list in localStorage
        setItems(updatedItems);
        localStorage.setItem("notes", JSON.stringify(updatedItems));

        // Clear the input field
        setMessage("");
    };

    useEffect(() => {
        // Add event listener to clear localStorage on window/tab close
        const handleBeforeUnload = () => {
          localStorage.removeItem('notes');
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        // Clean up the event listener when component unmounts
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);

    useEffect(() => {
        // Array of script sources
        const scriptSources = ["/src/js/room.js", "/src/js/room_rtc.js"];

        // Function to dynamically append a script tag for each source
        const appendScripts = () => {
            scriptSources.forEach((src) => {
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
            scriptSources.forEach((src) => {
                const scripts = document.querySelectorAll(`script[src="${src}"]`);
                scripts.forEach((script) => {
                    document.body.removeChild(script);
                });
            });
        };
    }, []);

    
    return (
        <>
            <header id="nav">
                <div className="nav--list">
                    <button id="members__button">
                        <svg
                            width={24}
                            height={24}
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                        >
                            <path
                                d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"
                                fill="#ede0e0"
                            >
                                <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
                            </path>
                        </svg>
                    </button>
                    <h3 id="logo" style={{display:"flex", marginTop:"45px",marginLeft:"20px"}}>
                        <span>Video Confrence</span>
                    </h3>
                </div>
            </header>
            <main className="container">
                <div id="room__container">
                    <section id="stream__container">
                        <div id="stream__box" />
                        <div id="streams__container" />
                        <div className="stream__actions">
                            <button id="camera-btn" className="active">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
                                </svg>
                            </button>
                            <button id="mic-btn" className="active">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" />
                                </svg>
                            </button>
                            <button id="screen-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" />
                                </svg>
                            </button>
                        </div>
                    </section>
                    <section id="messages__container">
                        <div id="messages">
                            <div className="message__wrapper">
                                <div className="message__body">
                                    <strong className="message__author">Meeting Notes</strong>
                                    <p className="message__text">
                                        Hii {localStorage.getItem("display_name")} here you can add
                                        meating notes for your further use || data will be deleted on relode
                                    </p>
                                </div>
                            </div>
                                {items && items.length > 0 ? (
                                    items.map((current, index) => {
                                        return (
                                            <div className="message__wrapper">
                                            <div key={index} className="message__body">
                                                <strong className="message__author">
                                                    Note-{index + 1}
                                                </strong>
                                                <p className="message__text">{current}</p>
                                            </div>
                                        </div>
                                        );
                                    })
                                ) : (
                                    <div className="message__wrapper">
                                        <div className="message__body">
                                            <p className="message__text">No Notes Found </p>
                                        </div>
                                    </div>
                                )}
                        </div>
                        <form id="message__form" onSubmit={handleNotes}>
                            <input
                                type="text"
                                name="message"
                                placeholder="Add Your Notes...."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Room;
