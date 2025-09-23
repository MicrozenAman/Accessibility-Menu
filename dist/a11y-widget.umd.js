(function(u){typeof define=="function"&&define.amd?define(u):u()})((function(){"use strict";(()=>{const u="a11y_widget_prefs_v1",v={position:"right",theme:"light",customButton:null,defaults:{fontScale:1,letterSpacing:0,bigCursor:!1,readingGuide:!1,textToSpeech:!1}},k=(t,i)=>({...t,...i,defaults:{...t.defaults,...(i==null?void 0:i.defaults)||{}}});function C(){try{return JSON.parse(localStorage.getItem(u))||{}}catch(t){return{}}}function y(t){try{localStorage.setItem(u,JSON.stringify(t))}catch(i){}}let d=null;function L(){"speechSynthesis"in window&&(d=window.speechSynthesis)}let a=null;function E(){a||(a=document.createElement("div"),a.id="a11y-reading-guide",a.style.cssText=`
      position: fixed;
      left: 0;
      width: 100%;
      height: 2px;
      pointer-events: none;
      z-index: 2147483646;
      background: #000;
      display: none;
    `,document.body.appendChild(a))}function m(t){a&&a.style.display!=="none"&&(a.style.top=`${t.clientY}px`)}function T(){if(document.getElementById("a11y-effect-styles"))return;const t=document.createElement("style");t.id="a11y-effect-styles",t.textContent=`
    :root {
      --a11y-font-scale: 1;
      --a11y-letter-spacing: 0px;
    }
    html.a11y--scaled { font-size: calc(100% * var(--a11y-font-scale)); }
    html.a11y--spacing * { letter-spacing: var(--a11y-letter-spacing) !important; }
    html.a11y--big-cursor, html.a11y--big-cursor * { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g><path fill="%23000" stroke="%23fff" stroke-width="2" d="M10 10 L10 28 L16 22 L20 30 L24 28 L20 20 L28 20 Z"/></g></svg>') 0 0, auto !important; }

    .a11y-tts-highlight {
      background-color: yellow !important;
      color: black !important;
      box-shadow: 0 0 0 2px yellow !important;
    }
    `,document.head.appendChild(t)}function z(t,i,c){const o=document.createElement("div"),e=document.createElement("div");if(e.setAttribute("aria-live","polite"),e.style.position="fixed",e.style.zIndex="2147483647",t.customButton){const n=document.querySelector(t.customButton);if(n){const G=n.getBoundingClientRect();e.style.bottom=`${window.innerHeight-G.top+10}px`,e.style[t.position==="left"?"left":"right"]="20px"}}else e.style.bottom="20px",e.style[t.position==="left"?"left":"right"]="20px";o.appendChild(e);const s=e.attachShadow({mode:"open"}),g=document.createElement("style");g.textContent=`
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');

      :host { all: initial; font-family: 'Quicksand', sans-serif; }
      .btn {
        all: unset; cursor: pointer; border-radius: 50%; width: 56px; height: 56px;
        background: #3b82f6; color: #fff; border: 3px solid #fff;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
        display: flex; align-items: center; justify-content: center;
        transition: all 0.3s ease; position: relative;
      }
      .btn:hover {
        background: #2563eb; transform: scale(1.05);
        box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
      }
      .btn svg { width: 24px; height: 24px; }
      .panel {
        position: absolute; bottom: 70px; ${t.position==="left"?"left":"right"}: 0;
        width: 320px; max-height: 80vh; overflow: auto; border-radius: 8px; padding: 0;
        background: #ffffff; color: #333333;
        box-shadow: 0 4px 20px rgba(0,0,0,.1);
        border: 1px solid #e5e7eb;
        display: none; opacity: 0; transform: translateY(10px);
        transition: all 0.2s ease;
        font-family: 'Quicksand', sans-serif;
      }
      .panel.show { display: block; opacity: 1; transform: translateY(0); }

      .header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 16px 20px; background: #f8fafc; border-bottom: 1px solid #e5e7eb;
        font-weight: 600; font-size: 16px; color: #1f2937;
      }
      .header-controls {
        display: flex; gap: 8px; align-items: center;
      }
      .close-btn, .reset-btn {
        all: unset; cursor: pointer; width: 24px; height: 24px;
        border-radius: 4px; display: flex; align-items: center; justify-content: center;
        transition: all 0.2s ease; font-size: 16px; font-weight: 600;
      }
      .close-btn {
        color: #ef4444; background: transparent;
      }
      .close-btn:hover {
        background: #fef2f2; color: #dc2626;
      }
      .reset-btn {
        color: #3b82f6; background: transparent;
      }
      .reset-btn:hover {
        background: #eff6ff; color: #2563eb;
      }

      .content {
        padding: 12px;
      }
      .option {
        display: flex; align-items: center; gap: 12px;
        padding: 12px 8px; border-radius: 6px; cursor: pointer;
        transition: all 0.2s ease; font-size: 14px; color: #6b7280;
      }
      .option:hover {
        background: #f9fafb;
      }
      .option.clickable:hover {
        background: #eff6ff; color: #3b82f6;
      }
      .option-icon {
        width: 20px; height: 20px; color: #9ca3af;
        flex-shrink: 0; display: flex; align-items: center; justify-content: center;
      }
      .option-label {
        flex: 1; font-weight: 500;
      }
      .option-controls {
        display: flex; align-items: center; gap: 6px;
      }
      .size-btn {
        all: unset; cursor: pointer; width: 24px; height: 24px;
        border-radius: 4px; display: flex; align-items: center; justify-content: center;
        font-size: 16px; font-weight: 600; color: #6b7280;
        transition: all 0.2s ease;
      }
      .size-btn:hover {
        background: #f3f4f6; color: #374151;
      }
      .size-value {
        min-width: 40px; text-align: center; font-size: 13px;
        color: #4b5563; font-weight: 600;
      }
    `;const f=document.createElement("div"),I=t.customButton?"":`
      <button class="btn" part="launcher" aria-expanded="false" aria-controls="a11y-panel" title="Accessibility Options">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M23 13V11C20.5 11 18.5 9 18.5 6.5V5.7C17.9 3.6 16.1 2 14 2C14 3.1 13.1 4 12 4C10.9 4 10 3.1 10 2C7.9 2 6.1 3.6 5.5 5.7V6.5C5.5 9 3.5 11 1 11V13C3.5 13 5.5 15 5.5 17.5V18.3C6.1 20.4 7.9 22 10 22C10 20.9 10.9 20 12 20C13.1 20 14 20.9 14 22C16.1 22 17.9 20.4 18.5 18.3V17.5C18.5 15 20.5 13 23 13M8.5 12.5L12 9L15.5 12.5L12 16L8.5 12.5Z"/></svg>
      </button>`;f.innerHTML=`
      ${I}
      <div id="a11y-panel" class="panel" role="dialog" aria-label="Accessibility controls">
        <div class="header">
          <span>Accessibility Options</span>
          <div class="header-controls">
            <button class="reset-btn" part="reset" title="Reset All">🔄</button>
            <button class="close-btn" part="close" title="Close">✕</button>
          </div>
        </div>
        <div class="content">
          <div class="option">
            <div class="option-icon">🔍</div>
            <div class="option-label">increase text size</div>
            <div class="option-controls">
              <button class="size-btn" data-act="font-inc" aria-label="Increase font size">+</button>
            </div>
          </div>

          <div class="option">
            <div class="option-icon">🔍</div>
            <div class="option-label">decrease text size</div>
            <div class="option-controls">
              <button class="size-btn" data-act="font-dec" aria-label="Decrease font size">-</button>
            </div>
          </div>

          <div class="option">
            <div class="option-icon">◀▶</div>
            <div class="option-label">increase text spacing</div>
            <div class="option-controls">
              <button class="size-btn" data-act="space-inc" aria-label="Increase spacing">+</button>
            </div>
          </div>

          <div class="option">
            <div class="option-icon">▶◀</div>
            <div class="option-label">decrease text spacing</div>
            <div class="option-controls">
              <button class="size-btn" data-act="space-dec" aria-label="Decrease spacing">-</button>
            </div>
          </div>

          <div class="option clickable" data-act="toggle-cursor">
            <div class="option-icon">🖱️</div>
            <div class="option-label">big cursor</div>
          </div>

          <div class="option clickable" data-act="toggle-guide">
            <div class="option-icon">📄</div>
            <div class="option-label">reading guide</div>
          </div>

          <div class="option clickable" data-act="toggle-tts">
            <div class="option-icon">🎙️</div>
            <div class="option-label">text to speech</div>
          </div>
        </div>
      </div>
    `,s.appendChild(g),s.appendChild(f);const r=t.customButton?document.querySelector(t.customButton):s.querySelector(".btn"),l=s.getElementById("a11y-panel"),M=s.querySelector('[part="reset"]'),w=s.querySelector('[part="close"]'),P=()=>{const n=l.classList.contains("show");n?(l.classList.remove("show"),setTimeout(()=>l.style.display="none",200)):(l.style.display="block",setTimeout(()=>l.classList.add("show"),10)),r&&r.setAttribute("aria-expanded",String(!n))},S=()=>{l.classList.remove("show"),setTimeout(()=>l.style.display="none",200),r&&r.setAttribute("aria-expanded","false")};return r&&r.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),P()}),w&&w.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),S()}),document.addEventListener("click",n=>{!e.contains(n.target)&&n.target!==r&&l.classList.contains("show")&&S()}),M.addEventListener("click",()=>c.reset()),s.querySelectorAll("[data-act]").forEach(n=>{n.addEventListener("click",()=>c.act(n.getAttribute("data-act")))}),{mount:()=>document.body.appendChild(o),destroy:()=>o.remove(),root:s}}function b(t){const i=document.documentElement;t.fontScale!==1?i.classList.add("a11y--scaled"):i.classList.remove("a11y--scaled"),i.style.setProperty("--a11y-font-scale",String(t.fontScale)),t.letterSpacing!==0?i.classList.add("a11y--spacing"):i.classList.remove("a11y--spacing"),i.style.setProperty("--a11y-letter-spacing",`${t.letterSpacing}px`),i.classList.toggle("a11y--big-cursor",!!t.bigCursor),t.readingGuide?(E(),a&&(a.style.display="block"),document.addEventListener("mousemove",m)):(a&&(a.style.display="none"),document.removeEventListener("mousemove",m)),t.textToSpeech?(L(),A()):x()}function A(){document.addEventListener("mouseup",h),document.addEventListener("touchend",h)}function x(){document.removeEventListener("mouseup",h),document.removeEventListener("touchend",h),d&&d.cancel()}function h(){const t=window.getSelection(),i=t.toString().trim();if(i&&d){d.cancel();const c=new SpeechSynthesisUtterance(i);if(c.rate=.9,c.pitch=1,d.speak(c),t.rangeCount>0){const o=t.getRangeAt(0),e=document.createElement("span");e.className="a11y-tts-highlight";try{o.surroundContents(e),c.onend=()=>{if(e.parentNode){const s=e.parentNode;for(;e.firstChild;)s.insertBefore(e.firstChild,e);s.removeChild(e)}}}catch(s){}}}}class B{constructor(i){this.opts=k(v,i||{}),this.state={...this.opts.defaults,...C()}}init(){T(),b(this.state);const i={reset:()=>{this.state={...v.defaults},y(this.state),b(this.state),this.refreshUI()},act:c=>{const o=(e,s,g,f=.1)=>Math.round(Math.min(g,Math.max(s,e))/f)*f;switch(c){case"font-inc":this.state.fontScale=o(this.state.fontScale+.1,.8,2);break;case"font-dec":this.state.fontScale=o(this.state.fontScale-.1,.8,2);break;case"space-inc":this.state.letterSpacing=o(this.state.letterSpacing+.5,0,5,.5);break;case"space-dec":this.state.letterSpacing=o(this.state.letterSpacing-.5,0,5,.5);break;case"toggle-cursor":this.state.bigCursor=!this.state.bigCursor;break;case"toggle-guide":this.state.readingGuide=!this.state.readingGuide;break;case"toggle-tts":this.state.textToSpeech=!this.state.textToSpeech;break}y(this.state),b(this.state),this.refreshUI()}};this.ui=z(this.opts,this.state,i),this.ui.mount(),this.refreshUI()}refreshUI(){if(!this.ui)return;const i=this.ui.root;((o,e)=>{const s=i.querySelector(`[data-bind="${o}"]`);s&&(s.textContent=e)})("font",`${Math.round(this.state.fontScale*100)}%`),i.querySelectorAll(".switch").forEach(o=>{const e=o.getAttribute("data-act"),s=e==="toggle-cursor"&&this.state.bigCursor||e==="toggle-guide"&&this.state.readingGuide||e==="toggle-tts"&&this.state.textToSpeech;o.dataset.on=String(s),o.setAttribute("aria-checked",String(s))})}destroy(){x(),a&&(a.remove(),a=null),this.ui&&this.ui.destroy(),this.ui=null}}const p={init(t){p._instance||(p._instance=new B(t)),p._instance.init()},destroy(){var t;(t=p._instance)==null||t.destroy(),p._instance=null}};window.A11yWidget=window.A11yWidget||p})()}));
