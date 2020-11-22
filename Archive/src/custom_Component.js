import Axios from 'axios';
import React from 'react';
const obj = require('./some').obj;
const steps = {
    0: 'Displaying',
    1: 'Flow start',
    2: "Flow Manual Authentication",
    3: "Location QR Code",
    4: "Flow Facial Recognition",
    1.1: "ICOUNT",
    1.2: "ICHECK POINT SETUP",
    1.3: "FACE ENTRY",
    1.4: "QR LOCATION ENTRY",
    2.1: "EXIT MANUAL AUITHENTICATION",
    2.2: "FACE ENTRY",
    2.3: "QR LOCATION ENTRY",
    "-1": "unable to understand",
    'exit': ""
}

class CustomComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        Axios.get("http://localhost:8000/bot?user_message=" + this.props.previousStep.message + "&current_position=" + this.props.currentPostion).then(data => {

            let next_step = null;
            console.log(typeof data.data['action_name']);
            if (typeof data.data['action_name'] == "string") {
                console.log("hello")
            }
            if (data.data['action'] == "Unable to understand") {
                next_step = -1;
            }
            else next_step = data.data['action_name'];
            console.log(next_step)
            this.props.triggerNextStep({
                value: "hello", trigger: () => {

                    console.log(steps[next_step]);
                    if (next_step != -1) this.props.triggerAction(steps[next_step])
                    return next_step == -1 ? "unable to understand" : steps[next_step] + " Options"
                }
            });
        })
    }
    render() {
        return null;
    }
}

export default CustomComponent;

