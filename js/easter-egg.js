/* Secret message: click the ♡ in the footer */
(function(){
  var MSG = 'Solo para ti, Gabi 💜\n\nDe todo lo que existe en este mundo, lo que más me gusta es verte sonreír cuando miras estas fotos.\n\nEste sitio es solo un pequeño reflejo de todo lo que hemos vivido juntos. Y lo mejor aún está por venir.\n\nTe quiero más que a todos los países del mundo juntos.\n\n— Álvaro ♡';

  function show(){
    if(document.getElementById('eggOverlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'eggOverlay';
    overlay.style.cssText = [
      'position:fixed','inset:0','z-index:9000',
      'background:rgba(8,8,35,.88)',
      'display:flex','align-items:center','justify-content:center',
      'padding:2rem','cursor:pointer',
      'animation:eggFadeIn .35s ease both'
    ].join(';');

    var card = document.createElement('div');
    card.style.cssText = [
      'position:relative',
      'background:rgba(40,40,130,.72)',
      'backdrop-filter:blur(28px)','-webkit-backdrop-filter:blur(28px)',
      'border:1px solid rgba(214,217,255,.22)',
      'border-radius:24px',
      'padding:2.8rem 2.2rem 2.2rem',
      'max-width:400px','width:100%',
      'text-align:center',
      'color:rgb(240,224,255)',
      'font-family:Cormorant Garamond,Georgia,serif',
      'font-size:1.08rem','line-height:1.85',
      'white-space:pre-line',
      'box-shadow:0 20px 80px rgba(40,40,130,.6)',
      'cursor:default',
      'animation:eggUp .4s .05s ease both'
    ].join(';');

    var heart = document.createElement('div');
    heart.textContent = '♡';
    heart.style.cssText = 'font-size:3.2rem;color:rgb(199,140,255);margin-bottom:1.2rem;display:block;animation:hb 1.6s ease-in-out infinite';

    var msg = document.createElement('p');
    msg.textContent = MSG;
    msg.style.fontStyle = 'italic';

    var x = document.createElement('button');
    x.textContent = '×';
    x.setAttribute('aria-label','Cerrar');
    x.style.cssText = [
      'position:absolute','top:.8rem','right:1rem',
      'font-size:2rem','color:rgba(240,224,255,.55)',
      'background:none','border:none','cursor:pointer','line-height:1',
      'transition:color .2s'
    ].join(';');
    x.addEventListener('click', function(e){ e.stopPropagation(); overlay.remove(); });
    x.addEventListener('mouseenter', function(){ x.style.color='rgba(240,224,255,.95)'; });
    x.addEventListener('mouseleave', function(){ x.style.color='rgba(240,224,255,.55)'; });

    card.appendChild(x);
    card.appendChild(heart);
    card.appendChild(msg);
    overlay.appendChild(card);
    overlay.addEventListener('click', function(e){ if(e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);

    if(!document.getElementById('eggStyles')){
      var st = document.createElement('style');
      st.id = 'eggStyles';
      st.textContent = [
        '@keyframes eggFadeIn{from{opacity:0}to{opacity:1}}',
        '@keyframes eggUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}',
        '@keyframes hb{0%,100%{transform:scale(1)}15%{transform:scale(1.35)}35%{transform:scale(1)}50%{transform:scale(1.18)}}'
      ].join('');
      document.head.appendChild(st);
    }
  }

  function init(){
    var heart = document.querySelector('.heart');
    if(!heart) return;
    heart.style.cursor = 'pointer';
    heart.title = '...';
    heart.addEventListener('click', show);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
