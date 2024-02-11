export async function fetchData() {
  const username = process.env.VUE_APP_USERNAME;
  const password = process.env.VUE_APP_PASSWORD;
  const apiUrl = process.env.VUE_APP_API_URL;

  const headers = new Headers();
  headers.set("Authorization", "Basic " + btoa(`${username}:${password}`));

  const fetchedData = await fetch(apiUrl, { method: "GET", headers: headers })
    .then((response) => response.json())
    .then((data) => data);

  return fetchedData;
}
