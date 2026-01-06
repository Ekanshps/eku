// (Admin panel removed in production cleanup)

/* Typing effect */
const typedLines = JSON.parse(localStorage.getItem('eku_hero')) || ["MCA Student & eSports Athlete","Learning Full‑Stack Step by Step","Building Small Helpful Projects"];
let tlIdx=0, ch=0, forward=true, typedEl=document.getElementById('typed');
function typeLoop(){
  const str=typedLines[tlIdx];
  if(forward){
    if(ch<str.length){ typedEl.textContent+=str[ch++]; setTimeout(typeLoop,50); }
    else { forward=false; setTimeout(typeLoop,1300); }
  } else {
    if(ch>0){ typedEl.textContent=str.slice(0,--ch); setTimeout(typeLoop,26); }
    else { forward=true; tlIdx=(tlIdx+1)%typedLines.length; setTimeout(typeLoop,300); }
  }
}
typeLoop();

/* Skills */
const skillSet = JSON.parse(localStorage.getItem('eku_skills')) || ["HTML","CSS","JavaScript","C","Python Basics","Git","Responsive Design","SQL Basics","Learning React","Problem Solving","Teamwork","Time Management"];
const skillsWrap=document.getElementById('skillsWrap');
skillSet.forEach(s=>{ const d=document.createElement('div'); d.className='skill-tag'; d.textContent=s; skillsWrap.appendChild(d); });

/* Timeline */
const milestones = JSON.parse(localStorage.getItem('eku_journey')) || [
 {year:"2023",icon:"🎮",title:"BGIS",desc:"eSports teamwork sharpened focus & comms."},
 {year:"2024",icon:"🌱",title:"Started MCA",desc:"Set foundation: programming logic, web basics."},
 {year:"2024",icon:"🛠",title:"Mini Builds",desc:"Notes app, tracker, UI experiments."},
 {year:"2025",icon:"⚡",title:"Front-End Focus",desc:"Improving layouts, state, component patterns."},
 {year:"2025",icon:"💡",title:"Hackathon",desc:"Participated in first coding hackathon."},
 {year:"2025",icon:"📚",title:"Learning React",desc:"Started building projects with React."},
 {year:"2025",icon:"🌐",title:"Open Source",desc:"Contributed to open source for the first time."},
 {year:"2025",icon:"🚀",title:"Internship",desc:"Started internship as a web developer."}
];
const tl=document.getElementById('timelineGrid');
const journeyPrev=document.getElementById('journeyPrev');
const journeyNext=document.getElementById('journeyNext');
const journeyPageInfo=document.getElementById('journeyPageInfo');
let journeyPage=1;
const journeyPerPage=4;

function renderJourney(){
  tl.innerHTML='';
  const start=(journeyPage-1)*journeyPerPage;
  const end=start+journeyPerPage;
  milestones.slice(start,end).forEach(m=>{
    const el=document.createElement('div');
    el.className='milestone';
    el.innerHTML=`<div class="year">${m.year}</div><div class="icon">${m.icon}</div><h3>${m.title}</h3><p>${m.desc}</p>`;
    tl.appendChild(el);
  });
  const totalPages=Math.ceil(milestones.length/journeyPerPage);
  journeyPageInfo.textContent=`Page ${journeyPage} of ${totalPages}`;
  journeyPrev.disabled=journeyPage===1;
  journeyNext.disabled=journeyPage>=totalPages;
  revealTimeline();
}
function revealTimeline(){
  document.querySelectorAll('.milestone').forEach(x=>{
    if(x.getBoundingClientRect().top < innerHeight - 120) x.classList.add('visible');
  });
}
journeyPrev?.addEventListener('click',()=>{
  if(journeyPage>1){journeyPage--;renderJourney();}
});
journeyNext?.addEventListener('click',()=>{
  if(journeyPage<Math.ceil(milestones.length/journeyPerPage)){journeyPage++;renderJourney();}
});
addEventListener('scroll',revealTimeline); addEventListener('load',renderJourney);

/* Projects */
const projectData = JSON.parse(localStorage.getItem('eku_projects')) || [
 {title:"Portfolio V1",cat:"web",desc:"Responsive personal site iteration.",repo:"https://github.com/Ekanshps/Portfolio.dev"},
 {title:"Task Buddy",cat:"ui",desc:"Daily task manager app.",repo:"https://github.com/Ekanshps/TaskBuddy"},
 {title:"Usability Hub",cat:"clone",desc:"Clone Usability Hub website, to improve UX.",repo:"https://github.com/Ekanshps/UsabilityHub-Homepage-Clone"},
 {title:"Saurabh Studio",cat:"web",desc:"Animated website for Saurabh Studio, AYODHYA.",repo:"https://github.com/Ekanshps/SaurabhStudio"},
 {title:"News Webpage",cat:"web",desc:"Practice fetching public APIs.",repo:"https://github.com/Ekanshps/E-News-Website-DevArea"},
 {title:"Quizz App",cat:"clone",desc:"Tried to create an interface, that quizzes users on various topics.",repo:"https://github.com/Ekanshps/Quiz-app"},
 {title:"Weather App",cat:"web",desc:"Simple weather forecast app.",repo:"#"},
 {title:"Expense Tracker",cat:"ui",desc:"Track your daily expenses easily.",repo:"#"},
 {title:"Blog Platform",cat:"web",desc:"Minimal blog platform for sharing ideas.",repo:"#"},
 {title:"Image Gallery",cat:"ui",desc:"Responsive gallery for images.",repo:"#"},
 {title:"Movie Finder",cat:"clone",desc:"Find movies and details using public APIs.",repo:"#"},
 {title:"Portfolio V2",cat:"web",desc:"Second iteration of personal portfolio.",repo:"#"}
];
const projGrid=document.getElementById('projGrid');
const projectPrev=document.getElementById('projectPrev');
const projectNext=document.getElementById('projectNext');
const projectPageInfo=document.getElementById('projectPageInfo');
let projectPage=1;
const projectsPerPage=6;
let currentFilter="all";

function renderProjects(filter=currentFilter){
  currentFilter=filter;
  const filtered=projectData.filter(p=>filter==="all"||p.cat===filter);
  const start=(projectPage-1)*projectsPerPage;
  const end=start+projectsPerPage;
  projGrid.innerHTML=filtered
    .slice(start,end)
    .map(p=>`
      <div class="project-card">
        <span style="font-size:.55rem;letter-spacing:2px;color:#42e3ff;font-weight:600;">${p.cat.toUpperCase()}</span>
        <h3>${p.title}</h3>
        <p style="color:var(--text-dim);font-size:.85rem;line-height:1.45;margin:.1rem 0 .4rem;">${p.desc}</p>
        <a class="repo-btn" href="${p.repo}" target="_blank" rel="noopener" aria-label="${p.title} GitHub Repo">GIT REPO <span style='font-size:1.1em;'>&#8599;</span></a>
      </div>
    `).join("");
  const totalPages=Math.ceil(filtered.length/projectsPerPage);
  projectPageInfo.textContent=`Page ${projectPage} of ${totalPages}`;
  projectPrev.disabled=projectPage===1;
  projectNext.disabled=projectPage>=totalPages;
}
renderProjects();
projectPrev?.addEventListener('click',()=>{
  if(projectPage>1){projectPage--;renderProjects();}
});
projectNext?.addEventListener('click',()=>{
  const filtered=projectData.filter(p=>currentFilter==="all"||p.cat===currentFilter);
  if(projectPage<Math.ceil(filtered.length/projectsPerPage)){projectPage++;renderProjects();}
});
document.querySelectorAll('.pf').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.pf').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    projectPage=1;
    renderProjects(btn.dataset.filter);
  });
});

/* Testimonials */
const testimonials = JSON.parse(localStorage.getItem('eku_testimonials')) || [
  {name:"Arjun Mehta",role:"Startup Owner",text:"Working with Ekansh was a smooth experience from start to finish. He understood my requirements clearly and delivered a clean, responsive website ahead of schedule. I appreciated his attention to detail and willingness to make small refinements until it was perfect.",img:"https://i.pravatar.cc/160?img=56"},
  {name:"Neha Singh",role:"Product Manager",text:"Ekansh’s work on our project was not only technically sound but also well thought out from a user experience perspective. His ability to translate vague ideas into functional features really stood out.",img:"https://i.pravatar.cc/160?img=32"},
  {name:"Akhilesh Maurya",role:"Saurabh Studio, Owner",text:"I approached Ekansh for a quick landing page and ended up with a full-fledged, beautifully designed site. The code was neat, easy to maintain, and performed flawlessly on all devices.",img:"https://i.pravatar.cc/160?img=54"},
  {name:"XPxBAKIIop",role:"Teammate, XPLOSION eSPORTS",text:"Ekansh reads the game like a book. His planning and adaptability give the squad a clear edge in every match.",img:"https://i.pravatar.cc/160?img=57"}
];
const aboutText = localStorage.getItem('eku_about') || document.querySelector('.lead')?.textContent || "I'm Ekansh a MCA student exploring full‑stack development while bringing strategic focus from my eSports experience. I like building small, useful projects that help me understand fundamentals deeper.";
if(document.querySelector('.lead')) document.querySelector('.lead').textContent = aboutText;
const tAvatar=document.getElementById('testiAvatar');
const tText=document.getElementById('testiText');
const tName=document.getElementById('testiName');
const tRole=document.getElementById('testiRole');
const tDock=document.getElementById('testiDock');
const tBar=document.getElementById('testiBar');
let tIdx=0, testiTimer=null, testiDuration=6000, paused=false;

function loadTestimonial(i){
  tIdx=i;
  const d=testimonials[i];
  tAvatar.src=d.img;
  tAvatar.alt=d.name;
  tText.textContent='“'+d.text+'”';
  tName.textContent=d.name;
  tRole.textContent=d.role;
  document.querySelectorAll('.t-thumb').forEach((th,k)=>{
    th.classList.toggle('active',k===i);
  });
  tBar.classList.remove('testi-bar'); void tBar.offsetWidth; tBar.classList.add('testi-bar');
}
testimonials.forEach((t,i)=>{
  const im=document.createElement('img');
  im.src=t.img;
  im.alt=t.name;
  im.className='t-thumb'+(i===0?' active':'');
  im.addEventListener('click',()=>{ loadTestimonial(i); restartTestiCycle(); });
  tDock.appendChild(im);
});
function nextTesti(){ loadTestimonial((tIdx+1)%testimonials.length); }
function prevTesti(){ loadTestimonial((tIdx-1+testimonials.length)%testimonials.length); }
function startTestiCycle(){
  testiTimer=setInterval(()=>{ if(!paused) nextTesti(); },testiDuration);
}
function restartTestiCycle(){ clearInterval(testiTimer); startTestiCycle(); }
document.getElementById('testiNext').onclick=()=>{ nextTesti(); restartTestiCycle(); };
document.getElementById('testiPrev').onclick=()=>{ prevTesti(); restartTestiCycle(); };
document.querySelector('.testi-card').addEventListener('mouseenter',()=>paused=true);
document.querySelector('.testi-card').addEventListener('mouseleave',()=>paused=false);
addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'){ nextTesti(); restartTestiCycle(); }
  if(e.key==='ArrowLeft'){ prevTesti(); restartTestiCycle(); }
});
loadTestimonial(0);
startTestiCycle();

/* Impact counters */
const nums=document.querySelectorAll('.impact-num');
if(nums.length){
  const obs=new IntersectionObserver(ents=>{
    ents.forEach(en=>{
      if(en.isIntersecting){
        const el=en.target, target=+el.dataset.num;
        let c=0, step=Math.max(1,Math.ceil(target/70));
        (function inc(){
          c+=step; if(c>target)c=target;
          el.textContent=c;
          if(c<target) requestAnimationFrame(inc);
        })();
        obs.unobserve(el);
      }
    });
  },{threshold:.45});
  nums.forEach(n=>obs.observe(n));
}

/* Theme toggle */
const vibeBtn=document.getElementById('vibeBtn');
const vibeText=document.getElementById('vibeText');
let lightMode=false;
function applyTheme(force){
  if(force!==undefined) lightMode=force;
  document.body.classList.toggle('light',lightMode);
  vibeText.textContent=lightMode?'LIGHT':'DARK';
  localStorage.setItem('pref-theme',lightMode?'light':'dark');
}
vibeBtn?.addEventListener('click',()=>{ lightMode=!lightMode; applyTheme(); });
const stored=localStorage.getItem('pref-theme');
if(stored) applyTheme(stored==='light');
else if(window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme(true);

/* Contact form (mock) */
// document.getElementById('contactForm').addEventListener('submit',e=>{
//   e.preventDefault();
//   const msg=document.getElementById('successMsg');
//   msg.style.display='block';
//   e.target.reset();
//   setTimeout(()=>msg.style.display='none',3500);
// });

/* Back to top */
const btt=document.getElementById('backToTop');
addEventListener('scroll',()=>{ if(scrollY>420) btt.classList.add('show'); else btt.classList.remove('show'); });
btt.onclick=()=>scrollTo({top:0,behavior:'smooth'});

/* Cursor blob */
const blob=document.getElementById('blob');
let bx=innerWidth/2, by=innerHeight/2, tx=bx, ty=by;
addEventListener('pointermove',e=>{ tx=e.clientX; ty=e.clientY; });
function animateBlob(){ bx+=(tx-bx)*0.08; by+=(ty-by)*0.08; blob.style.transform=`translate(${bx-120}px,${by-120}px)`; requestAnimationFrame(animateBlob); }
animateBlob();

/* Reduce motion */
if(matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.vibe-dot,.cursor-blob').forEach(el=>el.style.animation='none');
}

/* Hamburger nav */
const navToggle=document.getElementById('navToggle');
const navLinks=document.getElementById('primaryNav');
navToggle.addEventListener('click',()=>{
  const open=navLinks.classList.toggle('open');
  navToggle.classList.toggle('active',open);
  navToggle.setAttribute('aria-expanded',open);
});
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  if(innerWidth<880){
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded','false');
  }
}));
