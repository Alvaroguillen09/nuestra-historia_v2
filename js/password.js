(function(){
  var PASSWORD = '1234'; // ← Cambia aquí la contraseña

  var form       = document.getElementById('passForm');
  var passInput  = document.getElementById('passInput');
  var passError  = document.getElementById('passError');
  var toggleVis  = document.getElementById('toggleVis');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(passInput.value === PASSWORD){
      sessionStorage.setItem('ag_auth', 'ok');
      var ret = sessionStorage.getItem('ag_ret') || 'index.html';
      sessionStorage.removeItem('ag_ret');
      window.location.href = ret;
    } else {
      passError.removeAttribute('hidden');
      passInput.value = '';
      passInput.focus();
    }
  });

  toggleVis.addEventListener('click', function(){
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
    toggleVis.textContent = passInput.type === 'password' ? '👁' : '🙈';
  });

  /* Stars canvas */
  var c = document.getElementById('stars');
  var ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  var pts = [];
  for(var i = 0; i < 180; i++){
    pts.push({x:Math.random()*innerWidth, y:Math.random()*innerHeight, r:Math.random()*1.8, v:Math.random()*.25+.04});
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    for(var j = 0; j < pts.length; j++){
      var p = pts[j];
      p.y += p.v;
      if(p.y > innerHeight) p.y = 0;
      var g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5);
      g.addColorStop(0,'rgba(255,255,255,.95)');
      g.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*5,0,Math.PI*2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,.95)';
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
