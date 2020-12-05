import React from 'react';
import { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = (props) => {
    const { transcript, resetTranscript } = useSpeechRecognition()
    useEffect(() => {
        if (props.userInteraction == true) {
            SpeechRecognition.startListening();
        }
        else {
            SpeechRecognition.stopListening();
            props.attachTranscript(transcript);
        }
    }, [props.userInteraction])
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }
    return (<React.Fragment></React.Fragment>)
}
export default Dictaphone