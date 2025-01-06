

const voiceSelect = document.getElementById("select");
const textInput = document.getElementById("textarea");
const btn = document.getElementById("btn");

let voices = [];

// btn click event
btn.addEventListener("click", () => {
    gapir();
});

// Load voices
function loadVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length > 0) {
        voiceSelect.innerHTML = "";
        voices.forEach((voice, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            voiceSelect.appendChild(option);
        });
    } else {
        voiceSelect.innerHTML = `<option disabled>No voices available</option>`;
    }
}

// Ensure voices are loaded
function ensureVoicesLoaded() {
    if (voices.length === 0) {
        loadVoices();
        if (voices.length === 0) {
            setTimeout(ensureVoicesLoaded, 500);
        }
    }
}

// Load voices when available
window.speechSynthesis.onvoiceschanged = loadVoices;
ensureVoicesLoaded();

// Function to play speech
function gapir() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = textInput.value;

    const selectedVoiceIndex = voiceSelect.value;

    if (selectedVoiceIndex) {
        msg.voice = voices[selectedVoiceIndex];
    } else {
        alert("Iltimos, ovoz tanlang!");
        return;
    }

    speechSynthesis.speak(msg);
}
