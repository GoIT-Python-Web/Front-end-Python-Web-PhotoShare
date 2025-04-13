import axios from "axios";

const GEO_API_KEY = "42868704b2msh9d72fa62ed89632p16e643jsn062e4be6cddb";
const GEO_API_HOST = "wft-geo-db.p.rapidapi.com";

export const fetchCities = async (inputValue) => {
  if (!inputValue) return [];

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
