import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';

const CropPricePrediction = () => {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [cropName, setCropName] = useState('');
  const [date, setDate] = useState(new Date());
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async (e) => {
    e.preventDefault();
    setError('');
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    try {
      const response = await axios.post('http://127.0.0.1:5000/predictPrice', {
        state,
        district,
        crop_name: cropName,
        date: formattedDate,
      });
      setPredictedPrice(response.data.predicted_price);
    } catch (error) {
      setError('Error fetching prediction. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-blue-300 to-purple-400 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-pulse">Crop Price Prediction</h1>
        <form onSubmit={handlePredict} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 transition ease-out duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">District:</label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 transition ease-out duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Crop Name:</label>
            <input
              type="text"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 transition ease-out duration-300"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Date:</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat="dd-MM-yyyy"
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-green-500 transition ease-out duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Predict Price
          </button>
        </form>
        {predictedPrice && (
          <div className="mt-8 p-4 bg-green-50 text-green-700 rounded-lg text-center font-semibold text-lg shadow-inner">
            Predicted Price: {predictedPrice} Rupees/Qt
          </div>
        )}
        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-700 rounded-lg text-center font-semibold text-lg shadow-inner">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropPricePrediction;
