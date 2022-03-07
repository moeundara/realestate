import axios from "axios";
export const baseUrl = "https://bayut.p.rapidapi.com";
export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "75eb05cbc4msh17447ad7a13c007p17b2c4jsn4bceebd7c49d",
    },
  });
  return data;
};
