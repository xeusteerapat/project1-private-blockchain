/**
 *                 ApplicationServer
 *             (Do not change this code)
 * Require Modules to setup the REST Api
 * - `express` Express.js is a Web Framework
 * - `morgan` Isn't required but help with debugging and logging
 * - `body-parser` This module allows to parse the body of the post request into a JSON
 */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
/**
 * Require the Blockchain class. This allow us to have only one instance of the class.
 */
const BlockChain = require("./src/blockchain.js");

class ApplicationServer {
  constructor() {
    //Express application object
    this.app = express();
    //Blockchain class object
    this.blockchain = new BlockChain.Blockchain();
    //Method that initialized the express framework.
    this.initExpress();
    //Method that initialized middleware modules
    this.initExpressMiddleWare();
    //Method that initialized the controllers where you defined the endpoints
    this.initControllers();
    //Method that run the express application.
    this.start();
  }

  initExpress() {
    this.app.set("port", 8000);
  }

  initExpressMiddleWare() {
    this.app.use(morgan("dev"));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }

  initControllers() {
    require("./BlockchainController.js")(this.app, this.blockchain);
  }

  start() {
    let self = this;
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server Listening for port: ${self.app.get("port")}`);
    });
  }
}

new ApplicationServer();
