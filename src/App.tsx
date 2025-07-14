import { useEffect, useState, useCallback } from 'react'
import './App.css'
import { fetchCurrentWeatherByCity, fetchCurrentWeatherByCoords, fetchForecastByCity, fetchForecastByCoords } from './services/weatherApi';
import CurrentWeatherCard from './components/WeatherCard';
import ForecastCards from './components/ForecastCards';
import { type ForecastResponse, type CurrentWeather } from './types/types';

const mapToCurrentWeather = (data: any): CurrentWeather => ({
  dt: data.dt,
  city_name: data.name,
  city_country: data.sys.country,
  temperature: data.main.temp,
  feelsLike: data.main.feels_like,
  description: data.weather[0].description,
  icon: data.weather[0].icon,
  humidity: data.main.humidity,
  pressure: data.main.pressure,
  visibility: data.visibility,
  wind_speed: data.wind.speed,
  clouds: data.clouds.all,
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
});

// Componente principal da aplicação
function App() {
  // Estado para armazenar o nome da cidade digitada
  const [city, setCity] = useState("");
  // Estado para armazenar os dados do tempo atual
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  // Estado para armazenar os dados da previsão
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(null);
  // Estado para controlar o carregamento
  const [loading, setLoading] = useState(false);
  // Estado para mensagens de erro
  const [error, setError] = useState("");

  // Função para buscar o tempo pela localização do usuário
  const getWeatherByLocation = useCallback(async() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Busca dados do tempo atual pela latitude/longitude
          const currentData = await fetchCurrentWeatherByCoords(position.coords.latitude, position.coords.longitude);
          const current = mapToCurrentWeather(currentData);
          setCurrentWeather(current);

          setCity(currentData.name);

          // Busca previsão dos próximos 5 dias pela latitude/longitude
          const forecastData = await fetchForecastByCoords(position.coords.latitude, position.coords.longitude);
          setForecastData(forecastData);
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : "Erro ao buscar previsão.";
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Permissão negada para obter localização.");
        setLoading(false);
      }
    );
  }, []);

  // Função para buscar o tempo pela cidade digitada
  const handleSearch = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    // console.log("BUSCA POR:", city);

    try {
      // Busca dados do tempo atual pela cidade
      const currentData = await fetchCurrentWeatherByCity(city);
      const current = mapToCurrentWeather(currentData);
      setCurrentWeather(current);

      console.log("COORDENADAS:", `${currentData.coord.lat}, ${currentData.coord.lon}`)

      // Busca previsão dos próximos 5 dias pela cidade
      const forecastData = await fetchForecastByCity(city);
      setForecastData(forecastData);
    } catch(err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao buscar cidade.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [city]);

  // Executa a busca pela localização ao montar o componente
  useEffect(() => {
    getWeatherByLocation();
  }, [getWeatherByLocation]);

  return (
    <div>
      {/* Título */}
      <div className='mx-auto flex max-w-sm items-center mt-2.5 gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'>
        <h1 className="text-3xl items-center font-medium text-black dark:text-white">⛅ Previsão do Tempo</h1>
      </div>

      {/* Campo de busca por cidade e botões */}
      <div className='mx-auto max-w-3xl not-sm:ml-2.5 not-sm:mr-2.5 mt-2.5 text-center rounded-xl bg-white p-6 not-sm:pl-0 not-sm:pr-0 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10'>
        <input
          type='text'
          placeholder='Digite o nome da cidade'
          className='text-white px-3 py-2 border-l border-t border-b rounded-l-lg border-gray-400 sm:w-3/4 m-0 h-11 outline-0'
          aria-label="Digite o nome da cidade para buscar a previsão do tempo"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
        <button
          className='bg-blue-500 text-white px-4 py-2 border border-gray-400 hover:bg-blue-600 m-0 mt-2 h-11'
          aria-label="Buscar previsão para a cidade digitada"
          onClick={handleSearch}
        >Buscar</button>
        <button
          className='bg-blue-500 text-white px-4 py-2 border-r border-t border-b border-gray-400 rounded-r-lg hover:bg-blue-600 m-0 mt-2 h-11'
          aria-label="Buscar previsão usando localização atual"
          onClick={getWeatherByLocation}
        >
          📍
        </button>
      </div>

      {/* Mensagem de carregando */}
      {loading &&(
        <p className="bg-slate-700 text-gray-300 rounded-xl mt-1 pl-8 p-2.5 max-w-40 mx-auto animate-pulse" aria-live="polite">
          Carregando...
        </p>
      )}
      {/* Mensagem de erro */}
      {error &&(
        <p className="flex text-slate-100 bg-red-500 items-center rounded-xl mt-1 pl-8 p-2.5 max-w-3xl mx-auto">
          <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
            <path
              d="M3.23 7.913 7.91 3.23c.15-.15.35-.23.57-.23h7.05c.21 0 .42.08.57.23l4.67 4.673c.15.15.23.35.23.57v7.054c0 .21-.08.42-.23.57L16.1 20.77c-.15.15-.35.23-.57.23H8.47a.8.8 0 0 1-.57-.23l-4.67-4.673a.8.8 0 0 1-.23-.57V8.473c0-.21.08-.42.23-.57z"
              fill="#fff"
              fill-opacity=".16"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linejoin="round"
            />
            <path d="M12 16h.008M12 8v5" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" />
          </svg>
          <span>{error}</span>
        </p>
      )}

      {/* Card do tempo atual */}
      {currentWeather && <CurrentWeatherCard data={currentWeather} />}

      {/* Cards da previsão */}
      {forecastData && <ForecastCards items={forecastData.list} />}
    </div>
  )
}

export default App