(function(g){typeof define=="function"&&define.amd?define(g):g()})((function(){"use strict";(()=>{const g="a11y_widget_prefs_v1",v={position:"right",theme:"light",defaults:{fontScale:1,letterSpacing:0,lineHeight:1.5,grayscale:!1,invert:!1,underlineLinks:!1,reduceMotion:!1,bigCursor:!1,readingGuide:!1,textToSpeech:!1,speechToText:!1}},M=(e,t)=>({...e,...t,defaults:{...e.defaults,...(t==null?void 0:t.defaults)||{}}});function S(){try{return JSON.parse(localStorage.getItem(g))||{}}catch(e){return{}}}function m(e){try{localStorage.setItem(g,JSON.stringify(e))}catch(t){}}let c=null,l=null;function y(){if("speechSynthesis"in window&&(c=window.speechSynthesis),"webkitSpeechRecognition"in window||"SpeechRecognition"in window){const e=window.SpeechRecognition||window.webkitSpeechRecognition;l=new e,l.continuous=!1,l.interimResults=!1,l.lang="en-US"}}let r=null;function k(){r||(r=document.createElement("div"),r.id="a11y-reading-guide",r.style.cssText=`
      position: fixed;
      left: 0;
      width: 100%;
      height: 120px;
      pointer-events: none;
      z-index: 2147483646;
      background: linear-gradient(to bottom, 
        rgba(0,0,0,0.3) 0%, 
        transparent 20%, 
        transparent 80%, 
        rgba(0,0,0,0.3) 100%);
      display: none;
    `,document.body.appendChild(r))}function H(e){r&&r.style.display!=="none"&&(r.style.top=`${e.clientY-60}px`)}function T(){if(document.getElementById("a11y-effect-styles"))return;const e=document.createElement("style");e.id="a11y-effect-styles",e.textContent=`
    :root {
      --a11y-font-scale: 1;
      --a11y-letter-spacing: 0px;
      --a11y-line-height: 1.5;
    }
    html.a11y--scaled { font-size: calc(100% * var(--a11y-font-scale)); }
    html.a11y--spacing * { letter-spacing: var(--a11y-letter-spacing) !important; line-height: var(--a11y-line-height) !important; }
    html.a11y--grayscale { filter: grayscale(1); }
    html.a11y--invert { filter: invert(1) hue-rotate(180deg); background-color: #000; }
    html.a11y--underline a { text-decoration: underline !important; }
    html.a11y--reduce-motion *, html.a11y--reduce-motion *::before, html.a11y--reduce-motion *::after {
      animation: none !important; transition: none !important; scroll-behavior: auto !important;
    }
    html.a11y--big-cursor, html.a11y--big-cursor * { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g><path fill="%23000" stroke="%23fff" stroke-width="2" d="M10 10 L10 28 L16 22 L20 30 L24 28 L20 20 L28 20 Z"/></g></svg>') 0 0, auto !important; }
    
    .a11y-tts-highlight {
      background-color: yellow !important;
      color: black !important;
      box-shadow: 0 0 0 2px yellow !important;
    }
    `,document.head.appendChild(e)}function L(e,t,n){const o=document.createElement("div"),i=document.createElement("div");i.setAttribute("aria-live","polite"),i.style.position="fixed",i.style.zIndex="2147483647",i.style.bottom="16px",i.style[e.position==="left"?"left":"right"]="16px",o.appendChild(i);const s=i.attachShadow({mode:"open"}),f=document.createElement("style");f.textContent=`
      :host { all: initial; }
      .btn {
        all: unset; cursor: pointer; border-radius: 999px; padding: 10px 14px; box-shadow: 0 4px 14px rgba(0,0,0,.15);
        background: ${e.theme==="dark"?"#111":"#fff"};
        color: ${e.theme==="dark"?"#fff":"#111"};
        font: 500 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        display: inline-flex; align-items: center; gap: 6px;
      }
      .btn svg { width: 20px; height: 20px; }
      .panel {
        position: absolute; bottom: 48px; ${e.position==="left"?"left":"right"}: 0;
        width: 320px; max-height: 70vh; overflow: auto; border-radius: 14px; padding: 16px;
        background: ${e.theme==="dark"?"#111":"#fff"};
        color: ${e.theme==="dark"?"#fff":"#111"};
        box-shadow: 0 16px 40px rgba(0,0,0,.2); display: none;
      }
      .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px 0; }
      .row + .row { border-top: 1px solid ${e.theme==="dark"?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}; }
      .label { display: flex; align-items: center; gap: 8px; font-size: 14px; }
      .label svg { width: 18px; height: 18px; opacity: 0.7; }
      .tog { display:inline-flex; gap:6px; align-items:center; }
      .switch {
        position: relative; width: 38px; height: 22px; border-radius: 999px; background: #999;
        cursor: pointer; transition: background .2s;
      }
      .switch::after {
        content: ""; position: absolute; top: 3px; left: 3px; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: transform .2s;
      }
      .switch[data-on="true"] { background: #3b82f6; }
      .switch[data-on="true"]::after { transform: translateX(16px); }
      .num { min-width: 44px; text-align: right; font-variant-numeric: tabular-nums; }
      .controls { display: flex; align-items: center; gap: 4px; }
      .controls button { all: unset; cursor: pointer; padding: 4px 10px; border-radius: 8px; outline: 1px solid ${e.theme==="dark"?"rgba(255,255,255,.2)":"rgba(0,0,0,.2)"}; }
      .controls button:hover { background: ${e.theme==="dark"?"rgba(255,255,255,.1)":"rgba(0,0,0,.05)"}; }
      .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-weight:600; }
      .reset-btn { all: unset; cursor: pointer; padding: 4px 10px; border-radius: 8px; background: ${e.theme==="dark"?"rgba(255,255,255,.1)":"rgba(0,0,0,.05)"}; font-size: 12px; }
      .sr-only { position:absolute !important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
    `;const h=document.createElement("div");h.innerHTML=`
      <button class="btn" part="launcher" aria-expanded="false" aria-controls="a11y-panel">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M23 13V11C20.5 11 18.5 9 18.5 6.5V5.7C17.9 3.6 16.1 2 14 2C14 3.1 13.1 4 12 4C10.9 4 10 3.1 10 2C7.9 2 6.1 3.6 5.5 5.7V6.5C5.5 9 3.5 11 1 11V13C3.5 13 5.5 15 5.5 17.5V18.3C6.1 20.4 7.9 22 10 22C10 20.9 10.9 20 12 20C13.1 20 14 20.9 14 22C16.1 22 17.9 20.4 18.5 18.3V17.5C18.5 15 20.5 13 23 13M8.5 12.5L12 9L15.5 12.5L12 16L8.5 12.5Z"/></svg>
        Accessibility
      </button>
      <div id="a11y-panel" class="panel" role="dialog" aria-label="Accessibility controls">
        <div class="header">
          <span>Accessibility Options</span>
          <button class="reset-btn" part="reset">Reset</button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 4V20H5V4H9M9 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22H9C10.1 22 11 21.1 11 20V4C11 2.9 10.1 2 9 2M21 9V20H17V9H21M21 7H17C15.9 7 15 7.9 15 9V20C15 21.1 15.9 22 17 22H21C22.1 22 23 21.1 23 20V9C23 7.9 22.1 7 21 7Z"/></svg>
            Text size
          </div>
          <div class="controls">
            <button data-act="font-dec" aria-label="Decrease font size">−</button>
            <span class="num" data-bind="font">${Math.round(t.fontScale*100)}%</span>
            <button data-act="font-inc" aria-label="Increase font size">+</button>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3V5H21V3H3M3 7V9H15V7H3M3 11V13H21V11H3M3 15V17H15V15H3M3 19V21H21V19H3Z"/></svg>
            Text spacing
          </div>
          <div class="controls">
            <button data-act="space-dec" aria-label="Decrease spacing">−</button>
            <span class="num" data-bind="space">${t.letterSpacing}px</span>
            <button data-act="space-inc" aria-label="Increase spacing">+</button>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 8C13.66 8 15 6.66 15 5S13.66 2 12 2 9 3.34 9 5 10.34 8 12 8M12 10C9.33 10 4 11.34 4 14V16H20V14C20 11.34 14.67 10 12 10M20 19H13.5C13.78 18.38 14 17.71 14 17C14 16.29 13.78 15.62 13.5 15H20V19M11.5 15C11.22 15.62 11 16.29 11 17C11 17.71 11.22 18.38 11.5 19H4V15H11.5Z"/></svg>
            Invert colors
          </div>
          <button class="switch" role="switch" aria-checked="${t.invert}" data-act="toggle-invert" data-on="${t.invert}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 9H13V11H11V9M9 11H11V13H9V11M13 11H15V13H13V11M15 9H17V11H15V9M17 11H19V13H17V11M19 9H21V11H19V9M21 7H23V9H21V7M21 11H23V13H21V11M21 15H23V17H21V15M3 5H5V7H3V5M3 9H5V11H3V9M3 13H5V15H3V13M3 17H5V19H3V17M5 3H7V5H5V3M5 19H7V21H5V19M7 5H9V7H7V5M7 17H9V19H7V17M9 3H11V5H9V3M9 7H11V9H9V7M9 15H11V17H9V15M9 19H11V21H9V19M11 5H13V7H11V5M11 13H13V15H11V13M11 17H13V19H11V17M13 3H15V5H13V3M13 7H15V9H13V7M13 15H15V17H13V15M13 19H15V21H13V19M15 5H17V7H15V5M15 13H17V15H15V13M15 17H17V19H15V17M17 3H19V5H17V3M17 7H19V9H17V7M17 15H19V17H17V15M17 19H19V21H17V19M19 5H21V7H19V5M19 13H21V15H19V13M19 17H21V19H19V17M21 3H23V5H21V3M21 19H23V21H21V19Z"/></svg>
            Gray hues
          </div>
          <button class="switch" role="switch" aria-checked="${t.grayscale}" data-act="toggle-grayscale" data-on="${t.grayscale}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4V6H9.17L12.17 9H4V11H12.17L19.59 18.41C19.97 18.79 20.48 19 21 19H22V17H21L10.59 4.59Z"/></svg>
            Underline links
          </div>
          <button class="switch" role="switch" aria-checked="${t.underlineLinks}" data-act="toggle-underline" data-on="${t.underlineLinks}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 18.59V3.41C11 2.52 10.08 1.92 9.34 2.3L3.69 5.3C3.26 5.52 3 5.96 3 6.41V17.59C3 18.48 3.92 19.08 4.66 18.7L10.31 15.7C10.74 15.48 11 15.04 11 14.59V18.59M13 5V18.59L20.66 14.3C21.4 13.92 21.4 12.85 20.66 12.47L13 8.18V5Z"/></svg>
            Big cursor
          </div>
          <button class="switch" role="switch" aria-checked="${t.bigCursor}" data-act="toggle-cursor" data-on="${t.bigCursor}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 17H7V15H14M17 13H7V11H17M17 9H7V7H17M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3Z"/></svg>
            Reading guide
          </div>
          <button class="switch" role="switch" aria-checked="${t.readingGuide}" data-act="toggle-guide" data-on="${t.readingGuide}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 5C10.04 5 11.06 5.24 12 5.68C12.94 5.24 13.96 5 15 5C16.05 5 17.09 5.24 18 5.65V18.5C17.05 18.11 16.04 17.91 15 17.91C13.97 17.91 12.96 18.12 12 18.5C11.04 18.12 10.03 17.91 9 17.91C7.95 17.91 6.94 18.12 6 18.5V5.65C6.91 5.24 7.95 5 9 5M9 7C8.31 7 7.62 7.1 7 7.28V15.68C7.62 15.53 8.31 15.43 9 15.43C10.03 15.43 11.04 15.65 12 16.07V7.93C11.04 7.5 10.03 7.28 9 7.28V7Z"/></svg>
            Text to speech
          </div>
          <button class="switch" role="switch" aria-checked="${t.textToSpeech}" data-act="toggle-tts" data-on="${t.textToSpeech}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.52 2 22 6.48 22 12S17.52 22 12 22 2 17.52 2 12 6.48 2 12 2M12 4C7.58 4 4 7.58 4 12S7.58 20 12 20 20 16.42 20 12 16.42 4 12 4M12 14C10.9 14 10 13.1 10 12S10.9 10 12 10 14 10.9 14 12 13.1 14 12 14Z"/></svg>
            Speech to text
          </div>
          <button class="switch" role="switch" aria-checked="${t.speechToText}" data-act="toggle-stt" data-on="${t.speechToText}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 16C13.1 16 14 16.9 14 18S13.1 20 12 20 10 19.1 10 18 10.9 16 12 16M12 4C13.1 4 14 4.9 14 6S13.1 8 12 8 10 7.1 10 6 10.9 4 12 4M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M6 10C7.1 10 8 10.9 8 12S7.1 14 6 14 4 13.1 4 12 4.9 10 6 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M18 10C19.1 10 20 10.9 20 12S19.1 14 18 14 16 13.1 16 12 16.9 10 18 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z"/></svg>
            Disable animations
          </div>
          <button class="switch" role="switch" aria-checked="${t.reduceMotion}" data-act="toggle-motion" data-on="${t.reduceMotion}"></button>
        </div>
      </div>
    `,s.appendChild(f),s.appendChild(h);const w=s.querySelector(".btn"),C=s.getElementById("a11y-panel"),I=s.querySelector('[part="reset"]');return w.addEventListener("click",()=>{const u=C.style.display==="block";C.style.display=u?"none":"block",w.setAttribute("aria-expanded",String(!u))}),I.addEventListener("click",()=>n.reset()),s.querySelectorAll("[data-act]").forEach(u=>{u.addEventListener("click",()=>n.act(u.getAttribute("data-act")))}),{mount:()=>document.body.appendChild(o),destroy:()=>o.remove(),root:s}}function b(e){const t=document.documentElement;e.fontScale!==1?t.classList.add("a11y--scaled"):t.classList.remove("a11y--scaled"),t.style.setProperty("--a11y-font-scale",String(e.fontScale)),e.letterSpacing!==0||e.lineHeight!==1.5?t.classList.add("a11y--spacing"):t.classList.remove("a11y--spacing"),t.style.setProperty("--a11y-letter-spacing",`${e.letterSpacing}px`),t.style.setProperty("--a11y-line-height",String(e.lineHeight)),t.classList.toggle("a11y--grayscale",!!e.grayscale),t.classList.toggle("a11y--invert",!!e.invert),t.classList.toggle("a11y--underline",!!e.underlineLinks),t.classList.toggle("a11y--reduce-motion",!!e.reduceMotion),t.classList.toggle("a11y--big-cursor",!!e.bigCursor),e.readingGuide?(k(),r&&(r.style.display="block"),document.addEventListener("mousemove",H)):(r&&(r.style.display="none"),document.removeEventListener("mousemove",H)),e.textToSpeech?(y(),E()):x(),e.speechToText?(y(),$()):V()}function E(){document.addEventListener("mouseup",p),document.addEventListener("touchend",p)}function x(){document.removeEventListener("mouseup",p),document.removeEventListener("touchend",p),c&&c.cancel()}function p(){const e=window.getSelection(),t=e.toString().trim();if(t&&c){c.cancel();const n=new SpeechSynthesisUtterance(t);if(n.rate=.9,n.pitch=1,c.speak(n),e.rangeCount>0){const o=e.getRangeAt(0),i=document.createElement("span");i.className="a11y-tts-highlight";try{o.surroundContents(i),n.onend=()=>{if(i.parentNode){const s=i.parentNode;for(;i.firstChild;)s.insertBefore(i.firstChild,i);s.removeChild(i)}}}catch(s){}}}}let a=null;function $(){l&&(a||(a=document.createElement("button"),a.innerHTML=`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M12 15C13.66 15 15 13.66 15 12V6C15 4.34 13.66 3 12 3S9 4.34 9 6V12C9 13.66 10.34 15 12 15M19 12C19 15.53 16.39 18.44 13 18.93V22H11V18.93C7.61 18.44 5 15.53 5 12H7C7 14.76 9.24 17 12 17S17 14.76 17 12H19Z"/>
        </svg>
      `,a.style.cssText=`
        position: fixed;
        bottom: 80px;
        right: 16px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #3b82f6;
        border: none;
        box-shadow: 0 4px 14px rgba(0,0,0,.25);
        cursor: pointer;
        z-index: 2147483645;
        display: flex;
        align-items: center;
        justify-content: center;
      `,a.setAttribute("aria-label","Start speech to text"),document.body.appendChild(a),a.addEventListener("click",A)),a&&(a.style.display="flex"))}function V(){a&&(a.style.display="none"),l&&l.stop()}function A(){l&&(a.dataset.recording==="true"?(l.stop(),a.dataset.recording="false",a.style.background="#3b82f6"):(l.start(),a.dataset.recording="true",a.style.background="#ef4444",l.onresult=e=>{const t=e.results[0][0].transcript,n=document.activeElement;n&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.contentEditable==="true")&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"?n.value+=" "+t:n.innerText+=" "+t)},l.onerror=()=>{a.dataset.recording="false",a.style.background="#3b82f6"},l.onend=()=>{a.dataset.recording="false",a.style.background="#3b82f6"}))}class B{constructor(t){this.opts=M(v,t||{}),this.state={...this.opts.defaults,...S()},this.mounted=null}init(){T(),b(this.state);const t={reset:()=>{this.state={...v.defaults},m(this.state),b(this.state),this.refreshUI()},act:n=>{const o=(i,s,f,h=.1)=>Math.round(Math.min(f,Math.max(s,i))/h)*h;switch(n){case"font-inc":this.state.fontScale=o(this.state.fontScale+.1,.8,2);break;case"font-dec":this.state.fontScale=o(this.state.fontScale-.1,.8,2);break;case"space-inc":this.state.letterSpacing=o(this.state.letterSpacing+.2,0,3,.1);break;case"space-dec":this.state.letterSpacing=o(this.state.letterSpacing-.2,0,3,.1);break;case"line-inc":this.state.lineHeight=o(this.state.lineHeight+.1,1,2.4);break;case"line-dec":this.state.lineHeight=o(this.state.lineHeight-.1,1,2.4);break;case"toggle-grayscale":this.state.grayscale=!this.state.grayscale;break;case"toggle-invert":this.state.invert=!this.state.invert;break;case"toggle-underline":this.state.underlineLinks=!this.state.underlineLinks;break;case"toggle-motion":this.state.reduceMotion=!this.state.reduceMotion;break;case"toggle-cursor":this.state.bigCursor=!this.state.bigCursor;break;case"toggle-guide":this.state.readingGuide=!this.state.readingGuide;break;case"toggle-tts":this.state.textToSpeech=!this.state.textToSpeech;break;case"toggle-stt":this.state.speechToText=!this.state.speechToText;break}m(this.state),b(this.state),this.refreshUI()}};this.ui=L(this.opts,this.state,t),this.ui.mount(),this.refreshUI()}refreshUI(){if(!this.ui)return;const t=this.ui.root,n=(o,i)=>{const s=t.querySelector(`[data-bind="${o}"]`);s&&(s.textContent=i)};n("font",`${Math.round(this.state.fontScale*100)}%`),n("space",`${this.state.letterSpacing}`),n("line",this.state.lineHeight.toFixed(1)),t.querySelectorAll(".switch").forEach(o=>{const i=o.getAttribute("data-act"),s=i==="toggle-grayscale"&&this.state.grayscale||i==="toggle-invert"&&this.state.invert||i==="toggle-underline"&&this.state.underlineLinks||i==="toggle-motion"&&this.state.reduceMotion||i==="toggle-cursor"&&this.state.bigCursor||i==="toggle-guide"&&this.state.readingGuide||i==="toggle-tts"&&this.state.textToSpeech||i==="toggle-stt"&&this.state.speechToText;o.dataset.on=String(s),o.setAttribute("aria-checked",String(s))})}destroy(){x(),V(),r&&(r.remove(),r=null),a&&(a.remove(),a=null),this.ui&&this.ui.destroy(),this.ui=null}}const d={init(e){d._instance||(d._instance=new B(e)),d._instance.init()},destroy(){var e;(e=d._instance)==null||e.destroy(),d._instance=null}};window.A11yWidget=window.A11yWidget||d})()}));
