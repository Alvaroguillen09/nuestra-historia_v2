(function(){
  if(sessionStorage.getItem('ag_auth')==='ok') return;
  sessionStorage.setItem('ag_ret', window.location.href);
  window.location.replace('password.html');
})();
