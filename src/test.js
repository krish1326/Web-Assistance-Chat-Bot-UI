import React from 'react';
import ChatBot from 'react-simple-chatbot';
import CustomComponent from './custom_Component';

const config = {
    width: "300px",
    height: "400px",
    floating: true
};

let answers = {};
class Test extends React.Component {

    backAndQuit = (backString) => {
        return [{
            value: "Back",
            label: "Back",
            trigger: () => {
                return backString
            }
        },
        {
            value: "quit",
            label: "quit",
            trigger: () => {
                this.props.setSize("QUIT")
                return "Done";
            }
        }]
    }
    createStepsForFAQ(faq) {
        let return_value = {
            questions: [],
            answers: []
        };
        Array.from(faq).forEach(qna => {
            let question = qna['Question'];
            let answer = qna['Answer'];
            let answer_id = Math.random().toString(16).slice(2, 8);
            let question_id = Math.random().toString(16).slice(2, 8);


            let answer_step = {
                id: answer_id,
                label: answer
            }
            let question_step = {
                id: question_id,
                label: "Q: " + question + "A: " + answer,
                trigger: () => {
                    return "Displaying Options"
                }
            }
            return_value.questions.push(question_step)
            return_value.answers.push(answer_step);
        })
        return_value.questions.push(...this.backAndQuit("Displaying Options"))
        return return_value;

    }
    triggerAction = (value) => {
        this.props.setSize(value);
    }


    step(value) {
        console.log(value);
    }


    steps = [
        {
            id: "Greet",
            message: "Hello, Welcome to our terminal",
            trigger: "Ask Name"
        },

        {
            id: "Ask Name",
            message: "where do you want me to take?",
            trigger: "user Input"
        },
        {
            id: "user Input",
            user: true,
            validator: (value) => {
                if (value.length == 0) {
                    return 'please enter some search string!!'
                }
                return true
            },
            trigger: '3'
        },
        {
            id: '3',
            component: <CustomComponent currentPostion="0"
                triggerAction={this.triggerAction}
                language={this.props.languageId}
            />,
            waitAction: true,
            replace: true,

        },
        {
            id: "Displaying Options",
            options: [
                {
                    value: "Flow start",
                    label: "Flow start",
                    trigger: () => {
                        this.props.setSize("Flow start")
                        return "Flow start Options"
                    }
                },
                {
                    value: "Flow Manual Authentication",
                    label: "Manual Authentication",
                    trigger: () => {
                        this.props.setSize("Flow Manual Authentication")
                        return "Flow Manual Authentication Options"
                    }
                }, {
                    value: "Location QR Code",
                    label: "Location QR Code",
                    trigger: () => {
                        this.props.setSize("Location QR Code");
                        return "FLOW LOCATION QR CODE OPTIONS"
                    }
                },
                {
                    value: " Facial Recognition",
                    label: " Facial Recognition",
                    trigger: () => {
                        this.props.setSize("Flow Facial Recognition")
                        return "Flow facial recognition options"
                    }
                },
                {
                    value: "Upload Documents",
                    label: "upload documents",
                    trigger: () => {
                        this.props.handleDocumentUpload();
                        return "Displaying Options"
                    }
                },
                {
                    value: "FAQ",
                    label: "FAQ",
                    trigger: () => {
                        return "FAQ Options"
                    }
                },

                {
                    value: "quit",
                    label: "quit",
                    trigger: () => {
                        this.props.setSize("QUIT")
                        return "Done";
                    },
                }
            ]
        },
        {
            id: "Flow start Options",
            user: true,
            trigger: "4"
        },
        {
            id: "4",
            component: <CustomComponent currentPostion="1"
                triggerAction={this.triggerAction}
                language={this.props.languageId} />,
            waitAction: true,
            replace: true,
        },
        {
            id: "FAQ Options",
            options: [...this.createStepsForFAQ(this.props.FAQ)['questions']]
        },

        {
            id: "ICOUNT Options",
            options: [
                ...this.backAndQuit("Flow start Options")
            ]
        },
        {
            id: "FACE ENTRY Options",
            options: [...this.backAndQuit("backAndQuit Options_ICheckPoint Setup options")]
        },
        {
            id: "QR LOCATION ENTRY Options",
            options: [...this.backAndQuit('backAndQuit Options_ICheckPoint Setup options')]
        },
        {
            id: "ICHECK POINT SETUP Options",
            options: [
                {
                    value: "EMPLOYEE STATUS",
                    label: "Employee status",
                    trigger: () => {
                        this.props.setSize("EMPLOYEE STATUS")
                        return 'backAndQuit Options_ICheckPoint Setup options'
                    }
                },
                {
                    value: 'TEMPERATURE SETUP',
                    label: 'Temperature setup',
                    trigger: () => {
                        this.props.setSize("TEMPERATURE SETUP")
                        return 'backAndQuit Options_ICheckPoint Setup options';
                    }
                },
                {
                    value: 'SEND DATA',
                    label: 'Send data',
                    trigger: () => {
                        this.props.setSize("SEND DATA")
                        return 'backAndQuit Options_ICheckPoint Setup options'
                    }
                },
                {
                    value: 'ENTRY STATUS',
                    label: 'Entry status',
                    trigger: () => {
                        this.props.setSize("ENTRY STATUS")
                        return 'backAndQuit Options_ICheckPoint Setup options'
                    }
                },
                ...this.backAndQuit("Flow start Options")
            ]
        },
        {
            id: "backAndQuit Options_ICheckPoint Setup options",
            options: [...this.backAndQuit("ICHECK POINT SETUP Options")]
        },
        {
            id: "Flow Manual Authentication Options",
            // label: "where do you want me to take?",
            user: true,
            trigger: '5',

        },
        {
            id: '5',
            component: <CustomComponent currentPostion="2"
                triggerAction={this.triggerAction}
                language={this.props.languageId} />,
            waitAction: true,
            replace: true,
        },
        {
            id: "FLOW LOCATION QR CODE OPTIONS",
            options: [
                {
                    value: 'ALLOW AUTHENTICATION',
                    label: 'ALLOW AUTHENTICATION',
                    trigger: () => {
                        this.props.setSize("ALLOW AUTHENTICATION");
                        return "ALLOW AUTHENTICATION OPTIONS"
                    }
                },
                ...this.backAndQuit("Ask Name")
            ]
        }, {
            id: "ALLOW AUTHENTICATION OPTIONS",
            options: [
                {
                    value: 'AUTHENTICATE ID',
                    label: 'AUTHENTICATE ID',
                    trigger: () => {
                        this.props.setSize("AUTHENTICATE ID");
                        return 'backAndQuit Options_AUTHENTICATE ID'
                    }
                },
                {
                    value: "Back",
                    label: "Back",
                    trigger: "FLOW LOCATION QR CODE OPTIONS"
                },
                {
                    value: "quit",
                    label: "quit",
                    trigger: () => {
                        this.props.setSize("QUIT")
                        return "Done";
                    }
                }
            ]
        },
        {
            id: "backAndQuit Options_AUTHENTICATE ID",
            options: [
                ...this.backAndQuit("ALLOW AUTHENTICATION OPTIONS")
            ]
        },
        {
            id: "backAndQuit Options_Flow_START",
            options: [
                ...this.backAndQuit("Flow start Options")
            ]
        },
        {
            id: "SHARE DATA OPTIONS",
            options: [{
                value: "SELECT REQUESTS",
                label: "Select requests",
                trigger: () => {
                    this.props.setSize("SELECT REQUESTS");
                    return 'backAndQuit Options_Flow_START';
                },
            }, ...this.backAndQuit("Flow start Options")]
        },
        {
            id: "Flow facial recognition options",
            options: [
                {
                    value: "AUTHENTICATE ID_4",
                    label: 'AuThenticate Id',
                    trigger: () => {
                        this.props.setSize("AUTHENTICATE ID_4");
                        return 'backAndQuit Options_Flow_START'
                    }
                },
                {
                    value: ""
                }
            ]
        },
        {
            id: "unable to understand",
            message: "The recommended suggestions for the text input are:",
            trigger: (value) => {
                return "Displaying Options"
            }
        },
        {
            id: "Done",
            message: "Have a great day !!",

            end: true
        },


    ];
    state = {
        steps: this.steps,
    }
    constructor(props) {
        super(props);
        this.createStepsForFAQ = this.createStepsForFAQ.bind(this);
        this.chatbotRef = React.createRef();
    }
    componentDidUpdate(prevProps) {
        if (this.props.languageId != prevProps.languageId && prevProps.languageId != null) {
            let steps = [...this.state.steps];
            for (let step of steps) {
                if (step.id == "FAQ Options") {
                    step.options = [...this.createStepsForFAQ(this.props.FAQ)];
                    this.setState({ steps: steps });
                    break;
                }

            }

            // <div><ChatBot
            //     ref={this.chatbotRef}
            //     steps={this.steps} {...config} handleEnd={this.step}
            //     recognitionEnable={true}
            //     speechSynthesis={{ enable: true, lang: 'en' }}
            //     floating={true}
            //     handleInput={this.step} /></div>
            // new_element.appendChild(new_custom_bot_element);
            // while (element.firstChild) {
            //     console.log(element.firstChild);
            //     element.remove(element.firstChild);
            // }

        }

    }



    render() {
        return (<div id="bot-custom">
            <ChatBot
                ref={this.chatbotRef}
                steps={this.state.steps} {...config} handleEnd={this.step}
                recognitionEnable={true}
                speechSynthesis={{ enable: true, lang: 'en' }}
                floating={true}

                handleInput={this.step} />
        </div>)
    }
}

export default Test;