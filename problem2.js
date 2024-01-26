const axios = require("axios");

const dataFetch = async (urlArray) => {
  try {
    const response = await axios.get(urlArray);

    if (response.status === 200) {
      console.log("Data fetched successfully:", response.data);
      return response.data;
    } else {
      console.error("Unexpected HTTP status code:", response.status);
      throw new Error("Unexpected HTTP status code");
    }
  } catch (error) {
    if (error.response) {
      console.error("Server responded with an error:", error.response.status);
    } else if (error.request) {
      console.error("No response received from the server");
    } else {
      console.error("Error setting up the request:", error.message);
    }

    console.error("Original error:", error.message);
    throw new Error("Error fetching data from API");
  }
};

const exmpleEndPoint = "https://jsonplaceholder.typicode.com/posts/1";

dataFetch(exmpleEndPoint)
  .then((data) => {
    return data;
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
