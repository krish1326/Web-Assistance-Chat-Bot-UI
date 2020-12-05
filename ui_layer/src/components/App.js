import React from 'react';
import '../styles/App.css';
import TestBot from './test_bot';
import Image from '../assets/test.png';
import Axios from 'axios';
import PresentOverlay from './upload_statues_overlay'
window.onload = () => {
  window.scrollTo({
    top: 0, behavior: "smooth"
  })
}
const SUCESS_USER_TEXT = "Document has been uploaded sucessfully!";
const FAILURE_USER_TEXT = "Document upload failed";
class App extends React.Component {
  callbacks = {};
  state = {
    botData: null,
    FAQ: [],
    languages: [],
    currentLanguageId: 1,
    isuplaodSucess: false,
    userText: ''
  }
  dummyRef = React.createRef();
  inputRef = React.createRef();
  handleDocumentUpload = this.handleDocumentUpload.bind(this);
  createText = this.createText.bind(this);
  getAvailableLanguages = this.getAvailableLanguages.bind(this);
  componentDidMount() {
    // this.getFaq();
    this.createText(1);
    this.getAvailableLanguages();
  }

  getAvailableLanguages() {
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
  createText(languageId) {
    Axios.get('http://localhost:8000/get_change_text' + "?language=" + languageId).then(data => {
      let botData = {};
      let flows = data.data['FLOWS'];
      let faq = data.data['FAQ'];
      botData[0] = flows['INITAL'];
      let total_data = flows['TOTAL'];
      let other_data = data.data['OTHER'];
      botData = { "-1": { ...other_data }, ...botData, ...total_data };
      let others = { ...total_data, ...flows['INITAL'] }

      this.createSteps(botData, faq);
    })
  }
  createSteps(bot_data, FAQ) {
    let steps = {};

    for (let key in bot_data) {

      for (let inside_key in bot_data[key]) {
        if (key == -1) {
          if (!steps['others'])
            steps['others'] = {}
          steps['others'][inside_key] = bot_data[key][inside_key];
        }
        else {
          if (!steps[inside_key]) {
            steps[inside_key] = {}
            steps[inside_key]['command'] = bot_data[key][inside_key]['command'] ? bot_data[key][inside_key]['command'] : bot_data[key][inside_key];
            steps[inside_key]['help'] = bot_data[key][inside_key]['help'];
            if (!this.callbacks[inside_key]) {
              this.callbacks[inside_key] = () => {
                this.setStyles(bot_data[key][inside_key]['Position']);
              }

            }
          }
        }
      }
    }
    this.setState({ botData: steps, FAQ: FAQ }, () => {
      console.log(this.state.botData);
    });
  }

  constructor(props) {
    super(props);
    this.test = this.test.bind(this);

  }
  test(value) {
    this.callbacks[value]()
  }
  handleDocumentUpload() {
    this.inputRef.current.click();
  }
  setStyles(styles) {
    let elem = document.getElementById("image");
    console.log(styles);
    if (styles['isHome']) {
      elem.style.height = "100vh";
      elem.style.width = "auto";
      elem.style.transform = `scale(1)`
      elem.style.zoom = "0%";
      return;

    }
    elem.style.width = '100vw';
    elem.style.height = "auto";
    let scale = styles['scale'] == 0 ? 1 : styles['scale'];
    elem.style.transform = `scale(${scale})`
    elem.style.zoom = styles['zoom'];
    window.scrollTo({
      top: styles['top'] * document.body.scrollHeight,
      left: styles['left'] * document.body.scrollWidth,
    })
  }
  uploadDocument(event) {
    let file = event.target.files[0];
    const data = new FormData();
    data.append('document', file);
    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data
    }).then((response) => {
      console.log(response.body);
      if (response.status == 200) {
        this.setState({ isuplaodSucess: true, userText: SUCESS_USER_TEXT }, () => {
          window.setTimeout(() => {
            this.setState({ isuplaodSucess: false })
          }, 2000)
        })
      }
    }).catch((response) => {
      this.setState({
        isuplaodSucess: true, userText: FAILURE_USER_TEXT
      }, () => {
        window.setTimeout(() => {
          this.setState({ isuplaodSucess: false })
        }, 2000)
      })
      console.log(response)
    });
  }

  render() {
    return (
      <div className="App">
        <React.Fragment>
          {/* <div id="bot"></div> */}
          <div
            ref={this.dummyRef}>
            {this.state.FAQ.length > 0 && this.state.botData != null && <TestBot
              bot_data={this.state.botData}
              FAQ={this.state.FAQ}
              handleDocumentUpload={this.handleDocumentUpload}
              languageId={this.state.currentLanguageId}
              setSize={this.test} />}
          </div>
        </React.Fragment>
        <img src={Image} alt="" id="image"
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
            this.uploadDocument(event);
          }} />
        <div hidden={!this.state.isuplaodSucess}
        >
          <PresentOverlay userText={this.state.userText} />
        </div>

        {/* <div style={{
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
                  this.createText(language['id']);
                  // this.getFaq(language['id']);
                  break;
                }
              }
            }}>
            {this.state.languages.map((language, index) => <option key={language['id']}> {language['code']}</option>)}
          </select>}

        </div> */}
        {/* <TestBot languages={this.state.languages}
          callback={this.test}></TestBot> */}
      </div>
    );
  }
}

export default App;
