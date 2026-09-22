// Tactical Web Audio Synthesizer for God's Eye 3D View
// Delivers realistic radio squelch, ATC chatter bursts, radar sweeps, and sensor optical sound effects with zero external network dependencies.

class TacticalAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private atcInterval: any = null;
  private nvgOsc: OscillatorNode | null = null;
  private nvgGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.nvgGain && this.ctx) {
      this.nvgGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  // Play a tactical target lock beep
  public playTargetLock() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // Play a mechanical optical shutter click (FLIR / sensor mode swap)
  public playOpticClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.008));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 3;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Radar 360-degree sweep ping
  public playRadarPing() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // Night Vision Goggle tube power whine
  public setNvgHum(active: boolean) {
    this.initCtx();
    if (!this.ctx) return;

    if (active && !this.isMuted) {
      if (!this.nvgOsc) {
        this.nvgOsc = this.ctx.createOscillator();
        this.nvgGain = this.ctx.createGain();
        this.nvgOsc.type = 'sine';
        this.nvgOsc.frequency.setValueAtTime(13800, this.ctx.currentTime); // high freq tube inverter
        this.nvgGain.gain.setValueAtTime(0.008, this.ctx.currentTime); // very subtle
        this.nvgOsc.connect(this.nvgGain);
        this.nvgGain.connect(this.ctx.destination);
        this.nvgOsc.start();
      }
    } else {
      if (this.nvgOsc) {
        try {
          this.nvgOsc.stop();
          this.nvgOsc.disconnect();
        } catch (e) {}
        this.nvgOsc = null;
        this.nvgGain = null;
      }
    }
  }

  // Tactical ATC Radio Simulator (Squelch + voice chatter simulation + Roger beep)
  public startAtcRadio(frequency: string = '118.700 MHz') {
    this.initCtx();
    this.stopAtcRadio();

    // Trigger initial squelch break
    this.playSquelchBurst();

    // Periodic randomized transmissions
    this.atcInterval = setInterval(() => {
      if (!this.isMuted && Math.random() > 0.3) {
        this.playSquelchBurst();
      }
    }, 6500);
  }

  public stopAtcRadio() {
    if (this.atcInterval) {
      clearInterval(this.atcInterval);
      this.atcInterval = null;
    }
  }

  // Play authentic radio squelch break and roger tone
  private playSquelchBurst() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const burstDuration = 0.6 + Math.random() * 0.8;
    const bufferSize = Math.floor(this.ctx.sampleRate * burstDuration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Modulated white noise simulating AM aviation radio
      const mod = Math.sin(i / 18) * 0.4 + Math.sin(i / 7) * 0.2;
      data[i] = (Math.random() * 2 - 1) * (0.15 + mod * 0.08);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Aviation radio bandpass filter (300 Hz - 3400 Hz communications band)
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1400;
    filter.Q.value = 1.4;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.07, now);
    gain.gain.setValueAtTime(0.07, now + burstDuration - 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + burstDuration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();

    // End of transmission: Roger Quindar Beep
    setTimeout(() => {
      if (this.isMuted || !this.ctx) return;
      const rogerOsc = this.ctx.createOscillator();
      const rogerGain = this.ctx.createGain();
      rogerOsc.type = 'sine';
      rogerOsc.frequency.setValueAtTime(1020, this.ctx.currentTime); // Standard 1020 Hz VHF roger tone
      rogerGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      rogerGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      rogerOsc.connect(rogerGain);
      rogerGain.connect(this.ctx.destination);
      rogerOsc.start();
      rogerOsc.stop(this.ctx.currentTime + 0.08);
    }, burstDuration * 1000);
  }
}

export const tacticalAudio = new TacticalAudioEngine();
