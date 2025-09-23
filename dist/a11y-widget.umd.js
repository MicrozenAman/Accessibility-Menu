(function(l){typeof define=="function"&&define.amd?define(l):l()})((function(){"use strict";(()=>{const l="a11y_widget_prefs_v1",f={position:"right",theme:"light",defaults:{fontScale:1,bigCursor:!1,readingGuide:!1,textToSpeech:!1}},C=(t,e)=>({...t,...e,defaults:{...t.defaults,...(e==null?void 0:e.defaults)||{}}});function w(){try{return JSON.parse(localStorage.getItem(l))||{}}catch(t){return{}}}function b(t){try{localStorage.setItem(l,JSON.stringify(t))}catch(e){}}let r=null;function S(){"speechSynthesis"in window&&(r=window.speechSynthesis)}let s=null;function k(){s||(s=document.createElement("div"),s.id="a11y-reading-guide",s.style.cssText=`
      position: fixed;
      left: 0;
      width: 100%;
      height: 2px;
      pointer-events: none;
      z-index: 2147483646;
      background: #000;
      display: none;
    `,document.body.appendChild(s))}function m(t){s&&s.style.display!=="none"&&(s.style.top=`${t.clientY}px`)}function L(){if(document.getElementById("a11y-effect-styles"))return;const t=document.createElement("style");t.id="a11y-effect-styles",t.textContent=`
    :root {
      --a11y-font-scale: 1;
    }
    html.a11y--scaled { font-size: calc(100% * var(--a11y-font-scale)); }
    html.a11y--big-cursor, html.a11y--big-cursor * { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g><path fill="%23000" stroke="%23fff" stroke-width="2" d="M10 10 L10 28 L16 22 L20 30 L24 28 L20 20 L28 20 Z"/></g></svg>') 0 0, auto !important; }

    .a11y-tts-highlight {
      background-color: yellow !important;
      color: black !important;
      box-shadow: 0 0 0 2px yellow !important;
    }
    `,document.head.appendChild(t)}function V(t,e,o){const a=document.createElement("div"),i=document.createElement("div");i.setAttribute("aria-live","polite"),i.style.position="fixed",i.style.zIndex="2147483647",i.style.bottom="16px",i.style[t.position==="left"?"left":"right"]="16px",a.appendChild(i);const n=i.attachShadow({mode:"open"}),p=document.createElement("style");p.textContent=`
      :host { all: initial; }
      .btn {
        all: unset; cursor: pointer; border-radius: 999px; padding: 10px 14px; box-shadow: 0 4px 14px rgba(0,0,0,.15);
        background: ${t.theme==="dark"?"#111":"#fff"};
        color: ${t.theme==="dark"?"#fff":"#111"};
        font: 500 14px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        display: inline-flex; align-items: center; gap: 6px;
      }
      .btn svg { width: 20px; height: 20px; }
      .panel {
        position: absolute; bottom: 48px; ${t.position==="left"?"left":"right"}: 0;
        width: 280px; max-height: 70vh; overflow: auto; border-radius: 14px; padding: 16px;
        background: ${t.theme==="dark"?"#111":"#fff"};
        color: ${t.theme==="dark"?"#fff":"#111"};
        box-shadow: 0 16px 40px rgba(0,0,0,.2); display: none;
      }
      .row { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 10px 0; }
      .row + .row { border-top: 1px solid ${t.theme==="dark"?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}; }
      .label { display: flex; align-items: center; gap: 8px; font-size: 14px; }
      .label svg { width: 18px; height: 18px; opacity: 0.7; }
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
      .controls button { all: unset; cursor: pointer; padding: 4px 10px; border-radius: 8px; outline: 1px solid ${t.theme==="dark"?"rgba(255,255,255,.2)":"rgba(0,0,0,.2)"}; }
      .controls button:hover { background: ${t.theme==="dark"?"rgba(255,255,255,.1)":"rgba(0,0,0,.05)"}; }
      .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-weight:600; }
      .reset-btn { all: unset; cursor: pointer; padding: 4px 10px; border-radius: 8px; background: ${t.theme==="dark"?"rgba(255,255,255,.1)":"rgba(0,0,0,.05)"}; font-size: 12px; }
    `;const d=document.createElement("div");d.innerHTML=`
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
            <span class="num" data-bind="font">${Math.round(e.fontScale*100)}%</span>
            <button data-act="font-inc" aria-label="Increase font size">+</button>
          </div>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 18.59V3.41C11 2.52 10.08 1.92 9.34 2.3L3.69 5.3C3.26 5.52 3 5.96 3 6.41V17.59C3 18.48 3.92 19.08 4.66 18.7L10.31 15.7C10.74 15.48 11 15.04 11 14.59V18.59M13 5V18.59L20.66 14.3C21.4 13.92 21.4 12.85 20.66 12.47L13 8.18V5Z"/></svg>
            Big cursor
          </div>
          <button class="switch" role="switch" aria-checked="${e.bigCursor}" data-act="toggle-cursor" data-on="${e.bigCursor}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 17H7V15H14M17 13H7V11H17M17 9H7V7H17M19 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3Z"/></svg>
            Reading guide
          </div>
          <button class="switch" role="switch" aria-checked="${e.readingGuide}" data-act="toggle-guide" data-on="${e.readingGuide}"></button>
        </div>

        <div class="row">
          <div class="label">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 5C10.04 5 11.06 5.24 12 5.68C12.94 5.24 13.96 5 15 5C16.05 5 17.09 5.24 18 5.65V18.5C17.05 18.11 16.04 17.91 15 17.91C13.97 17.91 12.96 18.12 12 18.5C11.04 18.12 10.03 17.91 9 17.91C7.95 17.91 6.94 18.12 6 18.5V5.65C6.91 5.24 7.95 5 9 5M9 7C8.31 7 7.62 7.1 7 7.28V15.68C7.62 15.53 8.31 15.43 9 15.43C10.03 15.43 11.04 15.65 12 16.07V7.93C11.04 7.5 10.03 7.28 9 7.28V7Z"/></svg>
            Text to speech
          </div>
          <button class="switch" role="switch" aria-checked="${e.textToSpeech}" data-act="toggle-tts" data-on="${e.textToSpeech}"></button>
        </div>
      </div>
    `,n.appendChild(p),n.appendChild(d);const y=n.querySelector(".btn"),v=n.getElementById("a11y-panel"),T=n.querySelector('[part="reset"]');return y.addEventListener("click",()=>{const u=v.style.display==="block";v.style.display=u?"none":"block",y.setAttribute("aria-expanded",String(!u))}),T.addEventListener("click",()=>o.reset()),n.querySelectorAll("[data-act]").forEach(u=>{u.addEventListener("click",()=>o.act(u.getAttribute("data-act")))}),{mount:()=>document.body.appendChild(a),destroy:()=>a.remove(),root:n}}function g(t){const e=document.documentElement;t.fontScale!==1?e.classList.add("a11y--scaled"):e.classList.remove("a11y--scaled"),e.style.setProperty("--a11y-font-scale",String(t.fontScale)),e.classList.toggle("a11y--big-cursor",!!t.bigCursor),t.readingGuide?(k(),s&&(s.style.display="block"),document.addEventListener("mousemove",m)):(s&&(s.style.display="none"),document.removeEventListener("mousemove",m)),t.textToSpeech?(S(),E()):x()}function E(){document.addEventListener("mouseup",h),document.addEventListener("touchend",h)}function x(){document.removeEventListener("mouseup",h),document.removeEventListener("touchend",h),r&&r.cancel()}function h(){const t=window.getSelection(),e=t.toString().trim();if(e&&r){r.cancel();const o=new SpeechSynthesisUtterance(e);if(o.rate=.9,o.pitch=1,r.speak(o),t.rangeCount>0){const a=t.getRangeAt(0),i=document.createElement("span");i.className="a11y-tts-highlight";try{a.surroundContents(i),o.onend=()=>{if(i.parentNode){const n=i.parentNode;for(;i.firstChild;)n.insertBefore(i.firstChild,i);n.removeChild(i)}}}catch(n){}}}}class M{constructor(e){this.opts=C(f,e||{}),this.state={...this.opts.defaults,...w()}}init(){L(),g(this.state);const e={reset:()=>{this.state={...f.defaults},b(this.state),g(this.state),this.refreshUI()},act:o=>{const a=(i,n,p,d=.1)=>Math.round(Math.min(p,Math.max(n,i))/d)*d;switch(o){case"font-inc":this.state.fontScale=a(this.state.fontScale+.1,.8,2);break;case"font-dec":this.state.fontScale=a(this.state.fontScale-.1,.8,2);break;case"toggle-cursor":this.state.bigCursor=!this.state.bigCursor;break;case"toggle-guide":this.state.readingGuide=!this.state.readingGuide;break;case"toggle-tts":this.state.textToSpeech=!this.state.textToSpeech;break}b(this.state),g(this.state),this.refreshUI()}};this.ui=V(this.opts,this.state,e),this.ui.mount(),this.refreshUI()}refreshUI(){if(!this.ui)return;const e=this.ui.root;((a,i)=>{const n=e.querySelector(`[data-bind="${a}"]`);n&&(n.textContent=i)})("font",`${Math.round(this.state.fontScale*100)}%`),e.querySelectorAll(".switch").forEach(a=>{const i=a.getAttribute("data-act"),n=i==="toggle-cursor"&&this.state.bigCursor||i==="toggle-guide"&&this.state.readingGuide||i==="toggle-tts"&&this.state.textToSpeech;a.dataset.on=String(n),a.setAttribute("aria-checked",String(n))})}destroy(){x(),s&&(s.remove(),s=null),this.ui&&this.ui.destroy(),this.ui=null}}const c={init(t){c._instance||(c._instance=new M(t)),c._instance.init()},destroy(){var t;(t=c._instance)==null||t.destroy(),c._instance=null}};window.A11yWidget=window.A11yWidget||c})()}));
