export function fetchActivity() {
  // Select the DOM element to display the activity
  const activityEl = document.querySelector("#activity");

  // Function to fetch a random activity from the Bored API and display it on the page
  fetch("https://www.boredapi.com/api/activity/")
    .then((response) => response.json())
    .then((data) => {
      activityEl.textContent = data.activity;
    })
    .catch((error) => console.error(error));
}
