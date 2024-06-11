import axios from 'axios';

// const APIKey = "46de1989f233ede36bcd3627"
const APIKey2 = "3ba75713e6ac738ce21fb2e4"

// const APIKeyCrypto = "CG-eaozVQzAT4pLbNhSqF7CKUss"

export async function fetchCurrencies() {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${APIKey2}/codes`);
    return response.data.supported_codes;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
}

export async function fetchRates(baseCurrency: string, targetCurrency: string) {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${APIKey2}/pair/${baseCurrency}/${targetCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    throw error;
  }
}


export async function fetchCrypto(baseCurrency: string) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency coin list data:', error);
    throw error;
  }
}


export async function fetchCryptoImg(coinID: string) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinID}`);
    return response.data.image.small;
  } catch (error) {
    console.error('Error fetching cryptocurrency coin images data:', error);
    throw error;
  }
}