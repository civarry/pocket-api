function showNewsContent() {
  fetch("html/news-content.html", {
    method: "GET",
    headers: { Upgrade: "HTTP/2.0" },
  })
    .then((response) => response.text())
    .then((html) => {
      contentContainer.innerHTML = html;

      const searchInput = document.getElementById("search-input");
      const searchButton = document.getElementById("search-button");
      const cardList = document.querySelector(".card-list");

      const defaultSearchQuery = "Philippines";

      getNewsData(defaultSearchQuery)
        .then((data) => {
          console.log(data);
          const articles = data.articles;
          const cardListItems = articles
            .map((article) => {
              const {
                title,
                urlToImage,
                url,
                description,
                publishedAt,
                author,
              } = article;
              return `
              <div class="card card-list__item">
                      <div class="card-image-container">
                        <img class="card-image" src="${urlToImage}" alt="${title}">
                      </div>
                      <div class="card-content">
                      <span class="card-date">${new Date(
                        publishedAt
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })} / ${author ? author.slice(0, 20) : "null"}</span>
                        <h3 class="card-title"><a href="${url}" target="_blank">${title}</a></h3>
                        <p class="card-description">${description}</p>
                      </div>
                    </div>
            `;
            })
            .join("");
          cardList.innerHTML = cardListItems;
        })
        .catch((error) => {
          console.log(error);
          // Handle the error
        });

      searchButton.addEventListener("click", () => {
        const searchQuery = searchInput.value;

        getNewsData(searchQuery)
          .then((data) => {
            const articles = data.articles;
            const cardListItems = articles
              .map((article) => {
                const {
                  title,
                  urlToImage,
                  url,
                  description,
                  publishedAt,
                  author,
                } = article;
                return `
              <div class="card card-list__item">
                      <div class="card-image-container">
                        <img class="card-image" src="${urlToImage}" alt="${title}">
                      </div>
                      <div class="card-content">
                      <span class="card-date">${new Date(
                        publishedAt
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })} / ${author ? author.slice(0, 20) : "null"}</span>
                        <h3 class="card-title"><a href="${url}" target="_blank">${title}</a></h3>
                        <p class="card-description">${description}</p>
                      </div>
                    </div>
            `;
              })
              .join("");
            cardList.innerHTML = cardListItems;
          })
          .catch((error) => {
            console.log(error);
            // Handle the error
          });
      });
    });
}
