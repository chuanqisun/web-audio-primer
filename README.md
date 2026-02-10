# Web Audio Modular Synthesis: An Interactive Primer

**Course Objective:**  
To provide a comprehensive, hands-on understanding of modular synthesis using the Web Audio API. This course moves from the fundamental physics of sound to complex generative systems and advanced digital signal processing (DSP), all demonstrated through interactive, executable JavaScript modules.

---

## Phase 1: The Foundation (Voice Architecture)

_Focus: Understanding the core components of a subtractive synthesizer voice._

**Module Page:** [phase-1.html](phase-1.html)

### Module 1: The Oscillator (VCO)

- **Concept:** The source of sound. Frequency (Pitch) vs. Amplitude (Loudness).
- **Waveforms:** Sine, Triangle, Sawtooth, Square (Pulse).
- **Interactive Demo:** A playable oscillator with frequency slider and waveform selector.

### Module 2: The Amplifier (VCA) & Envelopes

- **Concept:** Articulation. Shaping volume over time using an Envelope Generator (ADSR).
- **Key Terms:** Gate, Trigger, Attack, Decay, Sustain, Release.
- **Interactive Demo:** A button triggers a note. Sliders adjust Attack and Release times to shape the volume contour.

### Module 3: The Filter (VCF) & Modulation

- **Concept:** Timbre sculpting. Removing frequencies to shape the "color" of the sound.
- **Modulation:** Using a Low Frequency Oscillator (LFO) to automate the filter cutoff (Wah-wah effect).
- **Interactive Demo:** A Sawtooth wave passing through a Low Pass Filter. An LFO automatically sweeps the cutoff frequency.

### Module 4: Signal Logic & Utilities

- **Concept:** Mixing and scaling signals.
- **The Mixer:** Summing multiple audio signals (Oscillators) to create complex textures.
- **Attenuverters:** Scaling (Attenuation) and Inverting control voltages (Maths).
- **Interactive Demo:** A 3-channel mixer for a chord drone; an LFO attenuverter showing positive vs. negative modulation.

### Module 5: Advanced Modulation (FM & Slew)

- **Concept:** Audio-rate modulation and voltage smoothing.
- **Frequency Modulation (FM):** Using one oscillator to modulate the pitch of another at audio rates to create metallic sidebands.
- **Slew Limiting:** Smoothing abrupt voltage changes (Glide/Portamento).
- **Interactive Demo:** An FM synth with Ratio/Index controls; a sequencer with adjustable Glide.

### Module 6: West Coast Synthesis

- **Concept:** Additive and organic synthesis (Buchla style).
- **Wavefolding:** Adding harmonics to a simple wave by folding it back on itself.
- **Low Pass Gate (LPG):** Simulating the physics of struck objects (coupling amplitude and brightness).
- **Interactive Demo:** A Wavefolder visualizer; a "Bongo" generator using a simulated Vactrol LPG.

### 🎸 Phase 1 Jam: The Monosynth Playground

**Jam Page:** [jam-1.html](jam-1.html)

- **Objective:** Combine VCO, VCF, VCA, LFO, and West Coast elements into a playable instrument.
- **The Rig:** A single-voice synthesizer.
  - **Oscillator Section:** Mixable Saw/Square/Folded Sine.
  - **Filter Section:** Low Pass Filter with Envelope modulation.
  - **Effects:** A simple Delay line.
  - **Control:** A 16-step sequencer to drive the pitch and gate.
- **User Action:** Create a bassline sequence, tweak the filter cutoff live, and add "West Coast" grit using the Wavefolder knob.

---

## Phase 2: Intermediate Modular (Generative & Rhythmic Systems)

_Focus: Moving from "playing a synth" to "designing a system that plays itself."_

**Module Page:** [phase-2.html](phase-2.html)

### Module 7: Logic & Boolean Operations

- **Concept:** Rhythmic logic. Using Gates (AND, OR, XOR, NOT) to combine clock signals.
- **Application:** Creating complex, evolving drum patterns from simple steady clocks.
- **Interactive Demo:** Two clock dividers feeding a Logic Gate visualizer to generate a drum beat.

### Module 8: Randomness & Probability

- **Concept:** Controlled chaos.
- **Bernoulli Gates:** A "coin toss" for signals. Routing a note to Path A or Path B based on probability.
- **Turing Machines:** Shift registers that create looping random sequences that can be locked or mutated.
- **Interactive Demo:** A hi-hat pattern generator where a slider controls the probability of a hit occurring.

### Module 9: Envelope Followers & Sidechaining

- **Concept:** Audio as a control source.
- **Envelope Following:** Extracting the amplitude contour of an audio signal to drive a filter or VCA.
- **Sidechaining:** Using a kick drum to "duck" the volume of a bassline.
- **Interactive Demo:** A kick drum automatically lowering the volume of a sustained chord (pumping effect).

### Module 10: Sequencing & Quantization

- **Concept:** Musical constraints.
- **Step Sequencing:** Storing voltage values in a list.
- **Quantization:** Forcing continuous voltages (like a random LFO) to the nearest musical note in a scale.
- **Interactive Demo:** A random voltage generator fed into a "Scale Quantizer" to produce a musical melody.

### 🥁 Phase 2 Jam: The Generative Techno System

**Jam Page:** [jam-2.html](jam-2.html)

- **Objective:** Build a self-playing rhythmic machine using Logic, Probability, and Sidechaining.
- **The Rig:**
  - **Kick Drum:** Driven by a steady clock (4/4).
  - **Hi-Hats:** Driven by Bernoulli Gates (random probability).
  - **Bassline:** A Turing Machine (random looping melody) fed into a Quantizer.
  - **Dynamics:** The Kick drum sidechains the Bassline (ducking).
- **User Action:** "Conduct" the system by changing probability sliders, locking/unlocking the bassline loop, and muting/unmuting parts.

---

## Phase 3: Advanced Modular (DSP & System Architecture)

_Focus: The math and physics behind the modules._

**Module Page:** [phase-3.html](phase-3.html)

### Module 11: Physical Modeling (Karplus-Strong)

- **Concept:** Simulating acoustic instruments using delay lines.
- **Algorithm:** Short bursts of noise fed into a high-feedback delay line to simulate a plucked string.
- **Interactive Demo:** A "Pluck" button that excites a delay line, with controls for String Tension (Delay Time) and Damping.

### Module 12: Granular Synthesis

- **Concept:** Microsound. Breaking audio into tiny "grains" (10-100ms).
- **Parameters:** Grain Size, Density, Jitter (Random Position), and Pitch.
- **Interactive Demo:** A sample buffer (e.g., a voice recording) being granulated into a cloud texture.

### Module 13: Feedback Loops & Chaos

- **Concept:** No-input mixing.
- **Technique:** Routing a mixer's output back into its own input to create self-oscillating feedback tones.
- **Interactive Demo:** A virtual mixer with a feedback path. EQ controls shape the pitch of the resulting "scream."

### Module 14: Spectral Processing (FFT)

- **Concept:** Frequency domain processing.
- **Vocoding:** Analyzing the spectral content of a Modulator (Voice) to impose it onto a Carrier (Synth).
- **Interactive Demo:** A simple 8-band Vocoder simulation using Bandpass filters.

### 🌌 Phase 3 Jam: The Ambient Soundscape Lab

**Jam Page:** [jam-3.html](jam-3.html)

- **Objective:** Create a texture-heavy, atmospheric composition using advanced DSP.
- **The Rig:**
  - **Texture Layer:** A Granular Cloud generator manipulating a vocal sample.
  - **Melodic Layer:** A Karplus-Strong "String" voice played by a slow, random sequencer.
  - **Noise Layer:** A Feedback Loop drone acting as a bed of sound.
  - **Space:** All layers fed into a massive Reverb (Convolver).
- **User Action:** Manipulate the "Grain Density" to freeze time, tune the feedback loop to harmonize with the strings, and wash everything out in reverb.

---

## Phase 4: The Ecosystem (Polyphony & Architecture)

_Focus: Managing complex systems._

**Module Page:** [phase-4.html](phase-4.html)

### Module 15: Polyphony & Voice Allocation

- **Concept:** Handling multiple notes.
- **Round-Robin:** Allocating incoming MIDI notes to a pool of available oscillator voices.
- **Interactive Demo:** A 4-voice visualizer showing how notes are cycled through available voices.

### Module 16: Function Generators (Slope)

- **Concept:** The "Swiss Army Knife" of modulation (e.g., Make Noise Maths).
- **Rise & Fall:** Defining a function by its slope times.
- **Modes:** One-shot (Envelope), Cycling (LFO), and Slew (Portamento).
- **Interactive Demo:** A Rise/Fall generator visualizer that switches behavior based on user mode selection.

### 🎹 Phase 4 Jam: The Polyphonic Performance Rack

**Jam Page:** [jam-4.html](jam-4.html)

- **Objective:** A full-featured performance synthesizer combining polyphony with complex modulation.
- **The Rig:**
  - **Poly-Synth:** A 4-voice polyphonic synthesizer (chords!).
  - **Modulation:** Two "Function Generators" (Maths style) modulating Filter Cutoff and Wavefolder amount.
  - **Arpeggiator:** A logic-based arpeggiator driving the polyphonic voices.
  - **Master Effects:** Stereo Chorus and Compression.
- **User Action:** Play chords via on-screen keyboard (or MIDI), use the Function Generators to create complex rhythmic envelopes, and perform a full track.
