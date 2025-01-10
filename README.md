# Crypto Price Tracker  

A Node.js and MongoDB-based server-side application that tracks cryptocurrency data for Bitcoin, Matic, and Ethereum. It fetches real-time data from the CoinGecko API and provides endpoints to retrieve the latest data and analyze price deviation.  

## Features  
- Background job to fetch and store cryptocurrency data every 2 hours.  
- API to fetch the latest price, market cap, and 24-hour change for a cryptocurrency.  
- API to calculate and return the standard deviation of the last 100 prices for a cryptocurrency.   

---

## Local Setup  

### 1. Clone the Repository  
```bash  
git clone <repository-url>  
cd <repository-folder>  
```  

### 2. Install Dependencies  
```bash  
npm install  
```  

### 3. Configure Environment Variables  
Create a `.env` file in the root directory with the following details:  
```env  
PORT=5000  
MONGO_URI=<your-mongodb-connection-string>  
```  

### 4. Start the Server  
Run the following command to start the server:  
```bash  
npm start  
```  

### 5. Access Locally  
- **Base URL**: [http://localhost:5000](http://localhost:5000)  
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)  
- **Stats API**:  
  ```  
  GET http://localhost:5000/api/stats?coin=<coin-id>  
  ```  
  Example: `/api/stats?coin=bitcoin`  
- **Deviation API**:  
  ```  
  GET http://localhost:5000/api/deviation?coin=<coin-id>  
  ```  
  Example: `/api/deviation?coin=bitcoin`  

---

## Deployment  

The application is deployed and accessible via the following endpoints:  

- **Health Check**:  
  [https://koinx-backend-assignment-0rc7.onrender.com/health](https://koinx-backend-assignment-0rc7.onrender.com/health)  

- **Stats API**:  
  ```  
  GET https://koinx-backend-assignment-0rc7.onrender.com/api/stats?coin=<coin-id>  
  ```  
  Example: `/api/stats?coin=ethereum`  

- **Deviation API**:  
  ```  
  GET https://koinx-backend-assignment-0rc7.onrender.com/api/deviation?coin=<coin-id>  
  ```  
  Example: `/api/deviation?coin=matic-network`  

--- 

