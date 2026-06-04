/* Auto-confetti on special dates: 11 jun & 15 jun */
(function(){
  var d = new Date();
  var m = d.getMonth() + 1;
  var day = d.getDate();
  if(!(m === 6 && (day === 11 || day === 15))) return;

  window.addEventListener('load', function(){
    setTimeout(function(){
      if(typeof launchConfetti === 'function'){
        launchConfetti({ duration: 5000, count: 220, burst: false });
        /* Second burst after a pause */
        setTimeout(function(){
          launchConfetti({ duration: 3500, count: 140, burst: false });
        }, 2500);
      }
    }, 1400);
  });
})();
