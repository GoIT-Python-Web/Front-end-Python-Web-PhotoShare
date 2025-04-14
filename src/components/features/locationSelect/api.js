import axios from "axios";

export const fetchCities = async (inputValue) => {
  if (!inputValue) return [];
  const GEO_API_KEY = import.meta.env.VITE_APP_GEO_API_KEY;
  const GEO_API_HOST = import.meta.env.VITE_APP_GEO_API_HOST;

  try {
    const response = await axios.get(`https://${GEO_API_HOST}/v1/geo/cities`, {
      params: {
        namePrefix: inputValue,
        sort: "-population",
        limit: 10,
      },
      headers: {
        "X-RapidAPI-Key": GEO_API_KEY,
        "X-RapidAPI-Host": GEO_API_HOST,
      },
    });

    return response.data.data.map((city) => ({
      value: city.id,
      label: `${city.name}, ${city.countryCode}`,
      lat: city.latitude,
      lon: city.longitude,
    }));
  } catch (error) {
    console.error("Помилка при завантаженні міст:", error);
    return [];
  }
};
