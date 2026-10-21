// Synthesized Web Audio UPI chime & Voice Soundbox

export const playPaymentSuccessChime = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Harmonic two-tone chord chime (PhonePe / Apple Pay inspired luxury chime)
    const now = ctx.currentTime;
    
    // First high chime (C6 = 1046.5Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1046.5, now);
    osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // Ramp to E6
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.5);

    // Second celebratory chime (G6 = 1567.98Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1567.98, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(2093.0, now + 0.25); // Ramp to C7
    gain2.gain.setValueAtTime(0.35, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.8);
  } catch (err) {
    console.warn('Audio playback error:', err);
  }
};

export const playSoundboxAnnouncement = (amount) => {
  // First play the chime
  playPaymentSuccessChime();

  // Then speak in Indian English soundbox style
  if ('speechSynthesis' in window) {
    setTimeout(() => {
      window.speechSynthesis.cancel();
      const text = `Received ${amount} rupees on Infinity UPI`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.1;
      
      // Try to find an English (India) voice if available
      const voices = window.speechSynthesis.getVoices();
      const inVoice = voices.find(v => v.lang === 'en-IN' || v.lang.includes('IN'));
      if (inVoice) {
        utterance.voice = inVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }, 600);
  }
};
