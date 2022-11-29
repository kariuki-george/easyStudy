const pdfParse = require("pdf-parse")
//const fs = require("fs")
/*
function readText(text){
    if(voiceLoaded()){
        speak();
    
    }else{
        window.speechSynthesis.addEventListener('voiceschanged',speak());
    }
    
    function speak(){
        const text = "Read provided text";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = getMaleVoice();
        window.speechSynthesis.speak(utterance);
    }
    
    function getMaleVoice(){
        const voiceIndex = 1;
        return window.speechSynthesis.getVoices()[voiceIndex];
    }
    
    function voiceLoaded(){
        return window.speechSynthesis.getVoices().length;
    }
    
}*/


async function selectFile (){


    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    if(fileHandle.kind === 'file'){
        //run file code
        const reader = new FileReader();
        const file = await fileHandle.getFile();
        //let databuffer = fs.readFileSync(file);
        //reader.readAsText(file,"utf8")

        pdfParse(reader.readAsArrayBuffer(file)).then(data=>{
            console.log(data.text);
        })

        

        
        
        //const readableStream = file.prototype.stream();
        console.log(file);
        console.log(reader.readyState);
    }
}



