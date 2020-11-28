import React from 'react';
import './App.css';
import Test from './test';
// import TestBot from './test.bot';
import Image from './assets/test.png';
import Axios from 'axios';

window.onload = () => {
  window.scrollTo({
    top: 0, behavior: "smooth"
  })
}
class App extends React.Component {
  state = {
    isImageZoomed: false,
    image: Image,
    FAQ: [],
    languages: [],
    currentLanguageId: 1
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
    this.getFaq();
    Axios.get("http://localhost:8000/getlanguage").then(data => {
      let language_data = data.data;
      let languages = [];
      for (let key in language_data) {
        languages.push(language_data[key])
      }
      this.setState({ languages: languages, currentLanguageId: languages[0]['id'] }, () => {
      });
    })
  }
  getFaq(faq_language_id) {
    let currentId = faq_language_id ? faq_language_id : this.state.currentLanguageId;
    Axios.get('http://localhost:8000/get_faq?language=' + currentId).then(data => {
      this.setState({ FAQ: [].concat(...data.data['FAQ']) }, () => {
        console.log(this.state.FAQ)
        if (faq_language_id)
          this.setState({ currentLanguageId: faq_language_id })
      })
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

        {this.state.FAQ.length > 0 && <Test
          callback={this.test}
          FAQ={this.state.FAQ}
          handleDocumentUpload={this.handleDocumentUpload}
          languageId={this.state.currentLanguageId}
          setSize={this.callbacks} />}
        <img src={this.state.image} alt="" id="image"
          style={{
            height: "100vh",
            width: "auto"
          }} />
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
          }} />
        <div style={{
          position: "fixed",
          top: "20px",
          right: "50px",
          width: "100px",
          height: "50px",
          backgroundColor: "skyblue"
        }}>
          {this.state.languages.length > 0 && <select

            onChange={(event) => {
              event.persist();
              let selectedLanguageCode = event.target.value;
              let languages = [...this.state.languages];
              for (let language of languages) {
                if (language['code'] == selectedLanguageCode) {
                  this.getFaq(language['id']);
                  break;
                }
              }
            }}>
            {this.state.languages.map((language, index) => <option key={language['id']}> {language['code']}</option>)}
          </select>}

        </div>
        {/* <TestBot languages={this.state.languages}
          callback={this.test}></TestBot> */}
      </div>
    );
  }
}

export default App;
