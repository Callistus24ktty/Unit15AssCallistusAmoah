// Early-apply theme to avoid FOUC
(function(){
  try{
    var t = localStorage.getItem('theme');
    if(t === 'light' || t === 'dark'){
      document.documentElement.setAttribute('data-theme', t);
    }
  }catch(e){/* ignore */}
})();

// Wire up toggle after DOM ready
window.addEventListener('DOMContentLoaded', function(){
  try{
    var switchEl = document.getElementById('themeSwitch');
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    if(switchEl){
      switchEl.checked = (current === 'light');
      switchEl.addEventListener('change', function(){
        var theme = this.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        try{ localStorage.setItem('theme', theme); }catch(e){}
      });
    }
  }catch(e){/* ignore */}
});
