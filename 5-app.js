const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mb=$('.menu-btn'),pn=$('.panel');
function tog(o){mb.setAttribute('aria-expanded',o);pn.classList.toggle('open',o);document.body.style.overflow=o?'hidden':''}
mb.onclick=()=>tog(mb.getAttribute('aria-expanded')!=='true');
$$('.panel a').forEach(a=>a.onclick=()=>tog(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape')tog(false)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.rv').forEach(el=>io.observe(el));
// tagline words
const tp=$('.tagline p');tp.innerHTML=tp.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ');
const wio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');wio.unobserve(e.target)}}),{rootMargin:'0px 0px -35% 0px',threshold:1});
$$('.w').forEach(w=>wio.observe(w));
// menu tabs
const data={
pizza:[["Margherita","Tomato, buffalo mozzarella, basil, olive oil","13.50","img-hero.jpg"],["Diavola","Spicy salami, chili oil, fior di latte","15.90","img-pepperoni.jpg"],["Marinara","Tomato, garlic, oregano, no cheese","10.80","img-dough.jpg"],["Quattro formaggi","Mozzarella, gorgonzola, parmigiano, provola","16.40",""],["Funghi e tartufo","Mushrooms, truffle cream, thyme","17.70",""],["Nduja e miele","Calabrian nduja, hot honey, ricotta","16.90",""]],
sides:[["Burrata e pomodori","Burrata, slow roasted tomatoes, basil oil","11.30",""],["Fritto misto","Fried zucchini, artichoke, calamari","12.60",""],["Insalata di rucola","Rocket, shaved parmigiano, lemon","8.70",""],["Pane all'aglio","Wood fired garlic bread","6.40",""]],
dessert:[["Tiramisu","Mascarpone, espresso, cocoa","7.90",""],["Panna cotta","Vanilla bean, berry compote","7.20",""],["Nutella calzone","Baked, dusted with sugar","8.50",""]]};
const ic='<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3"><circle cx="32" cy="32" r="20"/><circle cx="25" cy="26" r="3"/><circle cx="38" cy="30" r="3"/><circle cx="30" cy="40" r="3"/></svg>';
function render(k){$('#menuList').innerHTML=data[k].map(([n,d,p,i])=>`<article class="item">${i?`<img src="${i}" alt="${n} pizza" loading="lazy">`:`<div class="noimg" aria-hidden="true">${ic}</div>`}<div class="t"><div class="row"><h3 class="title-3">${n}</h3><span class="price">$${p}</span></div><p class="body-6">${d}</p></div></article>`).join('');
$$('.tab').forEach(t=>t.setAttribute('aria-selected',t.dataset.k===k))}
$$('.tab').forEach(t=>t.onclick=()=>render(t.dataset.k));render('pizza');
// form
const f=$('#bf');f.addEventListener('submit',e=>{e.preventDefault();let ok=true;
const chk=(id,fn,m)=>{const el=$('#'+id),er=$('#e_'+id);const v=el.value.trim();if(!fn(v)){er.textContent=m;ok=false}else er.textContent=''};
chk('nm',v=>v.length>1,'Enter your name.');chk('em',v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),'Enter a valid email, like name@example.com.');chk('dt',v=>!!v,'Pick a date.');
if(ok){const b=f.querySelector('button');b.textContent='Sending';b.disabled=true;setTimeout(()=>{f.style.display='none';const o=$('.ok');o.style.display='block';o.textContent='Table for '+$('#pp').value+' requested for '+$('#dt').value+' at '+$('#tm').value+'. This is a demo site, so no booking was made.'},700)}});
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
