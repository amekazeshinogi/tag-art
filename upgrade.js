/* tag-art UI Upgrade v1.0 */
(function(){
'use strict';
var emojiRe=/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2702}-\u{27B0}\u{200D}\u{20E3}\u{FE0F}]/gu;

function insertHero(){
  var mc=document.querySelector('.main-container');
  if(!mc||document.querySelector('.hero-section'))return;
  var h=document.createElement('div');
  h.className='hero-section';
  h.innerHTML='<h1>\u30BF\u30B0\u3092\u9078\u3076\u3060\u3051\u3002<br><span>\u3042\u306A\u305F\u3060\u3051\u306E\u30A2\u30A4\u30B3\u30F3</span>\u304C\u751F\u307E\u308C\u308B\u3002</h1><p>\u9AEA\u578B\u3001\u8868\u60C5\u3001\u670D\u88C5\u2026\u30BF\u30B0\u3092\u7D44\u307F\u5408\u308F\u305B\u308B\u3060\u3051\u3067\u3001AI\u304C\u30AA\u30EA\u30B8\u30CA\u30EB\u306E\u30A2\u30CB\u30E1\u30A2\u30A4\u30B3\u30F3\u3092\u751F\u6210\u3057\u307E\u3059\u3002</p><a href="#" class="hero-cta" onclick="document.querySelector(\'.main-container\').scrollIntoView({behavior:\'smooth\'});return false;">\u7121\u6599\u3067\u4F5C\u3063\u3066\u307F\u308B</a><div class="hero-stat">\u7121\u6599\u30671\u65E53\u56DE\u307E\u3067\u751F\u6210\u3067\u304D\u307E\u3059</div>';
  mc.parentNode.insertBefore(h,mc);
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
  f.innerHTML='<div style="max-width:720px;margin:0 auto"><div style="font-weight:500;color:#2d3436;margin-bottom:8px;font-size:15px">tag-art</div><div style="font-size:13px;color:#b2bec3;margin-bottom:16px">\u30BF\u30B0\u3092\u9078\u3076\u3060\u3051\u3067\u30AA\u30EA\u30B8\u30CA\u30EBAI\u30A2\u30A4\u30B3\u30F3\u3092\u751F\u6210</div><div style="margin-bottom:16px"><a href="privacy.html" style="margin:0 12px;color:#636e72;text-decoration:none">\u30D7\u30E9\u30A4\u30D0\u30B7\u30FC\u30DD\u30EA\u30B7\u30FC</a></div><div style="font-size:12px;color:#b2bec3">\u00A9 2026 tag-art</div></div>';
}

function init(){insertHero();cleanEmoji();upgradeFooter();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else setTimeout(init,100);
})();
