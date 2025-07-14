// Interface para os dados do tempo atual
export interface CurrentWeather {
  dt: number;                // Data/hora do registro (timestamp)
  city_name: string;         // Nome da cidade
  city_country: string;      // País da cidade
  temperature: number;       // Temperatura atual
  feelsLike: number;         // Sensação térmica
  description: string;       // Descrição do clima
  icon: string;              // Ícone do clima
  humidity: number;          // Umidade relativa do ar
  pressure: number;          // Pressão atmosférica

  visibility: number;        // Visibilidade em metros
  wind_speed: number;        // Velocidade do vento
  clouds: number;            // Percentual de nuvens

  sunrise: number;           // Horário do nascer do sol (timestamp)
  sunset: number;            // Horário do pôr do sol (timestamp)
}

// Interface para os dados de previsão simplificados
export interface ForecastData {
  str_date: string;          // Data em formato string
  date: number;              // Data/hora (timestamp)
  max_temperature: number;   // Temperatura máxima
  min_temperature: number;   // Temperatura mínima
  icon: string;              // Ícone do clima
  description: string;       // Descrição do clima
  humidity: number;          // Umidade relativa do ar
  pop: number;               // Probabilidade de precipitação
}

// Interface para a resposta da API de previsão
export interface ForecastResponse {
  cod: string;               // Código de resposta
  message: number;           // Mensagem da API
  cnt: number;               // Quantidade de registros
  list: ForecastItem[];      // Lista de itens de previsão
  city: {                    // Dados da cidade
    id: number;              // ID da cidade
    name: string;            // Nome da cidade
    coord: {                 // Coordenadas geográficas
      lat: number;           // Latitude
      lon: number;           // Longitude
    };
    country: string;         // País
    population: number;      // População
    timezone: number;        // Fuso horário
    sunrise: number;         // Nascer do sol (timestamp)
    sunset: number;          // Pôr do sol (timestamp)
  };
}

// Interface para cada item da lista de previsão detalhada
export interface ForecastItem {
  dt: number;                // Data/hora do registro (timestamp)
  main: {
    temp: number;            // Temperatura
    feels_like: number;      // Sensação térmica
    temp_min: number;        // Temperatura mínima
    temp_max: number;        // Temperatura máxima
    pressure: number;        // Pressão atmosférica
    humidity: number;        // Umidade relativa do ar
  };
  weather: {                 // Array de condições climáticas
    id: number;              // ID da condição
    main: string;            // Tipo principal (ex: Rain)
    description: string;     // Descrição detalhada
    icon: string;            // Ícone do clima
  }[];
  clouds: {
    all: number;             // Percentual de nuvens
  };
  wind: {
    speed: number;           // Velocidade do vento
    deg: number;             // Direção do vento
    gust: number;            // Rajada de vento
  };
  visibility: number;        // Visibilidade em metros
  pop: number;               // Probabilidade de precipitação
  dt_txt: string;            // Data/hora em formato texto
}