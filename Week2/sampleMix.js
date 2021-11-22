<!DOCTYPE HTML>
<html>
<head>
 <script src = "https://mimicproject.com/libs/maximilian.js"></script>
	<meta charset="utf-8">
</head>
<body>
</body>
  
<script>
	
  	var maximJs = maximilian();
	  var hyAudio = new maximJs.maxiAudio();
  	var hyKick = new maximJs.maxiSample();
  	var hyAmbient = new maximJs.maxiSample();
	  var hyMarimba = new maximJs.maxiSample();
    var hyClock = new maximJs.maxiClock();
    var myOsc = new maximJs.maxiOsc();
    var myOsc2 = new maximJs.maxiOsc();
    var hyDelay = new maximJs.maxiDelayline();
  
    var kickCount = 8;
    var kickGain = 0.8;
    var hyTempo = 120;
    var kickPitch = 0.6;
  
    var ambientCount = 20;
    var ambientGain = 0.2;
    var ambientPitch = 0.7;
  
    var delayTime = ((hyTempo/60 * 44100) / 16) * 3;
    var feedback = 0.6;
  
//    var marimbaGain = 0.6;
//    var marimbaPitch = 2;
  
   


 	hyClock.setTempo(hyTempo);
   hyClock.setTicksPerBeat(4);
  
	hyAudio.init();
  

    hyAudio.loadSample('Marimba.mp3', hyAmbient);
//   	hyAudio.loadSample('drum.wav', hyAmbient);
  	hyAudio.loadSample('kick.wav', hyKick);
      
  function multiMedia() {
    	var out = 0;
    	
    	hyClock.ticker();
    
    	if( hyClock.tick && hyClock.playHead%kickCount === 0){
        
        	hyKick.trigger();
            kickGain = 0.15;
        }
    
    	if(hyClock.tick && Math.random()>0.9){
           
           hyKick.trigger();
           
    	   kickGain = 0.1;
        } 
        
        if(hyClock.tick && hyClock.playHead%ambientCount === 0){
           ambientPitch = Math.random();
           hyAmbient.trigger();
           ambientGain = 0.8;
           }
    
//         if(hyClock.tick && Math.random()>0.9){
//         hyMarimba.trigger();
//         marimbaPitch = (Math.random()*0.5)+1;  
//         } 	
    
    out1 = kickGain * hyKick.playOnce(kickPitch );
    out2 = ambientGain * hyAmbient.playOnce(ambientPitch);
    out3 = 0.1 * (myOsc.sinewave(88) + myOsc.sinewave(82));
    out = out1 + out2 + out3;
    
//     out3 = marimbaGain * hyMarimba.playOnce(marimbaPitch);
 
  return out + hyDelay.dl(out1 + out2, delayTime, feedback);
 }

  
  
	hyAudio.play = function() {

     
      
      return multiMedia();
       
	}
	
</script>
</html>
