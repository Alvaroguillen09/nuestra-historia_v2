/* Confetti engine — no dependencies */
(function(global){
  function launchConfetti(opts){
    var cfg = {
      duration: opts && opts.duration != null ? opts.duration : 2200,
      count:    opts && opts.count    != null ? opts.count    : 160,
      burst:    opts && opts.burst    != null ? opts.burst    : false,
      onDone:   opts && opts.onDone   != null ? opts.onDone   : null
    };

    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:99999;pointer-events:none;';
    document.body.appendChild(canvas);
    canvas.width  = innerWidth;
    canvas.height = innerHeight;
    var ctx = canvas.getContext('2d');

    var colors = ['#ff6b9d','#ffd166','#6bcbff','#a8e6cf','#c78cff','#ff9ee8','#ffb347','#8ee8b0','#ff6b6b','#ffeaa7'];
    var shapes = ['rect','circle','triangle'];
    var pieces = [];

    for(var i = 0; i < cfg.count; i++){
      var speed = Math.random() * 14 + 5;
      var angle = cfg.burst
        ? ((Math.random() - 0.5) * Math.PI * 1.2 - Math.PI / 2)
        : 0;
      pieces.push({
        x:  cfg.burst ? innerWidth / 2 : Math.random() * innerWidth,
        y:  cfg.burst ? innerHeight / 2 : -10,
        vx: cfg.burst ? Math.cos(angle) * speed : (Math.random() - 0.5) * 4,
        vy: cfg.burst ? Math.sin(angle) * speed : Math.random() * 4 + 1.5,
        w:  Math.random() * 13 + 5,
        h:  Math.random() * 7  + 3,
        color:    colors[Math.floor(Math.random() * colors.length)],
        shape:    shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity:  cfg.burst ? 0.35 : 0.18,
        opacity:  1
      });
    }

    var start = null;
    function draw(ts){
      if(!start) start = ts;
      var elapsed  = ts - start;
      var progress = Math.min(elapsed / cfg.duration, 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for(var i = 0; i < pieces.length; i++){
        var p = pieces[i];
        p.vy += p.gravity;
        p.x  += p.vx;
        p.y  += p.vy;
        p.rotation += p.rotSpeed;
        p.opacity = progress < 0.65 ? 1 : 1 - (progress - 0.65) / 0.35;
        if(!cfg.burst && p.y > innerHeight + 20){
          p.x  = Math.random() * innerWidth;
          p.y  = -10;
          p.vy = Math.random() * 3 + 1.5;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle   = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        if(p.shape === 'rect'){
          ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        } else if(p.shape === 'circle'){
          ctx.beginPath(); ctx.arc(0, 0, p.w/2, 0, Math.PI*2); ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.w/2);
          ctx.lineTo(p.w/2, p.w/2);
          ctx.lineTo(-p.w/2, p.w/2);
          ctx.closePath(); ctx.fill();
        }
        ctx.restore();
      }

      if(progress < 1){ requestAnimationFrame(draw); }
      else { canvas.remove(); if(cfg.onDone) cfg.onDone(); }
    }
    requestAnimationFrame(draw);
  }

  global.launchConfetti = launchConfetti;
})(window);
