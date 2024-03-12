document.getElementById('submitButtonEng').addEventListener('click', function () {
    var textVal = document.getElementById('largeTextarea').value;

    var utterance = new SpeechSynthesisUtterance(textVal);
    speechSynthesis.speak(utterance);
});



function allowDrop(event) {
    event.preventDefault();
    document.getElementById('dropbox').style.borderColor = '#666';
}

function drop(event) {
    event.preventDefault();
    document.getElementById('dropbox').style.borderColor = '#ccc';

    var files = event.dataTransfer.files;
    console.log(files.length);

    if (files.length > 0) {
        var file = files[0];

        if (file.type.startsWith('image/')) {
            // Image file dropped, perform OCR and TTS
            performOCR(file);
        } else {
            alert('Please drop a valid image file.');
        }
    }
}

function openFileInput() {
    document.getElementById('fileInput').click();
}

function handleFileChange(files) {
    if (files.length > 0) {
        var file = files[0];

        if (file.type.startsWith('image/')) {
            // Image file selected, perform OCR and TTS
            performOCR(file);
        } else {
            alert('Please select a valid image file.');
        }
    }
}

function performOCR(file) {
    var reader = new FileReader();

    reader.onload = function (e) {
        Tesseract.recognize(
            e.target.result,
            'spa',
            { logger: info => console.log(info) }
        ).then(({ data: { text } }) => {
            // Display the extracted text
            document.getElementById('result').innerText = text;

            // Use the Web Speech API to read the extracted text
            var utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        });
    };

    reader.readAsDataURL(file);
}