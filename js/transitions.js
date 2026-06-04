/* Smooth page-fade transitions */
(function(){
  /* Fade in on load */
  document.documentElement.style.opacity = '0';
  window.addEventListener('load', function(){
    requestAnimationFrame(function(){
      document.documentElement.style.transition = 'opacity 0.38s ease';
      document.documentElement.style.opacity    = '1';
    });
  });

  /* Fade out before navigating away */
  document.addEventListener('click', function(e){
    var link = e.target.closest('a[href]');
    if(!link) return;
    var href = link.getAttribute('href');
    if(!href) return;
    if(href.charAt(0) === '#') return;
    if(href.indexOf('://') !== -1) return;
    if(href.indexOf('mailto:') === 0) return;
    if(link.target === '_blank') return;
    e.preventDefault();
    document.documentElement.style.opacity = '0';
    setTimeout(function(){ window.location.href = href; }, 380);
  });
})();
