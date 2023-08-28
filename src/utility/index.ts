export function getDate() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const month = date.getMonth() + 1;
  const mm = month;
  const day = date.getDate();
  const dd = day >= 10 ? day : `0${day}`;

  return `${yyyy}년 ${mm}월${dd}일`;
}

export function getWeather(data: string) {
  switch (data) {
    case "Thunderstorm":
      data = "뇌우";
      break;
    case "Drizzle":
      data = "이슬비";
      break;
    case "Rain":
      data = "비";
      break;
    case "Snow":
      data = "눈";
      break;
    case "Mist":
      data = "안개";
      break;
    case "Smoke":
      data = "연기";
      break;
    case "Haze":
      data = "실안개";
      break;
    case "Dust":
      data = "먼지";
      break;
    case "Fog":
      data = "안개";
      break;
    case "Sand":
      data = "모래먼지";
      break;
    case "Ash":
      data = "잿더미";
      break;
    case "Squall":
      data = "돌풍";
      break;
    case "Tornado":
      data = "회오리바람";
      break;
    case "Clear":
      data = "맑음";
      break;
    case "Clouds":
      data = "구름";
      break;
    default:
      console.error("잘못된 날씨 데이터입니다.");
      break;
  }

  return data;
}
