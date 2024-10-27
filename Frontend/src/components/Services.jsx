import React from "react";
import { Link, useNavigation ,useNavigate} from 'react-router-dom'


const Services = () => {
  const navigateTo=useNavigate()
  const gotoCropPredict=()=>{
    navigateTo("/crop_recomendation")
  }
  const gotoPricePredict=()=>{
    navigateTo("/price_predict")
  }
  const gotoVideoRoom=()=>{
    navigateTo("/room")
  }
  return (
    <div>
        {/* Agriculture Card */}
      <section>
        <div className="bg-gradient-to-tr from-green-500 to-green-800 w-[95%] h-[430px] ml-[25px] mr-4 rounded-md flex flex-col justify-center items-center  my-10 gap-8">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-white pt-5">AGRICULTURE</h2>
          </div>
          <div className="flex justify-center items-center gap-12 ">
            <div className="relative bg-green-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-green-800 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Crop prediction
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-green-950 font-semibold px-3 text-center opacity-0 bg-green-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                Crop prediction is used in predicting the crop according to the environment like temperature, humidity etc.
              </span>
            </div>

            <div className="relative bg-green-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-green-800 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Price Prediction
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-green-950 font-semibold px-3 text-center opacity-0 bg-green-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
              Price Prediction is a model which help in predicting the price of crop according to the condition.
              </span>
            </div>
            <div className="relative bg-green-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-green-800 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Video Conferencing
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-green-950 font-semibold px-3 text-center opacity-0 bg-green-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                Video Conferencing is added to interact with Agriculture specialist for the Guidance.
              </span>
            </div>
          </div>
          {/* Agriculture buttons */}
           <div className="flex justify-center gap-64 mb-5">
            <button 
              onClick={gotoCropPredict}
              className="bg-green-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-green-950 transition duration-300">
              Crop Predict
            </button>
            <button 
            onClick={gotoPricePredict}
            className="bg-green-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-green-950 transition duration-300">
              Price Predict
            </button>
            <button 
            onClick={gotoVideoRoom}
            className="bg-green-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-green-950 transition duration-300">
              Video <br /> Conferencing
            </button>
          </div>
        </div>
      </section>

      {/* Education Card */}
      <section>
        <div className="bg-gradient-to-tl from-yellow-600 to-amber-900 w-[95%] h-[430px] ml-[25px] mr-4 rounded-md flex flex-col justify-center items-center  my-10 gap-8">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-white pt-5">EDUCATION</h2>
          </div>
          <div className="flex justify-center items-center gap-12 ">
            <div className="relative bg-amber-100 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-amber-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Education Article 
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-amber-950 font-semibold px-3 text-center opacity-0 bg-amber-200 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                Article on the Education to aware the peoples
              </span>
            </div>

            <div className="relative bg-amber-100 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-amber-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Price Prediction
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-amber-950 font-semibold px-3 text-center opacity-0 bg-amber-200 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                This is the text that appears on hover about the heading.
              </span>
            </div>
            <div className="relative bg-amber-100 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-amber-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Video Conferencing
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-amber-950 font-semibold px-3 text-center opacity-0 bg-amber-200 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                Interact with teachers directly with the help of video confencering.
              </span>
            </div>
          </div>
           <div className="flex justify-center gap-64 mb-5">
            <button className="bg-amber-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-amber-950 transition duration-300">
              Article
            </button>
            <button className="bg-amber-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-amber-950 transition duration-300">
              Price Predict
            </button>
            <button className="bg-amber-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-amber-950 transition duration-300">
              Video <br /> Conferencing
            </button>
          </div>
        </div>
      </section>
      {/* Hospital Card */}
      <section>
        <div className="bg-gradient-to-t from-blue-500 to-blue-900 w-[95%] h-[430px] ml-[25px] mr-4 rounded-md flex flex-col justify-center items-center  my-10 gap-8">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-white pt-5">HEALTH</h2>
          </div>
          <div className="flex justify-center items-center gap-12 ">
            <div className="relative bg-blue-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-blue-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Crop prediction
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-blue-950 font-semibold px-3 text-center opacity-0 bg-blue-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                This is the text that appears on hover about the heading.
              </span>
            </div>

            <div className="relative bg-blue-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-blue-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Price Prediction
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-blue-950 font-semibold px-3 text-center opacity-0 bg-blue-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                This is the text that appears on hover about the heading.
              </span>
            </div>
            <div className="relative bg-blue-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-blue-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Video Conferencing
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-blue-950 font-semibold px-3 text-center opacity-0 bg-blue-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                This is the text that appears on hover about the heading.
              </span>
            </div>
          </div>
           <div className="flex justify-center gap-64 mb-5">
            <button className="bg-blue-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-blue-950 transition duration-300">
              Crop Predict
            </button>
            <button className="bg-blue-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-blue-950 transition duration-300">
              Price Predict
            </button>
            <button className="bg-blue-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-blue-950 transition duration-300">
              Video <br /> Conferencing
            </button>
          </div>
        </div>
      </section>
      {/* Government Services */}
      <section>
        <div className="bg-gradient-to-t from-cyan-500 to-cyan-800 w-[95%] h-[430px] ml-[25px] mr-4 rounded-md flex flex-col justify-center items-center  my-10 gap-8">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-white pt-5">GOVERNMENT SERVICES</h2>
          </div>
          <div className="flex justify-center items-center gap-12 ">
            <div className="relative bg-cyan-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-cyan-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Crop prediction
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-cyan-950 font-semibold px-3 text-center opacity-0 bg-cyan-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                This is the text that appears on hover about the heading.
              </span>
            </div>

            <div className="relative bg-cyan-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-cyan-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Price Prediction
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-cyan-950 font-semibold px-3 text-center opacity-0 bg-cyan-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                This is the text that appears on hover about the heading.
              </span>
            </div>
            <div className="relative bg-cyan-200 w-[320px] h-[240px] rounded-md flex items-center justify-center group">
              <h1 className="text-cyan-950 font-bold text-xl text-center group-hover:opacity-0 transition-opacity duration-300">
                Sell your Crop
              </h1>
              <span className="absolute inset-0 flex items-center justify-center text-cyan-950 font-semibold px-3 text-center opacity-0 bg-cyan-300 bg-opacity-80 rounded-md transition-opacity duration-300 group-hover:opacity-100">
                Farmer can directly sell the crop to the Government.
              </span>
            </div>
          </div>
           <div className="flex justify-center gap-64 mb-5">
            <button className="bg-cyan-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-cyan-950 transition duration-300">
              Crop Predict
            </button>
            <button className="bg-cyan-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-cyan-950 transition duration-300">
              Price Predict
            </button>
            <button className="bg-cyan-950 text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:font-semibold hover:text-cyan-950 transition duration-300">
              Sell to <br /> Government
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
