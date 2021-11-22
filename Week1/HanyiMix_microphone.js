<!DOCTYPE html>
<html>
<head>
   <script src = "https://mimicproject.com/libs/nexusUI.js"></script>
 <script src = "https://mimicproject.com/libs/maximilian.v.0.1.js"></script>
<link href="https://fonts.googleapis.com/css?family=Staatliches" rel="stylesheet"/>  
 <link rel="stylesheet" href="https://mimicproject.com/libs/maximilian-example.css" /> 
   <div>
    <div id="title">HanyiMix Microphone synth</div>
    <div id="subtitle">An sample combining real-time microphone input!</div>
  <div><button id="playButton">Play</button></div>
</div>
<div id="oscilloscope"></div>
<div id="spectrogram"></div>
</head>
<body>
  
  <!-- Maximilian code goes here -->
  <script id = "myAudioScript">
    var osc = new Maximilian.maxiOsc();
    
    var osc1 = new Maximilian.maxiOsc();
    var osc2 = new Maximilian.maxiOsc();
    var osc3 = new Maximilian.maxiOsc();
    var osc4 = new Maximilian.maxiOsc();
    var osc5 = new Maximilian.maxiOsc();
    var osc6 = new Maximilian.maxiOsc();
    var osc7 = new Maximilian.maxiOsc();
    var osc8 = new Maximilian.maxiOsc();
    
   
    
    function play(inputs) { 
      let microSample = inputs * 2 * osc.sinewave(100) ;
      
      let out1 = osc1.saw(0.5) * osc1.sinewave(44);
      let rain = osc2.noise(out1)*0.02;
      
      
      let out2 = osc3.coswave(44) * osc4.coswave(88) * osc5.saw(2);
	  let out3 = 2 * osc6.square(osc7.saw(10)) * osc8.sinewave(0.5);
      
      return microSample + rain + out2 + out3;
      //return out3  ;
    }
  </script>
  
 <!-- Main Javascript code goes here --> 
  <script language="javascript">
    let maxi;
    initAudioEngine().then((dspEngine)=>{ 
      maxi = dspEngine;
      setup();
      //Connect Mic Input
      maxi.connectMediaStream()
      //Get audio code from script element
      maxi.setAudioCode("myAudioScript");
    });

    ///////YOU CAN IGNORE ME - CODE FOR SCOPES///////
    let setup = ()=> {
      let firstPlay = false;
      maxi.hush()
      Nexus.context = maxi.audioWorkletNode.context;
      new Nexus.Oscilloscope('oscilloscope', {'size': [400,100]}).connect(maxi.audioWorkletNode);
      new Nexus.Spectrogram('spectrogram', {'size': [400,100]}).connect(maxi.audioWorkletNode);
      const playButton = document.getElementById('playButton');   
      let playAudio = () => {
        playButton.innerHTML  = maxi.play() ? "STOP":"PLAY"
      }
      playButton.addEventListener("click", () => playAudio());
    }
    ///////////////////////////////////////////////
   
  </script>
</body>
</html>
