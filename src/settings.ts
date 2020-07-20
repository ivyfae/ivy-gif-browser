export const Settings = {
  giphy: {
    url: 'https://api.giphy.com/v1/gifs/',
    apiKey: '', // insert your API key here. See README.md for more information.
    limit: 50
  }
}

if(!Settings.giphy.apiKey) {
  const apiKeyError = 'You must provide a Giphy API key in settings.ts to run this application.';
  document.body.innerHTML = apiKeyError;
  throw apiKeyError;
}
