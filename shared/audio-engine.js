/**
 * Shared Audio Engine utilities for Web Audio Modular Synthesis Primer
 */

/** Initialize AudioContext and wire up start button */
function initAudioEngine(btnId, statusId) {
  let ctx;
  let isReady = false;
  const btn = document.getElementById(btnId);
  const status = document.getElementById(statusId);

  btn.addEventListener("click", async () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") await ctx.resume();
    isReady = true;
    status.innerText = "Running";
    status.style.color = "green";
    btn.disabled = true;
    if (typeof onAudioReady === "function") onAudioReady();
  });

  return {
    get ctx() { return ctx; },
    get isReady() { return isReady; },
    ensureCtx() {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      return ctx;
    }
  };
}

/** Create a waveform oscilloscope on a canvas */
function createScope(ctx, canvasId, sourceNode) {
  const canvas = document.getElementById(canvasId);
  const canvasCtx = canvas.getContext("2d");
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  sourceNode.connect(analyser);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    if (!document.getElementById(canvasId)) return;
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "#fff";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "#000";
    canvasCtx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * canvas.height) / 2;
      if (i === 0) canvasCtx.moveTo(x, y);
      else canvasCtx.lineTo(x, y);
      x += sliceWidth;
    }
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }
  draw();
  return analyser;
}

/** Sync canvas internal resolution with display size (for DPR) */
function syncCanvasSize(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const w = Math.round(rect.width * dpr);
  const h = Math.round(rect.height * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
}

/** Create a dual-scope renderer (waveform + frequency) */
function createDualScope(analyser, waveCanvasId, freqCanvasId) {
  const waveCanvas = document.getElementById(waveCanvasId);
  const freqCanvas = document.getElementById(freqCanvasId);
  const wc = waveCanvas.getContext("2d");
  const fc = freqCanvas.getContext("2d");
  const bufLen = analyser.frequencyBinCount;
  const timeBuf = new Uint8Array(bufLen);
  const freqBuf = new Uint8Array(bufLen);

  function render() {
    requestAnimationFrame(render);
    syncCanvasSize(waveCanvas);
    syncCanvasSize(freqCanvas);

    analyser.getByteTimeDomainData(timeBuf);
    const ww = waveCanvas.width, wh = waveCanvas.height;
    wc.fillStyle = "#fff";
    wc.fillRect(0, 0, ww, wh);
    wc.strokeStyle = "#ddd";
    wc.lineWidth = 1;
    wc.beginPath();
    wc.moveTo(0, wh / 2);
    wc.lineTo(ww, wh / 2);
    wc.stroke();
    wc.lineWidth = 1.5;
    wc.strokeStyle = "#07a";
    wc.beginPath();
    const sliceW = ww / bufLen;
    for (let i = 0; i < bufLen; i++) {
      const y = (timeBuf[i] / 255) * wh;
      if (i === 0) wc.moveTo(0, y);
      else wc.lineTo(i * sliceW, y);
    }
    wc.stroke();

    analyser.getByteFrequencyData(freqBuf);
    const fw = freqCanvas.width, fh = freqCanvas.height;
    fc.fillStyle = "#fff";
    fc.fillRect(0, 0, fw, fh);
    const barCount = Math.min(bufLen, fw);
    const barW = fw / barCount;
    for (let i = 0; i < barCount; i++) {
      const v = freqBuf[i] / 255;
      const barH = v * fh;
      fc.fillStyle = `hsl(${200 - v * 160}, 70%, ${50 - v * 20}%)`;
      fc.fillRect(i * barW, fh - barH, Math.max(barW - 0.5, 1), barH);
    }
  }
  render();
}

/** Bind slider to display value and optional callback */
function bindSlider(sliderId, displayId, cb) {
  const s = document.getElementById(sliderId);
  const d = document.getElementById(displayId);
  s.addEventListener("input", () => {
    d.innerText = s.value;
    if (cb) cb(parseFloat(s.value));
  });
}

/** Get float value from slider */
function gv(id) {
  return parseFloat(document.getElementById(id).value);
}

/** Set slider value and dispatch input event */
function setSlider(id, value) {
  const el = document.getElementById(id);
  const min = parseFloat(el.min);
  const max = parseFloat(el.max);
  value = Math.max(min, Math.min(max, value));
  el.value = value;
  el.dispatchEvent(new Event("input"));
}

/** Generate a wavefold distortion curve */
function makeWavefoldCurve(amount) {
  const n = 44100, curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = Math.sin(x * Math.PI * amount);
  }
  return curve;
}

/** Flash panels to indicate preset change */
function flashPanels() {
  document.querySelectorAll(".panel").forEach((p) => {
    p.classList.remove("unflash");
    p.classList.add("flash");
    setTimeout(() => {
      p.classList.remove("flash");
      p.classList.add("unflash");
    }, 100);
  });
}

/** Apply a preset object to sliders */
function applyPreset(preset) {
  for (const [id, val] of Object.entries(preset)) {
    setSlider(id, val);
  }
  flashPanels();
}

/** Euclidean rhythm pattern generator */
function euclidean(steps, hits) {
  const pattern = [];
  let bucket = 0;
  for (let i = 0; i < steps; i++) {
    bucket += hits;
    if (bucket >= steps) {
      bucket -= steps;
      pattern.push(true);
    } else {
      pattern.push(false);
    }
  }
  return pattern;
}

/** Weighted random choice */
function weightedChoice(items, weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}
