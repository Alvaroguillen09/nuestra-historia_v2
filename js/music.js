/* Background music — plays by default. Add audio/love-story.mp3 to the project. */
(function(){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  function init(){
    var SRC = 'audio/love-story.mp3';
    var KEY = 'ag_music';

    var audio = document.createElement('audio');
    audio.src  = SRC;
    audio.loop = true;
    audio.volume = 0.30;
    document.body.appendChild(audio);

    /* Saved state: null = never set (first visit → want to play) */
    var savedTime    = parseFloat(sessionStorage.getItem(KEY + '_t') || '0');
    var savedPlaying = sessionStorage.getItem(KEY + '_p');
    var shouldPlay   = savedPlaying === null ? true : savedPlaying === '1';

    audio.currentTime = savedTime;

    /* Build floating button */
    var btn = document.createElement('button');
    btn.id = 'musicBtn';
    btn.setAttribute('aria-label', 'Música');
    btn.innerHTML =
      '<span id="musicNote" style="font-size:1.15rem;display:block;line-height:1">♪</span>' +
      '<span style="font-size:.52rem;letter-spacing:.1em;display:block;margin-top:1px;opacity:.7">MÚSICA</span>';

    btn.style.cssText = [
      'position:fixed','bottom:1.6rem','right:1.6rem','z-index:800',
      'width:52px','height:52px','border-radius:50%',
      'background:rgba(58,58,152,.75)',
      'backdrop-filter:blur(12px)','-webkit-backdrop-filter:blur(12px)',
      'border:1px solid rgba(214,217,255,.3)',
      'color:rgba(240,224,255,.9)',
      'display:flex','flex-direction:column','align-items:center','justify-content:center',
      'cursor:pointer',
      'transition:transform .25s ease, background .25s ease, box-shadow .25s ease',
      'box-shadow:0 4px 18px rgba(58,58,152,.4)',
      'font-family:inherit'
    ].join(';');
    document.body.appendChild(btn);

    /* Tooltip */
    var tip = document.createElement('div');
    tip.style.cssText = [
      'position:fixed','bottom:5.4rem','right:1.5rem','z-index:800',
      'background:rgba(25,20,75,.92)',
      'backdrop-filter:blur(8px)',
      'color:rgba(240,224,255,.95)',
      'font-size:.68rem','letter-spacing:.08em',
      'padding:.4rem .75rem','border-radius:8px',
      'white-space:nowrap','pointer-events:none',
      'opacity:0','transition:opacity .2s ease',
      'font-family:Jost,sans-serif'
    ].join(';');
    tip.textContent = '♪ Love Story — Taylor Swift';
    document.body.appendChild(tip);

    btn.addEventListener('mouseenter', function(){ tip.style.opacity = '1'; });
    btn.addEventListener('mouseleave', function(){ tip.style.opacity = '0'; });

    var playing = false;
    var wantPlay = shouldPlay; /* desired state */

    function setUI(state){
      playing = state;
      var note = document.getElementById('musicNote');
      if(state){
        btn.style.background = 'rgba(107,107,230,.88)';
        btn.style.boxShadow  = '0 4px 22px rgba(107,107,230,.55), 0 0 0 4px rgba(107,107,230,.12)';
        if(note) note.style.opacity = '1';
        btn.title = 'Silenciar música';
      } else {
        btn.style.background = 'rgba(58,58,152,.75)';
        btn.style.boxShadow  = '0 4px 18px rgba(58,58,152,.4)';
        if(note) note.style.opacity = '.4';
        btn.title = 'Reproducir música';
      }
    }

    function tryPlay(){
      wantPlay = true;
      audio.play()
        .then(function(){ setUI(true); })
        .catch(function(){ /* autoplay blocked */ setUI(false); });
    }

    function doPause(){
      wantPlay = false;
      audio.pause();
      setUI(false);
    }

    btn.addEventListener('click', function(){
      if(playing){ doPause(); }
      else { tryPlay(); }
    });

    /* If autoplay blocked, start on first interaction */
    if(shouldPlay){
      tryPlay();
      if(!playing){
        /* Pulsing "wants to play" state — will start on first touch */
        setUI(false);
        function onFirstInteraction(){
          document.removeEventListener('click', onFirstInteraction);
          document.removeEventListener('touchstart', onFirstInteraction);
          if(wantPlay && !playing) tryPlay();
        }
        document.addEventListener('click', onFirstInteraction);
        document.addEventListener('touchstart', onFirstInteraction);
      }
    } else {
      setUI(false);
    }

    window.addEventListener('beforeunload', function(){
      sessionStorage.setItem(KEY + '_t', audio.currentTime);
      sessionStorage.setItem(KEY + '_p', playing ? '1' : '0');
    });
  }
})();
