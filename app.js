const toggle=document.querySelector('#menu-toggle'),menu=document.querySelector('#menu');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','메뉴 열기')}
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기')});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const dialog=document.querySelector('#lightbox'),large=document.querySelector('#lightbox-image');let previousFocus;
function bindZoom(root=document){root.querySelectorAll('.zoom').forEach(b=>b.addEventListener('click',()=>{previousFocus=b;large.src=b.dataset.image;large.alt=b.querySelector('img').alt;document.querySelector('#lightbox-title').textContent=b.getAttribute('aria-label').replace(' 확대','');dialog.showModal()}))}
bindZoom();document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>previousFocus?.focus({preventScroll:true}));
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)e.target.classList.add('in-view');else e.target.classList.remove('in-view')}},{threshold:.12,rootMargin:'0px 0px -12px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}
const v=document.querySelector('#studio-video');function startVideo(){v.muted=true;v.play().catch(()=>{})}startVideo();document.addEventListener('visibilitychange',()=>{if(!document.hidden)startVideo()});function videoFallback(){if(v.nextElementSibling?.classList.contains('video-fallback'))return;const img=document.createElement('img');img.src=v.poster;img.alt='더그리닝 실제 매장 공간';img.className='video-fallback';v.hidden=true;v.after(img)}v.addEventListener('error',videoFallback);v.querySelector('source')?.addEventListener('error',videoFallback,{once:true});
history.scrollRestoration='manual';
const reloaded=performance.getEntriesByType('navigation')[0]?.type==='reload';
window.addEventListener('load',()=>{if(reloaded||!location.hash){if(reloaded&&location.hash)history.replaceState(null,'',location.pathname+location.search);window.scrollTo({top:0,left:0,behavior:'instant'})}},{once:true});




const carousel=document.querySelector('.results-carousel'),track=carousel.querySelector('.results-track'),cards=[...track.children],pause=document.querySelector('#result-pause');
let current=0,paused=false,visible=false,touching=false;
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
function showResult(index){current=(index+cards.length)%cards.length;track.scrollTo({left:cards[current].offsetLeft-cards[0].offsetLeft,behavior:reduced.matches?'instant':'smooth'});updateCount()}
function updateCount(){document.querySelector('#result-count').textContent=String(current+1).padStart(2,'0')+' / '+cards.length}
document.querySelector('#result-prev').addEventListener('click',()=>showResult(current-1));
document.querySelector('#result-next').addEventListener('click',()=>showResult(current+1));
pause.addEventListener('click',()=>{paused=!paused;pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'자동 넘김 재생':'자동 넘김 일시정지');pause.textContent=paused?'자동 재생 ▶':'일시정지 Ⅱ'});
let scrollEnd;track.addEventListener('scroll',()=>{clearTimeout(scrollEnd);scrollEnd=setTimeout(()=>{current=cards.reduce((best,card,i)=>Math.abs(card.offsetLeft-cards[0].offsetLeft-track.scrollLeft)<Math.abs(cards[best].offsetLeft-cards[0].offsetLeft-track.scrollLeft)?i:best,0);updateCount()},150)},{passive:true});
track.addEventListener('pointerdown',()=>touching=true);window.addEventListener('pointerup',()=>touching=false);window.addEventListener('pointercancel',()=>touching=false);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:.25}).observe(track);
setInterval(()=>{if(visible&&!paused&&!touching&&!document.hidden&&!dialog.open&&!carousel.matches(':hover')&&!carousel.contains(document.activeElement))showResult(current+1)},5000);
window.addEventListener('resize',()=>track.scrollTo({left:cards[current].offsetLeft-cards[0].offsetLeft,behavior:'instant'}));
