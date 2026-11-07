/* main.js - 传奇发布网 交互脚本 */
(function(){
  var GAMES = [
    {img:"game1.jpg",  t:"传奇发布网新开服", v:"996大全",     n:3256},
    {img:"game2.jpg",  t:"迷失传奇",          v:"迷失版本",    n:3256},
    {img:"game3.jpg",  t:"冰雪传奇",          v:"冰雪版本",    n:3256},
    {img:"game4.jpg",  t:"1.76合击传奇",      v:"1.76合击",    n:3210},
    {img:"game5.jpg",  t:"传奇公益服",        v:"公益服",      n:3256},
    {img:"game6.jpg",  t:"三端互通传奇",      v:"三端互通",    n:3256},
    {img:"game7.jpg",  t:"996传奇",           v:"996打金",     n:3888},
    {img:"game8.jpg",  t:"1.76打金传奇",      v:"1.76打金",    n:3998},
    {img:"game9.jpg",  t:"打金手游",          v:"打金手游",    n:3721},
    {img:"game10.jpg", t:"1.80合击传奇",      v:"1.80合击",    n:3369},
    {img:"game11.jpg", t:"合击传奇",          v:"合击版本",    n:2587},
    {img:"game12.jpg", t:"1.76轻变传奇",      v:"1.76轻变",    n:8745},
    {img:"game13.jpg", t:"1.76传奇",          v:"1.76复古",    n:2221},
    {img:"game14.jpg", t:"复古怀旧传奇",      v:"复古怀旧",    n:3256},
    {img:"game15.jpg", t:"复古传奇",          v:"复古版本",    n:3256},
    {img:"game16.jpg", t:"火龙微变传奇",      v:"火龙微变",    n:4120}
  ];

  function card(g){
    return '<div class="game-card">'
      + '<div class="pic" style="background-image:url(\''+g.img+'\')"><b>'+g.v+'</b></div>'
      + '<h4>'+g.t+'</h4>'
      + '<p>'+g.n+'次下载</p>'
      + '<a class="dl" href="gonglue1.html">下载</a>'
      + '</div>';
  }
  function rankItem(g,idx){
    var c = idx<3 ? ' class="n'+(idx+1)+'"' : '';
    return '<li><i'+c+'>'+(idx+1)+'</i><a href="gonglue1.html">'+g.t+'</a><span>'+g.n+'次下载</span></li>';
  }
  function fill(id,html){ var el=document.getElementById(id); if(el) el.innerHTML=html; }

  function initHome(){
    fill('gamelist', GAMES.slice(0,12).map(card).join(''));

    var hot   = GAMES.slice().sort(function(a,b){return b.n-a.n});
    var click = GAMES.slice();
    var news  = GAMES.slice().reverse();

    fill('rank-hot',   hot.slice(0,8).map(rankItem).join(''));
    fill('rank-click', click.slice(0,8).map(rankItem).join(''));
    fill('rank-new',   news.slice(0,8).map(rankItem).join(''));

    var tabs = document.getElementById('rankTabs');
    if(tabs){
      tabs.onclick = function(e){
        var s = e.target.getAttribute('data-t');
        if(!s) return;
        var heads = tabs.querySelectorAll('[data-t]');
        for(var i=0;i<heads.length;i++){ heads[i].classList.remove('cur'); }
        e.target.classList.add('cur');
        document.getElementById('rank-hot').style.display   = s==='hot'   ? '' : 'none';
        document.getElementById('rank-click').style.display = s==='click' ? '' : 'none';
        document.getElementById('rank-new').style.display   = s==='new'   ? '' : 'none';
      };
    }

    var slides = document.querySelectorAll('#slider .slide');
    var dotsBox = document.getElementById('dots');
    if(slides.length && dotsBox){
      for(var i=0;i<slides.length;i++){
        var d = document.createElement('i');
        if(i===0) d.className='on';
        d.onclick = (function(idx){ return function(){ go(idx);}; })(i);
        dotsBox.appendChild(d);
      }
      var cur=0, timer=null;
      function go(n){
        slides[cur].classList.remove('active');
        dotsBox.children[cur].classList.remove('on');
        cur = (n+slides.length)%slides.length;
        slides[cur].classList.add('active');
        dotsBox.children[cur].classList.add('on');
      }
      function play(){ timer=setInterval(function(){go(cur+1);},4000);}
      var foc=document.getElementById('slider');
      foc.onmouseenter=function(){clearInterval(timer);};
      foc.onmouseleave=play;
      play();
    }
  }

  window.doSearch = function(form){
    var kw = form.kw.value.trim();
    if(!kw){ alert('请输入搜索关键词'); return false; }
    form.action = 'newslist.html';
    return true;
  };

  function initCommon(){
    var art = document.querySelector('.article');
    if(art){
      var bar = document.createElement('div');
      bar.style.cssText='position:fixed;top:0;left:0;height:3px;background:#c00;width:0;z-index:9999;transition:width .1s';
      document.body.appendChild(bar);
      window.onscroll = function(){
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var p = h>0 ? (window.scrollY/h*100) : 0;
        bar.style.width = p+'%';
      };
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',function(){initHome();initCommon();});
  } else { initHome(); initCommon(); }
})();
