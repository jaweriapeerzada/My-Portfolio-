const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{entry.target.classList.toggle('visible',entry.isIntersecting)})
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const canvas=document.createElement('canvas');
  const context=canvas.getContext('2d');
  if(!context)return;
  canvas.className='scroll-glitter';
  canvas.setAttribute('aria-hidden','true');
  document.body.appendChild(canvas);

  const particles=[];
  const colors=['#ad7afb','#ead6ff','#fffaff','#f4d98b'];
  let width=0,height=0,pixelRatio=1,frame=0,lastBurst=0,lastPointerBurst=0;
  let pointerX=window.innerWidth*.5,pointerY=window.innerHeight*.55;
  let lastScrollY=window.scrollY;

  function resize(){
    pixelRatio=Math.min(window.devicePixelRatio||1,2);
    width=window.innerWidth;
    height=window.innerHeight;
    canvas.width=Math.round(width*pixelRatio);
    canvas.height=Math.round(height*pixelRatio);
    context.setTransform(pixelRatio,0,0,pixelRatio,0,0);
  }
  function draw(now){
    context.clearRect(0,0,width,height);
    for(let i=particles.length-1;i>=0;i--){
      const particle=particles[i];
      const progress=(now-particle.start)/particle.life;
      if(progress>=1){particles.splice(i,1);continue}
      particle.x+=particle.vx;
      particle.y+=particle.vy;
      particle.vx*=.985;
      particle.vy*=.985;
      const alpha=Math.sin(progress*Math.PI)*(1-progress*.25);
      context.save();
      context.globalAlpha=alpha;
      context.fillStyle=particle.color;
      context.shadowColor=particle.color;
      context.shadowBlur=6;
      if(particle.sparkle){
        const size=particle.size;
        context.beginPath();
        context.moveTo(particle.x,particle.y-size*1.8);
        context.lineTo(particle.x+size*.45,particle.y);
        context.lineTo(particle.x,particle.y+size*1.8);
        context.lineTo(particle.x-size*.45,particle.y);
        context.closePath();
        context.fill();
      }else{
        context.beginPath();
        context.arc(particle.x,particle.y,particle.size,0,Math.PI*2);
        context.fill();
      }
      context.restore();
    }
    if(particles.length){frame=requestAnimationFrame(draw)}
    else{context.clearRect(0,0,width,height);frame=0}
  }
  function onScroll(){
    const now=performance.now();
    const direction=Math.sign(window.scrollY-lastScrollY);
    lastScrollY=window.scrollY;
    if(now-lastBurst<85)return;
    lastBurst=now;
    for(let i=0;i<4;i++){
      const angle=Math.random()*Math.PI*2;
      const distance=10+Math.random()*38;
      const speed=.15+Math.random()*.55;
      particles.push({
        x:pointerX+Math.cos(angle)*distance,
        y:pointerY+Math.sin(angle)*distance,
        vx:Math.cos(angle)*speed,
        vy:Math.sin(angle)*speed-direction*.18,
        size:.8+Math.random()*1.7,
        color:colors[Math.floor(Math.random()*colors.length)],
        sparkle:Math.random()>.45,
        start:now,
        life:420+Math.random()*260
      });
    }
    if(particles.length>52)particles.splice(0,particles.length-52);
    if(!frame)frame=requestAnimationFrame(draw);
  }
  function onPointerMove(event){
    pointerX=event.clientX;
    pointerY=event.clientY;
    const now=performance.now();
    if(event.pointerType==='touch'||now-lastPointerBurst<40)return;
    lastPointerBurst=now;
    for(let i=0;i<3;i++){
      const angle=Math.random()*Math.PI*2;
      const speed=.25+Math.random()*.75;
      particles.push({
        x:pointerX+(Math.random()-.5)*8,
        y:pointerY+(Math.random()-.5)*8,
        vx:Math.cos(angle)*speed,
        vy:Math.sin(angle)*speed,
        size:.8+Math.random()*1.7,
        color:colors[Math.floor(Math.random()*colors.length)],
        sparkle:Math.random()>.35,
        start:now,
        life:420+Math.random()*260
      });
    }
    if(particles.length>64)particles.splice(0,particles.length-64);
    if(!frame)frame=requestAnimationFrame(draw);
  }
  window.addEventListener('resize',resize,{passive:true});
  window.addEventListener('pointermove',onPointerMove,{passive:true});
  window.addEventListener('scroll',onScroll,{passive:true});
  resize();
})();

const navLinks=[...document.querySelectorAll('.desktop-nav a')];
const sections=[...document.querySelectorAll('main section[id]')];
function setActiveNav(id){
  navLinks.forEach(link=>{
    const active=link.getAttribute('href')==='#'+id;
    link.classList.toggle('active',active);
    if(active)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
}
function updateActiveNav(){
  const marker=window.innerHeight*.4;
  const orderedSections=sections
    .map(section=>({section,top:section.getBoundingClientRect().top}))
    .sort((a,b)=>a.top-b.top);
  let current=orderedSections[0]?.section||sections[0];
  orderedSections.forEach(({section,top})=>{
    if(top<=marker)current=section;
  });
  setActiveNav(current.id);
}
navLinks.forEach(link=>link.addEventListener('click',()=>{
  setActiveNav(link.getAttribute('href').slice(1));
}));
window.addEventListener('scroll',updateActiveNav,{passive:true});
window.addEventListener('scrollend',updateActiveNav);
window.addEventListener('resize',updateActiveNav);
updateActiveNav();

const projectCards=[...document.querySelectorAll('.project-card')];
function applyProjectFilter(filter){
  let visibleNumber=0;
  projectCards.forEach(card=>{
    const categories=(card.dataset.category||'').split(/\s+/);
    const isVisible=filter==='all'||categories.includes(filter);
    card.classList.toggle('hide',!isVisible);
    if(isVisible){
      visibleNumber+=1;
      card.querySelector('.project-num').textContent=String(visibleNumber).padStart(2,'0');
    }
  });
}
applyProjectFilter('all');

document.querySelectorAll('.filter').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    button.classList.add('active');
    applyProjectFilter(button.dataset.filter);
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
  brochure:{category:'Brand Identity',title:'Twafuq Almasiya Brochure',intro:'A polished corporate brochure designed to present Twafuq Almasiya with a clear and confident visual identity.',problem:'The brochure needed to organise company information while maintaining a professional, consistent brand presentation.',solution:'I combined structured layouts, bilingual-friendly hierarchy and a restrained visual system to make the content easy to scan and remember.',role:'Editorial layout, brand application, typography and presentation design.',tools:'Photoshop · Illustrator · Brochure design',behance:'https://www.behance.net/gallery/249043223/Twafuq-Almasiya-Corporate-Brochure-Design',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/e523d5249043223.Y3JvcCwxNDM4LDExMjUsMzIsMA.png'},
  sss:{category:'Branding / Posters',title:'SSS Automotive Branding',intro:'An automotive branding and poster direction built around a strong, high-performance visual presence.',problem:'The brand needed campaign visuals that could feel bold and recognisable across promotional formats.',solution:'I developed a graphic system using confident typography, strong contrast and automotive-led compositions for a cohesive campaign feel.',role:'Branding, poster design, composition, typography and campaign artwork.',tools:'Photoshop · Illustrator · Branding · Poster design',behance:'https://www.behance.net/gallery/248621719/SSS-Automotive-Branding-Poster-Design-Case-Study',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/570eb2248621719.Y3JvcCwxNTgxLDEyMzYsMTI5LDk3.png'},
  tekspace:{category:'UI/UX · Web Design',title:'Tekspace Website Redesign',intro:'A website redesign case study focused on making the Tekspace digital experience clearer and easier to navigate.',problem:'Visitors need to understand Tekspace and find relevant information without working through a confusing or crowded website.',solution:'The redesign organizes content into a clearer page structure and uses a more intentional visual hierarchy to help visitors move through the experience.',role:'UX research, information architecture, wireframing, website UI design and responsive design.',tools:'Figma · UI/UX · Website redesign',behance:'https://www.behance.net/gallery/227365951/Case-Study-Redesigning-Tekspace-website?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/3ad8c3227365951.Y3JvcCw0MzE0LDMzNzUsOTYsMA.png'},
  roomify:{category:'UI/UX · Mobile App',title:'Roomify — Furniture & Home Decor App',intro:'A furniture and home decor app concept designed to make browsing and choosing pieces for a home feel approachable.',problem:'Finding furniture and decor involves comparing products and imagining how they will fit into a home; the app experience needs to keep discovery clear and simple.',solution:'A focused mobile shopping experience organizes home products into easy-to-explore screens and gives product discovery a clean, consistent visual flow.',role:'Mobile UX, user flows, wireframing, UI design and visual design.',tools:'Figma · UI/UX · Mobile app design',behance:'https://www.behance.net/gallery/242174379/Roomify-Furniture-Home-Decor-App-UIUX-Design?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/89ae66242174379.Y3JvcCwyNTU5LDIwMDEsMjIxLDA.png'},
  grocery:{category:'UI/UX · Mobile App',title:'Smart Grocery App',intro:'A minimal grocery app interface designed to make everyday shopping feel quick and easy to use.',problem:'Grocery shoppers need to find everyday items and move through a mobile shopping experience without unnecessary friction.',solution:'The app uses a clean, user-friendly interface and straightforward product browsing to keep common shopping tasks easy to follow.',role:'Mobile UX, user flows, wireframing, UI design and interaction design.',tools:'Figma · UI/UX · Mobile app design',behance:'https://www.behance.net/gallery/221085673/Smart-Grocery-App-Minimal-User-Friendly-UIUX?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/f4c0c7221085673.Y3JvcCwxMjgwLDEwMDEsMCw4OA.jpg'},
  jam:{category:'Graphic Design · Campaign',title:'Premium Jam Brand Campaign',intro:'A premium jam campaign that pairs rich color and product presentation to communicate freshness and quality.',problem:'The campaign needed to make the jam feel high quality while clearly drawing attention to its natural ingredients and freshness.',solution:'Rich colors, product visualization and brand storytelling create an appetizing, polished campaign presentation.',role:'Campaign concept, art direction, product visualization, graphic design and campaign layouts.',tools:'Photoshop · Product visualization · Branding · Campaign design',behance:'https://www.behance.net/gallery/247812287/Premium-Jam-Brand-Campaign?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/b0c9c2247812287.Y3JvcCwyODc2LDIyNTAsNjQsMA.png'},
  uaeTax:{category:'Graphic Design · Campaign',title:'UAE Tax Updates 2024',intro:'An informative digital design project presenting UAE tax updates for 2024 in a clear visual format.',problem:'Tax updates can be information-dense, making important details difficult to scan and understand in a digital format.',solution:'A structured information layout and clear visual hierarchy help make the updates easier to read and navigate.',role:'Information design, content layout, typography, graphic design and digital artwork.',tools:'Photoshop · Graphic design · Informative digital design',behance:'https://www.behance.net/gallery/222181049/UAE-Tax-Updates-2024-Informative-Digital-Design?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/898d20222181049.Y3JvcCw1NjEsNDM4LDEyMywxMTM.png'},
  bookCatalogue:{category:'Graphic Design · Branding',title:'Book Catalogue Cover Designs',intro:'A collection of book cover designs made to give catalogue titles distinctive, memorable visual identities.',problem:'Each book needs a cover that clearly expresses its tone and draws attention while remaining readable as part of a catalogue.',solution:'The covers use focused typography, simple graphic elements and title-specific layouts to create a clear visual presence for each book.',role:'Book-cover design, visual direction, typography, layout and catalogue presentation.',tools:'Photoshop · Book cover design · Editorial graphics',behance:'https://www.behance.net/gallery/227209635/Book-Catalogue-Cover-Designs?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/4e7911227209635.683c305984559.png'},
  footwear:{category:'UI/UX · Web Design',title:'UI/UX Design for a Footwear Website',intro:'A footwear e-commerce website concept designed to make browsing products and discovering new styles feel clear and engaging.',problem:'Shoppers need to explore footwear options and understand product details without losing their way in the shopping experience.',solution:'A structured storefront pairs product-led layouts with clear navigation and focused product information to support browsing.',role:'Website UX, page structure, product-page UI, visual design and responsive web layouts.',tools:'Figma · UI/UX · E-commerce web design',behance:'https://www.behance.net/gallery/218520497/UIUX-design-for-a-footwear-website?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/e6dd28218520497.67a2d99965d72.jpg'},
  journey:{category:'Graphic Design · Campaign',title:'Journey of the Future',intro:'A travel-focused visual campaign presenting a future-facing journey through digital and social design.',problem:'The concept needs to communicate a travel experience and its key information in a way that feels inviting and easy to understand.',solution:'Travel imagery, clear content hierarchy and prominent Arabic typography bring the message together in a cohesive campaign visual.',role:'Campaign concept, art direction, graphic design, Arabic typography and final artwork.',tools:'Photoshop · Campaign design · Arabic typography',behance:'https://www.behance.net/gallery/233223769/Journey-of-the-Future-?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/9e9697233223769.68abfd9a7b1c7.png'},
  elevateSip:{category:'Graphic Design · Packaging',title:'Elevate Your Sip: Beverage Can Design with a View',intro:'A beverage can design concept pairing a refreshing product with an outdoor, nature-inspired setting.',problem:'The beverage design needs to stand out while communicating a fresh, enjoyable product experience.',solution:'A bold can presentation, vivid color and a scenic art direction create a distinctive product-focused visual.',role:'Packaging concept, product visualization, art direction and final advertising artwork.',tools:'Photoshop · Beverage packaging · Product visualization',behance:'https://www.behance.net/gallery/212439277/Elevate-Your-Sip-Beverage-Can-Design-with-a-View?platform=direct',image:'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/24349d212439277.6734dcfb31ae6.png'},
  foodAd:{category:'Graphic Design · Campaign',title:'Food Advertisement Design',intro:'A promotional food advertisement built around an appetizing barbecue platter and a clear limited-time offer.',problem:'The promotion needs to make the food the visual focus while ensuring the offer is immediately easy to notice.',solution:'A bold food composition, rich color and prominent offer placement create an eye-catching promotional layout.',role:'Food art direction, product composition, offer layout, typography and advertising design.',tools:'Photoshop · Food advertising · Promotional design',behance:'https://www.behance.net/gallery/211181607/A-food-adverstising-desgin-',image:'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/9dd9d5211181607.671e869dafb0c.png'},
  documentApp:{category:'UI/UX · Mobile App',title:'Minimalist App UI Design for Document Management',intro:'A minimalist mobile app interface concept for organizing and managing documents.',problem:'People need to locate and manage their documents quickly, without a cluttered interface getting in the way.',solution:'A focused app layout groups document tools into clear, easy-to-scan screens with a restrained visual system.',role:'Mobile app structure, user flows, wireframing, UI design and interaction details.',tools:'Figma · UI/UX · Mobile app design',behance:'https://www.behance.net/gallery/212436939/Minimalist-App-UI-Design-for-Document-Management',image:'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/a4e6e7212436939.6734d59a674aa.jpg'}
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
