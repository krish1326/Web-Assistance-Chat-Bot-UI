import React from 'react';
import Recorder_button from '../assets/Recorder.svg'
import SendButton from '../assets/send_button.png'
import image_upload_button from '../assets/upload_icon.jpg'
import '../styles/testbot.css';
import Dictaphone from './recording';
import BotImage from '../assets/bot_icon.png';
URL = window.URL || window.webkitURL;
let current_position = 0;
let isVoiceGettingRecognised = true;
class TestBot extends React.Component {
    state = {
        isRecording: false
    }
    constructor(props) {
        super(props);
        this.openChatWindow = this.openChatWindow.bind(this);
        this.hideChatWindow = this.hideChatWindow.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.createElement = this.createElement.bind(this);
        this.getServerResults = this.getServerResults.bind(this);
        this.createOptionsForUser = this.createOptionsForUser.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.clearChatWindow = this.clearChatWindow.bind(this);
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
    componentDidUpdate(prevProps) {
        if (this.props.languageId != prevProps.languageId && prevProps.languageId != null) {
            this.clearChatWindow();
        }
    }
    openChatWindow() {
        document.getElementById("chat-container").style.visibility = "visible";
        document.getElementById("provide-background").style.visibility = "visible";
        let elem = document.getElementById('chat-body')
        if (elem.childNodes.length == 0)
            this.createElement(this.props.bot_data['others'][1]);
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
            if (!this.state.isRecording) {
                (document.getElementById("chat-text")).disabled = true;
                this.setState({ isRecording: true });
                this.startRecording();
            }
            else {
                (document.getElementById("chat-text")).disabled = false;
                this.setState({ isRecording: false });
                this.stopRecording();
            }
        }
    }
    clearChatWindow() {

        let parent = document.getElementById('chat-body');
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
        // this.createElement(this.props.bot_data['others'][1])
    }
    createElement(currentMessage, isMessageFromUser, isFAQ) {
        let elem = document.createElement('p');
        elem.innerHTML = currentMessage;
        if (isFAQ) {
            elem.className = 'faq-message';
        }
        else
            elem.className = isMessageFromUser ? 'message-by-user' : 'message-from-server';
        document.getElementById("chat-body").appendChild(elem);
        window.setTimeout(() => {
            elem.scrollIntoView({
                behavior: "smooth",
            })
        }, 1000);
    }
    createOptionsForUser(options) {
        let container = document.createElement('div');
        let unable_to_understand_header = document.createElement('div');
        unable_to_understand_header.className = 'unable_to_understand_header_styles';
        unable_to_understand_header.innerText = this.props.bot_data['others']['3'];
        container.appendChild(unable_to_understand_header);
        let elem = document.createElement('div');
        elem.className = 'styles_for_Grid';
        options.forEach(option => {
            let element = document.createElement('div');
            element.innerText = this.props.bot_data[option]['command'];
            element.addEventListener('click', () => {
                current_position = option;
                this.props.setSize(current_position);
                this.createElement(this.props.bot_data[option]['command'], false, null)

            })
            element.className = 'styles_for_grid_Item actionable_item';
            elem.appendChild(element);
        })
        container.appendChild(elem)
        document.getElementById("chat-body").appendChild(container);
        window.setTimeout(() => {
            container.scrollIntoView({
                behavior: "smooth",
            })
        }, 10);
    }
    getServerResults(userText) {
        if (userText.toLowerCase() == 'faq') {
            this.props.FAQ.forEach(faq => {
                this.createElement(faq['Question'] + '\n' + faq['Answer'], false, true);
            })
        }
        else
            fetch("http://localhost:8000/bot_text?user_message=" + userText + "&current_position=" + current_position + "&language=" + this.props.languageId).then(response => response.json())
                .then(data => {
                    let responseData = data;
                    if (responseData['action'] == "No Option") {
                        return;
                    }
                    if (responseData['action'] == "Unable to understand") {
                        this.createOptionsForUser(responseData['action_name'])
                    }
                    else {
                        if (data['action'] == "greet") {
                            this.createElement(responseData['action_name'], false);
                            return;
                        }
                        if (data['action'] == 'click' && typeof responseData['action_name'] == 'string') {
                            current_position = responseData['action_name'] != -1 ? responseData['action_name'] : (function (current_position) {
                                console.log(current_position)
                                let arr = current_position.toString().split('.');
                                if (arr.length == 1) {
                                    return current_position - 1;
                                }
                                arr.splice(arr.length - 1);
                                return arr.join('.');
                            })(current_position)
                        }
                        console.log(current_position);
                        // this.createElement(responseData['action_name'], false);
                        if (responseData['action_name'] != 'greet' && current_position >= 0)
                            this.props.setSize(current_position)
                        // if (responseData['action_name'] == -1) {
                        //     this.props.setSize(current_position)
                        // }
                    };
                    document.getElementById('chat-text').focus();
                });
    }
    startRecording() {
        this.setState({ record: true, isRecording: true });

    }
    stopRecording() {
        this.setState({ record: false, isRecording: false });
    }
    attachTranscript(text) {
        document.getElementById('chat-text').value = text;
        if (text.length > 0)
            document.getElementById('chat-icon').setAttribute('src', SendButton);
    }
    render() {
        return (<React.Fragment>
            <img src={BotImage} data-toggle="tooltip" title="chat with me!!" className="bot-icon-styles" alt="not-found" onClick={this.openChatWindow} />


            <div className="chat" id="chat-container">
                <div className="chat-header">
                    <p className="chat-header-text">Support Bot</p>
                    <div id="bot" className="actionable_item" data-toggle="tooltip" title="Help!" onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(this.props.bot_data[current_position]['help'], '_blank')
                    }}
                    >?</div>
                    <span className="chat-close-icon actionable_item" onClick={this.hideChatWindow}>X</span>
                </div>
                <div id="chat-body">
                </div>
                <div className="chat-footer">
                    <input type="text" name="chat" id="chat-text" placeholder="Type your message"
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
                    <img src={image_upload_button} className="image_upload_button_styles" onClick={() => {
                        this.props.handleDocumentUpload();
                    }}></img>
                    <img src={Recorder_button} className="chat-icon actionable_item" id="chat-icon" alt=""
                        onClick={this.showMessage} />
                </div>

            </div>
            <div id="provide-background" onClick={this.hideChatWindow}></div>
            <Dictaphone userInteraction={this.state.isRecording}
                attachTranscript={this.attachTranscript}></Dictaphone>

        </React.Fragment>)
    }
}
export default TestBot;