import axios from "axios";

// Obtém a chave da API do arquivo de variáveis de ambiente
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY as string;

// Busca o tempo atual por nome da cidade
export const fetchCurrentWeatherByCity = async (city: string) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: city,           // Nome da cidade
      appid: API_KEY,    // Chave da API
      units: 'metric',   // Unidade de medida (Celsius)
      lang: 'pt_br',     // Idioma da resposta
    },
  });
  return response.data;  // Retorna os dados da resposta
};

// Busca o tempo atual por coordenadas (latitude e longitude)
export const fetchCurrentWeatherByCoords = async (lat: number, lon: number) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat,               // Latitude
      lon,               // Longitude
      appid: API_KEY,    // Chave da API
      units: 'metric',   // Unidade de medida (Celsius)
      lang: 'pt_br',     // Idioma da resposta
    },
  });
  return response.data;  // Retorna os dados da resposta
};

// Busca a previsão do tempo por nome da cidade
export const fetchForecastByCity = async (city: string) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      q: city,           // Nome da cidade
      appid: API_KEY,    // Chave da API
      units: 'metric',   // Unidade de medida (Celsius)
      lang: 'pt_br',     // Idioma da resposta
    },
  });
  return response.data;  // Retorna os dados da resposta
};

// Busca a previsão do tempo por coordenadas (latitude e longitude)
export const fetchForecastByCoords = async (lat: number, lon: number) => {
  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      lat,               // Latitude
      lon,               // Longitude
      appid: API_KEY,    // Chave da API
      units: 'metric',   // Unidade de medida (Celsius)
      lang: 'pt_br',     // Idioma da resposta
    },
  });
  return response.data;  // Retorna os dados da resposta
};