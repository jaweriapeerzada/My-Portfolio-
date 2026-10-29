const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{entry.target.classList.toggle('visible',entry.isIntersecting)})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const navLinks=[...document.querySelectorAll('.desktop-nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
const navObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
    }
  })
},{rootMargin:'-40% 0px -55% 0px'});
sections.forEach(s=>navObserver.observe(s));

document.querySelectorAll('.filter').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    button.classList.add('active');
    const filter=button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      const categories=card.dataset.category||'';
      card.classList.toggle('hide',filter!=='all'&&!categories.includes(filter));
    });
  });
});

const menu=document.querySelector('.mobile-menu');
const menuBtn=document.querySelector('.menu-btn');
const closeMenu=document.querySelector('.close-menu');
function setMobileMenuOpen(isOpen){
  if(!menu||!menuBtn)return;
  menu.classList.toggle('open',isOpen);
  menu.setAttribute('aria-hidden',String(!isOpen));
  menuBtn.setAttribute('aria-expanded',String(isOpen));
  menuBtn.setAttribute('aria-label',isOpen?'Close menu':'Open menu');
  document.body.classList.toggle('menu-open',isOpen);
}
if(menu&&menuBtn){
  menuBtn.addEventListener('click',()=>setMobileMenuOpen(!menu.classList.contains('open')));
}
if(menu&&closeMenu){
  closeMenu.addEventListener('click',()=>{
    setMobileMenuOpen(false);
    menuBtn?.focus();
  });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMobileMenuOpen(false)));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&menu.classList.contains('open')){
      setMobileMenuOpen(false);
      menuBtn?.focus();
    }
  });
}
// Keep the mobile navigation easy to reach while scrolling and close it on resize.
let lastScroll=0;
window.addEventListener('scroll',()=>{
  if(window.innerWidth>899)return;
  const y=window.scrollY;
  document.body.classList.toggle('nav-scrolled',y>24);
  document.body.classList.toggle('nav-hidden',y>lastScroll&&y>120&&!menu?.classList.contains('open'));
  lastScroll=y;
},{passive:true});
window.addEventListener('resize',()=>{
  if(window.innerWidth>899&&menu){
    setMobileMenuOpen(false);
    document.body.classList.remove('nav-hidden');
  }
});

// Prevent oversized portfolio images from breaking the mobile layout.
document.querySelectorAll('img').forEach(img=>{
  img.loading=img.loading||'lazy';
  img.decoding='async';
  img.addEventListener('error',()=>img.classList.add('image-missing'),{once:true});
});

document.getElementById('year').textContent=new Date().getFullYear();

// Clicking a testimonial focuses it and blurs the rest; clicking it again resets.
const reviewCards=[...document.querySelectorAll('.review-card')];
reviewCards.forEach(card=>{
  card.addEventListener('click',()=>{
    const alreadyActive=card.classList.contains('active');
    reviewCards.forEach(c=>{c.classList.remove('active');c.classList.remove('blurred');});
    if(!alreadyActive){
      card.classList.add('active');
      reviewCards.forEach(c=>{if(c!==card)c.classList.add('blurred');});
    }
  });
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}});
});

// Project cards open an in-site case-study screen instead of leaving the portfolio.
const projectData={
  nova:{category:'Campaign',title:'Nova Refresh',intro:'A vibrant campaign direction designed to give Nova Refresh a playful, energetic visual world.',problem:'The campaign needed a bold visual language that could feel memorable across social content while keeping the product easy to recognise.',solution:'I created a colourful campaign system with expressive compositions, clear product moments and a flexible layout language for digital promotion.',role:'Campaign concept, art direction, graphic design, composition and final social artwork.',tools:'Photoshop · Illustrator · Campaign design',behance:'https://www.behance.net/gallery/255513933/Nova-Refresh-A-Vibrant-Multiverse-Campaign',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/62a1f9255513933.Y3JvcCwxNDAwLDEwOTUsMCwxNTU.png'},
  streetwear:{category:'Social / Campaign',title:'Streetwear Social Media Campaign',intro:'A bold Instagram carousel system created to give a streetwear brand a stronger, more consistent social presence.',problem:'The campaign needed to communicate attitude and product value quickly while keeping every carousel slide recognisable as part of the same brand.',solution:'I built a high-impact visual direction with strong typography, product-focused compositions and a repeatable layout system that makes the campaign feel cohesive from the first slide to the last.',role:'Concept development, art direction, graphic design, layout, typography and final social-media-ready artwork.',tools:'Photoshop · Illustrator · Social media carousel design',behance:'https://www.behance.net/gallery/254766415/Streetwear-Social-Media-Campaign-Instagram-Carousel-Ads',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/2b2ef2254766415.Y3JvcCwzODM1LDMwMDAsMzMyLDA.png'},
  nefa:{category:'Advertising Campaign',title:'Nefa Water — Summer Heat',intro:'A refreshing advertising concept designed to make a bottled-water campaign feel energetic, seasonal and instantly understandable.',problem:'The campaign needed to cut through busy summer advertising while keeping the product as the clear visual hero.',solution:'I combined a bright summer art direction with strong product placement, depth and clean messaging so the creative feels fresh without becoming cluttered.',role:'Creative direction, composition, retouching, typography and final advertising artwork.',tools:'Photoshop · Advertising design · Product composition',behance:'https://www.behance.net/gallery/251043383/Nefa-Water-Beats-the-Summer-Heat-Advertising-Campaign',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/f234f2251043383.Y3JvcCw4NzksNjg3LDAsOA.png'},
  hajj:{category:'Social / Campaign',title:'Hajj & Umrah Travel Campaign',intro:'A respectful social campaign created to communicate Hajj and Umrah travel services with clarity and warmth.',problem:'The campaign needed to present essential travel information in a calm, trustworthy and visually consistent way.',solution:'I developed a clean social media direction that balances informative layouts with inviting imagery and a clear visual hierarchy.',role:'Campaign design, layout, typography, visual direction and social media artwork.',tools:'Photoshop · Social media design · Campaign layouts',behance:'https://www.behance.net/gallery/249685087/Hajj-Umrah-Travel-Services-Social-Media-Campaign',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/57ede3249685087.Y3JvcCwxMzA5LDEwMjQsMTcxLDA.png'},
  growth:{category:'UI/UX',title:'Growth-Driven Agency Website',intro:'A conversion-focused agency website concept that turns a complex service offering into a clear digital journey.',problem:'The agency needed a website that could explain its value quickly, organise multiple services and guide visitors toward action.',solution:'I structured the experience around strong hierarchy, modular sections, clear calls to action and a visual system that balances credibility with a modern digital feel.',role:'UX structure, wireframing, visual design, responsive layouts and UI detailing.',tools:'Figma · UI/UX · Responsive web design',behance:'https://www.behance.net/gallery/248850863/UIUX-Case-Study-A-Growth-Driven-Agency-Website',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/0a5b8f248850863.Y3JvcCwzMzk1LDI2NTUsMzAyLDUzNw.png'},
  brochure:{category:'Brand Identity',title:'Twafuq Almasiya Brochure',intro:'A polished corporate brochure designed to present Twafuq Almasiya with a clear and confident visual identity.',problem:'The brochure needed to organise company information while maintaining a professional, consistent brand presentation.',solution:'I combined structured layouts, bilingual-friendly hierarchy and a restrained visual system to make the content easy to scan and remember.',role:'Editorial layout, brand application, typography and presentation design.',tools:'Photoshop · Illustrator · Brochure design',behance:'https://www.behance.net/gallery/249043223/Twafuq-Almasiya-Corporate-Brochure-Design',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/e523d5249043223.Y3JvcCwxNDM4LDExMjUsMzIsMA.png'},
  sss:{category:'Branding / Posters',title:'SSS Automotive Branding',intro:'An automotive branding and poster direction built around a strong, high-performance visual presence.',problem:'The brand needed campaign visuals that could feel bold and recognisable across promotional formats.',solution:'I developed a graphic system using confident typography, strong contrast and automotive-led compositions for a cohesive campaign feel.',role:'Branding, poster design, composition, typography and campaign artwork.',tools:'Photoshop · Illustrator · Branding · Poster design',behance:'https://www.behance.net/gallery/248621719/SSS-Automotive-Branding-Poster-Design-Case-Study',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/570eb2248621719.Y3JvcCwxNTgxLDEyMzYsMTI5LDk3.png'}
};
const detail=document.getElementById('projectDetail');
const detailFields={category:document.getElementById('detailCategory'),title:document.getElementById('detailTitle'),intro:document.getElementById('detailIntro'),problem:document.getElementById('detailProblem'),solution:document.getElementById('detailSolution'),role:document.getElementById('detailRole'),tools:document.getElementById('detailTools'),image:document.getElementById('detailImage'),behance:document.getElementById('detailBehance'),behanceBottom:document.getElementById('detailBehanceBottom'),count:document.getElementById('detailCount')};
function openProject(key){const d=projectData[key];if(!d)return;detailFields.category.textContent=d.category;detailFields.title.textContent=d.title;detailFields.intro.textContent=d.intro;detailFields.problem.textContent=d.problem;detailFields.solution.textContent=d.solution;detailFields.role.textContent=d.role;detailFields.tools.textContent=d.tools;detailFields.image.src=d.image;detailFields.image.alt=d.title;detailFields.behance.href=d.behance;detailFields.behanceBottom.href=d.behance;const keys=Object.keys(projectData);detailFields.count.textContent=String(keys.indexOf(key)+1).padStart(2,'0')+' / '+String(keys.length).padStart(2,'0');detail.classList.add('open');detail.setAttribute('aria-hidden','false');document.body.classList.add('detail-open');detail.querySelector('.project-detail-scroll').scrollTop=0;history.pushState({project:key},'',`#project-${key}`)}
function closeProject(){detail.classList.remove('open');detail.setAttribute('aria-hidden','true');document.body.classList.remove('detail-open');if(location.hash.startsWith('#project-'))history.pushState({},'',location.pathname+location.search)}
document.querySelectorAll('.project-card[data-project]').forEach(card=>card.addEventListener('click',e=>{
  e.preventDefault();
  card.classList.add('card-pop');
  setTimeout(()=>card.classList.remove('card-pop'),180);
  openProject(card.dataset.project);
}));

// Navbar "Explore Work" dropdown: pick a role, jump to Work section pre-filtered
const roleSelect=document.querySelector('.role-select');
const roleBtn=document.getElementById('roleBtn');
if(roleBtn&&roleSelect){
  roleBtn.addEventListener('click',e=>{
    e.stopPropagation();
    const isOpen=roleSelect.classList.toggle('open');
    roleBtn.setAttribute('aria-expanded',isOpen?'true':'false');
  });
  document.addEventListener('click',()=>{
    roleSelect.classList.remove('open');
    roleBtn.setAttribute('aria-expanded','false');
  });
  roleSelect.querySelectorAll('[data-role-filter]').forEach(link=>{
    link.addEventListener('click',e=>{
      e.preventDefault();
      const role=link.dataset.roleFilter;
      const filterBtn=document.querySelector(`.filter[data-filter="${role}"]`);
      if(filterBtn)filterBtn.click();
      roleSelect.classList.remove('open');
      document.getElementById('work').scrollIntoView({behavior:'smooth'});
    });
  });
}
document.getElementById('projectBack').addEventListener('click',closeProject);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&detail.classList.contains('open'))closeProject()});

// ===== Chat assistant =====
(function(){
  const fab=document.getElementById('botFab'),box=document.getElementById('bot'),body=document.getElementById('botBody'),
        chips=document.getElementById('botChips'),form=document.getElementById('botForm'),input=document.getElementById('botInput'),
        closeBtn=document.getElementById('botClose');
  if(!fab||!box)return;
  const WA='https://wa.me/923271020389?text=Hi%20Jaweria%2C%20I%27d%20like%20to%20discuss%20a%20project.';
  const wa='<a href="'+WA+'" target="_blank" rel="noopener">WhatsApp Jaweria</a>';
  const answers={
    services:{t:'Jaweria offers:\n• Graphic Design (posters, decks, campaigns)\n• UI/UX Design (websites, apps, landing pages)\n• Brand Identity (logos, visual systems)\n• Social Media Design (posts, carousels, ads)',go:'#services'},
    work:{t:'You can browse selected projects in the Work section. Tap any card for the case study, or filter by Graphic, UI/UX, Branding or Campaigns.',go:'#work'},
    process:{t:'The process is simple: Discover → Explore → Design → Refine. You get clear directions first, then polished, ready-to-use files.',go:'#home'},
    reviews:{t:'Clients describe Jaweria as fast, communicative and detail-focused. Read their words in the Reviews section.',go:'#reviews'},
    pricing:{t:'Pricing depends on the project size and deliverables. Share a few details through the contact form or message on WhatsApp for a quote.',go:'#contact'},
    hire:{t:'Great! The quickest way is WhatsApp. You can also fill in the contact form and you\'ll get a reply by email.\n'+wa,go:'#contact'},
    contact:{t:'You can reach Jaweria here:\n• '+wa+'\n• The contact form at the bottom of the page\n• Behance and LinkedIn links in the Contact section',go:'#contact'},
    hello:{t:'Hi! I\'m here to help you find your way around. What would you like to know?'},
    fallback:{t:'I\'m not sure about that one. I can tell you about services, projects, process, pricing or how to get in touch. For anything else, '+wa+' directly.'}
  };
  const keys=[['pricing',/price|cost|rate|quote|budget|how much|charge/],['hire',/hire|book|start|work with|order|available|project idea/],['contact',/contact|reach|email|whatsapp|phone|call|number|message/],['services',/service|offer|do you do|logo|brand|ui|ux|social|poster|design/],['work',/work|portfolio|project|sample|example|case/],['process',/process|how.*work|steps|timeline|deliver/],['reviews',/review|client|testimonial|feedback/],['hello',/^(hi|hello|hey|salam|assalam)/]];
  const chipList=[['What do you offer?','services'],['See her work','work'],['Pricing','pricing'],['Hire Jaweria','hire'],['Contact','contact']];
  function add(html,cls){const d=document.createElement('div');d.className='msg '+cls;if(cls==='user-msg')d.textContent=html;else d.innerHTML=html;body.appendChild(d);body.scrollTop=body.scrollHeight;}
  function reply(key){const a=answers[key]||answers.fallback;setTimeout(()=>{add(a.t,'bot-msg');},350);if(a.go&&key!=='hire'&&key!=='contact'){/* no auto scroll; user stays in chat */}}
  function ask(text,key){add(text,'user-msg');reply(key);}
  function match(t){t=t.toLowerCase().trim();for(const [k,re] of keys){if(re.test(t))return k;}return 'fallback';}
  chipList.forEach(([label,key])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>ask(label,key));chips.appendChild(b);});
  let started=false;
  function setOpen(o){box.classList.toggle('open',o);box.setAttribute('aria-hidden',String(!o));fab.setAttribute('aria-expanded',String(o));
    if(o&&!started){started=true;add('Hi, I\'m Jaweria\'s assistant 👋 Ask me anything about her services, projects or how to hire her.','bot-msg');}
    if(o)input.focus();}
  fab.addEventListener('click',()=>setOpen(!box.classList.contains('open')));
  closeBtn.addEventListener('click',()=>setOpen(false));
  form.addEventListener('submit',e=>{e.preventDefault();const t=input.value.trim();if(!t)return;input.value='';ask(t,match(t));});
})();
