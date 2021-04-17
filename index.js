// init speechSynth API
const synth = window.speechSynthesis;      

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    // loop through voices and create one an option for each one
    voices.forEach(voice => {
        // create a option element
        const option = document.createElement('option');
        // fill the opyion with voices and language
        option.textContent = voice.name + '('+voice.lang+')';

        // set needed option attributes
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });
}

getVoices();
if(synth.onvoiceschanged !== undefined){ 
    synth.onvoiceschanged = getVoices;
}


// Speak
const speak = () => {

    // check if speaking
    if(synth.speaking){
        alert('Already Speaking...');
        return;
    }                                                                                                       
    if (textInput.value == '') {
        alert('Nothing To Speak...');
    }else  {
        
    // add background animation
    body.style.background = '#141414 url(wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

        // get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        
        // speak end
        speakText.onend = e => {
            console.log('Done Speaking...');
            body.style.background = '#141414';
        } 
        


        // speak error
        speakText.onerror = e => {
            alert('Something Went Wrong');
        }

        // sellect voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // loop through voices
        voices.forEach(voice =>{
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // speak
        synth.speak(speakText);
    }
}


// EventListener

// text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

// voice select change
voiceSelect.addEventListener('change', e => speak());



// (textInput.value !== '')