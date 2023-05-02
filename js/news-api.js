export async function getNewsData(query) {
  const apiKey = "fd1e26876ed1484eb4f5d595ff52a19a";
  const url = `https://newsapi.org/v2/everything?q=${query}&from=2023-04-02&sortBy=publishedAt&apiKey=${apiKey}`;
  console.log(url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem fetching news data:", error);
    throw error;
  }
}
