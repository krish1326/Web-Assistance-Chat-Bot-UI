import React from 'react';
import './App.css';
import Test from './test';
import Image from './assets/test.png'
import Axios from 'axios';

window.onload = () => {
  window.scrollTo({
    top: 0, behavior: "smooth"
  })
}

let FAQ = [];
class App extends React.Component {
  state = {
    isImageZoomed: false,
    image: Image,
    FAQ: []
  }
  inputRef = React.createRef();
  handleDocumentUpload = this.handleDocumentUpload.bind(this);
  callbacks = {
    "Displaying": () => { },
    "QR LOCATION ENTRY": () => {
      this.setStyles({ transform: "scale(2)", zoom: "0%" });
      window.scrollTo({ top: 0.17 * document.body.scrollHeight, behavior: "smooth" })
    },
    "Flow Facial Recognition": () => {
      this.setStyles({ transform: "scale(2)", zoom: "0%" });
      window.scrollTo({ top: 0.3 * document.body.scrollHeight, left: 0, behavior: "smooth" });
    },
    "FACE ENTRY": () => {
      this.setStyles({ transform: "scale(2)", zoom: "0%" });
      window.scrollTo({ top: 0.3 * document.body.scrollHeight, left: 0, behavior: "smooth" });
    },
    "Flow start": () => {
      this.setStyles({ transform: "scaleX(1.3) scaleY(2)", zoom: "0%" })
      window.scrollTo({ top: 0.02 * document.body.scrollHeight, left: 0, behavior: "smooth" });
    },
    "Flow Manual Authentication": () => {
      this.setStyles({ transform: "scale(2)", zoom: "0%" });
      window.scrollTo({ top: 0.02 * document.body.scrollHeight, left: 0, behavior: "smooth" });
    },
    "Location QR Code": () => {
      this.setStyles({ transform: "scale(2)", zoom: "0%" });
      window.scrollTo({ top: 0.17 * document.body.scrollHeight, behavior: "smooth" })
    },
    "QUIT": () => {
      this.setStyles({ height: "100vh", width: "auto", transform: "scale(1)", zoom: "0%" })
      window.scrollTo({ top: 0, behavior: "smooth" })
      this.setState({ isImageZoomed: false });
    },
    "ICOUNT": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" });
      window.scrollTo({
        left: 0.5 * document.body.scrollWidth,
        top: 0.15 * document.body.scrollHeight, behavior: "smooth"
      })
    },
    "ICHECK POINT SETUP": () => {
      this.setStyles({ transform: "scale(1)", zoom: "300%" });
      window.scrollTo({
        left: 0.05 * document.body.scrollWidth,
        top: 0.05 * document.body.scrollHeight
      })
    },
    "EMPLOYEE STATUS": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.28 * document.body.scrollWidth,
        top: 0.14 * document.body.scrollHeight
      })
    },
    "TEMPERATURE SETUP": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.22 * document.body.scrollWidth,
        top: 0.15 * document.body.scrollHeight
      })
    },
    "SEND DATA": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.4 * document.body.scrollWidth,
        top: 0.12 * document.body.scrollHeight
      })
    },
    "ENTRY STATUS": () => {
      this.setStyles({ transform: "scale(1)", zoom: "300%" });
      window.scrollTo({
        left: 0 * document.body.scrollWidth,
        top: 0.04 * document.body.scrollHeight
      })
    },
    "SHARE DATA REQUESTS": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" });
      window.scrollTo({
        left: 0.3 * document.body.scrollWidth,
        top: 0.02 * document.body.scrollHeight, behavior: "smooth"
      })
    },
    "SELECT REQUESTS": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" });
      window.scrollTo({
        left: 0.4 * document.body.scrollWidth,
        top: 0.02 * document.body.scrollHeight, behavior: "smooth"
      })
    },
    "ALLOW AUTHENTICATION": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.3 * document.body.scrollWidth,
        top: 0.5 * document.body.scrollHeight
      })
    },
    "AUTHENTICATE ID": () => {
      this.setStyles({ transform: "scale(1)", zoom: "400%" })
      window.scrollTo({
        left: 0.4 * document.body.scrollWidth,
        top: 0.5 * document.body.scrollHeight
      })
    },
    "AUTHENTICATE ID_4": () => {

    }
  }
  componentDidMount() {
    Axios.get('http://localhost:8000/get_faq').then(data => {
      this.setState({ FAQ: this.state.FAQ.concat(...data.data['FAQ']) })
    })
  }
  constructor(props) {
    super(props);
    this.test = this.test.bind(this);
  }
  test(value) {

    if (!this.state.isImageZoomed) {
      this.setStyles({ width: "100vw", height: "auto" })
      this.setState({ isImageZoomed: true });
    }
    this.callbacks[value]()
  }
  handleDocumentUpload() {
    this.inputRef.current.click();
  }
  setStyles(styles) {
    let elem = document.getElementById("image");
    for (let style in styles) {
      elem.style[style] = styles[style];
    }
  }

  render() {
    return (
      <div className="App">

        {this.state.FAQ.length > 0 && <Test setSize={this.test} FAQ={this.state.FAQ}
          handleDocumentUpload={this.handleDocumentUpload}></Test>}
        <img src={this.state.image} alt="" id="image" />
        <input
          type="file"
          name=""
          hidden={true}
          ref={this.inputRef}
          onChange={(event) => {
            event.persist();
            event.preventDefault();
            event.stopPropagation();
            let file = event.target.files[0];
            const data = new FormData();

            data.append('document', file);

            fetch('http://localhost:8000/upload', {
              method: 'POST',
              body: data
            }).then((response) => {
              console.log(response.json())
            }).catch(() => { });
            // Axios.post("http://localhost:8000/upload", file, {
            //   headers: {
            //     "Access-Control-Allow-Origin": "*"
            //   }
            // }).then(response => { console.log(response) })
          }} />
      </div>
    );
  }
}

export default App;
