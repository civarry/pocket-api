export function getNewsData(query) {
  const apiKey = "fd1e26876ed1484eb4f5d595ff52a19a";
  const url = `https://newsapi.org/v2/everything?q=${query}&from=2023-04-02&sortBy=publishedAt&apiKey=${apiKey}`;
  console.log(url);
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was a problem fetching weather data:", error);
      throw error;
    });
}
