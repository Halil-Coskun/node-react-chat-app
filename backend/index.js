const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

class Server {
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors({ origin: true }));
    this.port = process.env.PORT || 8081;
    this.initRoutes = this.initRoutes();
  }

  initRoutes() {
    this.app.post("/authenticate", async (req, res) => {
      const { username } = req.body;

      try {
        const r = await axios.put(
          "https://api.chatengine.io/users/",
          { username: username, secret: username, first_name: username },
          { headers: { "private-key": "4e0c9f77-6895-4bbf-9e14-3c0f8feb9781" } }
        );
        return res.status(r.status).json(r.data);
      } catch (err) { 
        return res.status(err.res.status).json(e.response.data);
      }

      return res.json({ username: username, pass: "secret" });
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();
