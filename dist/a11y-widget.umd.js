(function(u){typeof define=="function"&&define.amd?define(u):u()})((function(){"use strict";(()=>{const u="a11y_widget_prefs_v1",b={position:"right",customButton:null,defaults:{fontScale:1,letterSpacing:0,invertColors:!1,grayscale:!1,underlineLinks:!1,bigCursor:!1,readingGuide:!1,textToSpeech:!1,reduceMotion:!1}};function x(){try{return JSON.parse(localStorage.getItem(u))||{}}catch(t){return{}}}function y(t){try{localStorage.setItem(u,JSON.stringify(t))}catch(e){}}let d=null,s=null;function w(){"speechSynthesis"in window&&(d=window.speechSynthesis)}function k(){s||(s=document.createElement("div"),s.style.cssText=`
      position: fixed; left: 0; width: 100%; height: 2px; pointer-events: none;
      z-index: 2147483646; background: #000; display: none;
    `,document.body.appendChild(s))}function v(t){(s==null?void 0:s.style.display)!=="none"&&(s.style.top=`${t.clientY}px`)}function S(){if(document.getElementById("a11y-effect-styles"))return;const t=document.createElement("style");t.id="a11y-effect-styles",t.textContent=`
    :root { --a11y-font-scale: 1; --a11y-letter-spacing: 0px; }
    html.a11y--scaled { font-size: calc(100% * var(--a11y-font-scale)); }
    html.a11y--spacing *:not([data-a11y-widget]):not([data-a11y-widget] *) { letter-spacing: var(--a11y-letter-spacing) !important; }
    html.a11y--invert { filter: invert(1) hue-rotate(180deg); background-color: #000; }
    html.a11y--grayscale { filter: grayscale(1); }
    html.a11y--underline a:not([data-a11y-widget] a) { text-decoration: underline !important; }
    html.a11y--big-cursor, html.a11y--big-cursor *:not([data-a11y-widget]):not([data-a11y-widget] *) { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g><path fill="%23000" stroke="%23fff" stroke-width="2" d="M10 10 L10 28 L16 22 L20 30 L24 28 L20 20 L28 20 Z"/></g></svg>') 0 0, auto !important; }
    html.a11y--reduce-motion *:not([data-a11y-widget]):not([data-a11y-widget] *), html.a11y--reduce-motion *:not([data-a11y-widget]):not([data-a11y-widget] *)::before, html.a11y--reduce-motion *:not([data-a11y-widget]):not([data-a11y-widget] *)::after {
      animation: none !important; transition: none !important; scroll-behavior: auto !important;
    }
    .a11y-tts-highlight { background-color: yellow !important; color: black !important; box-shadow: 0 0 0 2px yellow !important; }
    `,document.head.appendChild(t)}function L(t,e,o){const l=document.createElement("div"),n=document.createElement("div");if(n.setAttribute("aria-live","polite"),n.setAttribute("data-a11y-widget","true"),n.style.position="fixed",n.style.zIndex="2147483647",t.customButton){const a=document.querySelector(t.customButton);if(a){const M=a.getBoundingClientRect();n.style.bottom=`${window.innerHeight-M.top+10}px`,n.style[t.position==="left"?"left":"right"]="20px"}}else n.style.bottom="20px",n.style[t.position==="left"?"left":"right"]="20px";l.appendChild(n);const i=n.attachShadow({mode:"open"}),p=document.createElement("style");p.textContent=`
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
      :host { all: initial; font-family: 'Quicksand', sans-serif; }
      .btn {
        all: unset; cursor: pointer; border-radius: 50%; width: 56px; height: 56px;
        background: #3b82f6; color: #fff; border: 3px solid #fff;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
        display: flex; align-items: center; justify-content: center;
        transition: all 0.3s ease; position: relative;
      }
      .btn:hover { background: #2563eb; transform: scale(1.05); }
      .btn svg { width: 24px; height: 24px; }
      .panel {
        position: absolute; top: ${t.customButton?"0":"70px"}; left: 0;
        width: 320px; max-height: 80vh; overflow: auto; border-radius: 8px;
        background: #ffffff; color: #333333; box-shadow: 0 4px 20px rgba(0,0,0,.1);
        border: 1px solid #e5e7eb; display: none; opacity: 0; transform: translateY(-10px);
        transition: all 0.2s ease; font-family: 'Quicksand', sans-serif;
      }
      .panel.show { display: block; opacity: 1; transform: translateY(0); }
      .header {
        display: flex; justify-content: space-between; align-items: center;
        padding: 16px 20px; background: #f8fafc; border-bottom: 1px solid #e5e7eb;
        font-weight: 600; font-size: 16px; color: #1f2937;
      }
      .header-controls { display: flex; gap: 8px; align-items: center; }
      .close-btn, .reset-btn {
        all: unset; cursor: pointer; width: 24px; height: 24px; border-radius: 4px;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.2s ease; font-size: 16px; font-weight: 600;
      }
      .close-btn { color: #ef4444; }
      .close-btn:hover { background: #fef2f2; color: #dc2626; }
      .reset-btn { color: #3b82f6; }
      .reset-btn:hover { background: #eff6ff; color: #2563eb; }
      .content { padding: 12px; }
      .option {
        display: flex; align-items: center; gap: 12px; padding: 12px 8px;
        border-radius: 6px; transition: all 0.2s ease; font-size: 14px;
        border: 2px solid transparent;
      }
      .option:hover { background: #f9fafb; }
      .option-group {
        border: 1px solid #e5e7eb; border-radius: 8px; margin: 8px 0; background: #f8fafc;
      }
      .option-group .option { margin: 0; border-radius: 0; border: none; border-bottom: 1px solid #e5e7eb; }
      .option-group .option:last-child { border-bottom: none; border-radius: 0 0 8px 8px; }
      .option-group .option:first-child { border-radius: 8px 8px 0 0; }
      .option-group .option:only-child { border-radius: 8px; }
      .option-icon {
        width: 20px; height: 20px; color: #9ca3af; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .option-label { flex: 1; font-weight: 500; color: #6b7280; }
      .option-controls { display: flex; align-items: center; gap: 6px; }
      .size-btn {
        all: unset; cursor: pointer; width: 24px; height: 24px; border-radius: 4px;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; font-weight: 600; color: #6b7280; transition: all 0.2s ease;
      }
      .size-btn:hover { background: #f3f4f6; color: #374151; }
      .toggle-switch {
        position: relative; width: 44px; height: 22px; flex-shrink: 0;
      }
      .toggle-switch input { opacity: 0; width: 0; height: 0; }
      .toggle-slider {
        position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
        background: #ccc; border-radius: 22px; transition: 0.3s;
      }
      .toggle-slider:before {
        position: absolute; content: ""; height: 18px; width: 18px; left: 2px; bottom: 2px;
        background: white; border-radius: 50%; transition: 0.3s;
      }
      .toggle-switch input:checked + .toggle-slider { background: #3b82f6; }
      .toggle-switch input:checked + .toggle-slider:before { transform: translateX(22px); }
    `;const g=document.createElement("div"),E=t.customButton?"":`
      <button class="btn" part="launcher" aria-expanded="false" title="Accessibility Options">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M23 13V11C20.5 11 18.5 9 18.5 6.5V5.7C17.9 3.6 16.1 2 14 2C14 3.1 13.1 4 12 4C10.9 4 10 3.1 10 2C7.9 2 6.1 3.6 5.5 5.7V6.5C5.5 9 3.5 11 1 11V13C3.5 13 5.5 15 5.5 17.5V18.3C6.1 20.4 7.9 22 10 22C10 20.9 10.9 20 12 20C13.1 20 14 20.9 14 22C16.1 22 17.9 20.4 18.5 18.3V17.5C18.5 15 20.5 13 23 13M8.5 12.5L12 9L15.5 12.5L12 16L8.5 12.5Z"/></svg>
      </button>`;g.innerHTML=`
      ${E}
      <div class="panel" role="dialog" aria-label="Accessibility controls">
        <div class="header">
          <span>Accessibility Options</span>
          <div class="header-controls">
            <button class="reset-btn" title="Reset All">🔄</button>
            <button class="close-btn" title="Close">✕</button>
          </div>
        </div>
        <div class="content">
          <div class="option-group">
            <div class="option">
              <div class="option-icon">🔍</div>
              <div class="option-label">Text Size: <span class="font-value">${Math.round(e.fontScale*100)}%</span></div>
              <div class="option-controls">
                <button class="size-btn font-dec">-</button>
                <button class="size-btn font-inc">+</button>
              </div>
            </div>
          </div>
          <div class="option-group">
            <div class="option">
              <div class="option-icon">◀▶</div>
              <div class="option-label">Text Spacing: <span class="spacing-value">${e.letterSpacing}px</span></div>
              <div class="option-controls">
                <button class="size-btn space-dec">-</button>
                <button class="size-btn space-inc">+</button>
              </div>
            </div>
          </div>
          <div class="option">
            <div class="option-icon">🔄</div>
            <div class="option-label">Invert Colors</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-invert" ${e.invertColors?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">⚫</div>
            <div class="option-label">Gray Hues</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-grayscale" ${e.grayscale?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">📎</div>
            <div class="option-label">Underline Links</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-underline" ${e.underlineLinks?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">🖱️</div>
            <div class="option-label">Big Cursor</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-cursor" ${e.bigCursor?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">📄</div>
            <div class="option-label">Reading Guide</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-guide" ${e.readingGuide?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">🎙️</div>
            <div class="option-label">Text to Speech</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-tts" ${e.textToSpeech?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">🚫</div>
            <div class="option-label">Disable Animations</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-motion" ${e.reduceMotion?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    `,i.appendChild(p),i.appendChild(g);const r=t.customButton?document.querySelector(t.customButton):i.querySelector(".btn"),c=i.querySelector(".panel"),q=i.querySelector(".reset-btn"),m=i.querySelector(".close-btn"),T=()=>{const a=c.classList.contains("show");a?(c.classList.remove("show"),setTimeout(()=>c.style.display="none",200)):(c.style.display="block",setTimeout(()=>c.classList.add("show"),10)),r&&r.setAttribute("aria-expanded",String(!a))};return r&&r.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),T()}),m&&m.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation(),c.classList.remove("show"),setTimeout(()=>c.style.display="none",200),r&&r.setAttribute("aria-expanded","false")}),document.addEventListener("click",a=>{!n.contains(a.target)&&a.target!==r&&c.classList.contains("show")&&(c.classList.remove("show"),setTimeout(()=>c.style.display="none",200),r&&r.setAttribute("aria-expanded","false"))}),q.addEventListener("click",()=>o.reset()),i.querySelector(".font-inc").addEventListener("click",()=>o.act("font-inc")),i.querySelector(".font-dec").addEventListener("click",()=>o.act("font-dec")),i.querySelector(".space-inc").addEventListener("click",()=>o.act("space-inc")),i.querySelector(".space-dec").addEventListener("click",()=>o.act("space-dec")),i.querySelector(".toggle-invert").addEventListener("change",()=>o.act("toggle-invert")),i.querySelector(".toggle-grayscale").addEventListener("change",()=>o.act("toggle-grayscale")),i.querySelector(".toggle-underline").addEventListener("change",()=>o.act("toggle-underline")),i.querySelector(".toggle-cursor").addEventListener("change",()=>o.act("toggle-cursor")),i.querySelector(".toggle-guide").addEventListener("change",()=>o.act("toggle-guide")),i.querySelector(".toggle-tts").addEventListener("change",()=>o.act("toggle-tts")),i.querySelector(".toggle-motion").addEventListener("change",()=>o.act("toggle-motion")),{mount:()=>document.body.appendChild(l),destroy:()=>l.remove(),root:i}}function h(t){const e=document.documentElement;e.style.setProperty("--a11y-font-scale",String(t.fontScale)),e.classList.toggle("a11y--scaled",t.fontScale!==1),e.style.setProperty("--a11y-letter-spacing",`${t.letterSpacing}px`),e.classList.toggle("a11y--spacing",t.letterSpacing!==0),e.classList.toggle("a11y--invert",!!t.invertColors),e.classList.toggle("a11y--grayscale",!!t.grayscale),e.classList.toggle("a11y--underline",!!t.underlineLinks),e.classList.toggle("a11y--big-cursor",!!t.bigCursor),e.classList.toggle("a11y--reduce-motion",!!t.reduceMotion),t.readingGuide?(k(),s&&(s.style.display="block"),document.addEventListener("mousemove",v)):(s&&(s.style.display="none"),document.removeEventListener("mousemove",v)),t.textToSpeech?(w(),document.addEventListener("mouseup",f)):(document.removeEventListener("mouseup",f),d&&d.cancel())}function f(){const e=window.getSelection().toString().trim();if(e&&d){d.cancel();const o=new SpeechSynthesisUtterance(e);d.speak(o)}}class C{constructor(e){this.opts={...b,...e},this.state={...this.opts.defaults,...x()}}init(){S(),h(this.state);const e={reset:()=>{this.state={...b.defaults},y(this.state),h(this.state),this.refreshUI()},act:o=>{const l=(n,i,p,g=.1)=>Math.round(Math.min(p,Math.max(i,n))/g)*g;switch(o){case"font-inc":this.state.fontScale=l(this.state.fontScale+.1,.8,2);break;case"font-dec":this.state.fontScale=l(this.state.fontScale-.1,.8,2);break;case"space-inc":this.state.letterSpacing=l(this.state.letterSpacing+.5,0,5,.5);break;case"space-dec":this.state.letterSpacing=l(this.state.letterSpacing-.5,0,5,.5);break;case"toggle-invert":this.state.invertColors=!this.state.invertColors;break;case"toggle-grayscale":this.state.grayscale=!this.state.grayscale;break;case"toggle-underline":this.state.underlineLinks=!this.state.underlineLinks;break;case"toggle-cursor":this.state.bigCursor=!this.state.bigCursor;break;case"toggle-guide":this.state.readingGuide=!this.state.readingGuide;break;case"toggle-tts":this.state.textToSpeech=!this.state.textToSpeech;break;case"toggle-motion":this.state.reduceMotion=!this.state.reduceMotion;break}y(this.state),h(this.state),this.refreshUI()}};this.ui=L(this.opts,this.state,e),this.ui.mount()}refreshUI(){if(!this.ui)return;const e=this.ui.root,o=e.querySelector(".font-value"),l=e.querySelector(".spacing-value");o&&(o.textContent=`${Math.round(this.state.fontScale*100)}%`),l&&(l.textContent=`${this.state.letterSpacing}px`);const n={".toggle-invert":this.state.invertColors,".toggle-grayscale":this.state.grayscale,".toggle-underline":this.state.underlineLinks,".toggle-cursor":this.state.bigCursor,".toggle-guide":this.state.readingGuide,".toggle-tts":this.state.textToSpeech,".toggle-motion":this.state.reduceMotion};Object.entries(n).forEach(([i,p])=>{const g=e.querySelector(i);g&&(g.checked=p)})}destroy(){document.removeEventListener("mouseup",f),d&&d.cancel(),s&&(s.remove(),s=null),this.ui&&this.ui.destroy()}}window.A11yWidget={init(t){this._instance||(this._instance=new C(t)),this._instance.init()},destroy(){var t;(t=this._instance)==null||t.destroy(),this._instance=null}}})()}));
