
(function(){
  var b=document.getElementById('devToggle');
  function setDev(on){document.body.classList.toggle('hide-dev',!on);if(b){b.setAttribute('aria-pressed',on);b.textContent=on?'إخفاء ملاحظات المطوّر':'إظهار ملاحظات المطوّر'}try{localStorage.setItem('sb-dev',on?'1':'0')}catch(e){}}
  var saved='0';try{saved=localStorage.getItem('sb-dev')||'0'}catch(e){}
  setDev(saved==='1');
  if(b)b.addEventListener('click',function(){setDev(document.body.classList.contains('hide-dev'))});

  var hdr=document.getElementById('hdr');
  addEventListener('scroll',function(){hdr.classList.toggle('scrolled',scrollY>10)},{passive:true});

  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO='IntersectionObserver' in window;

  /* reveal: hide only below-the-fold blocks; everything shows after 3s regardless */
  var els=[].slice.call(document.querySelectorAll('.rv'));
  if(hasIO && !reduce){
    var vh=innerHeight;
    els.forEach(function(el,i){if(el.getBoundingClientRect().top>vh*0.9){el.classList.add('pre');el.style.transitionDelay=((i%3)*90)+'ms'}});
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el)});
    setTimeout(function(){els.forEach(function(el){el.classList.remove('pre')})},3000);
  }

  /* count up */
  if(hasIO && !reduce){
    var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target,to=+el.dataset.count,p=el.dataset.prefix||'',t0=null;function f(t){if(!t0)t0=t;var k=Math.min(1,(t-t0)/1400);el.textContent=p+Math.round(to*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f);co.unobserve(el)})});
    [].forEach.call(document.querySelectorAll('[data-count]'),function(c){co.observe(c)});
  }

  /* process line */
  var pl=document.getElementById('process-line');
  if(pl){if(hasIO){var po=new IntersectionObserver(function(es){if(es[0].isIntersecting){pl.classList.add('go');po.disconnect()}},{threshold:.4});po.observe(pl)}else pl.classList.add('go')}

  /* parcels travelling along shipping routes (offset-path in stage pixels) */
  var st=document.getElementById('shipStage');
  function parcels(){
    [].forEach.call(st.querySelectorAll('.parcel'),function(p){p.remove()});
    if(reduce)return;
    var W=st.clientWidth,H=st.clientHeight;
    [].slice.call(st.querySelectorAll('.routes path')).forEach(function(p,i){
      var d=p.getAttribute('d').replace(/(-?\d+(\.\d+)?)[ ,]+(-?\d+(\.\d+)?)/g,function(m,x,_,y){return (x*W/1000).toFixed(1)+' '+(y*H/500).toFixed(1)});
      var s=document.createElement('span');s.className='parcel';s.setAttribute('aria-hidden','true');
      s.style.offsetPath="path('"+d+"')";s.style.left='0';s.style.top='0';s.style.setProperty('--d',(-i*0.65)+'s');
      st.appendChild(s);
    });
  }
  if(st){parcels();addEventListener('resize',function(){clearTimeout(st._t);st._t=setTimeout(parcels,200)})}

  /* typing search query */
  var tq=document.getElementById('typeQ');
  if(!reduce&&tq){var qs=['عطور عود فاخرة دبي','متجر عبايات أونلاين','قهوة مختصة توصيل'],qi=0,ci=tq.textContent.length,del=true;
    setInterval(function(){var q=qs[qi];if(del){ci--;if(ci<=0){del=false;qi=(qi+1)%qs.length}}else{ci++;if(ci>=qs[qi].length+12)del=true}tq.textContent=qs[qi].slice(0,Math.max(0,Math.min(ci,qs[qi].length)))},90)}

  /* brand slider (RTL: forward = negative scrollLeft) */
  var tr=document.getElementById('brandTrack'),dots=document.getElementById('brandDots');
  function per(){return innerWidth<=720?2:4}
  function gap(){return per()===2?12:20}
  function pages(){return Math.ceil(tr.children.length/per())}
  function cur(){return Math.round(Math.abs(tr.scrollLeft)/(tr.clientWidth+gap()))}
  function go(i){var n=pages();i=(i+n)%n;tr.scrollTo({left:-i*(tr.clientWidth+gap()),behavior:'smooth'})}
  function drawDots(){dots.innerHTML='';for(var i=0;i<pages();i++){var d=document.createElement('button');d.type='button';d.setAttribute('aria-label','صفحة '+(i+1));(function(k){d.onclick=function(){go(k)}})(i);dots.appendChild(d)}mark()}
  function mark(){var c=cur();[].forEach.call(dots.children,function(d,i){d.setAttribute('aria-current',i===c)})}
  if(tr&&dots){
  tr.addEventListener('scroll',function(){clearTimeout(tr._t);tr._t=setTimeout(mark,80)});
  var brNext=document.getElementById('brNext'),brPrev=document.getElementById('brPrev');
  if(brNext)brNext.onclick=function(){go(cur()+1)};
  if(brPrev)brPrev.onclick=function(){go(cur()-1)};
  addEventListener('resize',drawDots);drawDots();
  var paused=false;['mouseenter','touchstart','focusin'].forEach(function(e){tr.addEventListener(e,function(){paused=true},{passive:true})});
  ['mouseleave','focusout'].forEach(function(e){tr.addEventListener(e,function(){paused=false})});
  if(!reduce){setInterval(function(){if(!paused&&!document.hidden)go(cur()+1)},4000)}
  }

  var f=document.getElementById('leadForm');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();var ok=true;['f-name','f-phone'].forEach(function(id){var el=document.getElementById(id);if(!el||!el.value.trim()){if(el){el.setAttribute('aria-invalid','true');el.style.borderColor='var(--red)'}ok=false}else{el.removeAttribute('aria-invalid');el.style.borderColor=''}});if(ok){fetch('/api/lead',{method:'POST',body:new FormData(f)}).then(function(r){if(r.ok){var okEl=document.getElementById('formOk');if(okEl)okEl.hidden=false}}).catch(function(){})}});
})();
