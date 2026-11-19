/* Edward 工具導覽列：最左邊的圖示列，選擇這次要看哪個工具。
   單檔下載版（file://）或內嵌圖片版不顯示。新增工具：在 TOOLS 加一列即可。 */
(function(){
  if(location.protocol==='file:'||window.__IMG||window.__SNAPSHOT_SEARCH)return;
  var TOOLS=[
    {id:'sim',name:'技能模擬器',href:'index.html',match:['','index.html','simulator.html','official-index.html','official-simulator.html'],icon:'<img src="ui/title-icon.svg" alt="">'},
    {id:'archive',name:'魔改存檔',href:'archive.html',match:['archive.html'],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5V21.5"/><path d="M9 8h6M9 12h6"/></svg>'},
    {id:'map',name:'地圖指引',href:'map.html',match:['map.html'],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6.5v14L9 18l6 2.5 6-2.5v-14L15 6.5z"/><path d="M9 4v14M15 6.5v14"/></svg>'},
    {id:'acc',name:'練功計算',href:'acc.html',match:['acc.html','exp.html'],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>'}
    ,{id:'magic',name:'法師裝備模擬器',href:'magic.html',match:['magic.html'],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 15 9"/><path d="M15 9l2-2"/><path d="M16 3l.8 2.2L19 6l-2.2.8L16 9l-.8-2.2L13 6l2.2-.8z"/><path d="M6 5l.5 1.3L8 7l-1.5.7L6 9l-.5-1.3L4 7l1.5-.7z"/></svg>'}
    ,{id:'exp',name:'升級時間',href:'exp.html',match:['exp.html'],hide:1,g:'acc',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 8v5l3 2"/><path d="M9 2h6"/></svg>'}
    ,{id:'cmd',name:'小工具',href:'cmd.html',match:['cmd.html','fx.html'],icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 10l3 2-3 2M12 15h5"/></svg>'}
    ,{id:'temple',name:'時間神殿',href:'temple.html',match:['temple.html'],icon:''}
    ,{id:'fx',name:'匯率換算',href:'fx.html',match:['fx.html'],hide:1,g:'cmd',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 10h8l-2-2M16 14H8l2 2"/></svg>'}
  ];
  // ---- 圖示（彩色方章：每個工具一個顏色）
  var G={
   sim:[['m','M50 16l5 13 9-6-2 15 15-3-7 12 13 5-14 9 4 9-17-3-1 17h-6l-1-17-17 3 4-9-14-9 13-5-7-12 15 3-2-15 9 6z'],['d','M50 30v44M50 56l-12-8M50 56l12-8']],
   archive:[['m','M18 28Q34 22 50 30Q66 22 82 28V72Q66 66 50 74Q34 66 18 72Z'],['d','M50 30V74M26 40q10-3 18 1M26 50q10-3 18 1M26 60q10-3 18 1M56 41q8-4 18-1M56 51q8-4 18-1M56 61q8-4 18-1']],
   map:[['m','M18 30l22-8 20 8 22-8v48l-22 8-20-8-22 8z'],['d','M40 22v48M60 30v48'],['d','M26 58q8-12 14-4t12-12']],
   acc:[['m','M50 22a28 28 0 1 0 .01 0z'],['d','M50 33a17 17 0 1 0 .01 0z'],['dot','M50 45a5 5 0 1 0 .01 0z'],['l','M50 12v12M50 76v12M12 50h12M76 50h12']],
   magic:[['m','M22 72L60 34l7 7-38 38z'],['d','M58 36l6 6'],['m','M74 18l3.5 8.5 8.5 3.5-8.5 3.5L74 42l-3.5-8.5L62 30l8.5-3.5z'],['m','M34 22l2.2 5.3 5.3 2.2-5.3 2.2L34 37l-2.2-5.3-5.3-2.2 5.3-2.2z']],
   exp:[['m','M50 30a27 27 0 1 0 .01 0z'],['m','M43 17h14v8H43z'],['d','M50 57V42M50 57l11 7'],['l','M72 28l5-5']],
   cmd:[['m','M18 26h64a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V34a8 8 0 0 1 8-8z'],['d','M26 42l12 9-12 9M46 62h18']],
   temple:[['m','M28 18h44v8H28z'],['m','M28 74h44v8H28z'],['m','M34 26c0 14 10 18 16 24c-6 6-16 10-16 24h32c0-14-10-18-16-24c6-6 16-10 16-24z'],['d','M42 34h16M44 70h12']],
   fx:[['m','M50 22a28 28 0 1 0 .01 0z'],['d','M35 43h27l-6-6M65 57H38l6 6']]
  };
  var PAL={sim:['#e6c48e','#a4602a'],archive:['#c9a27a','#7a4a2a'],map:['#9bbf7a','#4d7a36'],acc:['#e59a6b','#a8392b'],magic:['#b99ae0','#6b3f86'],exp:['#8fc3d8','#2f5f8a'],cmd:['#a8a39a','#4f4a43'],temple:['#7fc2b4','#2f6f68'],fx:['#e6c860','#9a7a1c']};
  function ICON(id){
    var c=PAL[id],gid='ni_'+id;
    var g=G[id].map(function(x){var r=x[0],d=x[1];
      if(r==='m')return '<path d="'+d+'" fill="#fffaf0"/>';
      if(r==='dot')return '<path d="'+d+'" fill="'+c[1]+'"/>';
      if(r==='d')return '<path d="'+d+'" fill="none" stroke="'+c[1]+'" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>';
      return '<path d="'+d+'" fill="none" stroke="#fffaf0" stroke-width="3.2" stroke-linecap="round"/>'}).join('');
    return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[1]+'"/></linearGradient></defs><rect x="3" y="3" width="94" height="94" rx="24" fill="url(#'+gid+')"/><rect x="9" y="9" width="82" height="82" rx="19" fill="none" stroke="#fffaf0" stroke-opacity=".5" stroke-width="2"/>'+g+'</svg>';
  }
  TOOLS.forEach(function(t){t.icon=ICON(t.id)});
  var cur=location.pathname.split('/').pop();
  // 側邊欄：不捲動，全部工具平均分配整個高度；螢幕矮就自動縮小圖示、再矮就只留圖示
  var css='#edward-rail{position:fixed;left:0;top:0;bottom:0;width:76px;z-index:9999;background:#f4e8cf;border-right:1px solid #e8dcc3;display:flex;flex-direction:column;align-items:stretch;gap:2px;padding:8px 5px;overflow:hidden;font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif}'+
  '#edward-rail a{flex:1 1 0;min-height:0;max-height:84px;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-decoration:none;color:#86745f;font-size:11px;font-weight:700;line-height:1.2;text-align:center;border:1px solid transparent;overflow:hidden;padding:0 1px}'+
  '#edward-rail a:hover{background:#fffaf0}#edward-rail a.on{background:#fffaf0;color:#a4602a;border-color:#a4602a}'+
  '#edward-rail .ic{flex:0 1 auto;width:clamp(24px,5.4vh,40px);height:clamp(24px,5.4vh,40px);display:flex;align-items:center;justify-content:center}#edward-rail .ic img,#edward-rail .ic svg{width:100%;height:100%;object-fit:contain;display:block}'+
  '#edward-rail .tx{display:block;max-width:100%;overflow:hidden;text-wrap:balance}'+
  'body{padding-left:76px!important;box-sizing:border-box}'+
  'html{overflow-x:hidden;overscroll-behavior-x:none;max-width:100%}body{overflow-x:clip;overscroll-behavior-x:none;max-width:100%}html,body{touch-action:pan-y pinch-zoom}.tw,.list,.table-wrap,table,pre,[style*="overflow"]{touch-action:pan-x pan-y pinch-zoom}'+
  /* 統一版面寬度（2026-11-18 Edward：有的頁面寬、有的窄、沒對齊）：所有頁面的內容欄一律最寬 1200px、置中 */
    /* 置頂按鈕：箭頭用 SVG 置中，右邊對齊內容欄（Edward 2026-11-19） */
  '#backToTopBtn{font-size:0!important;width:52px!important;height:52px!important;bottom:28px!important}#backToTopBtn::before{content:"";width:22px;height:22px;background:center/contain no-repeat url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23fffaf0\' stroke-width=\'2.6\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 19V6M6 12l6-6 6 6\'/%3E%3C/svg%3E")}'+
  '@media(min-width:701px){#backToTopBtn,.fab{right:calc(max(76px,(100vw - 1200px)/2) + 16px)!important}}'+
'@media(min-width:701px){body{box-sizing:border-box!important;padding-left:76px!important;padding-right:76px!important}header.ed-host,header.tt-header,body>header,body>main,main.tt-main,.bar-in,#ed-sub,.ig-footer,#edward-board,#edward-refs,.page-container,#buildNotes,body>.container,#buildTableCard{width:100%;max-width:1200px!important;margin-left:auto!important;margin-right:auto!important;box-sizing:border-box}header.tt-header{max-width:none!important;width:auto}}'+
  '@media(max-height:640px){#edward-rail a{font-size:10px}#edward-rail .tx{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical}}'+
  '@media(max-height:520px){#edward-rail .tx{display:none}}'+
  '@media(max-width:700px){#edward-rail{display:none}body{padding-left:0!important;padding-top:60px!important}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  // 手機版：導覽列不佔左邊空間，但頁面自己的左右留白要一樣（之前左邊被清成 0，內容會偏一邊）
  var mq=window.matchMedia('(max-width:700px)');
  /* 置頂按鈕：技能模擬器頁有「點數總結」時，讓按鈕水平置中在總結卡片正下方（對齊），其他頁維持靠內容欄右緣 */
  function alignTop(){var b=document.getElementById('backToTopBtn'),sm=document.querySelector('.summary');if(!b)return;
    if(!sm||innerWidth<1000){b.style.removeProperty('right');return}
    var r=sm.getBoundingClientRect();if(!r.width)return;
    b.style.setProperty('right',Math.max(8,Math.round(document.documentElement.clientWidth-r.right+r.width/2-b.offsetWidth/2))+'px','important')}
  window.addEventListener('resize',alignTop);window.addEventListener('load',function(){alignTop();setTimeout(alignTop,600)});document.addEventListener('DOMContentLoaded',function(){setTimeout(alignTop,300)});
  function fixPad(){document.body.style.removeProperty('padding-left')}   /* 左右留白改由 CSS 統一處理（桌機 76／76，不再互相蓋掉） */
  fixPad();if(mq.addEventListener)mq.addEventListener('change',fixPad);
  var nav=document.createElement('nav');nav.id='edward-rail';nav.setAttribute('aria-label','選擇工具');
  nav.innerHTML=TOOLS.filter(function(t){return !t.hide}).map(function(t){return '<a href="'+t.href+'" title="'+t.name+'" class="'+(t.match.indexOf(cur)>=0?'on':'')+'"><span class="ic">'+t.icon+'</span><span class="tx">'+t.name+'</span></a>'}).join('');

  // 每個頁面最下面都放「聰明理財」介紹與 IG（頁面本身已經有就不重複放）
  function addPromo(){
    if(document.querySelector('.ig-footer'))return;
    var st2=document.createElement('style');st2.textContent='.ig-footer{max-width:960px;margin:36px auto 60px;padding:34px 16px 28px;text-align:center;border-top:1px solid #e8dcc3;font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif;color:#86745f}.ig-footer .intro-title{font-family:"Noto Serif TC","Songti TC",serif;font-size:1.35rem;font-weight:700;color:#3a2f25;letter-spacing:.08em;margin:0 0 10px}.ig-footer .intro{max-width:640px;margin:0 auto 22px;font-size:1rem}.ig-footer .intro p{margin:0 0 16px}.ig-footer .intro p+p{padding-top:16px;border-top:1px dashed #e8dcc3}.ig-footer .intro .ln{display:block;line-height:2;text-wrap:balance}.ig-footer .intro p:first-child .ln:first-child{color:#3a2f25;font-weight:700}.ig-pill{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;border-radius:999px;border:1px solid #a4602a;color:#a4602a!important;background:#fffaf0;font-weight:700;font-size:1.05rem;text-decoration:none!important;transition:background .15s}.ig-pill:hover{background:#f4e8cf}.ig-pill svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}';document.head.appendChild(st2);
    var f=document.createElement('footer');f.className='page-footer ig-footer';f.innerHTML='<p class="intro-title">聰明理財，輕鬆生活</p><div class="intro"><p><span class="ln">我是 Edward，本業是財務顧問。</span><span class="ln">每天做的事，就是打個阿泰爾以及幫人把關資產成長把錢算清楚、排整齊</span></p><p><span class="ln">這個模擬器是我遊戲之餘做的，免費給大家用</span><span class="ln">如果你也想把自己的財務理清楚，歡迎來找我聊</span></p></div><a class="ig-pill" href="https://www.instagram.com/boa19950303/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.2 6.8h.01"/></svg>boa19950303</a>';
    document.body.insertBefore(f,nav);
  }

  // ---- 最下面的「參考資訊」：用過的網站，用圖示集中，點了就開該網站
  var REFS=[["楓情報 Artale 資料站", "https://kafuffu20.com/artale/", "kafuffu20.com.png", "命中計算（新葉城與 6 隻缺命中的怪物）、時間神殿裝備合成"], ["楓之谷圖鑑", "https://www.artalemaplestory.com/zh/monsters", "www.artalemaplestory.com.jpg", "命中計算：怪物命中需求、血量、經驗"], ["楓之谷掉落物查詢", "https://a2983456456.github.io/artale-drop/", "", "命中計算：怪物圖片與命中需求"], ["Maple-ACC-calculator", "https://a2983456456.github.io/Maple-ACC-calculator/", "", "命中率計算方式"], ["jamox80 技能模擬器", "https://jamox80.github.io/maplestory-skill-simulator/", "", "技能模擬器的原始版本"], ["阿泰爾 artale.live", "https://artale.live/tw/balance-patch", "artale.live.png", "魔改存檔（各職業調整第一、二版，官方已下架）、組隊任務教學"], ["冒險島世界 mapleartale", "https://mapleartale.com/exp-table/", "mapleartale.com.png", "升級時間：1～200 級經驗表"], ["Artale 經驗計算機", "https://artale-tools.archie-design.app/tools/exp-calculator", "", "升級時間：核對 1～12 級經驗"], ["MapleStory Wiki", "https://maplestorywiki.net/w/Ellin_Forest", "maplestorywiki.net.png", "地圖指引：艾靈森林、鯨魚號、瑪迦提亞城的名稱對照"]];

  // ---- 留言板（只有 Edward 看得到）：訪客留言送到 Edward 自己的 Google 表單回覆，頁面上不顯示任何人的留言。
  // 設定：BOARD.form＝Google 表單的 formResponse 網址，BOARD.entry＝留言欄位代號（entry.數字）。兩者都有填才會顯示留言板。
  var BOARD={form:'https://docs.google.com/forms/d/e/1FAIpQLSeFwQM2pY0lXhuirRuxnwsNovmVlfXw3zQN_pBJP2PGaZ455g/formResponse',entry:'entry.1549621807'};
  function addBoard(){
    if(!BOARD.form||!BOARD.entry||document.getElementById('edward-board'))return;
    var st=document.createElement('style');st.textContent='#edward-board{max-width:1080px;margin:0 auto 24px;padding:18px 16px 0;border-top:1px solid #e8dcc3;font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif;color:#3a2f25}#edward-board h3{margin:0 0 4px;font:700 20px "Noto Serif TC","Songti TC",serif}#edward-board .sub{margin:0 0 10px;color:#86745f;font-size:13px}#edward-board textarea{width:100%;min-height:96px;box-sizing:border-box;font:inherit;font-size:15px;background:#fdf6e6;border:1px solid #e8dcc3;border-radius:10px;padding:10px 12px;color:#3a2f25;resize:vertical}#edward-board .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:8px}#edward-board button{border:1px solid #a4602a;background:#a4602a;color:#fffaf0;border-radius:999px;padding:8px 24px;font:700 15px inherit;cursor:pointer}#edward-board button[disabled]{opacity:.5;cursor:default}#edward-board .cnt{margin-left:auto;color:#86745f;font-size:12.5px}#edward-board .msg{margin-top:8px;font-weight:700;font-size:14.5px;color:#4d7a36}#edward-board .hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}';document.head.appendChild(st);
    var sec=document.createElement('section');sec.id='edward-board';
    sec.innerHTML='<h3>留言板</h3><p class="sub">發現 Bug、數字不對、或有想要的功能，都可以留言給我。只有我看得到，不會公開顯示。</p><textarea id="eb-t" maxlength="500" placeholder="請寫下遇到的問題（例如：哪個頁面、做了什麼、看到什麼）…"></textarea><input class="hp" id="eb-h" tabindex="-1" autocomplete="off" aria-hidden="true"><div class="row"><button type="button" id="eb-s">送出留言</button><span class="cnt"><span id="eb-n">0</span> / 500</span></div><div class="msg" id="eb-m" role="status"></div>';
    document.body.insertBefore(sec,nav);
    var t=sec.querySelector('#eb-t'),b=sec.querySelector('#eb-s'),m=sec.querySelector('#eb-m'),n=sec.querySelector('#eb-n'),last=0;
    t.addEventListener('input',function(){n.textContent=t.value.length;m.textContent=''});
    b.addEventListener('click',function(){
      var v=t.value.trim();if(!v){m.style.color='#a4602a';m.textContent='請先寫下留言內容';return}
      if(sec.querySelector('#eb-h').value)return;   // 機器人欄位被填就丟掉
      if(Date.now()-last<30000){m.style.color='#a4602a';m.textContent='請稍等一下再送出下一則';return}
      b.disabled=true;last=Date.now();
      var ua=navigator.userAgent,dev=/iPhone/.test(ua)?'iPhone 手機':/iPad/.test(ua)?'iPad 平板':/Android/.test(ua)?'Android '+(/Mobile/.test(ua)?'手機':'平板'):/Windows/.test(ua)?'Windows 電腦':/Macintosh/.test(ua)?'Mac 電腦（或 iPad）':/Linux/.test(ua)?'Linux 電腦':'未知裝置';
      var info='\n\n———\n留言頁面：'+document.title.split('｜')[0]+'｜螢幕大小：'+innerWidth+'×'+innerHeight+'｜裝置：'+dev;
      var fd=new FormData();fd.append(BOARD.entry,v+info);
      fetch(BOARD.form,{method:'POST',mode:'no-cors',body:fd}).then(function(){
        t.value='';n.textContent='0';m.style.color='#4d7a36';m.textContent='謝謝你幫我抓 Bug！我收到了，會盡快處理 🙏';
      }).catch(function(){m.style.color='#a4602a';m.textContent='送出失敗，請稍後再試一次';last=0}).then(function(){b.disabled=false});
    });
  }

  function addRefs(){
    if(document.getElementById('edward-refs'))return;
    var st3=document.createElement('style');st3.textContent='#edward-refs{max-width:1080px;margin:0 auto 70px;padding:18px 16px 0;border-top:1px solid #e8dcc3;font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif;color:#86745f;font-size:13px;line-height:1.6}#edward-refs h3{margin:0 0 4px;font:700 17px "Noto Serif TC","Songti TC",serif;color:#3a2f25;letter-spacing:.06em}#edward-refs .sub{margin:0 0 12px;font-size:12.5px}#edward-refs .g{display:flex;flex-direction:column;gap:10px;align-items:center}#edward-refs .rw{display:flex;justify-content:center;gap:10px}#edward-refs a.r{display:flex;flex-direction:column;align-items:center;gap:6px;width:104px;padding:10px 6px 8px;border:1px solid #e8dcc3;border-radius:14px;background:#fffaf0;color:#3a2f25;text-decoration:none;text-align:center;font-size:12px;font-weight:700;line-height:1.3}#edward-refs a.r:hover{border-color:#a4602a;box-shadow:0 3px 10px rgba(58,47,37,.15)}#edward-refs a.r .ico{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:#f4e8cf;overflow:hidden;font:700 18px "Noto Serif TC",serif;color:#a4602a}#edward-refs a.r .ico img{width:30px;height:30px;object-fit:contain}';document.head.appendChild(st3);
    var s=document.createElement('section');s.id='edward-refs';
    s.innerHTML='<h3>參考資訊</h3><p class="sub">這個網站用到的資料與參考來源，點圖示可以開啟該網站（滑過可看用在哪裡）。非官方整理，數字可能與遊戲內不同，請自行核對。</p><div class="g">'+REFS.map(function(x){return '<a class="r" href="'+x[1]+'" target="_blank" rel="noopener noreferrer" title="'+x[3]+'"><span class="ico">'+(x[2]?'<img src="ref-icons/'+x[2]+'" alt="">':x[0].charAt(0))+'</span>'+x[0]+'</a>'}).join('')+'</div>';
    document.body.insertBefore(s,nav);
    // 對稱排列：依寬度算出行數，每行數量平均分配（各行最多差 1 個），置中
    var g=s.querySelector('.g'),tiles=[].slice.call(g.children);
    function layoutRefs(){
      var W=g.clientWidth||s.clientWidth-32,per=Math.max(1,Math.floor((W+10)/(104+10))),n=tiles.length,rows=Math.ceil(n/per),base=Math.floor(n/rows),extra=n%rows,i=0;
      g.innerHTML='';
      for(var r=0;r<rows;r++){var cnt=base+(r<extra?1:0),row=document.createElement('div');row.className='rw';for(var k=0;k<cnt;k++)row.appendChild(tiles[i++]);g.appendChild(row)}
    }
    layoutRefs();var lastW=window.innerWidth;window.addEventListener('resize',function(){if(window.innerWidth!==lastW){lastW=window.innerWidth;layoutRefs()}});
  }

  // ---- 每頁統一：標題前放工具圖示、右上角放 Instagram、字型與標題大小統一
  function addChrome(){
    if(document.getElementById('edward-chrome'))return;
    var st=document.createElement('style');st.id='edward-chrome';
    st.textContent='body{font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif}button,input,select,textarea{font-family:inherit}'+
    'body h1{font:700 28px/1.25 "Noto Serif TC","Songti TC",serif;letter-spacing:.04em;color:#3a2f25;margin:0 0 6px}'+
    'body h2{font:700 20px/1.35 "Noto Serif TC","Songti TC",serif;color:#3a2f25}'+
    'body h3{font-weight:700}'+
    'body h1.has-ic{display:flex;align-items:center;gap:12px}.hic{flex:0 0 auto;width:44px;height:44px;display:inline-flex}.hic svg{width:100%;height:100%;display:block}'+
    '.ed-ig{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border-radius:999px;border:1px solid #a4602a;color:#a4602a;background:#fffaf0;font:700 15px "Noto Sans TC","PingFang TC",system-ui,sans-serif;text-decoration:none;white-space:nowrap}.ed-ig:hover{background:#f4e8cf}.ed-ig svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}'+
    '.ed-host{position:relative}@media(min-width:701px){.ed-host{padding-right:210px!important}.ed-host>.ed-ig{position:absolute;right:16px;top:20px}}'+
    '.ed-sim>.ed-ig{display:flex;width:fit-content;align-self:flex-end;margin:0 0 10px auto}@media(min-width:1000px){.ed-sim{position:static!important}.ed-sim>.ed-ig{position:absolute;right:20px;top:20px;margin:0}}'+
    '@media(max-width:700px){body h1{font-size:24px}.hic{width:36px;height:36px}.ed-host>.ed-ig{display:flex;width:fit-content;margin:0 0 10px auto;padding:6px 12px;font-size:13px}}';
    document.head.appendChild(st);
    var h=document.querySelector('h1');if(!h)return;
    var id=null;TOOLS.forEach(function(t){if(t.match.indexOf(cur)>=0)id=t.id});
    if(id&&id!=='sim'&&!h.querySelector('img,svg')){h.classList.add('has-ic');var s=document.createElement('span');s.className='hic';s.innerHTML=ICON(id);h.insertBefore(s,h.firstChild)}
    var host=h.parentElement;
    if(document.querySelector('header .ig-pill,.toolbar .ig-pill'))return; // 頁面自己已有（法師裝備模擬器）
    host.classList.add(id==='sim'?'ed-sim':'ed-host');
    var a=document.createElement('a');a.className='ed-ig';a.href='https://www.instagram.com/boa19950303/';a.target='_blank';a.rel='noopener noreferrer';
    a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.2 6.8h.01"/></svg>boa19950303';
    host.insertBefore(a,host.firstChild);
    if(id==='sim'){var fit=function(){a.classList.remove('stack');var x=a.getBoundingClientRect(),y=h.getBoundingClientRect();if(x.left<y.right&&x.right>y.left&&x.top<y.bottom&&x.bottom>y.top)a.classList.add('stack')};fit();window.addEventListener('resize',fit);setTimeout(fit,400)}
  }



  // ---- 合併的工具：頁內分頁（練功計算＝命中計算＋升級時間；小工具＝快捷指令＋匯率換算）
  var SUBTABS={'acc.html':'acc','exp.html':'acc','cmd.html':'cmd','fx.html':'cmd'};
  var SUBGROUPS={acc:[['命中計算','acc.html','acc'],['升級時間','exp.html','exp']],cmd:[['快捷指令','cmd.html','cmd'],['匯率換算','fx.html','fx']]};
  function addSubTabs(){
    var g=SUBTABS[cur];if(!g||document.getElementById('ed-sub'))return;
    var h=document.querySelector('h1');if(!h)return;var anchor=h.closest('header')||h;
    var st=document.createElement('style');st.textContent='#ed-sub{max-width:1050px;margin:12px auto 0;padding:0 16px;display:flex;gap:12px;flex-wrap:wrap;font-family:"Noto Sans TC","PingFang TC",system-ui,sans-serif}#ed-sub a{display:flex;align-items:center;gap:10px;flex:1 1 220px;max-width:340px;border:2px solid #a4602a;background:#fffaf0;color:#a4602a;border-radius:16px;padding:10px 18px;font-weight:800;font-size:19px;text-decoration:none;box-shadow:0 3px 10px -4px rgba(120,88,48,.45);transition:transform .15s}#ed-sub a:hover{transform:translateY(-2px)}#ed-sub a.on{background:#a4602a;color:#fffaf0;box-shadow:0 6px 14px -6px rgba(120,88,48,.7)}#ed-sub .si{width:34px;height:34px;flex:none;display:inline-flex}#ed-sub .si svg,#ed-sub .si img{width:100%;height:100%;display:block}#ed-sub a.on .si{background:#fffaf0;border-radius:9px;padding:2px}@media(max-width:700px){#ed-sub{padding:0 12px;margin-top:10px;gap:8px}#ed-sub a{flex:1 1 0;min-width:0;padding:8px 10px;font-size:16px;gap:8px;max-width:none}#ed-sub .si{width:28px;height:28px}}';document.head.appendChild(st);
    var d=document.createElement('div');d.id='ed-sub';
    d.innerHTML=SUBGROUPS[g].map(function(t){var tl=TOOLS.filter(function(x){return x.id===t[2]})[0];var ic=tl?tl.icon.split('ni_'+t[2]).join('nt_'+t[2]):'';return '<a href="'+t[1]+'" class="'+(t[1]===cur?'on':'')+'"><span class="si">'+ic+'</span>'+t[0]+'</a>'}).join('');
    anchor.parentNode.insertBefore(d,anchor);
  }

  // ---- 技能模擬器兩個版本：正式版（最初版，收錄自 Jamox）／測試版（阿泰爾魔改資料，未來提供後會改成正式版）
  function addVersion(){
    var official=/^official-/.test(cur),isSim=['','index.html','simulator.html','official-index.html','official-simulator.html'].indexOf(cur)>=0;
    if(!isSim||document.getElementById('ed-ver'))return;
    var q=location.search,page=/simulator\.html$/.test(cur)?'simulator.html':'index.html';
    var prof=(new URLSearchParams(q)).get('prof')||'';
    var royal=/^(soulmaster|flamewizard|windbreaker|nightwalker|striker)/i.test(prof);
    var offHref=(page==='simulator.html'&&q&&!royal)?'official-simulator.html'+q:'official-index.html';
    var testHref=(page==='simulator.html'&&q)?'simulator.html'+q:'index.html';
    var st=document.createElement('style');
    st.textContent='#ed-ver{max-width:960px;margin:0 auto;padding:12px 16px 0;text-align:center;font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif;color:#3a2f25}'+
     '#ed-ver .seg{display:inline-flex;border:1px solid #a4602a;border-radius:999px;overflow:hidden;background:#fffaf0}'+
     '#ed-ver .seg a{padding:7px 18px;font-weight:700;font-size:15px;text-decoration:none;color:#a4602a;white-space:nowrap}'+
     '#ed-ver .seg a.on{background:#a4602a;color:#fffaf0}'+
     '#ed-ver p{margin:8px 0 0;font-size:13.5px;line-height:1.55;color:#86745f}'+
     '@media(max-width:700px){#ed-ver{padding-top:8px}#ed-ver .seg a{padding:6px 12px;font-size:14px}}';
    document.head.appendChild(st);
    var d=document.createElement('div');d.id='ed-ver';
    d.innerHTML='<div class="seg"><a href="'+offHref+'" class="'+(official?'on':'')+'">正式版（最初版）</a><a href="'+testHref+'" class="'+(official?'':'on')+'">Tespia v2 測試版</a></div>'+
      '<p>'+(official?'目前是<b>正式版</b>：遊戲裡現在實際的技能資料（冒險家 12 職業）。':'目前是<b>Tespia v2 測試版</b>：加入阿泰爾魔改資料與皇家騎士團 5 職業，未來官方正式提供後，這一版會改成正式版。')+'</p>';
    document.body.insertBefore(d,document.body.firstChild);
    // 不用瀏覽器記憶（Chrome 會殘留舊紀錄）：每次打開技能頁，第一次點配點都會問；問過之後同一次瀏覽不再重複問
    var answered=false;
    function picked(){return answered}
    function setPick(v){answered=true}
    // 還沒選過版本時，第一次要點技能點數就先問：用正式版，還是 Tespia v2 測試版
    if(page!=='simulator.html')return;
    var ms=document.createElement('style');
    ms.textContent='#ed-vp{position:fixed;inset:0;z-index:20000;background:rgba(58,47,37,.55);display:flex;align-items:center;justify-content:center;padding:16px;font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif}'+
      '#ed-vp .box{background:#fffaf0;border:1px solid #e8dcc3;border-radius:16px;max-width:440px;width:100%;padding:22px 20px;color:#3a2f25;box-shadow:0 12px 40px rgba(0,0,0,.3)}'+
      '#ed-vp h3{margin:0 0 6px;font:700 20px "Noto Serif TC","Songti TC",serif}#ed-vp p.s{margin:0 0 14px;color:#86745f;font-size:14px;line-height:1.55}'+
      '#ed-vp button{display:block;width:100%;text-align:left;margin:8px 0 0;padding:12px 14px;border-radius:12px;border:1px solid #a4602a;background:#fffaf0;color:#3a2f25;cursor:pointer;font:inherit}'+
      '#ed-vp button b{display:block;color:#a4602a;font-size:16px}#ed-vp button span{font-size:13px;color:#86745f;line-height:1.5}'+
      '#ed-vp button.cur{background:#f4e8cf}#ed-vp button:hover{background:#f4e8cf}';
    document.head.appendChild(ms);
    var replaying=false;
    // 皇家騎士團職業只有 Tespia v2 測試版有，不需要問；之後再有新改版再加進來
    function isRoyalNow(){var sel=document.getElementById('professionSelect'),t=sel&&sel.selectedOptions[0]?sel.selectedOptions[0].text:'';return /聖魂劍士|烈焰巫師|破風使者|暗夜行者|閃雷悍將|SoulMaster|FlameWizard|WindBreaker|NightWalker|Striker/i.test(t)||(!sel&&royal)}
    function ask(resume){
      if(document.getElementById('ed-vp'))return;
      var m=document.createElement('div');m.id='ed-vp';
      m.innerHTML='<div class="box" role="dialog" aria-modal="true"><h3>要使用哪一個版本？</h3><p class="s">每次打開技能模擬器，第一次點配點都會先問一次。隨時可以用最上方的切換條換版本。</p>'+
        '<button type="button" data-v="official" class="'+(official?'cur':'')+'"><b>正式版（最初版）</b><span>遊戲目前實際的技能資料，冒險家 12 職業。'+(official?'（你現在在這一版）':'')+'</span></button>'+
        '<button type="button" data-v="test" class="'+(official?'':'cur')+'"><b>Tespia v2 測試版</b><span>加入阿泰爾魔改資料與皇家騎士團 5 職業，未來會改成正式版。'+(official?'':'（你現在在這一版）')+'</span></button></div>';
      document.body.appendChild(m);
      m.addEventListener('click',function(e){var b=e.target.closest('button[data-v]');if(!b)return;var v=b.dataset.v;setPick(v);
        if((v==='official')===official){m.remove();resume()}
        else{location.href=v==='official'?(royal||!q?'official-index.html':'official-simulator.html'+q):'simulator.html'+q}});
    }
    document.addEventListener('click',function(e){
      if(replaying||picked()||isRoyalNow())return;var b=e.target.closest&&e.target.closest('button[onclick]');if(!b)return;
      if(!/^(increaseSkill|maxSkill)\(/.test(b.getAttribute('onclick')||''))return;
      e.preventDefault();e.stopImmediatePropagation();
      ask(function(){replaying=true;try{b.click()}finally{replaying=false}});
    },true);
    document.addEventListener('focusin',function(e){var i=e.target;if(i&&i.classList&&i.classList.contains('skill-level-input'))i.dataset.prev=i.value});
    document.addEventListener('change',function(e){
      var i=e.target;if(replaying||picked()||isRoyalNow()||!i||!i.classList||!i.classList.contains('skill-level-input'))return;
      var prev=+(i.dataset.prev||0),now=+i.value;if(!(now>prev))return;
      e.stopImmediatePropagation();i.value=prev;
      ask(function(){replaying=true;try{i.value=now;i.dispatchEvent(new Event('change',{bubbles:true}))}finally{replaying=false}});
    },true);
  }

  // ---- 手機版：左上角下拉選單（取代底部工具欄）＋右上角 Instagram
  function addTopbar(){
    if(document.getElementById('ed-top'))return;
    var id=null,name='選擇工具';TOOLS.forEach(function(x){if(x.match.indexOf(cur)>=0){var gt=x.g?TOOLS.filter(function(y){return y.id===x.g})[0]:x;id=gt.id;name=gt.name}});
    var s=document.createElement('style');
    s.textContent='#ed-top,#ed-menu-list{display:none}@media(max-width:700px){'+
     '#ed-top{position:fixed;left:0;right:0;top:0;height:52px;z-index:10000;background:#f5ecdb;border-bottom:1px solid #e8dcc3;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 12px;font-family:"Noto Sans TC","PingFang TC",system-ui,sans-serif}'+
     '#ed-menu{display:inline-flex;align-items:center;gap:8px;max-width:62%;padding:5px 12px 5px 6px;border-radius:999px;border:1px solid #a4602a;background:#fffaf0;color:#3a2f25;font:700 14px "Noto Sans TC",system-ui,sans-serif;cursor:pointer}'+
     '#ed-menu .mi{width:28px;height:28px;display:inline-flex;flex:0 0 auto}#ed-menu .mi svg,#ed-menu .mi img{width:100%;height:100%;display:block}#ed-menu .mt{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#ed-menu .ch{width:14px;height:14px;fill:none;stroke:#a4602a;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;transition:transform .15s}#ed-menu[aria-expanded=true] .ch{transform:rotate(180deg)}'+
     '#ed-top .edig{align-self:center;margin:0;display:inline-flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;border:1px solid #a4602a;background:#fffaf0;color:#a4602a;font:700 12.5px "Noto Sans TC",system-ui,sans-serif;text-decoration:none;white-space:nowrap}#ed-top .edig svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}'+
     '#ed-menu-list{position:fixed;left:10px;top:58px;z-index:10001;width:min(300px,calc(100vw - 20px));max-height:calc(100vh - 70px);overflow:auto;background:#fffaf0;border:1px solid #e8dcc3;border-radius:16px;padding:6px;box-shadow:0 12px 30px rgba(58,47,37,.28)}#ed-menu-list.open{display:block}'+
     '#ed-menu-list a{display:flex;align-items:center;gap:12px;padding:9px 10px;border-radius:12px;text-decoration:none;color:#3a2f25;font:700 15px "Noto Sans TC",system-ui,sans-serif}#ed-menu-list a.on{background:#f4e8cf;color:#a4602a}#ed-menu-list .mi{width:32px;height:32px;display:inline-flex;flex:0 0 auto}#ed-menu-list .mi svg,#ed-menu-list .mi img{width:100%;height:100%;display:block}'+
     '.ed-ig,header .ig-pill,.toolbar .ig-pill{display:none!important}.bar{top:52px!important}}';
    document.head.appendChild(s);
    var cur2=TOOLS.filter(function(x){return x.id===id})[0];
    var bar=document.createElement('div');bar.id='ed-top';
    bar.innerHTML='<button type="button" id="ed-menu" aria-expanded="false" aria-haspopup="true" aria-controls="ed-menu-list"><span class="mi">'+(cur2?cur2.icon.split('ni_'+cur2.id).join('nt_'+cur2.id):'')+'</span><span class="mt">'+name+'</span><svg class="ch" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>'+
     '<a class="edig" href="https://www.instagram.com/boa19950303/" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.2 6.8h.01"/></svg>boa19950303</a>';
    var list=document.createElement('div');list.id='ed-menu-list';list.setAttribute('role','menu');
    list.innerHTML=TOOLS.filter(function(x){return !x.hide}).map(function(x){return '<a role="menuitem" href="'+x.href+'" class="'+(x.id===id?'on':'')+'"><span class="mi">'+x.icon.split('ni_'+x.id).join('nm_'+x.id)+'</span>'+x.name+'</a>'}).join('');
    document.body.appendChild(bar);document.body.appendChild(list);
    var btn=bar.querySelector('#ed-menu');
    function tog(o){list.classList.toggle('open',o);btn.setAttribute('aria-expanded',String(o))}
    btn.addEventListener('click',function(e){e.stopPropagation();tog(!list.classList.contains('open'))});
    document.addEventListener('click',function(e){if(!list.contains(e.target))tog(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')tog(false)});
  }
  function add(){document.body.appendChild(nav);addTopbar();addChrome();addSubTabs();addVersion();addPromo();addBoard();addRefs()}
  if(document.body)add();else document.addEventListener('DOMContentLoaded',add);
})();
