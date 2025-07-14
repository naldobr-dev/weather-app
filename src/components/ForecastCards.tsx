import type { FC } from "react";
import type { ForecastItem, ForecastData } from "../types/types";

// Define as propriedades esperadas pelo componente
interface Props {
    items: ForecastItem[]; // Lista de itens de previsão detalhada
}

// Componente que exibe os cards de previsão dos próximos dias
const ForecastCards: FC<Props> = ({ items }) => {
    let forecastItems: ForecastData[] = []; // Lista de previsões simplificadas
    //let dates: string[] = [];
    let date = "";
    // Percorre os itens da previsão detalhada
    for (let item of items) {
        // Verifica se é um novo dia
        if (date != item.dt_txt.split(" ")[0]) {
            date = item.dt_txt.split(" ")[0];
            //dates.push(date)

            // Filtra todos os registros do mesmo dia
            const todayTemps = items.filter(
                (f_item) => f_item.dt_txt.startsWith(date)
            );

            // Garante que há registros suficientes para o dia
            if (todayTemps.length < 5) continue;

            // Calcula temperatura máxima, mínima e probabilidade de precipitação do dia
            const maxTemp = Math.round(Math.max(...todayTemps.map((item) => item.main.temp_max)));
            const minTemp = Math.round(Math.min(...todayTemps.map((item) => item.main.temp_min)));
            const pop = Math.round(Math.max(...todayTemps.map((item) => item.pop)));

            // O índice 4 é provavelmente do registro de 12:00
            const filteredItem: ForecastData = {
                str_date: new Date(todayTemps[0].dt * 1000).toLocaleDateString("pt-BR", { weekday: 'short' }),
                date: todayTemps[4].dt,
                max_temperature: maxTemp,
                min_temperature: minTemp,
                icon: todayTemps[4].weather[0].icon,
                description: todayTemps[4].weather[0].description,
                humidity: todayTemps[4].main.humidity,
                pop: Math.round(pop * 100) // POP vem como 0.0 ~ 1.0
            }
            // Adiciona o item simplificado à lista de previsões
            forecastItems.push(
                filteredItem
            )
        }
    }

    return (
        // Renderiza os cards de previsão
        <div className="flex flex-wrap justify-between mx-auto max-w-3xl items-center not-sm:ml-2.5 not-sm:mr-2.5 mt-2.5 rounded-xl text-cyan-50 p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
            {forecastItems.map((item, index) =>
                <div key={`${item.date}-${index}`} className="bg-slate-700 text-cyan-100 p-4 rounded shadow text-center space-y-1 sm:min-w-32 not-sm:min-w-36 mb-2">
                    {/* Dia da semana */}
                    <p className="text-cyan-100">{new Date(item.date * 1000).toLocaleDateString("pt-BR", { weekday: 'short' })}</p>
                    {/* Ícone do clima */}
                    <img
                        src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                        alt={item.description}
                        className="mx-auto w-16 h-16"
                    />
                    {/* Temperatura mínima/máxima */}
                    <p className="text-sm">
                        {item.min_temperature}° / {item.max_temperature}°
                    </p>
                    {/* Probabilidade de precipitação */}
                    <p className="text-xs text-blue-300">💧 {item.pop}%</p>
                </div>

            )}
        </div>
    );

};

export default ForecastCards