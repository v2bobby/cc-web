/* ================================================================
   ClearCurve AI — script.js  ·  Peak Premium Tech Landing Page
   ================================================================ */
'use strict';

/* ── Utils ──────────────────────────────────────────────────── */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const raf = requestAnimationFrame;

/* ── Cursor ─────────────────────────────────────────────────── */
(function cursor() {
  const dot  = $('#cc-cursor');
  const ring = $('#cc-cursor-ring');
  if (!dot || !ring || window.matchMedia('(pointer:coarse)').matches) return;

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('mousedown', () => dot.style.transform = 'translate(-50%,-50%) scale(.7)');
  document.addEventListener('mouseup',   () => dot.style.transform = 'translate(-50%,-50%) scale(1)');

  $$('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
  });

  function tick() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * .1;
    ry += (my - ry) * .1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf(tick);
  }
  raf(tick);
})();

/* ── Navbar ─────────────────────────────────────────────────── */
(function navbar() {
  const nav    = $('#nav');
  const burger = $('#nav-burger');
  const links  = $('#nav-links');
  if (!nav) return;

  const onScroll = () => nav.classList.toggle('nav--scrolled', scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    links?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  $$('#nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      links?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Scroll reveal ──────────────────────────────────────────── */
(function reveal() {
  const els = $$('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, { threshold: .1, rootMargin: '0px 0px -50px 0px' });

  els.forEach((el, i) => {
    el.style.transitionDelay = ((i % 5) * 70) + 'ms';
    io.observe(el);
  });
})();

/* ── Animated counters ──────────────────────────────────────── */
(function counters() {
  $$('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    let started = false;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      const dur = 1800;
      let t0;
      function step(now) {
        if (!t0) t0 = now;
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) raf(step);
      }
      raf(step);
      io.disconnect();
    }, { threshold: .5 });
    io.observe(el);
  });
})();

/* ── Hero canvas — flowing curves ───────────────────────────── */
(function heroCanvas() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, t = 0;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    H = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  const curves = [
    { amp: .22, freq: .9,  phase: 0,    thick: 1.5, alpha: .18, color: '#07d9c0' },
    { amp: .16, freq: 1.3, phase: 1.2,  thick: 1,   alpha: .10, color: '#07d9c0' },
    { amp: .12, freq: .7,  phase: 2.4,  thick: .8,  alpha: .07, color: '#f0c040' },
    { amp: .08, freq: 1.7, phase: 3.6,  thick: .6,  alpha: .06, color: '#07d9c0' },
  ];

  function draw() {
    ctx.clearRect(0, 0, W, H);

    curves.forEach(c => {
      ctx.beginPath();
      const steps = 180;
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * W;
        const y = H * .5
          + Math.sin(i / steps * Math.PI * 2 * c.freq + t + c.phase) * H * c.amp
          + Math.sin(i / steps * Math.PI * 3.1 + t * .7 + c.phase) * H * c.amp * .4;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = c.color;
      ctx.globalAlpha = c.alpha;
      ctx.lineWidth   = c.thick * devicePixelRatio;
      ctx.lineJoin    = 'round';
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
    t += .006;
    raf(draw);
  }
  draw();
})();

/* ── Vision chart ───────────────────────────────────────────── */
(function visionChart() {
  const canvas = $('#visionChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, prog = 0, animId;
  let started = false;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    H = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  resize();
  new ResizeObserver(() => { resize(); draw(prog); }).observe(canvas);

  const data = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct'],
    lines: [
      { pts: [.80,.74,.65,.58,.50,.40,.32,.27,.20,.14], color: '#07d9c0', fill: true,  thick: 2.5, dash: [],   label: 'ClearCurve Zone™' },
      { pts: [.14,.20,.30,.42,.50,.60,.68,.73,.78,.82], color: '#f05060', fill: false, thick: 1.5, dash: [6,4], label: 'Market Saturation'  },
      { pts: [.46,.52,.58,.64,.68,.70,.66,.58,.48,.36], color: '#f0c040', fill: false, thick: 1.5, dash: [4,5], label: 'Demand Momentum'    },
    ]
  };

  function draw(p) {
    const DPR = devicePixelRatio;
    const pad = { t: 28*DPR, r: 16*DPR, b: 44*DPR, l: 44*DPR };
    const cw = W - pad.l - pad.r;
    const ch = H - pad.t - pad.b;
    ctx.clearRect(0, 0, W, H);

    // grid
    ctx.strokeStyle = 'rgba(7,217,192,.06)';
    ctx.lineWidth   = .5;
    for (let i = 0; i <= 5; i++) {
      const y = pad.t + ch/5*i;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l+cw, y); ctx.stroke();
    }
    for (let i = 0; i <= 9; i++) {
      const x = pad.l + cw/9*i;
      ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t+ch); ctx.stroke();
    }

    // axis labels
    ctx.fillStyle = '#3a4e6a'; ctx.font = `${9*DPR}px "GeistMono","Courier New",monospace`;
    ctx.textAlign = 'center';
    data.labels.forEach((l, i) => ctx.fillText(l, pad.l + cw/9*i, pad.t+ch+14*DPR));
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) ctx.fillText((4-i)*25+'%', pad.l-6*DPR, pad.t+ch/4*i+3*DPR);

    // lines
    const n = Math.max(2, Math.floor(p * (data.lines[0].pts.length - 1)) + 1);
    data.lines.forEach(line => {
      const pts = line.pts.slice(0, n);
      ctx.beginPath();
      pts.forEach((v, i) => {
        const x = pad.l + cw/(data.lines[0].pts.length-1)*i;
        const y = pad.t + ch*(1-v);
        i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      });
      if (line.fill) {
        const lx = pad.l + cw/(data.lines[0].pts.length-1)*(pts.length-1);
        ctx.lineTo(lx, pad.t+ch); ctx.lineTo(pad.l, pad.t+ch); ctx.closePath();
        const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t+ch);
        grad.addColorStop(0, 'rgba(7,217,192,.15)');
        grad.addColorStop(1, 'rgba(7,217,192,.01)');
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath();
        pts.forEach((v,i) => {
          const x = pad.l + cw/(data.lines[0].pts.length-1)*i;
          const y = pad.t + ch*(1-v);
          i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
        });
      }
      ctx.strokeStyle = line.color;
      ctx.lineWidth   = line.thick * DPR;
      ctx.lineJoin    = 'round'; ctx.lineCap = 'round';
      ctx.setLineDash(line.dash.map(d=>d*DPR));
      ctx.stroke(); ctx.setLineDash([]);
      // endpoint dot
      if (pts.length > 1) {
        const li = pts.length-1;
        const ex = pad.l + cw/(data.lines[0].pts.length-1)*li;
        const ey = pad.t + ch*(1-pts[li]);
        ctx.beginPath(); ctx.arc(ex, ey, 3.5*DPR, 0, Math.PI*2);
        ctx.fillStyle = line.color; ctx.fill();
      }
    });

    // legend
    data.lines.forEach((l,i) => {
      const lx = pad.l + (cw/data.lines.length)*i;
      const ly = pad.t - 14*DPR;
      ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx+16*DPR, ly);
      ctx.strokeStyle = l.color; ctx.lineWidth = 1.5*DPR;
      ctx.setLineDash(l.dash.map(d=>d*DPR)); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#7e96bb'; ctx.font = `${8.5*DPR}px "GeistMono","Courier New",monospace`;
      ctx.textAlign = 'left'; ctx.fillText(l.label, lx+20*DPR, ly+3*DPR);
    });
  }

  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting || started) return;
    started = true;
    function anim() {
      prog = Math.min(1, prog + .014);
      draw(prog);
      if (prog < 1) animId = raf(anim);
    }
    anim();
    io.disconnect();
  }, { threshold: .25 });
  io.observe(canvas);
})();

/* ── Opportunity matrix canvas ──────────────────────────────── */
(function matrixCanvas() {
  const canvas = $('#matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, hovered = null;

  function resize() {
    W = canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    H = canvas.height = canvas.offsetHeight * devicePixelRatio;
    draw();
  }
  resize();
  new ResizeObserver(resize).observe(canvas);

  const niches = [
    { label:'Bamboo Office Chairs',      x:.78, y:.80, r:18, hot:true  },
    { label:'Analog ADHD Productivity',  x:.85, y:.70, r:14, hot:true  },
    { label:'RFID Wallets',              x:.72, y:.62, r:12, hot:true  },
    { label:'Smart Recovery Tools',      x:.82, y:.52, r:10, hot:true  },
    { label:'Eco Packaging',             x:.68, y:.76, r: 9, hot:true  },
    { label:'Generic Fitness',           x:.22, y:.20, r:22, hot:false },
    { label:'Productivity Apps',         x:.18, y:.28, r:20, hot:false },
    { label:'Sustainable Fashion',       x:.48, y:.44, r:14, hot:false },
    { label:'Home Office Decor',         x:.42, y:.58, r:12, hot:false },
  ];

  const DPR = devicePixelRatio;

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * DPR;
    const my = (e.clientY - rect.top)  * DPR;
    const pad = 52 * DPR;
    const prev = hovered;
    hovered = null;
    niches.forEach(n => {
      const cx = pad + n.x * (W - pad*2);
      const cy = H - pad - n.y * (H - pad*2);
      if (Math.hypot(mx-cx, my-cy) < (n.r+6)*DPR) hovered = n;
    });
    if (hovered !== prev) draw();
  });
  canvas.addEventListener('mouseleave', () => { hovered = null; draw(); });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const pad = 52 * DPR;
    const cw = W - pad*2;
    const ch = H - pad*2;
    const mx = pad + cw*.5;
    const my = pad + ch*.5;

    // quadrant fills
    const quads = [
      { x:mx, y:pad,    w:W-mx-pad, h:my-pad,    fill:'rgba(7,217,192,.03)' },  // top-right
      { x:pad,y:pad,    w:mx-pad,   h:my-pad,    fill:'rgba(240,80,96,.03)'  },  // top-left
      { x:mx, y:my,     w:W-mx-pad, h:H-my-pad,  fill:'rgba(240,192,64,.03)' },  // bot-right
      { x:pad,y:my,     w:mx-pad,   h:H-my-pad,  fill:'rgba(255,255,255,.01)'},  // bot-left
    ];
    quads.forEach(q => { ctx.fillStyle=q.fill; ctx.fillRect(q.x,q.y,q.w,q.h); });

    // grid
    ctx.strokeStyle = 'rgba(7,217,192,.06)'; ctx.lineWidth = .5;
    for (let i=0;i<=4;i++) {
      const x=pad+cw/4*i, y=pad+ch/4*i;
      ctx.beginPath();ctx.moveTo(x,pad);ctx.lineTo(x,pad+ch);ctx.stroke();
      ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(pad+cw,y);ctx.stroke();
    }
    // axes
    ctx.strokeStyle='rgba(7,217,192,.18)'; ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(mx,pad);ctx.lineTo(mx,pad+ch);ctx.stroke();
    ctx.beginPath();ctx.moveTo(pad,my);ctx.lineTo(pad+cw,my);ctx.stroke();

    // labels
    ctx.fillStyle='#3a4e6a'; ctx.font=`bold ${8*DPR}px "Instrument Sans",sans-serif`;
    ctx.textAlign='right'; ctx.fillText('CLEARCURVE ZONE™', W-pad-4*DPR, pad+12*DPR);
    ctx.fillStyle='rgba(240,80,96,.45)'; ctx.textAlign='left'; ctx.fillText('SATURATED', pad+4*DPR, pad+12*DPR);
    ctx.fillStyle='rgba(240,192,64,.35)'; ctx.textAlign='right'; ctx.fillText('EMERGING', W-pad-4*DPR, H-pad-6*DPR);
    ctx.fillStyle='rgba(255,255,255,.12)'; ctx.textAlign='left'; ctx.fillText('DECLINING', pad+4*DPR, H-pad-6*DPR);

    // axis text
    ctx.fillStyle='#3a4e6a'; ctx.font=`${7*DPR}px "GeistMono","Courier New",monospace`;
    ctx.textAlign='center'; ctx.fillText('← HIGH COMPETITION  |  LOW COMPETITION →', W/2, H-8*DPR);
    ctx.save(); ctx.translate(12*DPR, H/2); ctx.rotate(-Math.PI/2);
    ctx.fillText('← LOW DEMAND  |  HIGH DEMAND →', 0, 0); ctx.restore();

    // bubbles
    niches.forEach(n => {
      const cx = pad + n.x*cw;
      const cy = H - pad - n.y*ch;
      const r  = n.r * DPR;
      const isHov = hovered === n;

      ctx.beginPath(); ctx.arc(cx, cy, r*(isHov?1.3:1), 0, Math.PI*2);
      if (n.hot) {
        const g = ctx.createRadialGradient(cx,cy,0,cx,cy,r);
        g.addColorStop(0,'rgba(7,217,192,.75)');
        g.addColorStop(1,'rgba(7,217,192,.12)');
        ctx.fillStyle=g; ctx.strokeStyle='#07d9c0';
      } else {
        ctx.fillStyle='rgba(62,78,106,.28)'; ctx.strokeStyle='rgba(62,78,106,.45)';
      }
      ctx.lineWidth=1.5; ctx.fill(); ctx.stroke();

      if (isHov) {
        ctx.fillStyle = n.hot ? '#07d9c0' : '#7e96bb';
        ctx.font = `bold ${9*DPR}px "Instrument Sans",sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, cx, cy - r - 7*DPR);
      }
    });
  }
})();

/* ── Tabs ───────────────────────────────────────────────────── */
(function tabs() {
  $$('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.tab;
      $$('.tab-btn').forEach(b => b.classList.remove('active'));
      $$('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      $('#tab-'+id)?.classList.add('active');
    });
  });
})();

/* ── FAQ accordion ──────────────────────────────────────────── */
(function faq() {
  $$('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      $$('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ── Waitlist form ──────────────────────────────────────────── */
(function waitlist() {
  const form    = $('#waitlist-form');
  const input   = $('#waitlist-email');
  const success = $('#waitlist-success');
  const count   = $('#signup-count');
  if (!form) return;

  let n = 1247;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = input.value.trim();
    if (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      input.classList.add('input--error');
      input.focus();
      setTimeout(() => input.classList.remove('input--error'), 2000);
      return;
    }
    form.style.opacity = '0';
    form.style.pointerEvents = 'none';
    setTimeout(() => {
      form.style.display = 'none';
      success?.classList.add('show');
      if (count) count.textContent = (++n).toLocaleString();
    }, 300);
  });
})();

/* ── Floating particles ─────────────────────────────────────── */
(function particles() {
  const hero = $('#hero');
  if (!hero) return;
  const style = document.createElement('style');
  style.textContent = '@keyframes fp{0%{transform:translateY(0) translateX(0);opacity:0}20%{opacity:1}80%{opacity:.6}100%{transform:translateY(-120px) translateX(var(--dx));opacity:0}}';
  document.head.appendChild(style);

  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    const isTeal = Math.random() > .35;
    p.style.cssText = `
      position:absolute;
      width:${Math.random()*2.5+.5}px;
      height:${Math.random()*2.5+.5}px;
      border-radius:50%;
      background:${isTeal ? 'rgba(7,217,192,' : 'rgba(240,192,64,'}${(Math.random()*.25+.08)});
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dx:${(Math.random()-.5)*50}px;
      pointer-events:none;
      animation:fp ${Math.random()*10+8}s ease-in-out ${Math.random()*6}s infinite;
    `;
    hero.appendChild(p);
  }
})();

/* ── Smooth scroll for anchor links ─────────────────────────── */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
  });
});
