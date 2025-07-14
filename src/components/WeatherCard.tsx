import type { FC } from "react";
import type { CurrentWeather } from "../types/types";

// Define as propriedades esperadas pelo componente
interface Props {
    data: CurrentWeather; // Dados do tempo atual
}

// Componente que exibe o card do tempo atual
const CurrentWeatherCard: FC<Props> = ({ data }) => {
    // Função para formatar timestamps em horário local
    const formatTime = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        // Card principal com estilos
        <div className="mx-auto max-w-3xl items-center not-sm:ml-2.5 not-sm:mr-2.5 mt-2.5 gap-x-4 text-center space-y-4 rounded-xl text-cyan-50 p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            <div className="flex flex-wrap justify-baseline">
                {/* Informações de data e hora */}
                <div className="w-3xs mb-2">
                    <span className="left-0 -top-5 relative text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-amber-700 p-1 bg-clip-text text-transparent">agora</span>
                    <span className="left-0 -top-5 relative text-amber-500 text-xl">{formatTime(data.dt)}</span>
                    <span className="-top-1 -left-27 relative text-nowrap text-amber-300 text-sm">{new Intl.DateTimeFormat('pt-BR', {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'short',
                    }).format(new Date(data.dt * 1000))}</span>
                </div>
                {/* Nome da cidade e país */}
                <h2 className="text-3xl font-bold mb-10 -top-30">
                    <span className="italic">{data.city_name}</span>
                    <span className="rounded-full border-1 p-2 bg-cyan-50 text-slate-800 text text-center m-1.5 text-2xl">{data.city_country}</span>
                </h2>
            </div>
            {/* Ícone, temperatura e descrição */}
            <div className="flex flex-wrap justify-between">
                <div className="flex">
                    <img
                        src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
                        alt={data.description}
                        className="-mt-20"
                    />
                    <div className="-ml-3 -mt-4.5">
                        <p className="flex items-center text-5xl font-bold">{Math.round(data.temperature)}°<span className="text-2xl -mt-2.5">C</span></p>
                        <p className="capitalize -ml-1 sm:text-2xl not-sm:text-lg">{data.description}</p>
                    </div>
                </div>
                {/* Horários do nascer e pôr do sol */}
                <div className="not-sm:flex justify-around not-sm:w-full -mt-4.5 not-sm:mb-5.5 p-1.5 pt-2 pb-2 rounded-xl not-sm:bg-slate-700 text-cyan-100">
                    <p><span className="opacity-50">Nascer do sol:</span> {formatTime(data.sunrise)}</p>
                    <p className="sm:mt-2.5"><span className="opacity-50">Pôr do sol:</span> {formatTime(data.sunset)}</p>
                </div>
            </div>
            {/* Informações adicionais: sensação térmica, umidade, pressão */}
            <div className="flex justify-around rounded-xl p-1.5 pt-2 pb-2 bg-slate-700 text-cyan-100 -mt-5.5">
                <p><span className="opacity-50">Sensação térmica:</span> {Math.round(data.feelsLike)}°</p>
                <p><span className="opacity-50">Umidade:</span> {data.humidity}%</p>
                <p><span className="opacity-50">Pressão:</span> <span className="text-nowrap">{data.pressure} mb</span></p>
            </div>
            {/* Informações adicionais: vento, visibilidade, nuvens */}
            <div className="flex justify-around rounded-xl p-1.5 pt-2 pb-2 bg-slate-700 text-cyan-100">
                <p><span className="opacity-50">Vento:</span> <span className="text-nowrap">{data.wind_speed} km/h</span></p>
                <p><span className="opacity-50">Visibilidade:</span> <span className="text-nowrap">{data.visibility / 1000} km</span></p>
                <p><span className="opacity-50">Nublado:</span> {data.clouds}%</p>
            </div>
        </div>
    );
};

export default CurrentWeatherCard;