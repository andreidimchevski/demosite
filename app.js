'use strict';
const config = window.SALON;
Object.entries(config.colors).forEach(([key,value]) => document.documentElement.style.setProperty(`--${key}`,value));
document.querySelectorAll('.brand-name').forEach(el => el.textContent = config.shortName);
document.title = `${config.name} · Красота в твой ритъм`;
document.querySelector('.header .logo').setAttribute('aria-label',`${config.name} — начало`);
document.querySelectorAll('[data-image]').forEach(img => img.src = config.images[img.dataset.image]);
const make = (tag, className, value) => { const node=document.createElement(tag); if(className) node.className=className; if(value) node.textContent=value; return node; };
config.services.forEach((service,index)=>{const row=make('article','service-row');row.append(make('span','service-number',String(index+1).padStart(2,'0')));const heading=make('div');heading.append(make('h3','',service.name),make('p','service-detail',service.detail));row.append(heading,make('p','',service.description));document.querySelector('#service-list').append(row);});
const lightbox=document.querySelector('#lightbox');
let previousFocus;
config.gallery.forEach(photo=>{const button=make('button','gallery-card');button.type='button';button.setAttribute('aria-label',`Разгледай снимка: ${photo.title}`);const img=make('img');img.src=photo.src;img.alt=photo.alt;img.loading='lazy';img.width=800;img.height=1000;button.append(img,make('span','category',photo.category),make('span','caption',photo.title),make('span','view-label','Разгледай снимката'));button.addEventListener('click',()=>{previousFocus=button;document.querySelector('#lightbox-image').src=photo.src;document.querySelector('#lightbox-image').alt=photo.alt;document.querySelector('#lightbox-caption').textContent=photo.title+' · Илюстративна снимка';lightbox.showModal();document.body.style.overflow='hidden';});document.querySelector('#gallery-grid').append(button);});
document.querySelector('#close-lightbox').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox){const r=lightbox.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)lightbox.close();}});
lightbox.addEventListener('close',()=>{document.body.style.overflow='';previousFocus?.focus();});
document.querySelector('#contact-explanation').textContent=config.contact.explanation;
config.contact.hours.forEach(([days,hours])=>{const row=make('div');row.append(make('dt','',days),make('dd','',hours));document.querySelector('#hours').append(row);});
const menu=document.querySelector('.menu-toggle'); const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Отвори менюто');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Затвори менюто':'Отвори менюто');});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.section-heading,.about-copy,.service-row').forEach(el=>observer.observe(el));}
