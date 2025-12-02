// scripts/fetch-as-text.js

// const gitHubPagesFrontendUrl = "https://artemkutsan.github.io/frontend";
// const localUrl = "http://localhost:5500";

export const fetchAsText = async (...urls) => {
  try {
    const requests = [...urls].map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to get data:' ${url}`);

      const textData = await response.text();

      return textData;
    });

    const results = await Promise.all(requests);

    return results;
  } catch (error) {
    console.log(error.message);
  }
};
