from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

model = joblib.load('crop_recommendation_model.pkl')
# Load the model and encoders
model2 = joblib.load('crop_price_predictor_model.pkl')
label_encoders = joblib.load('label_encoders.pkl')


app = Flask(__name__)
CORS(app)  

@app.route('/predict', methods=['POST'])
def predict1():
    data = request.get_json(force=True)
    prediction = model.predict([[data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]])
    return jsonify({'crop': prediction[0]})




# Function to handle user input and predict the price
def predict_crop_price(state, district, crop_name, input_date):
    try:
        # Convert the input date to Year and Month
        arrival_date = pd.to_datetime(input_date, format='%d-%m-%Y')
        year = arrival_date.year
        month = arrival_date.month

        # Input data for the model
        input_data = {
            'State': state,
            'District': district,
            'Market': 'Damnagar',
            'Commodity': crop_name,
            'Variety': 'Other',
            'Grade': 'FAQ',
            'Year': year,
            'Month': month
        }

        # Apply label encoding
        for col in label_encoders:
            if col in input_data:
                input_data[col] = label_encoders[col].transform([input_data[col]])[0]

        # Convert input_data to DataFrame
        input_df = pd.DataFrame([input_data])

        # Predict price
        predicted_price = model2.predict(input_df)
        return predicted_price[0]
    
    except Exception as e:
        return str(e)

# Endpoint for prediction
@app.route('/predictPrice', methods=['POST'])
def predict():
    data = request.get_json()
    state = data['state']
    district = data['district']
    crop_name = data['crop_name']
    input_date = data['date']

    # Predict price
    predicted_price = predict_crop_price(state, district, crop_name, input_date)
    
    return jsonify({'predicted_price': predicted_price})



if __name__ == '__main__':
    app.run(debug=True)
