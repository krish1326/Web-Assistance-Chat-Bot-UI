import React from 'react';
import Recorder_button from './assets/Recorder.svg'
import SendButton from './assets/send_button.png'
import './testbot.css'

const obj = {
    "0": "quit",

    "1": "Flow start",
    "2": "Flow manual authentication",



    "3": {
        "val": "FLOW LOCATION QR CODE",

    },
    "4": {
        "val": "FLOW FACIAL RECOGNITION",
        callback: () => {
            this.setStyles({ width: "100vw", height: "auto", transform: "scale(2)", zoom: "0%" });
            window.scrollTo({ top: 0.3 * document.body.scrollHeight, left: 0, behavior: "smooth" });
        }
    },
    "1.1": {
        "val": "ICOUNT"
    },
    "1.2": {
        "val": "ICHECKPOINT SETUP"
    },
    "1.3": {
        "val": "FACE ENTRY"
    },
    "1.4": {
        "val": "QR LOCATION ENTRY"
    },
    "2.1": {
        "val": "EXIT MANUAL AUITHENTICATION"
    },
    "2.2": {
        "val": "FACE ENTRY"
    },
    "2.3": {
        "val": "QR LOCATION ENTRY"
    },
    "3.1": {
        "val": "ALLOW AUTHENTICATION"
    },
    "4.1": {
        "val": "AUTHENTICATE ID"
    },
    "1.1.1": {
        "val": "SLIDE TO NEXT SIDE"
    },
    "1.2.1": {
        "val": "SHARE DATA REQUESTS"
    },
    "1.2.2": {
        "val": "EMPLOYEE STATUS"
    },
    "1.2.3": {
        "val": "TEMPERATURE SETUP"
    },
    "1.2.4": {
        "val": "SEND DATA"
    },
    "1.2.5": {
        "val": "ENTRY STATUS"
    },
    "3.1.1": {
        "val": "AUTHENTICATE ID"
    },
    "4.1.1": {
        "val": "SCAN FACE ID"
    },
    "4.1.2": {
        "val": "FACE AUTHENTICATED"
    },
    "1.2.1.1": {
        "val": "ADD NEW"
    },
    "1.2.1.1.1": {
        "val": "SAVE"
    },
    "1.2.1.1.2": {
        "val": "MANDATORY DATA"
    },
    "1.2.1.1.3": {
        "val": "CANCEL"
    },
    "1.2.1.1.2.1": {
        "val": "SELECT REQUESTS"
    },
    "1.2.1.1.2.1.1": {
        "val": "SAVE"
    },
    "1.2.1.1.2.1.2": {
        "val": "CANCEL"
    },
    "1.2.2.1": {
        "val": "ADD NEW"
    },
    "1.2.4.1": {
        "val": "DELETE DATA"
    },
    "1.2.5.1": {
        "val": "ADD NEW"
    },
    "-1": {
        "val": "back"
    }
}
URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia() 
var rec;
//Recorder.js object 
var input;
//MediaStreamAudioSourceNode we'll be recording 
// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;
let current_position = 0;
let isVoiceGettingRecognised = true;
class TestBot extends React.Component {

    // pauseButton.addEventListener("click", pauseRecording);
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
        this.openChatWindow = this.openChatWindow.bind(this);
        this.hideChatWindow = this.hideChatWindow.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.createElement = this.createElement.bind(this);
        this.getServerResults = this.getServerResults.bind(this);
        this.createOptionsForUser = this.createOptionsForUser.bind(this);
        this.setStyles = this.setStyles.bind(this);
        this.createDownloadLink = this.createDownloadLink.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', (event) => {
            if (event.code == 'Enter') {
                this.showMessage()
            }
            if (event.code == 'Escape')
                this.hideChatWindow();
        })
    }
    openChatWindow() {
        document.getElementById("chat-container").style.visibility = "visible";
        document.getElementById("provide-background").style.visibility = "visible";
    }
    hideChatWindow(event) {
        document.getElementById('chat-container').style.visibility = 'hidden';
        document.getElementById("provide-background").style.visibility = 'hidden';
    }
    showMessage() {

        let input = document.getElementById("chat-text");
        let currentMessage = input.value;
        if (currentMessage.length > 0) {
            input.value = null;
            input.blur();
            document.getElementById('chat-icon').setAttribute('src', Recorder_button);
            this.createElement(currentMessage, true);
            this.getServerResults(currentMessage);
        }
        else {
            if (!rec) {
                (document.getElementById("chat-text")).disabled = true;
                this.startRecording();
            }
            else {
                (document.getElementById("chat-text")).disabled = false;
                this.stopRecording();
            }
        }
    }
    createElement(currentMessage, isMessageFromUser) {
        let elem = document.createElement('p');
        elem.innerText = currentMessage;
        elem.className = isMessageFromUser ? 'message-by-user' : 'message-from-server';
        document.getElementById("chat-body").appendChild(elem);
        elem.scrollIntoView({
            behavior: "smooth",
        })
    }
    createOptionsForUser(options) {
        let elem = document.createElement('div');
        elem.className = 'styles_for_Grid';
        options.forEach(option => {
            let element = document.createElement('div');
            element.innerText = obj[option]['val'];
            element.className = 'styles_for_grid_Item actionable_item';
            elem.appendChild(element);
        })
        document.getElementById("chat-body").appendChild(elem);
        elem.scrollIntoView({
            behavior: "smooth",
        })
    }
    setStyles(styles) {
        let elem = document.getElementById("image");
        for (let style in styles) {
            elem.style[style] = styles[style];
        }
    }
    getServerResults(userText) {
        fetch("http://localhost:8000/bot_text?user_message=" + userText + "&current_position=" + current_position + "&language=" + this.props.languageId).then(response => response.json())
            .then(data => {
                let responseData = data;
                console.log(responseData['action_name'])
                if (responseData['action'] == "Unable to understand") {
                    this.createOptionsForUser(responseData['action_name'])
                }
                else {
                    this.createElement(responseData['action_name'], false);

                    this.props.callback(obj[responseData['action_name']])

                    // current_position = responseData['action_name'] != -1 ? responseData['action_name'] : current_position - 1
                };
                console.log(data);
            });
    }
    startRecording() {
        audioContext = new AudioContext();
        var constraints = {
            audio: true,
            video: false
        }
        /* We're using the standard promise based getUserMedia()
        
        https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia */

        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
            /* assign to gumStream for later use */
            gumStream = stream;
            /* use the stream */
            input = audioContext.createMediaStreamSource(stream);
            /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
            // rec = new Recorder(input, {
            //     numChannels: 1
            // })
            //start the recording process 
            rec.record()
            console.log("Recording started");
        }).catch(function (err) {

        });
    }
    stopRecording() {
        console.log("here i am in stop block")
        rec.stop(); //stop microphone access 
        gumStream.getAudioTracks()[0].stop();
        //create the wav blob and pass it on to createDownloadLink 
        rec.exportWAV(this.createDownloadLink);
        rec = null;
    }
    createDownloadLink(blob) {
        var url = URL.createObjectURL(blob);
        var au = document.createElement('audio');
        var link = document.createElement('a');
        au.controls = true;
        au.src = url;
        au.className = "styles_for_audio_in_chat_bot"
        document.getElementById("chat-body").appendChild(au);
        au.scrollIntoView({ behavior: "smooth" })
        //user_message,current_position,language
        var formData = new FormData();
        var filename = new Date().toISOString();
        formData.append('user_message', blob, filename);
        formData.append('language', 1);
        formData.append('current_position', current_position);
        fetch("http://localhost:8000/bot_voice", {
            method: "post",
            body: formData
        }).then(response => {
            console.log(response)
        }).catch((error) => {
            console.log(error);
        })
        // link.href = url;
        // console.log(url)
        // link.download = new Date().toISOString() + '.wav';
        // link.innerHTML = link.download;
    }
    render() {
        return (<React.Fragment>

            <div id="bot" className="actionable_item" onClick={this.openChatWindow}>?</div>
            <div className="chat" id="chat-container">
                <div className="chat-header">
                    <p className="chat-header-text">Chat</p>
                    <span className="chat-close-icon actionable_item" onClick={this.hideChatWindow}>X</span>
                </div>
                <div id="chat-body">

                </div>
                <div className="chat-footer">
                    {/* <select className="select-chat-language">
                        {Array.from(this.props.languages).map((language, index) => {
                            return <option
                                key={index}>{language['code']}</option>
                        })}
                    </select> */}
                    <input type="text" name="chat" id="chat-text" placeholder="Type your message"
                        ref={this.inputRef}
                        onInput={(event) => {
                            event.persist();
                            if (event.target.value.length > 0 && isVoiceGettingRecognised) {
                                isVoiceGettingRecognised = false;
                                document.getElementById('chat-icon').setAttribute('src', SendButton);
                            }
                            else if (event.target.value.length == 0) {
                                isVoiceGettingRecognised = true;
                                document.getElementById('chat-icon').setAttribute('src', Recorder_button);
                            }
                        }}
                    />
                    <img src={Recorder_button} className="chat-icon actionable_item" id="chat-icon" alt=""
                        onClick={this.showMessage} />
                </div>

            </div>
            <div id="provide-background" onClick={this.hideChatWindow}></div>


        </React.Fragment>)
    }
}
export default TestBot;