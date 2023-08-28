import { useState, useEffect } from "react";
import axios from "axios";
import { getWeather } from "../../utility";
import { styled } from "styled-components";

function Weather() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  const city = "Daegu";

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("잘못된 날씨 데이터:", error);
      }
    }

    fetchWeatherData();
  }, [city, apiKey]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather } = weatherData;
  const temperature = main.temp;
  const weatherMain = weather[0].main;

  return (
    <Container>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
        alt="날씨 아이콘"
      />
      <Group>
        <ItemText>{temperature} °C</ItemText>
        <ItemText>{getWeather(weatherMain)}</ItemText>
      </Group>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ItemText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

export default Weather;
