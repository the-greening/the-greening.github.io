const toggle=document.querySelector('#menu-toggle'),menu=document.querySelector('#menu');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','메뉴 열기')}
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기')});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const dialog=document.querySelector('#lightbox'),large=document.querySelector('#lightbox-image');let previousFocus;
function bindZoom(root=document){root.querySelectorAll('.zoom').forEach(b=>b.addEventListener('click',()=>{previousFocus=b;large.src=b.dataset.image;large.alt=b.querySelector('img').alt;document.querySelector('#lightbox-title').textContent=b.getAttribute('aria-label').replace(' 확대','');dialog.showModal()}))}
bindZoom();document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>previousFocus?.focus({preventScroll:true}));
if('IntersectionObserver'in window){
 const running=new WeakMap();
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){const el=entry.target;
 if(entry.isIntersecting){if(el.classList.contains('in-view'))continue;el.classList.add('in-view');
 const photo=el.classList.contains('work-tile');const siblings=photo?[...el.parentElement.children]:[];const delay=photo?(siblings.indexOf(el)%(innerWidth<=760?2:4))*100:0;
 const start={opacity:0,transform:photo?'translateY(36px) scale(.97)':el.classList.contains('from-left')?'translateX(-30px)':el.classList.contains('from-right')?'translateX(30px)':'translateY(26px)'};
 running.set(el,el.animate([start,{opacity:1,transform:'none'}],{duration:photo?1000:850,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
 }else{running.get(el)?.cancel();el.classList.remove('in-view')}}},{threshold:.1,rootMargin:'0px 0px -20px 0px'});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
const v=document.querySelector('#studio-video');function startVideo(){v.muted=true;v.play().catch(()=>{})}startVideo();document.addEventListener('visibilitychange',()=>{if(!document.hidden)startVideo()});function videoFallback(){if(v.nextElementSibling?.classList.contains('video-fallback'))return;const img=document.createElement('img');img.src=v.poster;img.alt='더그리닝 실제 매장 공간';img.className='video-fallback';v.hidden=true;v.after(img)}v.addEventListener('error',videoFallback);v.querySelector('source')?.addEventListener('error',videoFallback,{once:true});
history.scrollRestoration='manual';
const reloaded=performance.getEntriesByType('navigation')[0]?.type==='reload';
window.addEventListener('load',()=>{if(reloaded||!location.hash){if(reloaded&&location.hash)history.replaceState(null,'',location.pathname+location.search);window.scrollTo({top:0,left:0,behavior:'instant'})}},{once:true});
