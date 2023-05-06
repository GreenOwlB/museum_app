const express = require("express");
require("dotenv").config();

const PORT = 3001;

const app = express();

// example api request "https://www.rijksmuseum.nl/api/nl/collection?key=[api-key]&involvedMaker=Rembrandt+van+Rijn"
const api_key = process.env.apikey;
const url_base = "https://www.rijksmuseum.nl/api";
const language = "nl";
const involvedMaker = "Rembrandt+van+Rijn";

const page = 0;
const results = 5;
const imgonly = true;

const url = `${url_base}/${language}/collection?key=${api_key}&involvedMaker=${involvedMaker}&p=${page}&ps=${results}&imgonly=${imgonly}`;

app.get("/", async (req, res) => {
  try {
    const data = await fetch(url);
    if (data.ok) {
      const jsonData = await data.json();
      const resultArray = [];
      jsonData.artObjects.forEach((item) => {
        const resultObject = {
          title: item.title,
          longTitle: item.longTitle,
          artist: item.principalOrFirstMaker,
          image: item.webImage.url,
          width: item.webImage.width,
          height: item.webImage.height,
        };
        resultArray.push(resultObject);
      });

      res.status(200).send(JSON.stringify(resultArray));
    } else {
      res.status(404).send("could not fetch data");
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
