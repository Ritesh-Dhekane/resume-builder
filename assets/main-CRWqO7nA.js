import{t as e}from"./theme-BvRLjNOe.js";var t=Object.create,n=Object.defineProperty,r=Object.getOwnPropertyDescriptor,i=Object.getOwnPropertyNames,a=Object.getPrototypeOf,o=Object.prototype.hasOwnProperty,s=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),c=(e,t)=>{let r={};for(var i in e)n(r,i,{get:e[i],enumerable:!0});return t||n(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,t,a,s)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var c=i(t),l=0,u=c.length,d;l<u;l++)d=c[l],!o.call(e,d)&&d!==a&&n(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(s=r(t,d))||s.enumerable});return e},u=(e,r,i)=>(i=e==null?{}:t(a(e)),l(r||!e||!e.__esModule||!o.call(e,`default`)?n(i,`default`,{value:e,enumerable:!0}):i,e));function d(){let[e]=window.location.hash.slice(1).split(`?`);return e||`/`}function f(){let[,e=``]=window.location.hash.slice(1).split(`?`);return new URLSearchParams(e)}function p(e){window.location.hash=e}var m=`G-J8L2DDYBKM`,ee=[`localhost`,`127.0.0.1`,`[::1]`],h=!1;function te(){if(h||ee.includes(window.location.hostname))return;h=!0,window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},window.gtag(`js`,new Date),window.gtag(`config`,m,{send_page_view:!1});let e=document.createElement(`script`);e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${m}`,document.head.appendChild(e)}function ne(e,t){if(!h)return;let n=`/resume-builder/${e.replace(/^\//,``)}`;re(`page_view`,{page_location:`${window.location.origin}${n}`,page_path:n,page_title:t})}function g(e,t){h&&re(e,t)}function re(e,t){try{window.gtag(`event`,e,t)}catch{}}function _(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function v(e){return!e||!String(e).trim()}function y(e,t,n){return v(e)?n&&!v(t)?`<span class="placeholder-text">${_(t)}</span>`:``:_(e)}function ie(e){return String(e??``).split(/(https?:\/\/[^\s]+)/g).map(e=>{if(!/^https?:\/\//i.test(e))return _(e);let t=e.match(/[.,;:)]+$/)?.[0]||``,n=t?e.slice(0,-t.length):e;return`<a href="${_(n)}" target="_blank" rel="noopener noreferrer">${_(n)}</a>${_(t)}`}).join(``)}function b(e,t=``){let n=(e||[]).filter(e=>e&&e.trim());return n.length?`<ul${t?` class="${t}"`:``}>${n.map(e=>`<li>${ie(e)}</li>`).join(``)}</ul>`:``}function x(e){return/^https?:\/\//i.test(e)?e:`https://${e}`}function S(e,t){return`<a href="${_(e)}" target="_blank" rel="noopener noreferrer">${_(t)}</a>`}function C(e,t,n,r){return r.map(r=>{let i=e[r];return v(i)?n?y(``,t[r],!0):``:r===`phone`?S(`tel:${i.replace(/[^\d+]/g,``)}`,i):r===`email`?S(`mailto:${i}`,i):r===`linkedin`||r===`website`?S(x(i),i):_(i)}).filter(Boolean)}function w(e,t,n){let r=n&&!e?.length;return{rows:r?t||[]:e||[],ghostCls:r?` placeholder-text`:``}}function T(e,t,n){let r=e=>!!e?.length;return{summary:!v(e.summary)||n&&!v(t.summary),education:r(e.education)||n&&r(t.education),experience:r(e.experience)||n&&r(t.experience),projects:r(e.projects)||n&&r(t.projects),skills:r(e.skills)||n&&r(t.skills)}}function E(e,t){let n=String(e??``).trim(),r=String(t??``).trim();return n&&r?`${_(n)} &ndash; ${_(r)}`:_(n||r)}function D(e){let t=String(e??``).trim().split(/\s+/).filter(Boolean);return t.length<2?{first:t[0]||``,last:``}:{first:t.slice(0,-1).join(` `),last:t[t.length-1]}}function ae(e,t,n){if(!n){let t=[];return e.phone?.trim()&&t.push(S(`tel:${e.phone.replace(/[^\d+]/g,``)}`,e.phone)),e.email?.trim()&&t.push(S(`mailto:${e.email}`,e.email)),e.linkedin?.trim()&&t.push(S(x(e.linkedin),e.linkedin)),e.website?.trim()&&t.push(S(x(e.website),e.website)),t.join(` | `)}return[`phone`,`email`,`linkedin`,`website`].map(n=>y(e[n],t[n],!0)).join(` | `)}function oe(e,t,n){let r=n&&!e?.length,i=r?t||[]:e||[],a=r?` placeholder-text`:``;return i.map(e=>`
      <div class="entry">
        <div class="row${a}">
          <strong>${_(e.degree)}</strong>
          <strong>${_(e.year)}</strong>
        </div>
        <div class="row muted${a}">
          <span>${_(e.institution)}</span>
          <span>${_(e.location)}</span>
        </div>
      </div>`).join(``)}function se(e,t,n){let r=n&&!e?.length,i=r?t||[]:e||[],a=r?` placeholder-text`:``;return i.map(e=>`
      <div class="entry">
        <div class="row${a}">
          <strong>${_(e.title)}</strong>
          <strong>${_(e.start)} &ndash; ${_(e.end)}</strong>
        </div>
        <div class="row muted${a}">
          <span>${_(e.employer)}</span>
          <span>${_(e.location)}</span>
        </div>
        ${b(e.bullets,a.trim())}
      </div>`).join(``)}function ce(e,t,n){let r=n&&!e?.length,i=r?t||[]:e||[],a=r?` placeholder-text`:``;return i.map(e=>`
      <div class="entry">
        <div class="row${a}">
          <strong>${_(e.title)}${e.skills?` | ${_(e.skills)}`:``}</strong>
          <strong>${_(e.start)} &ndash; ${_(e.end)}</strong>
        </div>
        ${b(e.bullets,a.trim())}
      </div>`).join(``)}function le(e,t,n){let r=n&&!e?.length,i=r?t||[]:(e||[]).filter(e=>e.category||e.items),a=r?` placeholder-text`:``;return i.map(e=>`<p class="skill-line${a}"><strong>${_(e.category)}</strong> | ${_(e.items)}</p>`).join(``)}function ue(e,t){let n=!!t,{personal:r,summary:i,education:a,experience:o,projects:s,skills:c}=e,l=t||{},u=l.personal||{},d=!v(i)||n&&!v(l.summary),f=!!a?.length||n&&!!l.education?.length,p=!!o?.length||n&&!!l.experience?.length,m=!!s?.length||n&&!!l.projects?.length,ee=!!c?.length||n&&!!l.skills?.length,h=[d&&`<section>
        <h2>Professional Summary</h2>
        <p>${y(i,l.summary,n)}</p>
      </section>`,f&&`<section>
        <h2>Education</h2>
        ${oe(a,l.education,n)}
      </section>`,p&&`<section>
        <h2>Work Experience</h2>
        ${se(o,l.experience,n)}
      </section>`,m&&`<section>
        <h2>Projects</h2>
        ${ce(s,l.projects,n)}
      </section>`,ee&&`<section>
        <h2>Technical Skills</h2>
        ${le(c,l.skills,n)}
      </section>`].filter(Boolean).join(``);return`
    <div class="jakes-resume">
      <h1>${n?y(r.name,u.name||`Name Surname`,!0):_(r.name||`Name Surname`)}</h1>
      <p class="contact">${ae(r,u,n)}</p>
      ${h}
    </div>`}var de=`/resume-builder/assets/style-DrVulqcP.css`;function O(e,t,n=``){return`<div class="row${n}"><span class="l">${e}</span><span class="r">${t}</span></div>`}function fe(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${O(`<strong>${_(e.institution)}</strong>`,_(e.location),i)}
        ${O(`<em>${_(e.degree)}</em>`,`<em>${_(e.year)}</em>`,i)}
      </div>`).join(``)}function pe(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${O(`<strong>${_(e.employer)}</strong>`,_(e.location),i)}
        ${O(`<em>${_(e.title)}</em>`,`<em>${E(e.start,e.end)}</em>`,i)}
        ${b(e.bullets,i.trim())}
      </div>`).join(``)}function me(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${O(`<strong>${_(e.title)}</strong>`,E(e.start,e.end),i)}
        ${e.skills?O(`<em>${_(e.skills)}</em>`,``,i):``}
        ${b(e.bullets,i.trim())}
      </div>`).join(``)}function he(e,t,n){let{rows:r,ghostCls:i}=w((e||[]).filter(e=>e.category||e.items),t,n);return r.map(e=>`<p class="skill-line${i}"><strong>${_(e.category)}${e.category&&e.items?`:`:``}</strong> ${_(e.items)}</p>`).join(``)}function ge(e,t){let n=!!t,r=t||{},i=r.personal||{},{personal:a}=e,o=T(e,r,n),s=[o.summary&&`<section><h2>Summary</h2><p class="summary">${y(e.summary,r.summary,n)}</p></section>`,o.education&&`<section><h2>Education</h2>${fe(e.education,r.education,n)}</section>`,o.experience&&`<section><h2>Experience</h2>${pe(e.experience,r.experience,n)}</section>`,o.projects&&`<section><h2>Projects</h2>${me(e.projects,r.projects,n)}</section>`,o.skills&&`<section><h2>Skills</h2>${he(e.skills,r.skills,n)}</section>`].filter(Boolean).join(``),c=n?y(a.name,i.name||`Name Surname`,!0):_(a.name||`Name Surname`),l=y(a.title,i.title,n),u=C(a,i,n,[`location`,`phone`,`email`,`linkedin`,`website`]);return`
    <div class="tpl-classic">
      <h1>${c}</h1>
      ${l?`<p class="headline">${l}</p>`:``}
      <p class="contact">${u.join(`<span class="sep">&bull;</span>`)}</p>
      ${s}
    </div>`}var _e=`/resume-builder/assets/style-LehfDoMA.css`;function ve(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        <div class="title${i}">${_(e.title)}</div>
        <div class="org${i}">${_(e.employer)}</div>
        <div class="meta${i}"><span>${E(e.start,e.end)}</span>${e.location?`<span>${_(e.location)}</span>`:``}</div>
        ${b(e.bullets,i.trim())}
      </div>`).join(``)}function ye(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        <div class="title${i}">${_(e.title)}</div>
        <div class="meta${i}"><span>${E(e.start,e.end)}</span>${e.skills?`<span>${_(e.skills)}</span>`:``}</div>
        ${b(e.bullets,i.trim())}
      </div>`).join(``)}function be(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        <div class="title${i}">${_(e.degree)}</div>
        <div class="org${i}">${_(e.institution)}</div>
        <div class="meta${i}"><span>${_(e.year)}</span>${e.location?`<span>${_(e.location)}</span>`:``}</div>
      </div>`).join(``)}function xe(e,t,n){let{rows:r,ghostCls:i}=w((e||[]).filter(e=>e.category||e.items),t,n);return r.map(e=>{let t=String(e.items||``).split(`,`).map(e=>e.trim()).filter(Boolean).map(e=>`<span class="tag">${_(e)}</span>`).join(``);return`<div class="skill-group${i}">${e.category?`<h3>${_(e.category)}</h3>`:``}<div class="tags">${t}</div></div>`}).join(``)}function Se(e,t){let n=!!t,r=t||{},i=r.personal||{},{personal:a}=e,o=T(e,r,n),s=[o.summary&&`<section><h2>Summary</h2><p class="summary">${y(e.summary,r.summary,n)}</p></section>`,o.experience&&`<section><h2>Experience</h2>${ve(e.experience,r.experience,n)}</section>`,o.projects&&`<section><h2>Projects</h2>${ye(e.projects,r.projects,n)}</section>`].filter(Boolean).join(``),c=[o.skills&&`<section><h2>Skills</h2>${xe(e.skills,r.skills,n)}</section>`,o.education&&`<section><h2>Education</h2>${be(e.education,r.education,n)}</section>`].filter(Boolean).join(``),l=n?y(a.name,i.name||`Name Surname`,!0):_(a.name||`Name Surname`),u=y(a.title,i.title,n),d=C(a,i,n,[`email`,`phone`,`location`,`linkedin`,`website`]);return`
    <div class="tpl-twocol">
      <div class="hd">
        <h1>${l}</h1>
        ${u?`<p class="headline">${u}</p>`:``}
        <p class="contact">${d.map(e=>`<span class="item">${e}</span>`).join(``)}</p>
      </div>
      <div class="cols">
        <div class="col-main">${s}</div>
        <div class="col-side">${c}</div>
      </div>
    </div>`}var Ce=`/resume-builder/assets/style-CV5VgTyP.css`;function k(e){return`<h2><span class="lead">${_(e.slice(0,3))}</span>${_(e.slice(3))}<span class="rule"></span></h2>`}function A(e,t,n=``){return`<div class="row${n}"><span class="l">${e}</span><span class="r">${t}</span></div>`}function we(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${A(`<strong>${_(e.title)}</strong>`,`<span class="place">${_(e.location)}</span>`,i)}
        ${A(`<span class="org">${_(e.employer)}</span>`,`<span class="date">${E(e.start,e.end)}</span>`,i)}
        ${b(e.bullets,i.trim())}
      </div>`).join(``)}function Te(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${A(`<strong>${_(e.degree)}</strong>`,`<span class="place">${_(e.location)}</span>`,i)}
        ${A(`<span class="org">${_(e.institution)}</span>`,`<span class="date">${_(e.year)}</span>`,i)}
      </div>`).join(``)}function Ee(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${A(`<strong>${_(e.title)}</strong>`,`<span class="date">${E(e.start,e.end)}</span>`,i)}
        ${e.skills?A(`<span class="org">${_(e.skills)}</span>`,``,i):``}
        ${b(e.bullets,i.trim())}
      </div>`).join(``)}function De(e,t,n){let{rows:r,ghostCls:i}=w((e||[]).filter(e=>e.category||e.items),t,n);return r.map(e=>`<div class="skill${i}"><span class="cat">${_(e.category)}</span><span class="items">${_(e.items)}</span></div>`).join(``)}function Oe(e,t){let n=!!t,r=t||{},i=r.personal||{},{personal:a}=e,o=T(e,r,n),s=[o.summary&&`<section>${k(`Summary`)}<p class="summary">${y(e.summary,r.summary,n)}</p></section>`,o.experience&&`<section>${k(`Experience`)}${we(e.experience,r.experience,n)}</section>`,o.education&&`<section>${k(`Education`)}${Te(e.education,r.education,n)}</section>`,o.projects&&`<section>${k(`Projects`)}${Ee(e.projects,r.projects,n)}</section>`,o.skills&&`<section>${k(`Skills`)}${De(e.skills,r.skills,n)}</section>`].filter(Boolean).join(``),c=String(a.name||``).trim(),l=n&&!c,{first:u,last:d}=D(c||i.name||`Name Surname`),f=`<span class="first">${_(u)}</span>${d?` <span class="last">${_(d)}</span>`:``}`,p=y(a.title,i.title,n),m=C(a,i,n,[`location`,`phone`,`email`,`linkedin`,`website`]);return`
    <div class="tpl-bold">
      <div class="hd">
        <h1${l?` class="placeholder-text"`:``}>${f}</h1>
        ${p?`<p class="headline">${p}</p>`:``}
        <p class="contact">${m.join(`<span class="sep">|</span>`)}</p>
      </div>
      ${s}
    </div>`}var ke=`/resume-builder/assets/style-DonOD9oa.css`;function Ae(e,t,n=``){return`<div class="row${n}"><span class="l">${e}</span><span class="r">${t}</span></div>`}var je=(...e)=>e.map(e=>String(e??``).trim()).filter(Boolean).map(_).join(`, `);function Me(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${Ae(`<strong>${_(e.title)}</strong>${e.employer?`, ${_(e.employer)}`:``}`,`<span class="muted">${E(e.start,e.end)}</span>`,i)}
        ${e.location?`<div class="muted small${i}">${_(e.location)}</div>`:``}
        ${b(e.bullets,i.trim())}
      </div>`).join(``)}function Ne(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${Ae(`<strong>${_(e.degree)}</strong>`,`<span class="muted">${_(e.year)}</span>`,i)}
        <div class="muted small${i}">${je(e.institution,e.location)}</div>
      </div>`).join(``)}function Pe(e,t,n){let{rows:r,ghostCls:i}=w(e,t,n);return r.map(e=>`
      <div class="entry">
        ${Ae(`<strong>${_(e.title)}</strong>`,`<span class="muted">${E(e.start,e.end)}</span>`,i)}
        ${e.skills?`<div class="muted small${i}">${_(e.skills)}</div>`:``}
        ${b(e.bullets,i.trim())}
      </div>`).join(``)}function Fe(e,t,n){let{rows:r,ghostCls:i}=w((e||[]).filter(e=>e.category||e.items),t,n);return r.map(e=>`<p class="skill-line${i}"><span class="cat">${_(e.category)}</span>${_(e.items)}</p>`).join(``)}function Ie(e,t){let n=!!t,r=t||{},i=r.personal||{},{personal:a}=e,o=T(e,r,n),s=[o.summary&&`<section><h2>Summary</h2><p class="summary">${y(e.summary,r.summary,n)}</p></section>`,o.experience&&`<section><h2>Experience</h2>${Me(e.experience,r.experience,n)}</section>`,o.education&&`<section><h2>Education</h2>${Ne(e.education,r.education,n)}</section>`,o.projects&&`<section><h2>Projects</h2>${Pe(e.projects,r.projects,n)}</section>`,o.skills&&`<section><h2>Skills</h2>${Fe(e.skills,r.skills,n)}</section>`].filter(Boolean).join(``),c=n?y(a.name,i.name||`Name Surname`,!0):_(a.name||`Name Surname`),l=y(a.title,i.title,n),u=C(a,i,n,[`location`,`phone`,`email`,`linkedin`,`website`]);return`
    <div class="tpl-minimal">
      <div class="hd">
        <h1>${c}</h1>
        ${l?`<p class="headline">${l}</p>`:``}
        <p class="contact">${u.join(`<span class="sep">&middot;</span>`)}</p>
      </div>
      ${s}
    </div>`}var Le=`/resume-builder/assets/style-CeiU4aRP.css`,Re=[`summary`,`education`,`experience`,`projects`,`skills`],ze=(...e)=>e.filter(Boolean).join(` — `),j=(e,t)=>[e,t].filter(Boolean).join(` – `),Be={font:`times`,margins:{top:16,bottom:16,left:18,right:18},align:`left`,colors:{ink:[31,41,51],border:[203,213,225],contactBg:[238,240,244],link:[37,99,235]},style:{name:{size:20,bold:!0,lineMm:8},contact:{size:9,lineMm:5},h2:{size:10.5,bold:!0,color:[71,85,105],lineMm:4.6},row:{size:10,bold:!0,lineMm:4.6},rowMuted:{size:9.5,italic:!0,color:[82,96,107],lineMm:4.3},body:{size:9.5,lineMm:4.3},bullet:{size:9.5,lineMm:4.1},skillCategory:{size:9.5,bold:!0,lineMm:4.6}},contactBar:!0,contactKeys:[`phone`,`email`,`linkedin`,`website`],contactSeparator:` | `,heading:{upper:!0,rule:`below`},bulletMark:`•`,skills:{separator:` | `},order:Re,titles:{summary:`Professional Summary`,education:`Education`,experience:`Work Experience`,projects:`Projects`,skills:`Technical Skills`},entries:{education:e=>({top:{left:e.degree||``,right:e.year||``},sub:{left:ze(e.institution,e.location),leftStyle:`rowMuted`}}),experience:e=>({top:{left:e.title||``,right:j(e.start,e.end)},sub:{left:ze(e.employer,e.location),leftStyle:`rowMuted`}}),projects:e=>({top:{left:e.skills?`${e.title||``} | ${e.skills}`:e.title||``,right:j(e.start,e.end)}})}},Ve={summary:`Summary`,education:`Education`,experience:`Experience`,projects:`Projects`,skills:`Skills`},He=[17,17,17],Ue={font:`times`,margins:{top:16,bottom:16,left:18,right:18},align:`center`,colors:{ink:He,border:He,link:He},name:{upper:!0},style:{name:{size:18,bold:!0,lineMm:8},headline:{size:10,italic:!0,lineMm:5},contact:{size:9.5,lineMm:4.6},h2:{size:10.5,bold:!0,lineMm:4.6},row:{size:10,bold:!0,lineMm:4.5},rowPlain:{size:10,lineMm:4.5},rowItalic:{size:10,italic:!0,lineMm:4.4},body:{size:10,lineMm:4.4},bullet:{size:10,lineMm:4.2},skillCategory:{size:10,bold:!0,lineMm:4.6}},contactBar:!1,contactKeys:[`location`,`phone`,`email`,`linkedin`,`website`],contactSeparator:`  •  `,afterContactMm:2,heading:{upper:!0,rule:`below`,ruleWidth:.25,spaceBeforeMm:2},bulletMark:`•`,skills:{separator:`: `},order:[`summary`,`education`,`experience`,`projects`,`skills`],titles:Ve,entries:{education:e=>({top:{left:e.institution||``,right:e.location||``,rightStyle:`rowPlain`},sub:{left:e.degree||``,right:e.year||``,leftStyle:`rowItalic`}}),experience:e=>({top:{left:e.employer||``,right:e.location||``,rightStyle:`rowPlain`},sub:{left:e.title||``,right:j(e.start,e.end),leftStyle:`rowItalic`}}),projects:e=>({top:{left:e.title||``,right:j(e.start,e.end),rightStyle:`rowPlain`},sub:{left:e.skills||``,leftStyle:`rowItalic`}})}},M=[220,53,34],We=[51,51,51],Ge=[110,110,110],Ke={font:`helvetica`,margins:{top:14,bottom:14,left:16,right:16},align:`center`,colors:{ink:We,border:[180,180,180],link:We},name:{split:!0},headlineUpper:!0,style:{name:{size:24,bold:!0,lineMm:10,color:[34,34,34]},nameLight:{size:24,lineMm:10,color:[90,90,90]},headline:{size:9,color:M,lineMm:5},contact:{size:8.5,color:Ge,lineMm:4.4},contactSeparator:{size:8.5,color:M,lineMm:4.4},h2:{size:13,bold:!0,color:[34,34,34],lineMm:6},row:{size:10,bold:!0,lineMm:4.5},rowAccent:{size:9,italic:!0,color:M,lineMm:4.5},rowGrey:{size:8.5,color:Ge,lineMm:4.2},rowGreyItalic:{size:8.5,italic:!0,color:Ge,lineMm:4.2},body:{size:9.5,lineMm:4.3},bullet:{size:9.5,lineMm:4.1},bulletMark:{size:9.5,color:M,lineMm:4.1},skillCategory:{size:9.5,bold:!0,lineMm:4.6}},contactBar:!1,contactKeys:[`location`,`phone`,`email`,`linkedin`,`website`],contactSeparator:`  |  `,afterContactMm:2,heading:{upper:!1,rule:`after`,lead:{chars:3,color:M},spaceBeforeMm:2},bulletMark:`•`,skills:{table:38},order:[`summary`,`experience`,`education`,`projects`,`skills`],titles:Ve,entries:{education:e=>({top:{left:e.degree||``,right:e.location||``,rightStyle:`rowAccent`},sub:{left:(e.institution||``).toUpperCase(),right:e.year||``,leftStyle:`rowGrey`,rightStyle:`rowGreyItalic`}}),experience:e=>({top:{left:e.title||``,right:e.location||``,rightStyle:`rowAccent`},sub:{left:(e.employer||``).toUpperCase(),right:j(e.start,e.end),leftStyle:`rowGrey`,rightStyle:`rowGreyItalic`}}),projects:e=>({top:{left:e.title||``,right:j(e.start,e.end),rightStyle:`rowGreyItalic`},sub:{left:e.skills||``,leftStyle:`rowGrey`}})}},qe=[31,122,94],Je=[107,114,128],Ye={font:`helvetica`,margins:{top:18,bottom:18,left:20,right:20},align:`left`,colors:{ink:[38,38,38],border:[255,255,255],link:[38,38,38]},style:{name:{size:24,lineMm:10,color:[17,17,17]},headline:{size:10.5,color:qe,lineMm:5.2},contact:{size:8.5,color:Je,lineMm:4.4},h2:{size:8.5,bold:!0,color:qe,lineMm:6},row:{size:10,bold:!0,lineMm:4.6},rowMuted:{size:9,color:Je,lineMm:4.2},body:{size:9.5,lineMm:4.5},bullet:{size:9.5,lineMm:4.3},skillCategory:{size:9.5,bold:!0,lineMm:4.8}},contactBar:!1,contactKeys:[`location`,`phone`,`email`,`linkedin`,`website`],contactSeparator:`   ·   `,afterContactMm:3,heading:{upper:!0,rule:`none`,spaceBeforeMm:3},bulletMark:`–`,skills:{separator:`   `},order:Re,titles:Ve,entries:{education:e=>({top:{left:e.degree||``,right:e.year||``,rightStyle:`rowMuted`},sub:{left:[e.institution,e.location].filter(Boolean).join(`, `),leftStyle:`rowMuted`}}),experience:e=>({top:{left:[e.title,e.employer].filter(Boolean).join(`, `),right:j(e.start,e.end),rightStyle:`rowMuted`},sub:{left:e.location||``,leftStyle:`rowMuted`}}),projects:e=>({top:{left:e.title||``,right:j(e.start,e.end),rightStyle:`rowMuted`},sub:{left:e.skills||``,leftStyle:`rowMuted`}})}},Xe={_help:`Which templates the app offers, in gallery order. Set "visible": false to hide one (it disappears from the gallery and the builder's template picker; links to it open the first visible template instead). Rebuild/redeploy after editing.`,templates:[{id:`jakes-resume`,visible:!0},{id:`classic`,visible:!0},{id:`two-column`,visible:!0},{id:`bold`,visible:!0},{id:`minimal`,visible:!0}]},N=96/25.4,Ze={"jakes-resume":{name:`Jake's Resume`,description:`Single-column, ATS-friendly layout. A favourite for software and tech roles.`,render:ue,styleUrl:de,rootClass:`jakes-resume`,pagePaddingMm:32,layout:`single`,vectorTheme:Be,placeholder:`developer`},classic:{name:`Classic`,description:`Traditional serif layout in the Harvard style. For business, finance, law and first jobs.`,render:ge,styleUrl:_e,rootClass:`tpl-classic`,pagePaddingMm:32,layout:`single`,vectorTheme:Ue,placeholder:`general`},"two-column":{name:`Two-Column`,description:`Modern layout with a sidebar for skills and education. Best when a person, not a screening tool, reads it first.`,render:Se,styleUrl:Ce,rootClass:`tpl-twocol`,pagePaddingMm:28,layout:`sidebar`,vectorTheme:null,placeholder:`general`},bold:{name:`Bold`,description:`Confident single column with a red accent and a big name. For experienced professionals.`,render:Oe,styleUrl:ke,rootClass:`tpl-bold`,pagePaddingMm:28,layout:`single`,vectorTheme:Ke,placeholder:`general`},minimal:{name:`Minimal`,description:`Clean and airy with a green accent. For design, content and creative roles.`,render:Ie,styleUrl:Le,rootClass:`tpl-minimal`,pagePaddingMm:36,layout:`single`,vectorTheme:Ye,placeholder:`general`}};function Qe(){let e=Xe.templates.filter(e=>Ze[e.id]?!0:(console.warn(`templates.json lists an unknown template "${e.id}"`),!1)),t=Object.keys(Ze).filter(t=>!e.some(e=>e.id===t)).map(e=>({id:e,visible:!0}));return[...e,...t].map(e=>({id:e.id,pageWidthMm:210,...Ze[e.id],visible:e.visible!==!1}))}var $e=Qe(),et=$e.filter(e=>e.visible);function tt(e){return et.find(t=>t.id===e)||et[0]||$e[0]}function nt(e){let t=`template-style-${e.id}`,n=document.getElementById(t);if(n)return n;let r=document.createElement(`link`);return r.id=t,r.rel=`stylesheet`,r.href=e.styleUrl,document.head.appendChild(r),r}var rt=1;function P(){return`row-${Date.now()}-${rt++}`}function it(e){return{id:P(),templateId:e,meta:{label:``,targetRole:``,jobDescriptionTag:``,savedAt:null},personal:{name:``,title:``,phone:``,email:``,location:``,linkedin:``,website:``},summary:``,education:[],experience:[],projects:[],skills:[]}}function at(){return{id:P(),degree:``,institution:``,location:``,year:``}}function ot(){return{id:P(),title:``,employer:``,location:``,start:``,end:``,bullets:[``]}}function st(){return{id:P(),title:``,skills:``,start:``,end:``,bullets:[``]}}function ct(){return{id:P(),category:``,items:``}}function lt(e,{general:t=!1}={}){let n=it(e);return n.meta.label=`Placeholder`,n.personal={name:`Name Surname`,title:``,phone:`012 345 6789`,email:`yourname@gmail.com`,location:``,linkedin:`LinkedIn`,website:`Website`},n.summary=`Your professional summary is your elevator pitch. This is a concise and compelling 2-3 sentence overview of your experience, expertise, personality, and standout features, tailored to the role.`,n.education=[{id:P(),degree:`Degree`,institution:`Institution`,location:`Location`,year:`Year Completed`},{id:P(),degree:`Degree`,institution:`Institution`,location:`Location`,year:`Year Completed`}],n.experience=[{id:P(),title:`Position Title`,employer:`Employer`,location:`Location`,start:`Mmm YYYY`,end:`Present`,bullets:[`List your jobs in reverse chronological order, focus on the last 5-10 years or the last 3-4 roles`,`Aim for 3-5 bullets per role and start with action verbs to describe your responsibilities and achievements`,`Quantify your accomplishments where possible to give concrete evidence of your impact`]}],n.projects=[{id:P(),title:`Project Title`,skills:`Skills Used`,start:`Mmm YYYY`,end:`Mmm YYYY`,bullets:[`Summarize the project, focusing on the problem solved, your approach, and the outcome achieved`,`Highlight results like increased efficiency or user engagement, providing specific numbers where relevant`]}],n.skills=[{id:P(),category:`Languages`,items:`Python, JavaScript, Java, C/C++, SQL, Ruby, R`},{id:P(),category:`Frameworks`,items:`React, Django, Spring Boot, Flask, Angular, Ruby on Rails, Express.js`},{id:P(),category:`Developer Tools`,items:`Git, Docker, Jenkins, Visual Studio Code, PyCharm, TravisCI, Eclipse, JIRA`}],t&&(n.personal.title=`Your Role or Headline`,n.personal.location=`City, Country`,n.skills=[{id:P(),category:`Core skills`,items:`Project management, Stakeholder communication, Budgeting, Reporting`},{id:P(),category:`Tools`,items:`Excel, PowerPoint, Salesforce, Jira, Notion`},{id:P(),category:`Languages`,items:`English (fluent), Hindi (native)`}]),n}function ut(){return document.getElementById(`app`)}function dt(e,t){document.body.appendChild(e);let n=ut();n&&(n.inert=!0,n.setAttribute(`aria-hidden`,`true`)),e._onNavigate=()=>t(),window.addEventListener(`hashchange`,e._onNavigate)}function ft(e){if(e.remove(),window.removeEventListener(`hashchange`,e._onNavigate),!document.querySelector(`.preview-modal-backdrop`)){let e=ut();e&&(e.inert=!1,e.removeAttribute(`aria-hidden`))}}function pt(e,t){let n=e.querySelector(`.template-thumb-inner`);n.style.width=`${t}px`,n.style.transform=`scale(${e.clientWidth/t})`}function mt(e,t,n){let r=Math.min(1,e.clientWidth/n);t.style.transformOrigin=`top left`,t.style.width=`${n}px`,t.style.transform=`scale(${r})`;let i=t.firstElementChild;e.style.height=i?`${i.offsetHeight*r}px`:``}function ht(e,t){let n=e.pageWidthMm*N,r=document.createElement(`div`);r.className=`preview-modal-backdrop`,r.innerHTML=`
    <div class="preview-modal" role="dialog" aria-modal="true" aria-labelledby="preview-title">
      <div class="preview-modal-header">
        <h3 id="preview-title">${e.name} &mdash; full preview</h3>
        <div class="actions" style="margin:0;">
          <button type="button" class="btn btn-primary" id="preview-use-btn">Use this template</button>
          <button type="button" class="btn" id="preview-close-btn">Close</button>
        </div>
      </div>
      <div class="preview-modal-body">
        <div class="preview-scale-outer" id="modal-scale-outer">
          <div class="preview-frame" id="modal-scale-inner">${e.render(t)}</div>
        </div>
      </div>
    </div>
  `,dt(r,()=>s());let i=r.querySelector(`#modal-scale-outer`),a=r.querySelector(`#modal-scale-inner`);function o(){mt(i,a,n)}o(),window.addEventListener(`resize`,o);function s(){ft(r),window.removeEventListener(`resize`,o),document.removeEventListener(`keydown`,c)}function c(e){e.key===`Escape`&&s()}r.addEventListener(`click`,e=>{e.target===r&&s()}),r.querySelector(`#preview-close-btn`).addEventListener(`click`,s),r.querySelector(`#preview-use-btn`).addEventListener(`click`,()=>{s(),g(`template_selected`,{template_id:e.id,source:`preview`}),p(`/builder?template=${e.id}`)}),document.addEventListener(`keydown`,c)}function gt(e){e.innerHTML=`
    <div class="topbar"><a class="brand" href="#/">Resume Builder</a></div>
    <div class="container">
      <h1 class="page-title">Template Gallery</h1>
      <p class="page-subtitle">Pick a template to start building your resume.</p>
      <div class="template-grid" id="template-grid"></div>
    </div>
  `;let t=e.querySelector(`#template-grid`),n=[];et.forEach(e=>{nt(e);let r=lt(e.id,{general:e.placeholder===`general`}),i=e.pageWidthMm*N,a=document.createElement(`div`);a.className=`card template-card`,a.innerHTML=`
      <button type="button" class="template-thumb" aria-label="Preview the ${e.name} template">
        <div class="template-thumb-inner">${e.render(r)}</div>
      </button>
      <h3><button type="button" class="template-name">${e.name}</button></h3>
      <p class="page-subtitle">${e.description}</p>
      <div class="actions" style="margin:0;">
        <button type="button" class="btn preview-template">Preview</button>
        <button type="button" class="btn btn-primary use-template">Use this template</button>
      </div>
    `,a.querySelector(`.use-template`).addEventListener(`click`,()=>{g(`template_selected`,{template_id:e.id,source:`card`}),p(`/builder?template=${e.id}`)}),a.querySelector(`.preview-template`).addEventListener(`click`,()=>{ht(e,r)});for(let t of a.querySelectorAll(`.template-thumb, .template-name`))t.addEventListener(`click`,()=>{g(`template_preview`,{template_id:e.id,source:t.classList.contains(`template-thumb`)?`thumbnail`:`name`}),ht(e,r)});t.appendChild(a);let o=a.querySelector(`.template-thumb`);n.push({thumb:o,pageWidthPx:i}),pt(o,i)});function r(){n.forEach(({thumb:e,pageWidthPx:t})=>pt(e,t))}window.addEventListener(`resize`,r),window.addEventListener(`hashchange`,()=>window.removeEventListener(`resize`,r),{once:!0})}var _t=`modulepreload`,vt=function(e){return`/resume-builder/`+e},yt={},F=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=vt(t,n),t=s(t),t in yt)return;yt[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:_t,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};async function bt(e,t=`resume.png`){let{default:n}=await F(async()=>{let{default:e}=await import(`./html2canvas-DJZ4sY7M.js`).then(e=>u(e.default,1));return{default:e}},[]),r=await n(e,{scale:2,useCORS:!0,backgroundColor:`#ffffff`}),i=document.createElement(`a`);i.href=r.toDataURL(`image/png`),i.download=t,i.click()}var xt=210,St=297;async function Ct(e,t=`resume.pdf`){let[{default:n},{jsPDF:r}]=await Promise.all([F(()=>import(`./html2canvas-DJZ4sY7M.js`).then(e=>u(e.default,1)),[]),F(()=>import(`./jspdf.es.min-mNj9gaK3.js`).then(e=>e.t),[])]),i=new r({unit:`mm`,format:`a4`,orientation:`portrait`});for(let t=0;t<e.length;t++){let r=await n(e[t],{scale:2,useCORS:!0});t>0&&i.addPage(),i.addImage(r.toDataURL(`image/png`),`PNG`,0,0,xt,St)}i.save(t)}async function wt(e,t=`resume.pdf`){let[{default:n},{jsPDF:r}]=await Promise.all([F(()=>import(`./html2canvas-DJZ4sY7M.js`).then(e=>u(e.default,1)),[]),F(()=>import(`./jspdf.es.min-mNj9gaK3.js`).then(e=>e.t),[])]),i=new r({unit:`mm`,format:`a4`,orientation:`portrait`});for(let t=0;t<e.length;t++){let r=e[t],a=await n(r,{scale:2,useCORS:!0});t>0&&i.addPage(),i.addImage(a.toDataURL(`image/png`),`PNG`,0,0,xt,St);let o=r.getBoundingClientRect();r.querySelectorAll(`a[href]`).forEach(e=>{let t=e.getBoundingClientRect();i.link((t.left-o.left)/N,(t.top-o.top)/N,t.width/N,t.height/N,{url:e.href})})}i.save(t)}var Tt=210,Et=297,I=25.4/72,L,R,z,B,V,H;function Dt(e){L=e,H=e.margins.top,R=e.margins.left,z=Tt-e.margins.right,B=z-R,V=Et-e.margins.bottom}function Ot(e){return!e||!String(e).trim()}var kt=/(https?:\/\/[^\s]+)/;function At(e){return/^https?:\/\//i.test(e)?e:`https://${e}`}function jt(e){let t=kt.exec(e);if(!t)return null;let n=t[1],r=n.match(/[.,;:)]+$/)?.[0]||``;r&&(n=n.slice(0,-r.length));let i=t.index;return{pre:e.slice(0,i),url:n,post:e.slice(i+n.length)}}function Mt(){return{y:H}}function U(e,t,n){t.y+n>V&&(e.addPage(),t.y=H)}function W(e,t){e.setFont(t.font||L.font,t.bold&&t.italic?`bolditalic`:t.bold?`bold`:t.italic?`italic`:`normal`),e.setFontSize(t.size),e.setTextColor(...t.color||L.colors.ink)}function G(e,t,n,r,i,a){W(e,i),a&&e.setTextColor(...L.colors.link),e.text(t,n,r);let o=e.getTextWidth(t);if(a){let t=r-i.size*I*.8,s=i.size*I*1.05;e.link(n,t,o,s,{url:a}),e.setDrawColor(...L.colors.link),e.setLineWidth(.15),e.line(n,r+.5,n+o,r+.5)}return o}function Nt(e,t){return t.reduce((t,n)=>(W(e,n.style),t+e.getTextWidth(n.text)),0)}function K(e){return L.align===`center`?R+(B-e)/2:R}function Pt(e,t,n){let r=L.style.name;U(e,t,r.lineMm),t.y+=r.lineMm*.75;let i=n||`Name Surname`;if(L.name?.split){let n=i.trim().split(/\s+/),a=n.length>1?n.pop():``,o=[{text:n.join(` `)+(a?` `:``),style:L.style.nameLight},{text:a,style:r}].filter(e=>e.text),s=K(Nt(e,o));o.forEach(n=>{s+=G(e,n.text,s,t.y,n.style)})}else{let n=L.name?.upper?i.toUpperCase():i;W(e,r),G(e,n,K(e.getTextWidth(n)),t.y,r)}t.y+=r.lineMm*.35}function Ft(e,t,n){if(!L.style.headline||Ot(n))return;let r=L.style.headline,i=L.headlineUpper?n.toUpperCase():n;U(e,t,r.lineMm),t.y+=r.lineMm*.8,W(e,r),G(e,i,K(e.getTextWidth(i)),t.y,r),t.y+=r.lineMm*.2}function It(e){let t=[];for(let n of L.contactKeys){let r=e[n];Ot(r)||(n===`phone`?t.push({text:r,url:`tel:${r.replace(/[^\d+]/g,``)}`}):n===`email`?t.push({text:r,url:`mailto:${r}`}):n===`linkedin`||n===`website`?t.push({text:r,url:At(r)}):t.push({text:r}))}return t}function Lt(e,t,n){let r=L.style.contact,i=It(n),a=L.contactSeparator,o=L.style.contactSeparator||r;if(L.contactBar){let n=r.lineMm+2;U(e,t,n+2),t.y+=1.5,e.setFillColor(...L.colors.contactBg),e.rect(0,t.y,Tt,n,`F`);let s=t.y+n/2+r.size*I*.35,c=R;i.forEach((t,n)=>{c+=G(e,t.text,c,s,r,t.url),n<i.length-1&&(c+=G(e,a,c,s,o))}),t.y+=n+3.7;return}if(!i.length){t.y+=2;return}let s=[[]],c=0;W(e,r);let l=Nt(e,[{text:a,style:o}]);i.forEach(t=>{W(e,r);let n=e.getTextWidth(t.text),i=s[s.length-1];i.length&&c+l+n>B?(s.push([t]),c=n):(c+=(i.length?l:0)+n,i.push(t))}),s.forEach(n=>{U(e,t,r.lineMm),t.y+=r.lineMm*.85;let i=n.flatMap((e,t)=>[...t?[{text:a,style:o}]:[],{text:e.text,style:r,url:e.url}]),s=K(Nt(e,i));i.forEach(n=>{s+=G(e,n.text,s,t.y,n.style,n.url)}),t.y+=r.lineMm*.15}),t.y+=L.afterContactMm}function Rt(){return(L.heading.spaceBeforeMm||0)+L.style.h2.lineMm*.8+1.2+2.2}function zt(e,t,n){let r=L.style.h2;U(e,t,r.lineMm+3),t.y>H+.1&&(t.y+=L.heading.spaceBeforeMm||0),t.y+=r.lineMm*.8;let i=L.heading.upper?n.toUpperCase():n,a=R;if(L.heading.lead){let n=L.heading.lead.chars;a+=G(e,i.slice(0,n),a,t.y,{...r,color:L.heading.lead.color}),a+=G(e,i.slice(n),a,t.y,r)}else a+=G(e,i,a,t.y,r);if(L.heading.rule===`below`){let n=t.y+1.2;e.setDrawColor(...L.colors.border),e.setLineWidth(L.heading.ruleWidth??.15),e.line(R,n,z,n)}else if(L.heading.rule===`after`){let n=t.y-r.size*I*.3;e.setDrawColor(...L.colors.border),e.setLineWidth(L.heading.ruleWidth??.2),e.line(a+2,n,z,n)}t.y=t.y+1.2+2.2}function Bt(e,t){let n=L.style[t.leftStyle||`row`],r=L.style[t.rightStyle||t.leftStyle||`row`];W(e,r);let i=t.right?e.getTextWidth(t.right):0,a=t.right?4:0;W(e,n);let o=Math.max(B-i-a,B*.35),s=e.splitTextToSize(t.left||``,o),c=s.length>1?[s[0],...e.splitTextToSize(s.slice(1).join(` `),B)]:s;return{lines:c,leftStyle:n,rightStyle:r,height:c.length*n.lineMm}}function Vt(e,t){let n=[t.top,t.sub].filter(e=>e&&(e.left||e.right)).map(t=>({row:t,...Bt(e,t)}));return{layouts:n,height:n.reduce((e,t)=>e+t.height,0)}}function Ht(e,t,n){let{layouts:r,height:i}=Vt(e,n);U(e,t,i),r.forEach(({row:n,lines:r,leftStyle:i,rightStyle:a})=>{r.forEach((r,o)=>{t.y+=i.lineMm*.72,G(e,r,R,t.y,i),o===0&&n.right&&(W(e,a),e.text(n.right,z,t.y,{align:`right`})),t.y+=i.lineMm*.28})})}function Ut(e,t){let n=L.style.bullet,r=B-4;W(e,n);let i=(t||[]).filter(e=>e&&e.trim()).map(t=>{let i=e.splitTextToSize(t,r);return{lines:i,height:i.length*n.lineMm+.8,linkInfo:jt(t)}});return{items:i,totalHeight:i.reduce((e,t)=>e+t.height,0),indent:4,style:n}}function Wt(e,t,n){let{items:r,indent:i,style:a}=Ut(e,n);r.forEach(({lines:n,height:r,linkInfo:o})=>{r<=V-H&&U(e,t,r),n.forEach((n,r)=>{if(U(e,t,a.lineMm),t.y+=a.lineMm*.72,r===0&&(W(e,L.style.bulletMark||a),e.text(L.bulletMark,R,t.y)),o&&n.includes(o.url)){let r=n.slice(0,n.indexOf(o.url)),s=R+i;s+=G(e,r,s,t.y,a),s+=G(e,o.url,s,t.y,a,o.url);let c=n.slice(n.indexOf(o.url)+o.url.length);c&&G(e,c,s,t.y,a)}else G(e,n,R+i,t.y,a);t.y+=a.lineMm*.28})})}function Gt(e,t,n){n.forEach(n=>{Ht(e,t,L.entries.education(n)),t.y+=1.5})}function Kt(e,t,n){n.forEach(n=>{Ht(e,t,L.entries.experience(n)),t.y+=.8,Wt(e,t,n.bullets),t.y+=1.5})}function qt(e,t,n){n.forEach(n=>{Ht(e,t,L.entries.projects(n)),t.y+=.8,Wt(e,t,n.bullets),t.y+=1.5})}function Jt(e,t){let n=L.style.skillCategory,r=L.style.body;if(W(e,n),L.skills.table){let i=R+L.skills.table;W(e,r);let a=t.items?e.splitTextToSize(t.items,z-i):[``];return{table:!0,itemsX:i,lines:a,height:n.lineMm+(a.length-1)*r.lineMm}}let i=e.getTextWidth(t.category||``);W(e,L.style.skillSeparator||n);let a=t.items?e.getTextWidth(L.skills.separator):0,o=R+i+a;W(e,r);let s=t.items?e.splitTextToSize(t.items,z-o):[];return{table:!1,lines:s,height:n.lineMm+Math.max(0,s.length-1)*r.lineMm}}function Yt(e,t,n){let r=L.style.skillCategory,i=L.style.body;n.filter(e=>e.category||e.items).forEach(n=>{let a=Jt(e,n);if(U(e,t,r.lineMm),t.y+=r.lineMm*.75,a.table)W(e,r),e.text(n.category||``,a.itemsX-3,t.y,{align:`right`}),a.lines.forEach((n,r)=>{r>0&&(t.y+=i.lineMm,U(e,t,i.lineMm)),G(e,n,a.itemsX,t.y,i)});else{let o=R;if(o+=G(e,n.category||``,o,t.y,r),n.items){o+=G(e,L.skills.separator,o,t.y,L.style.skillSeparator||r),G(e,a.lines[0],o,t.y,i);for(let n=1;n<a.lines.length;n++)t.y+=i.lineMm,U(e,t,i.lineMm),G(e,a.lines[n],R,t.y,i)}}t.y+=r.lineMm*.25})}function Xt(e,t,n){let r=L.style.body;W(e,r),e.splitTextToSize(n,B).forEach(n=>{U(e,t,r.lineMm),t.y+=r.lineMm*.72,G(e,n,R,t.y,r),t.y+=r.lineMm*.28})}function Zt(e,t){let n=L.style.body;return W(e,n),e.splitTextToSize(t,B).length*n.lineMm}function Qt(e,t){return t.reduce((t,n)=>t+Vt(e,L.entries.education(n)).height+1.5,0)}function q(e,t,n){return t.reduce((t,r)=>{let{height:i}=Vt(e,n(r)),{totalHeight:a}=Ut(e,r.bullets);return t+i+.8+a+1.5},0)}function $t(e,t){let n=L.style.skillCategory;return t.filter(e=>e.category||e.items).reduce((t,r)=>t+Jt(e,r).height+n.lineMm*.25,0)}function en(e,t,n,r,i){let a=V-t.y,o=V-H,s=Rt()+r,c=t.y<=H+.1;(s<=o/4?s:Rt()+i)>a&&!c&&(e.addPage(),t.y=H),zt(e,t,n)}var tn={summary:{present:e=>!Ot(e.summary),measure:(e,t)=>Zt(e,t.summary),first:(e,t)=>Zt(e,t.summary),draw:(e,t,n)=>Xt(e,t,n.summary)},education:{present:e=>!!e.education?.length,measure:(e,t)=>Qt(e,t.education),first:(e,t)=>Qt(e,t.education.slice(0,1)),draw:(e,t,n)=>Gt(e,t,n.education)},experience:{present:e=>!!e.experience?.length,measure:(e,t)=>q(e,t.experience,L.entries.experience),first:(e,t)=>q(e,t.experience.slice(0,1),L.entries.experience),draw:(e,t,n)=>Kt(e,t,n.experience)},projects:{present:e=>!!e.projects?.length,measure:(e,t)=>q(e,t.projects,L.entries.projects),first:(e,t)=>q(e,t.projects.slice(0,1),L.entries.projects),draw:(e,t,n)=>qt(e,t,n.projects)},skills:{present:e=>!!e.skills?.length,measure:(e,t)=>$t(e,t.skills),first:(e,t)=>$t(e,t.skills.slice(0,1)),draw:(e,t,n)=>Yt(e,t,n.skills)}};async function nn(e,t){let{jsPDF:n}=await F(async()=>{let{jsPDF:e}=await import(`./jspdf.es.min-mNj9gaK3.js`).then(e=>e.t);return{jsPDF:e}},[]);Dt(t);let r=new n({unit:`mm`,format:`a4`,orientation:`portrait`}),i=Mt(),a=e.personal||{};Pt(r,i,a.name),Ft(r,i,a.title),Lt(r,i,a);for(let n of t.order){let a=tn[n];a.present(e)&&(en(r,i,t.titles[n],a.measure(r,e),a.first(r,e)),a.draw(r,i,e))}return r}async function rn(e,t=`resume.pdf`,n){(await nn(e,n||Be)).save(t)}var an=`resume-builder:draft`,on=`resume-builder:local-history`;function sn(e){try{localStorage.setItem(an,JSON.stringify(e))}catch{}}function cn(){try{let e=localStorage.getItem(an);return e?JSON.parse(e):null}catch{return null}}function ln(e){try{let t=un();t.push(e),localStorage.setItem(on,JSON.stringify(t))}catch{}}function un(){try{let e=localStorage.getItem(on);return e?JSON.parse(e):[]}catch{return[]}}function dn(e,t){let n=new Blob([JSON.stringify(e,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=t,i.click(),URL.revokeObjectURL(r)}async function fn(e){try{let t=await fetch(`/api/history`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)});return t.ok?await t.json():null}catch{return null}}async function pn(){try{let e=await fetch(`/resume-builder/data/history.json`);return e.ok?await e.json():[]}catch{return[]}}function J(e){let t=getComputedStyle(e);return e.offsetHeight+parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0)}function Y(e,t){let n=e.cloneNode(!1);return n.innerHTML=t,n.outerHTML}function mn(e,t,n){let r=[],i={html:``,height:0,budget:t,started:t<n};function a(){r.push(i.html),i={html:``,height:0,budget:n,started:!1}}let o=()=>!i.html&&!i.started;function s(e){let t=e.querySelector(`:scope > h2`),n=t?t.outerHTML:``,r=t?J(t):0,s=Array.from(e.children).filter(e=>e!==t),c=0;for(;c<s.length;){let t=n,l=r,u=0;for(;c<s.length;){let e=s[c],n=J(e);if(n<=i.budget-i.height-l||u===0&&o())t+=e.outerHTML,l+=n,c+=1,u+=1;else break}if(u===0){a();continue}i.html+=Y(e,t),i.height+=l,c<s.length&&a()}}let c=n/4;function l(e){let t=J(e);if(t<=i.budget-i.height){i.html+=e.outerHTML,i.height+=t;return}if(t<=c&&!o()){a(),i.html+=e.outerHTML,i.height+=t;return}s(e)}return e.forEach(l),r.push(i.html),r}function hn(e,t){let n=Array.from(e.children),r=n.filter(e=>e.tagName!==`SECTION`),i=n.filter(e=>e.tagName===`SECTION`),a=r.map(e=>e.outerHTML).join(``),o=mn(i,t-r.reduce((e,t)=>e+J(t),0),t);return o[0]=a+o[0],o.filter(e=>e&&e.trim())}function gn(e,t){let n=e.querySelector(`:scope > .cols`),r=n.querySelector(`:scope > .col-main`),i=n.querySelector(`:scope > .col-side`),a=Array.from(e.children).filter(e=>e!==n),o=a.map(e=>e.outerHTML).join(``),s=a.reduce((e,t)=>e+J(t),0),c=getComputedStyle(n),l=parseFloat(c.marginTop||0)+parseFloat(c.marginBottom||0);return mn(Array.from(r.children),t-s-l,t-l).map((e,t)=>(t===0?o:``)+Y(n,Y(r,e)+Y(i,t===0?i.innerHTML:``)))}function _n(e,t,n=`single`){return n===`sidebar`?gn(e,t):hn(e,t)}var vn=297;function X(e,t){return`${(e.personal.name||`resume`).trim().replace(/[^a-zA-Z0-9]+/g,`_`)||`resume`}.${t}`}var yn={education:at,experience:ot,projects:st,skills:ct},bn=[`RIT100`,`KNOX100`,`TEMP10`,`PORNIMA100`,`DEVI100`,`ABHI100`,`CHIMI100`,`LNKD100`,`GAURI100`],xn=`919322527567`,Sn=`Hi, I'd like a promo code for Resume Builder.`;function Cn(e,t){let n=document.createElement(`div`);n.className=`preview-modal-backdrop`;let r=`https://wa.me/${xn}?text=${encodeURIComponent(Sn)}`;n.innerHTML=`
    <div class="preview-modal" style="max-width:380px;" role="dialog" aria-modal="true" aria-labelledby="promo-title">
      <div class="preview-modal-header">
        <h3 id="promo-title">Unlock ${Z(e)}</h3>
        <button type="button" class="btn" id="promo-close-btn">Close</button>
      </div>
      <div class="field">
        <label for="promo-input">Promo code</label>
        <input type="text" id="promo-input" autofocus placeholder="Enter code" />
      </div>
      <!--
      <p style="font-size:12px;color:var(--muted);margin:-4px 0 12px;">
        Don't have a promo code?
        <a href="${r}" target="_blank" rel="noopener noreferrer">WhatsApp Ritesh</a> at 9322527567.
      </p>
      -->
      <p style="font-size:12px;color:var(--muted);margin:-4px 0 12px;">
        Use promo code <strong>LNKD100</strong> to unlock the premium features.
      </p>
      <div id="promo-error" style="display:none;">
        <p class="error-text" style="font-size:13px;margin:8px 0 4px;">Invalid code.</p>
        <p style="font-size:13px;margin:0 0 8px;">Please contact Ritesh: 9322527567</p>
        <a class="btn" href="${r}" target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
      </div>
      <div class="actions" style="margin-top:12px;">
        <button type="button" class="btn btn-primary" id="promo-submit-btn">Unlock &amp; Download</button>
      </div>
    </div>
  `,dt(n,()=>o());let i=n.querySelector(`#promo-input`),a=n.querySelector(`#promo-error`);function o(){ft(n),document.removeEventListener(`keydown`,s)}function s(e){e.key===`Escape`&&o()}n.addEventListener(`click`,e=>{e.target===n&&o()}),n.querySelector(`#promo-close-btn`).addEventListener(`click`,o),document.addEventListener(`keydown`,s);function c(){let e=i.value.trim().toUpperCase();bn.includes(e)?(o(),t()):(a.style.display=`block`,i.value=``,i.focus())}n.querySelector(`#promo-submit-btn`).addEventListener(`click`,c),i.addEventListener(`keydown`,e=>{e.key===`Enter`&&c()})}function wn(e){return e.toLowerCase().replace(/\s+/g,`_`)}function Z(e){return String(e??``).replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/</g,`&lt;`)}function Tn(e,t,n){let r=t.split(`.`),i=e;for(let e=0;e<r.length-1;e++)i=i[r[e]];i[r[r.length-1]]=n}function En(e,t){return e.find(e=>e.id===t)}var Dn=1;function Q(e,t){let n=`field-${Dn++}`;return`<div class="field"><label for="${n}">${e}</label>${t.replace(/^<(input|textarea|select)\b/,`<$1 id="${n}"`)}</div>`}function $(e,t){return`<input type="text" ${e} value="${Z(t)}" />`}function On(e){return[[`name`,`Full name`],[`title`,`Headline / target title`],[`phone`,`Phone`],[`email`,`Email`],[`location`,`Location`],[`linkedin`,`LinkedIn`],[`website`,`Website`]].map(([t,n])=>Q(n,$(`data-path="personal.${t}"`,e[t]))).join(``)}function kn(e,t){return`<button type="button" class="btn remove-row" data-remove="${e}:${t}">Remove</button>`}function An(e){return`
    <div class="row-group" data-section="education" data-id="${e.id}">
      ${kn(`education`,e.id)}
      ${Q(`Degree`,$(`data-field="degree"`,e.degree))}
      ${Q(`Institution`,$(`data-field="institution"`,e.institution))}
      ${Q(`Location`,$(`data-field="location"`,e.location))}
      ${Q(`Year completed`,$(`data-field="year"`,e.year))}
    </div>`}function jn(e){return`
    <div class="row-group" data-section="experience" data-id="${e.id}">
      ${kn(`experience`,e.id)}
      ${Q(`Position title`,$(`data-field="title"`,e.title))}
      ${Q(`Employer`,$(`data-field="employer"`,e.employer))}
      ${Q(`Location`,$(`data-field="location"`,e.location))}
      <div class="grid grid-2">
        ${Q(`Start`,$(`data-field="start"`,e.start))}
        ${Q(`End`,$(`data-field="end"`,e.end))}
      </div>
      ${Q(`Bullets (one per line)`,`<textarea data-field="bullets" rows="4">${Z((e.bullets||[]).join(`
`))}</textarea>`)}
    </div>`}function Mn(e){return`
    <div class="row-group" data-section="projects" data-id="${e.id}">
      ${kn(`projects`,e.id)}
      ${Q(`Project title`,$(`data-field="title"`,e.title))}
      ${Q(`Skills used`,$(`data-field="skills"`,e.skills))}
      <div class="grid grid-2">
        ${Q(`Start`,$(`data-field="start"`,e.start))}
        ${Q(`End`,$(`data-field="end"`,e.end))}
      </div>
      ${Q(`Bullets (one per line)`,`<textarea data-field="bullets" rows="4">${Z((e.bullets||[]).join(`
`))}</textarea>`)}
    </div>`}function Nn(e){return`
    <div class="row-group" data-section="skills" data-id="${e.id}">
      ${kn(`skills`,e.id)}
      ${Q(`Category`,$(`data-field="category"`,e.category))}
      ${Q(`Items (comma separated)`,$(`data-field="items"`,e.items))}
    </div>`}function Pn(e,t){return`<button type="button" class="btn" data-add="${e}">${t}</button>`}function Fn(e){return`
    

    <h2>Personal</h2>
    ${On(e.personal)}

    <h2>Summary</h2>
    <div class="field"><textarea data-path="summary" rows="4" aria-label="Summary">${Z(e.summary)}</textarea></div>

    <h2>Education</h2>
    <div id="education-list">${e.education.map(An).join(``)}</div>
    ${Pn(`education`,`+ Add education`)}

    <h2>Work Experience</h2>
    <div id="experience-list">${e.experience.map(jn).join(``)}</div>
    ${Pn(`experience`,`+ Add experience`)}

    <h2>Projects</h2>
    <div id="projects-list">${e.projects.map(Mn).join(``)}</div>
    ${Pn(`projects`,`+ Add project`)}

    <h2>Skills</h2>
    <div id="skills-list">${e.skills.map(Nn).join(``)}</div>
    ${Pn(`skills`,`+ Add skill group`)}
  `}async function In(e,t){let n=tt(t.get(`template`)),r=nt(n),i=t.get(`draftId`),a;if(i){let e=(await pn()).find(e=>e.id===i);a=e?{...JSON.parse(JSON.stringify(e)),id:P(),meta:{...e.meta,savedAt:null}}:it(n.id)}else{let e=cn();a=e?{...e,templateId:n.id}:it(n.id)}e.innerHTML=`
    <div class="topbar"><a class="brand" href="#/">Resume Builder</a></div>
    <div class="container-wide">
      <h1 class="page-title">Builder</h1>
      <p class="page-subtitle template-picker">
        <label for="template-select">Template</label>
        <select id="template-select">
          ${et.map(e=>`<option value="${Z(e.id)}"${e.id===n.id?` selected`:``}>${Z(e.name)}</option>`).join(``)}
        </select>
        <span class="template-picker-note">Your content stays when you switch.</span>
      </p>
      <div class="actions">
        <button type="button" class="btn" id="btn-image" title="Downloads a single continuous image of your resume (not split into pages).">Download as Image</button>
        <div class="pdf-menu-wrap" id="pdf-menu-wrap">
          <button type="button" class="btn btn-primary" id="btn-pdf-trigger" aria-haspopup="true" aria-expanded="false">Download as PDF &#9662;</button>
          <div class="pdf-menu" id="pdf-menu" hidden>
            <button type="button" class="pdf-menu-item" id="pdf-opt-standard" title="Pixel-perfect snapshot of exactly what's on screen. Not searchable, and links aren't clickable.">
              Standard
              <small>Pixel-perfect snapshot of what's on screen. Not searchable, links aren't clickable.</small>
            </button>
            <button type="button" class="pdf-menu-item" id="pdf-opt-premium" title="Same snapshot as Standard, with clickable links (email, LinkedIn, project links) layered on top.">
              Premium
              <small>Adds clickable links on top of the snapshot.</small>
            </button>
            <button type="button" class="pdf-menu-item" id="pdf-opt-super" title="A real text-based PDF: selectable and searchable text, clickable links, much smaller file size than the snapshot export."${n.vectorTheme?``:` disabled`}>
              Super Premium
              <small>${n.vectorTheme?`Real text-based PDF — selectable/searchable text, clickable links, smaller file.`:`Not available for this template yet — use Premium for clickable links.`}</small>
            </button>
          </div>
        </div>
        <button type="button" class="btn" id="btn-save">Save</button>
      </div>
      <div class="grid builder-grid">
        <div class="card" id="form-panel"></div>
        <div class="card">
          <div class="preview-scale-outer" id="preview-scale-outer">
            <div class="preview-frame" id="preview-content"></div>
          </div>
        </div>
      </div>
    </div>
  `;let o=lt(n.id,{general:n.placeholder===`general`}),s=e.querySelector(`#form-panel`),c=e.querySelector(`#preview-scale-outer`),l=e.querySelector(`#preview-content`),u=e.querySelector(`#btn-image`),d=e.querySelector(`#pdf-menu-wrap`),f=e.querySelector(`#btn-pdf-trigger`),m=e.querySelector(`#pdf-menu`),ee=e.querySelector(`#pdf-opt-standard`),h=e.querySelector(`#pdf-opt-premium`),te=e.querySelector(`#pdf-opt-super`),ne=e.querySelector(`#btn-save`);e.querySelector(`#template-select`).addEventListener(`change`,e=>{sn(a),g(`template_selected`,{template_id:e.target.value,source:`builder`}),p(`/builder?${new URLSearchParams({template:e.target.value})}`)});let re=!1;function _(e,t){if(re){t();return}Cn(e,()=>{re=!0,g(`premium_unlocked`,{tier:wn(e)}),t()})}function v(){m.hidden=!0,f.setAttribute(`aria-expanded`,`false`)}f.addEventListener(`click`,e=>{e.stopPropagation();let t=m.hidden;m.hidden=!t,f.setAttribute(`aria-expanded`,String(t))});function y(e){d.contains(e.target)||v()}function ie(e){e.key===`Escape`&&v()}document.addEventListener(`click`,y),document.addEventListener(`keydown`,ie),window.addEventListener(`hashchange`,()=>{document.removeEventListener(`click`,y),document.removeEventListener(`keydown`,ie)},{once:!0});let b=n.pageWidthMm*N,x=(vn-n.pagePaddingMm)*N;function S(){if(!l.firstElementChild)return;let e=Math.min(1.6,c.clientWidth/b);l.style.transformOrigin=`top left`,l.style.width=`${b}px`,l.style.transform=`scale(${e})`,c.style.height=`${l.scrollHeight*e}px`}r.sheet||r.addEventListener(`load`,()=>S(),{once:!0});async function C(e,t){l.style.transform=`none`,l.style.width=``,e();try{await t()}finally{E()}}function w(){l.innerHTML=n.render(a)}function T(){l.innerHTML=n.render(a);let e=l.firstElementChild,t=_n(e,x,n.layout);l.innerHTML=t.map(e=>`<div class="${n.rootClass}">${e}</div>`).join(``)}u.addEventListener(`click`,()=>{C(w,()=>bt(l,X(a,`png`)).then(()=>g(`resume_downloaded`,{format:`image`})))}),ne.addEventListener(`click`,async()=>{if(await fn(a)){alert(`Saved to local history (data/history.json).`);return}let e={...a,meta:{...a.meta,savedAt:new Date().toISOString()}};ln(e),dn(e,X(a,`json`)),alert(`No local dev server detected. Saved a copy in this browser and downloaded a JSON file — drop it into data/history.json if you want it in the shared archive.`)}),ee.addEventListener(`click`,()=>{v(),C(T,()=>Ct(Array.from(l.children),X(a,`pdf`)).then(()=>g(`resume_downloaded`,{format:`pdf`,tier:`standard`})))});{let e=` Click to unlock with a promo code.`;h.title+=e,te.title+=e}h.addEventListener(`click`,()=>{v(),_(`Premium`,()=>C(T,()=>wt(Array.from(l.children),X(a,`pdf`)).then(()=>g(`resume_downloaded`,{format:`pdf`,tier:`premium`}))))}),te.addEventListener(`click`,()=>{n.vectorTheme&&(v(),_(`Super Premium`,()=>rn(a,X(a,`pdf`),n.vectorTheme).then(()=>g(`resume_downloaded`,{format:`pdf`,tier:`super_premium`}))))});function E(){l.style.transform=`none`,l.style.width=`${b}px`,l.innerHTML=n.render(a,o);let e=l.firstElementChild,t=_n(e,x,n.layout);l.innerHTML=t.map(e=>`<div class="${n.rootClass} resume-page">${e}</div>`).join(``),S(),sn(a)}function D(){s.innerHTML=Fn(a)}s.addEventListener(`input`,e=>{let t=e.target;if(t.dataset.path){Tn(a,t.dataset.path,t.value),E();return}let n=t.closest(`[data-section][data-id]`);if(n&&t.dataset.field){let e=En(a[n.dataset.section],n.dataset.id);if(!e)return;e[t.dataset.field]=t.dataset.field===`bullets`?t.value.split(`
`):t.value,E()}}),s.addEventListener(`click`,e=>{let t=e.target.closest(`[data-add]`);if(t){let e=t.dataset.add;a[e].push(yn[e]()),D(),E();return}let n=e.target.closest(`[data-remove]`);if(n){let[e,t]=n.dataset.remove.split(`:`);a[e]=a[e].filter(e=>e.id!==t),D(),E()}}),D(),E(),window.addEventListener(`resize`,S),window.addEventListener(`hashchange`,()=>window.removeEventListener(`resize`,S),{once:!0})}var Ln={"/":gt,"/builder":In},Rn={"/":`Templates`,"/builder":`Builder`,"/archive":`Archive`},zn=document.getElementById(`app`);function Bn(){let t=Ln[d()]?d():`/`;zn.innerHTML=``,Promise.resolve(Ln[t](zn,f())).then(()=>e(zn)),ne(t,Rn[t])}te(),window.addEventListener(`hashchange`,Bn),Bn();export{u as i,s as n,c as r,F as t};