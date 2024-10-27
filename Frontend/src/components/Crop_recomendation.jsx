import React, { useState } from 'react';
import axios from 'axios';

const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [crop, setCrop] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        setCrop(response.data.crop);
      })
      .catch(error => {
        console.error('Error predicting crop:', error);
      });
  };

  return (
    <div className='flex flex-col h-auto w-auto justify-center'>
      <h1 className='text-4xl font-bold mt-5 mb-3 text-red-600 flex justify-center items-center '>Crop Recommendation</h1><hr />
    <div className='flex flex-col justify-center content-center '>
      <form className='flex flex-col justify-center items-center gap-4 bg-gray-100 ' onSubmit={handleSubmit}>
        
        <input className='mt-5 w-[300px] h-10 px-2 py-5 rounded-md focus:outline-black transition duration-200 ease-in-out delay-200' type="text" name="N" value={formData.N} onChange={handleChange} placeholder="Nitrogen content" />
        <input className='w-[300px] h-10 px-2 py-5 focus:outline-black transition duration-200 ease-in-out' type="text" name="P" value={formData.P} onChange={handleChange} placeholder="Phosphorus content" />
        <input className='w-[300px] h-10 px-2 py-5 focus:outline-black transition duration-200 ease-in-out' type="text" name="K" value={formData.K} onChange={handleChange} placeholder="Potassium content" />
        <input className='w-[300px] h-10 px-2 py-5 focus:outline-black transition duration-200 ease-in-out' type="text" name="temperature" value={formData.temperature} onChange={handleChange} placeholder="Temperature" />
        <input className='w-[300px] h-10 px-2 py-5 focus:outline-black transition duration-200 ease-in-out' type="text" name="humidity" value={formData.humidity} onChange={handleChange} placeholder="Humidity" />
        <input className='w-[300px] h-10 px-2 py-5 focus:outline-black transition duration-200 ease-in-out' type="text" name="ph" value={formData.ph} onChange={handleChange} placeholder="pH Level" />
        <input className='w-[300px] h-10 px-2 py-5 focus:outline-black transition duration-200 ease-in-out' type="text" name="rainfall" value={formData.rainfall} onChange={handleChange} placeholder="Rainfall" />
        <button className='border-2 w-[375px] text-black border-black rounded-md px-5 py-2 mb-5 font-semibold hover:text-white hover:bg-red-600 hover:border-red-800 hover:font-bold' type="submit">Predict Crop</button>
      </form>
      {crop && <h2 className='flex justify-center items-center text-lg text-red-500 font-semibold'>Recommended Crop: {crop}</h2>}
    </div>
    </div>
  );
};

export default CropRecommendation;