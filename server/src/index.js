const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");
const Url = require("./Url");
const utils = require("./Util/util");

// configure dotenv
dotenv.config();
const app = express();

// cors for cross-origin requests to the frontend application
const corsOptions = {
  origin: "*", // ou '*', para permitir de qualquer origem
  optionsSuccessStatus: 200, // Alguns navegadores antigos podem exigir isso
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// URL shortener endpoint
app.post("/short", async (req, res) => {
  console.log("HERE", req.body.url);
  const { origUrl, shortTitle } = req.body;
  const base = process.env.DOMAIN_URL;
  let urlId; // Declarada fora do escopo do if/else

  if (!shortTitle) {
    urlId = shortid.generate();
    console.log(urlId);
  } else {
    urlId = shortTitle;
    console.log(urlId);
  }
  if (utils.validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        console.log("Duplicada");
        return res.status(200).json(url);
      } else {
        const shortUrl = `${base}/${urlId}`; //
        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid Original Url");
  }
});

// redirect endpoint
app.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });

    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

//endpoint pra checar se existe um titulo no banco
app.post("/check-url", async (req, res) => {
  const { urlId } = req.body;

  try {
    const existingUrl = await Url.findOne({ urlId });

    if (existingUrl) {
      return res.status(400).json({ error: "URL já existe" });
    }

    return res.status(200).json({ message: "URL disponível" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Port Listenning on 3333
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
