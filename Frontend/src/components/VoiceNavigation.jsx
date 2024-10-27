import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';

function VoiceNavigation() {

  const navigate = useNavigate();
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.includes('Mujhe home page per le jao')) {
      navigate('/');
      resetTranscript();
    } else if (transcript.includes('Mujhe login page per le jao')) {
      navigate('/login');
      resetTranscript();
    } else if (transcript.includes('Mujhe services page per le jao')) {
      navigate('/services');
      resetTranscript();
    } else if (transcript.includes('Mujhe register page per le jao')) {
        navigate('/register');
        resetTranscript();
      }else if (transcript.includes('Mujhe mausam ki jankari do')) {
        navigate('/weather');
        resetTranscript();
      }else if (transcript.includes('Mujhe fasal ka dam batao')) {
        navigate('/price_predict');
        resetTranscript();
      }else if (transcript.includes('Mujhe fasal ki jankari do')) {
        navigate('/crop_recomendation');
        resetTranscript();
      }else if (transcript.includes('Mera doctor se milane ka prabandh karo')) {
        navigate('/bookappointment');
        resetTranscript();
      }
  }, [transcript, navigate, resetTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Your browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={SpeechRecognition.startListening}
        className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition"
      >
        <FontAwesomeIcon icon={faMicrophone} className="text-xl" />
      </button>
      <button
        onClick={SpeechRecognition.stopListening}
        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition"
      >
        <FontAwesomeIcon icon={faMicrophoneSlash} className="text-xl" />
      </button>
      <p className="ml-4">Current Command: {transcript}</p>
    </div>
  );
}

export default VoiceNavigation;
