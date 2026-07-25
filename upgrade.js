/* tag-art UI Upgrade v1.0 */

(function(){
'use strict';
var emojiRe=/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2702}-\u{27B0}\u{200D}\u{20E3}\u{FE0F}]/gu;

function insertHero(){
  var mc=document.querySelector('.main-container');
  if(!mc||document.querySelector('.hero-section'))return;
  var h=document.createElement('div');
  h.className='hero-section';
  h.innerHTML='<h1>\u30BF\u30B0\u3092\u9078\u3076\u3060\u3051\u3002<br><span>\u3042\u306A\u305F\u3060\u3051\u306E\u30A2\u30A4\u30B3\u30F3</span>\u304C\u751F\u307E\u308C\u308B\u3002</h1><p>\u9AEA\u578B\u3001\u8868\u60C5\u3001\u670D\u88C5\u2026\u30BF\u30B0\u3092\u7D44\u307F\u5408\u308F\u305B\u308B\u3060\u3051\u3067\u3001AI\u304C\u30AA\u30EA\u30B8\u30CA\u30EB\u306E\u30A2\u30CB\u30E1\u30A2\u30A4\u30B3\u30F3\u3092\u751F\u6210\u3057\u307E\u3059\u3002</p><a href="#" class="hero-cta" onclick="document.querySelector(\'.main-container\').scrollIntoView({behavior:\'smooth\'});return false;">\u7121\u6599\u3067\u4F5C\u3063\u3066\u307F\u308B</a><div class="hero-sample-grid" id="taHeroSampleGrid"></div><div class="hero-gen-counter" id="taGenCounter" style="display:none"></div><div class="hero-stat" id="taHeroStat">\u7121\u6599\u30671\u65E53\u56DE\u307E\u3067\u751F\u6210\u3067\u304D\u307E\u3059</div>';
  mc.parentNode.insertBefore(h,mc);
  insertSampleGrid();
  insertGenCounter();
}

function insertSampleGrid(){
  var grid=document.getElementById('taHeroSampleGrid');
  if(!grid)return;
  var samples=[
    {bg:'linear-gradient(135deg,#6C5CE7,#a29bfe)',label:'\u30D5\u30EF\u30D5\u30EF\u524D\u9AEA \u00D7 \u7B11\u9854'},
    {bg:'linear-gradient(135deg,#fd79a8,#fab1c9)',label:'\u30C4\u30A4\u30F3\u30C6\u30FC\u30EB \u00D7 \u30AF\u30FC\u30EB'},
    {bg:'linear-gradient(135deg,#4834d4,#6C5CE7)',label:'\u30B7\u30E7\u30FC\u30C8\u30D8\u30A2 \u00D7 \u30E1\u30AC\u30CD'},
    {bg:'linear-gradient(135deg,#fd79a8,#6C5CE7)',label:'\u30DD\u30CB\u30FC\u30C6\u30FC\u30EB \u00D7 \u5236\u670D'}
  ];
  grid.innerHTML=samples.map(function(s){
    return '<div class="hero-sample-card" style="background:'+s.bg+'"><span>'+s.label+'</span></div>';
  }).join('');
}

function insertGenCounter(){
  var el=document.getElementById('taGenCounter');
  if(!el)return;
  var client=(typeof sb!=='undefined')?sb:null;
  if(!client)return;
  client.rpc('get_total_generation_count').then(function(r){
    if(r&&!r.error&&typeof r.data==='number'&&r.data>0){
      el.textContent='\u3053\u308C\u307E\u3067\u306B '+r.data.toLocaleString('ja-JP')+' \u500B\u306E\u30A2\u30A4\u30B3\u30F3\u304C\u751F\u307E\u308C\u307E\u3057\u305F';
      el.style.display='block';
    }
  }).catch(function(){});
}

function guestTodayKey(){
  var d=new Date();
  return 'ta_guest_'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}
function guestCount(){
  try{return parseInt(localStorage.getItem(guestTodayKey())||'0',10);}catch(e){return 0;}
}
function guestRemaining(){return Math.max(0,3-guestCount());}
function updateGuestStat(){
  var stat=document.getElementById('taHeroStat');
  if(!stat)return;
  var user=(typeof currentUser!=='undefined')?currentUser:null;
  if(user){stat.style.display='none';return;}
  stat.style.display='block';
  var r=guestRemaining();
  stat.textContent=r>0
    ?('\u672C\u65E5\u306E\u4F53\u9A13\u751F\u6210\u56DE\u6570\u3000\u6B8B\u308A'+r+'\u56DE\uFF08\u3053\u306E\u7AEF\u672B\u306E\u8A08\u7B97\u3002\u30ED\u30B0\u30A4\u30F3\u3067\u6BCE\u65E51\u65E53\u56DE\u307E\u3067\u5229\u7528\u53EF\uFF09')
    :('\u672C\u65E5\u306E\u4F53\u9A13\u56DE\u6570\u3092\u4F7F\u3044\u5207\u308A\u307E\u3057\u305F\u3002\u30ED\u30B0\u30A4\u30F3\u3059\u308B\u3068\u5F15\u304D\u7D9A\u304D\u751F\u6210\u3067\u304D\u307E\u3059');
}
function trackGuestAttempt(){
  var user=(typeof currentUser!=='undefined')?currentUser:null;
  if(user)return;
  try{
    var k=guestTodayKey();
    localStorage.setItem(k,String(guestCount()+1));
  }catch(e){}
  updateGuestStat();
}
function initGuestCounter(){
  document.addEventListener('click',function(e){
    var btn=e.target&&e.target.closest?e.target.closest('.btn-generate'):null;
    if(btn)trackGuestAttempt();
  },true);
  updateGuestStat();
  setInterval(updateGuestStat,3000);
}

function cleanEmoji(){
  var btns=document.querySelectorAll('.btn-generate,.btn-sub,.mode-tab,.hbtn,.cat-tab');
  btns.forEach(function(b){
    b.childNodes.forEach(function(n){
      if(n.nodeType===3)n.textContent=n.textContent.replace(emojiRe,'').trim();
    });
  });
  var g=document.querySelector('.btn-generate');
  if(g)g.textContent='\u751F\u6210\u3059\u308B';
}

function upgradeFooter(){
  var f=document.querySelector('footer');
  if(!f||f.dataset.upgraded)return;
  f.dataset.upgraded='1';
  f.innerHTML='<div style="max-width:720px;margin:0 auto"><div style="font-weight:500;color:#2d3436;margin-bottom:8px;font-size:15px">tag-art</div><div style="font-size:13px;color:#b2bec3;margin-bottom:16px">\u30BF\u30B0\u3092\u9078\u3076\u3060\u3051\u3067\u30AA\u30EA\u30B8\u30CA\u30EBAI\u30A2\u30A4\u30B3\u30F3\u3092\u751F\u6210</div><div style="margin-bottom:16px"><a href="about.html" style="margin:0 12px;color:#636e72;text-decoration:none">tag-art\u306B\u3064\u3044\u3066</a><a href="pricing.html" style="margin:0 12px;color:#636e72;text-decoration:none">\u6599\u91D1\u30D7\u30E9\u30F3</a><a href="privacy.html" style="margin:0 12px;color:#636e72;text-decoration:none">\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC</a></div><div style="font-size:12px;color:#b2bec3">\u00A9 2026 tag-art</div></div>';
}

function init(){insertHero();cleanEmoji();upgradeFooter();initGuestCounter();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else setTimeout(init,100);
})();
