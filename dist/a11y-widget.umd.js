(function(h){typeof define=="function"&&define.amd?define(h):h()})((function(){"use strict";(()=>{const h="a11y_widget_prefs_v1",v={position:"right",customButton:null,defaults:{fontScale:1,letterSpacing:0,invertColors:!1,grayscale:!1,underlineLinks:!1,bigCursor:!1,readingGuide:!1,textToSpeech:!1,reduceMotion:!1}};function k(){try{return JSON.parse(localStorage.getItem(h))||{}}catch(e){return{}}}function b(e){try{localStorage.setItem(h,JSON.stringify(e))}catch(t){}}let p=null,s=null;function S(){"speechSynthesis"in window&&(p=window.speechSynthesis)}function L(){s||(s=document.createElement("div"),s.style.cssText=`
      position: fixed; left: 0; width: 100%; height: 2px; pointer-events: none;
      z-index: 2147483646; background: #000; display: none;
    `,document.body.appendChild(s))}function x(e){(s==null?void 0:s.style.display)!=="none"&&(s.style.top=`${e.clientY}px`)}function E(){if(document.getElementById("a11y-effect-styles"))return;const e=document.createElement("style");e.id="a11y-effect-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function r(e){return{type:'<svg viewBox="0 0 24 24"><polyline points="4,7 4,4 20,4 20,7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',"align-justify":'<svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',"refresh-cw":'<svg viewBox="0 0 24 24"><polyline points="23,4 23,10 17,10"></polyline><polyline points="1,20 1,14 7,14"></polyline><path d="m20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>',target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',link:'<svg viewBox="0 0 24 24"><path d="10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path><line x1="2" y1="22" x2="22" y2="22"></line></svg>',"mouse-pointer":'<svg viewBox="0 0 24 24"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="m13 13 6 6"></path></svg>',minus:'<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></svg>',"volume-2":'<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',ban:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path></svg>'}[e]||'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle></svg>'}function M(e,t,o){const l=document.createElement("div"),a=document.createElement("div");a.setAttribute("aria-live","polite"),a.setAttribute("data-a11y-widget","true"),a.style.position="fixed",a.style.zIndex="2147483647",a.style.bottom="30px",a.style.right="0px",l.appendChild(a);const i=a.attachShadow({mode:"open"}),u=document.createElement("style");u.textContent=`
      @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');
      :host { all: initial; font-family: 'Quicksand', sans-serif; }
      .btn {
        all: unset; cursor: pointer; color: rgb(255, 255, 255);
        z-index: 9999; opacity: 1; position: relative;
        display: flex; align-items: center; justify-content: center;
      }
      .btn svg { width: 50px; height: 50px; }
      .panel {
        position: absolute; bottom: 70px; right: 0;
        width: 320px; max-height: 80vh; overflow: auto; border-radius: 8px;
        background: #ffffff; color: #333333; box-shadow: 0 4px 20px rgba(0,0,0,.1);
        border: 1px solid #e5e7eb; display: none; opacity: 0; transform: translateY(10px);
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
        border-radius: 6px; transition: all 0.2s ease; font-size: 16px;
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
      .option-icon svg {
        width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2;
        display: block;
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
    `;const g=document.createElement("div"),z=`
      <button class="btn" part="launcher" aria-expanded="false" title="Accessibility Options">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="100%" viewBox="0 0 960 960" enable-background="new 0 0 960 960" xml:space="preserve">
<path fill="#FFFFFF" opacity="1.000000" stroke="none" 
	d="
M961.000000,57.000000 
	C961.000000,339.362701 961.000000,621.725403 960.614868,904.401367 
	C959.915894,906.165588 959.471558,907.602112 959.307922,909.069885 
	C956.554382,933.776245 935.533569,956.105286 909.245667,959.312683 
	C907.783630,959.491028 906.413086,960.420227 905.000000,961.000000 
	C622.637329,961.000000 340.274597,961.000000 57.598934,960.614807 
	C55.506878,959.866089 53.740192,959.419617 51.946850,959.151550 
	C26.646460,955.369202 6.670508,935.432739 2.820787,910.208496 
	C2.597741,908.747070 1.624245,907.400208 0.999995,906.000000 
	C1.000000,622.970642 1.000000,339.941284 1.381298,56.605900 
	C2.125180,54.856735 2.603307,53.431713 2.833171,51.967712 
	C6.845352,26.414284 26.549746,6.665989 51.792439,2.820467 
	C53.253494,2.597887 54.600121,1.624158 56.000000,1.000000 
	C339.029388,1.000000 622.058777,1.000000 905.392822,1.381372 
	C907.140076,2.125543 908.564392,2.607035 910.028137,2.833488 
	C935.769470,6.815825 955.056152,26.220119 959.225281,52.262562 
	C959.486511,53.894585 960.393494,55.423244 961.000000,57.000000 
M937.000000,698.500000 
	C937.000000,487.176666 937.000671,275.853363 936.999146,64.530029 
	C936.998962,39.757229 922.299255,25.001226 897.618408,25.001083 
	C619.798401,24.999470 341.978394,24.999256 64.158409,25.001486 
	C39.828407,25.001680 25.001492,39.864487 25.001320,64.250412 
	C24.999344,342.070404 24.999378,619.890381 25.001255,897.710388 
	C25.001419,922.118774 39.818218,936.998352 64.129562,936.998535 
	C342.116211,937.000916 620.102905,937.001221 898.089539,936.997742 
	C922.067749,936.997437 936.995361,922.029114 936.997742,897.990479 
	C937.004272,831.826965 937.000000,765.663513 937.000000,698.500000 
z"/>
<path fill="#003F87" opacity="1.000000" stroke="none" 
	d="
M937.000000,699.000000 
	C937.000000,765.663513 937.004272,831.826965 936.997742,897.990479 
	C936.995361,922.029114 922.067749,936.997437 898.089539,936.997742 
	C620.102905,937.001221 342.116211,937.000916 64.129562,936.998535 
	C39.818218,936.998352 25.001419,922.118774 25.001255,897.710388 
	C24.999378,619.890381 24.999344,342.070404 25.001320,64.250412 
	C25.001492,39.864487 39.828407,25.001680 64.158409,25.001486 
	C341.978394,24.999256 619.798401,24.999470 897.618408,25.001083 
	C922.299255,25.001226 936.998962,39.757229 936.999146,64.530029 
	C937.000671,275.853363 937.000000,487.176666 937.000000,699.000000 
M422.762848,183.191742 
	C423.367371,181.824417 424.004852,180.470581 424.571655,179.087799 
	C443.303284,133.389786 409.809540,81.993866 360.674744,81.030998 
	C306.846497,79.976158 271.544830,134.459732 294.290710,183.406326 
	C295.310608,185.601028 296.048706,188.084167 296.232971,190.485519 
	C298.208221,216.229172 300.084259,241.980682 301.910889,267.735474 
	C304.409302,302.962097 306.818420,338.195007 309.307495,373.422302 
	C312.547943,419.283691 315.822937,465.142670 319.097778,511.001617 
	C319.878754,521.937683 320.718079,532.869629 321.569489,544.327454 
	C323.838959,544.327454 325.793213,544.326782 327.747467,544.327515 
	C411.236633,544.359741 494.725830,544.416870 578.214905,544.341675 
	C581.897949,544.338318 583.696655,545.341797 585.189392,548.853455 
	C617.697754,625.330444 650.352051,701.745361 682.981750,778.170715 
	C685.498413,784.065430 688.040710,789.949280 690.648315,796.017700 
	C737.817749,777.516663 784.490051,759.210632 831.525574,740.762085 
	C824.159973,723.223877 816.976990,706.120422 809.707947,688.812134 
	C783.309204,698.330261 757.260254,707.722290 730.941406,717.211609 
	C730.129333,715.419189 729.437073,713.947754 728.790527,712.456482 
	C696.265137,637.431396 663.622803,562.456482 631.411011,487.297028 
	C628.236023,479.888916 624.937195,477.182404 616.470764,477.312927 
	C556.658630,478.234894 496.835388,478.458771 437.015289,478.840698 
	C419.367981,478.953369 401.719299,478.858063 383.613647,478.858063 
	C382.520233,463.911499 381.435486,449.083130 380.313904,433.751282 
	C439.278320,433.751282 497.690765,433.751282 556.198486,433.751282 
	C556.198486,411.336426 556.198486,389.388153 556.198486,366.825256 
	C495.307007,366.825256 434.607330,366.825256 373.550201,366.825256 
	C370.852203,318.617493 368.187469,271.004456 365.531067,223.540146 
	C391.833282,219.696121 410.483978,206.547470 422.762848,183.191742 
M224.410889,528.964050 
	C239.497971,500.637085 260.159912,477.314636 287.032776,459.674713 
	C289.823975,457.842529 290.048859,455.868347 289.814941,453.062012 
	C288.749725,440.281921 287.838409,427.489136 286.830322,414.704132 
	C285.930542,403.291992 284.976562,391.884125 284.017700,380.120911 
	C282.076080,380.982605 280.552795,381.606537 279.074066,382.322479 
	C244.832489,398.900574 215.317307,421.680725 191.479904,451.279449 
	C137.612122,518.166687 118.031731,594.040833 137.610489,677.887268 
	C169.875092,816.061096 303.835846,902.939880 442.895538,875.777344 
	C525.102905,859.719788 586.218262,813.073242 626.902649,739.760620 
	C628.531067,736.826172 628.040710,734.621765 626.714722,731.923218 
	C612.713196,703.427856 598.796753,674.890686 584.843689,646.371460 
	C584.143616,644.940674 583.322510,643.569153 582.290710,641.681519 
	C581.853455,643.803467 581.473572,645.256714 581.261536,646.734070 
	C577.864014,670.406494 569.829224,692.443298 558.006653,713.173767 
	C511.789124,794.214661 411.423492,830.335266 325.295288,796.897095 
	C217.770935,755.152039 171.177994,632.131714 224.410889,528.964050 
z"/>
<path fill="#FEFEFF" opacity="1.000000" stroke="none" 
	d="
M422.568390,183.511993 
	C410.483978,206.547470 391.833282,219.696121 365.531067,223.540146 
	C368.187469,271.004456 370.852203,318.617493 373.550201,366.825256 
	C434.607330,366.825256 495.307007,366.825256 556.198486,366.825256 
	C556.198486,389.388153 556.198486,411.336426 556.198486,433.751282 
	C497.690765,433.751282 439.278320,433.751282 380.313904,433.751282 
	C381.435486,449.083130 382.520233,463.911499 383.613647,478.858063 
	C401.719299,478.858063 419.367981,478.953369 437.015289,478.840698 
	C496.835388,478.458771 556.658630,478.234894 616.470764,477.312927 
	C624.937195,477.182404 628.236023,479.888916 631.411011,487.297028 
	C663.622803,562.456482 696.265137,637.431396 728.790527,712.456482 
	C729.437073,713.947754 730.129333,715.419189 730.941406,717.211609 
	C757.260254,707.722290 783.309204,698.330261 809.707947,688.812134 
	C816.976990,706.120422 824.159973,723.223877 831.525574,740.762085 
	C784.490051,759.210632 737.817749,777.516663 690.648315,796.017700 
	C688.040710,789.949280 685.498413,784.065430 682.981750,778.170715 
	C650.352051,701.745361 617.697754,625.330444 585.189392,548.853455 
	C583.696655,545.341797 581.897949,544.338318 578.214905,544.341675 
	C494.725830,544.416870 411.236633,544.359741 327.747467,544.327515 
	C325.793213,544.326782 323.838959,544.327454 321.569489,544.327454 
	C320.718079,532.869629 319.878754,521.937683 319.097778,511.001617 
	C315.822937,465.142670 312.547943,419.283691 309.307495,373.422302 
	C306.818420,338.195007 304.409302,302.962097 301.910889,267.735474 
	C300.084259,241.980682 298.208221,216.229172 296.232971,190.485519 
	C296.048706,188.084167 295.310608,185.601028 294.290710,183.406326 
	C271.544830,134.459732 306.846497,79.976158 360.674744,81.030998 
	C409.809540,81.993866 443.303284,133.389786 424.571655,179.087799 
	C424.004852,180.470581 423.367371,181.824417 422.568390,183.511993 
z"/>
<path fill="#FEFEFF" opacity="1.000000" stroke="none" 
	d="
M224.239944,529.295654 
	C171.177994,632.131714 217.770935,755.152039 325.295288,796.897095 
	C411.423492,830.335266 511.789124,794.214661 558.006653,713.173767 
	C569.829224,692.443298 577.864014,670.406494 581.261536,646.734070 
	C581.473572,645.256714 581.853455,643.803467 582.290710,641.681519 
	C583.322510,643.569153 584.143616,644.940674 584.843689,646.371460 
	C598.796753,674.890686 612.713196,703.427856 626.714722,731.923218 
	C628.040710,734.621765 628.531067,736.826172 626.902649,739.760620 
	C586.218262,813.073242 525.102905,859.719788 442.895538,875.777344 
	C303.835846,902.939880 169.875092,816.061096 137.610489,677.887268 
	C118.031731,594.040833 137.612122,518.166687 191.479904,451.279449 
	C215.317307,421.680725 244.832489,398.900574 279.074066,382.322479 
	C280.552795,381.606537 282.076080,380.982605 284.017700,380.120911 
	C284.976562,391.884125 285.930542,403.291992 286.830322,414.704132 
	C287.838409,427.489136 288.749725,440.281921 289.814941,453.062012 
	C290.048859,455.868347 289.823975,457.842529 287.032776,459.674713 
	C260.159912,477.314636 239.497971,500.637085 224.239944,529.295654 
z"/>
</svg>
        </button>`;g.innerHTML=`
      ${z}
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
              <div class="option-icon">${r("type")}</div>
              <div class="option-label">Text Size: <span class="font-value">${Math.round(t.fontScale*100)}%</span></div>
              <div class="option-controls">
                <button class="size-btn font-dec">-</button>
                <button class="size-btn font-inc">+</button>
              </div>
            </div>
          </div>
          <div class="option-group">
            <div class="option">
              <div class="option-icon">${r("align-justify")}</div>
              <div class="option-label">Text Spacing: <span class="spacing-value">${t.letterSpacing}px</span></div>
              <div class="option-controls">
                <button class="size-btn space-dec">-</button>
                <button class="size-btn space-inc">+</button>
              </div>
            </div>
          </div>
          <div class="option">
            <div class="option-icon">${r("refresh-cw")}</div>
            <div class="option-label">Invert Colors</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-invert" ${t.invertColors?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">${r("target")}</div>
            <div class="option-label">Gray Hues</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-grayscale" ${t.grayscale?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">${r("link")}</div>
            <div class="option-label">Underline Links</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-underline" ${t.underlineLinks?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">${r("mouse-pointer")}</div>
            <div class="option-label">Big Cursor</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-cursor" ${t.bigCursor?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">${r("minus")}</div>
            <div class="option-label">Reading Guide</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-guide" ${t.readingGuide?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">${r("volume-2")}</div>
            <div class="option-label">Text to Speech</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-tts" ${t.textToSpeech?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="option">
            <div class="option-icon">${r("ban")}</div>
            <div class="option-label">Disable Animations</div>
            <label class="toggle-switch">
              <input type="checkbox" class="toggle-motion" ${t.reduceMotion?"checked":""}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
    `,i.appendChild(u),i.appendChild(g);const d=i.querySelector(".btn"),c=i.querySelector(".panel"),T=i.querySelector(".reset-btn"),C=i.querySelector(".close-btn"),m=()=>{const n=c.classList.contains("show");n?(c.classList.remove("show"),setTimeout(()=>c.style.display="none",200)):(c.style.display="block",setTimeout(()=>c.classList.add("show"),10)),d&&d.setAttribute("aria-expanded",String(!n))};if(d&&d.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),m()}),e.customButton){const n=document.querySelector(e.customButton);n&&n.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation(),m()})}return C&&C.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),c.classList.remove("show"),setTimeout(()=>c.style.display="none",200),d&&d.setAttribute("aria-expanded","false")}),document.addEventListener("click",n=>{!a.contains(n.target)&&n.target!==d&&c.classList.contains("show")&&(c.classList.remove("show"),setTimeout(()=>c.style.display="none",200),d&&d.setAttribute("aria-expanded","false"))}),T.addEventListener("click",()=>o.reset()),i.querySelector(".font-inc").addEventListener("click",()=>o.act("font-inc")),i.querySelector(".font-dec").addEventListener("click",()=>o.act("font-dec")),i.querySelector(".space-inc").addEventListener("click",()=>o.act("space-inc")),i.querySelector(".space-dec").addEventListener("click",()=>o.act("space-dec")),i.querySelector(".toggle-invert").addEventListener("change",()=>o.act("toggle-invert")),i.querySelector(".toggle-grayscale").addEventListener("change",()=>o.act("toggle-grayscale")),i.querySelector(".toggle-underline").addEventListener("change",()=>o.act("toggle-underline")),i.querySelector(".toggle-cursor").addEventListener("change",()=>o.act("toggle-cursor")),i.querySelector(".toggle-guide").addEventListener("change",()=>o.act("toggle-guide")),i.querySelector(".toggle-tts").addEventListener("change",()=>o.act("toggle-tts")),i.querySelector(".toggle-motion").addEventListener("change",()=>o.act("toggle-motion")),{mount:()=>document.body.appendChild(l),destroy:()=>l.remove(),root:i}}function y(e){const t=document.documentElement;t.style.setProperty("--a11y-font-scale",String(e.fontScale)),t.classList.toggle("a11y--scaled",e.fontScale!==1),t.style.setProperty("--a11y-letter-spacing",`${e.letterSpacing}px`),t.classList.toggle("a11y--spacing",e.letterSpacing!==0),t.classList.toggle("a11y--invert",!!e.invertColors),t.classList.toggle("a11y--grayscale",!!e.grayscale),t.classList.toggle("a11y--underline",!!e.underlineLinks),t.classList.toggle("a11y--big-cursor",!!e.bigCursor),t.classList.toggle("a11y--reduce-motion",!!e.reduceMotion),e.readingGuide?(L(),s&&(s.style.display="block"),document.addEventListener("mousemove",x)):(s&&(s.style.display="none"),document.removeEventListener("mousemove",x)),e.textToSpeech?(S(),document.addEventListener("mouseup",f)):(document.removeEventListener("mouseup",f),p&&p.cancel())}function f(){const t=window.getSelection().toString().trim();if(t&&p){p.cancel();const o=new SpeechSynthesisUtterance(t);p.speak(o)}}class ${constructor(t){this.opts={...v,...t},this.state={...this.opts.defaults,...k()}}init(){E(),y(this.state);const t={reset:()=>{this.state={...v.defaults},b(this.state),y(this.state),this.refreshUI()},act:o=>{const l=(a,i,u,g=.1)=>Math.round(Math.min(u,Math.max(i,a))/g)*g;switch(o){case"font-inc":this.state.fontScale=l(this.state.fontScale+.1,.8,2);break;case"font-dec":this.state.fontScale=l(this.state.fontScale-.1,.8,2);break;case"space-inc":this.state.letterSpacing=l(this.state.letterSpacing+.5,0,5,.5);break;case"space-dec":this.state.letterSpacing=l(this.state.letterSpacing-.5,0,5,.5);break;case"toggle-invert":this.state.invertColors=!this.state.invertColors;break;case"toggle-grayscale":this.state.grayscale=!this.state.grayscale;break;case"toggle-underline":this.state.underlineLinks=!this.state.underlineLinks;break;case"toggle-cursor":this.state.bigCursor=!this.state.bigCursor;break;case"toggle-guide":this.state.readingGuide=!this.state.readingGuide;break;case"toggle-tts":this.state.textToSpeech=!this.state.textToSpeech;break;case"toggle-motion":this.state.reduceMotion=!this.state.reduceMotion;break}b(this.state),y(this.state),this.refreshUI()}};this.ui=M(this.opts,this.state,t),this.ui.mount()}refreshUI(){if(!this.ui)return;const t=this.ui.root,o=t.querySelector(".font-value"),l=t.querySelector(".spacing-value");o&&(o.textContent=`${Math.round(this.state.fontScale*100)}%`),l&&(l.textContent=`${this.state.letterSpacing}px`);const a={".toggle-invert":this.state.invertColors,".toggle-grayscale":this.state.grayscale,".toggle-underline":this.state.underlineLinks,".toggle-cursor":this.state.bigCursor,".toggle-guide":this.state.readingGuide,".toggle-tts":this.state.textToSpeech,".toggle-motion":this.state.reduceMotion};Object.entries(a).forEach(([i,u])=>{const g=t.querySelector(i);g&&(g.checked=u)})}destroy(){document.removeEventListener("mouseup",f),p&&p.cancel(),s&&(s.remove(),s=null),this.ui&&this.ui.destroy()}}window.A11yWidget={init(e){this._instance||(this._instance=new $(e)),this._instance.init()},destroy(){var e;(e=this._instance)==null||e.destroy(),this._instance=null}}})()}));
