import React, { Component } from "react";
import ReactDOM from "react-dom";
import Head from "./components/head";
import ImageGrid from "./components/imageGrid";
import Config from "../config";

class Main extends Component {
  render() {
    const { flickrEndpoint, flickrApiKey, loadingGif } = Config
    return (
      <div className="container-fluid">
        <Head />
        <ImageGrid flickrApiKey={flickrApiKey} flickrEndpoint={flickrEndpoint} loadingGif={loadingGif} />
      </div>
    );
  }
}

export default Main;
