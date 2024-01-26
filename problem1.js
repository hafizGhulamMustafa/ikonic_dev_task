const axios = require("axios");

const contentDownload = async (urlArray) => {
  try {
    const downloadPromises = urlArray.map(async (url) => {
      const response = await axios.get(url);
      return response.data;
    });

    const downloadedContents = await Promise.all(downloadPromises);

    return downloadedContents;
  } catch (error) {
    console.error("Error downloading contents:", error.message);
    return [];
  }
};

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/posts/2",
  "https://jsonplaceholder.typicode.com/posts/3",
];

contentDownload(urls)
  .then((result) => {
    console.log("Downloaded contents:", result);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
