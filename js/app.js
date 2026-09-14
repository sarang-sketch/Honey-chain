/**
 * Honey Chain - Core Application Engine & Interactions
 * Honey Chain Platform — National Apiculture Ledger
 */

(function () {
  // --- Global Navigation & Path Mapping ---
  const PATH_MAP = {
    'overview-dashboard': 'index.html',
    'my-hives-iot-live': 'beekeeper-dashboard.html',
    'ai-health-insights': 'ai-health.html',
    'harvest-batching': 'harvest-batch.html',
    'batch-traceability-blockchain': 'batch-traceability.html',
    'consumer-qr-scanner': 'consumer-qr.html'
  };

  // --- Toast Notification System ---
  window.HoneyToast = function (message, type = 'success') {
    let container = document.getElementById('honey-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'honey-toast-container';
      container.className = 'fixed top-3 sm:top-5 right-3 sm:right-5 left-3 sm:left-auto max-w-sm z-[9999] flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColors = {
      success: 'bg-[#1b4332] text-white border-primary-fixed/40',
      info: 'bg-[#121c2a] text-white border-outline-variant',
      warning: 'bg-[#d97706] text-white border-secondary-fixed/40',
      error: 'bg-[#ba1a1a] text-white border-red-300'
    };
    const icons = {
      success: 'check_circle',
      info: 'info',
      warning: 'warning',
      error: 'error'
    };

    toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium border transition-all duration-300 transform translate-y-[-10px] opacity-0 pointer-events-auto ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px]">${icons[type] || 'info'}</span>
      <span class="flex-1">${message}</span>
      <button class="ml-2 opacity-70 hover:opacity-100 transition-opacity" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-[-10px]', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-[-10px]');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // --- Web Audio API Bio-Acoustic Synthesizer ---
  class HoneyAudioEngine {
    constructor() {
      this.ctx = null;
      this.osc1 = null;
      this.osc2 = null;
      this.gainNode = null;
      this.isPlaying = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
    }

    playHum(freq = 240, type = 'worker') {
      try {
        this.init();
        if (this.isPlaying) this.stopHum();

        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }

        const now = this.ctx.currentTime;
        this.osc1 = this.ctx.createOscillator();
        this.osc2 = this.ctx.createOscillator();
        this.gainNode = this.ctx.createGain();

        // Fundamental frequency and harmonic overtone for bee buzz
        this.osc1.type = 'sawtooth';
        this.osc1.frequency.setValueAtTime(freq, now);

        this.osc2.type = 'triangle';
        this.osc2.frequency.setValueAtTime(freq * 1.5, now);

        // Low pass filter to simulate warm wooden hive chamber acoustics
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(type === 'queen' ? 1200 : 750, now);

        // Gentle volume ramping to avoid clicks
        this.gainNode.gain.setValueAtTime(0.001, now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.1);

        this.osc1.connect(filter);
        this.osc2.connect(filter);
        filter.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        this.osc1.start(now);
        this.osc2.start(now);
        this.isPlaying = true;

        return true;
      } catch (e) {
        console.warn('Web Audio playback error:', e);
        return false;
      }
    }

    stopHum() {
      if (this.isPlaying && this.gainNode && this.ctx) {
        try {
          const now = this.ctx.currentTime;
          this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
          setTimeout(() => {
            if (this.osc1) { this.osc1.stop(); this.osc1.disconnect(); }
            if (this.osc2) { this.osc2.stop(); this.osc2.disconnect(); }
            this.isPlaying = false;
          }, 120);
        } catch (e) {
          this.isPlaying = false;
        }
      }
    }
  }
  window.HoneyAudio = new HoneyAudioEngine();

  // --- Modal Helpers ---
  window.HoneyModal = {
    _activeId: null,
    open(modalId) {
      const el = document.getElementById(modalId);
      if (el) {
        el.classList.remove('hidden');
        el.classList.add('flex');
        document.body.style.overflow = 'hidden';
        this._activeId = modalId;
      }
    },
    close(modalId) {
      const el = document.getElementById(modalId);
      if (el) {
        el.classList.add('hidden');
        el.classList.remove('flex');
        document.body.style.overflow = '';
        if (this._activeId === modalId) this._activeId = null;
      }
    },
    closeActive() {
      if (this._activeId) this.close(this._activeId);
    }
  };

  // ESC key closes active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.HoneyModal.closeActive();
  });

  // Click on modal backdrop (the fixed overlay) closes it
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('fixed') && target.classList.contains('inset-0') && !target.classList.contains('hidden')) {
      const modalId = target.id;
      if (modalId) window.HoneyModal.close(modalId);
    }
  });

  // --- Copy to Clipboard with Toast ---
  window.copyLedgerHash = function (hash) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hash).then(() => {
        window.HoneyToast(`Copied root hash: ${hash.slice(0, 14)}...`, 'success');
      }).catch(() => {
        fallbackCopy(hash);
      });
    } else {
      fallbackCopy(hash);
    }
  };

  function fallbackCopy(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    window.HoneyToast(`Copied: ${text.slice(0, 14)}...`, 'success');
  }

  // --- Active Nav & Link Wiring ---
  function initNavigation() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Wire up sidebar links with data-path
    document.querySelectorAll('[data-path]').forEach(link => {
      const targetPath = link.getAttribute('data-path');
      const targetUrl = PATH_MAP[targetPath];

      if (targetUrl) {
        link.setAttribute('href', targetUrl);

        // Highlight active page
        if (currentPath === targetUrl || (currentPath === '' && targetUrl === 'index.html')) {
          link.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-high');
          link.classList.add('bg-primary-container', 'text-on-primary', 'font-semibold');
          link.setAttribute('aria-current', 'page');

          const icon = link.querySelector('.material-symbols-outlined');
          if (icon) {
            icon.classList.remove('text-on-surface-variant');
            icon.classList.add('text-on-primary');
          }
        } else {
          link.removeAttribute('aria-current');
          if (link.getAttribute('href') !== currentPath) {
            link.classList.remove('bg-primary-container', 'text-on-primary', 'font-semibold');
            link.classList.add('text-on-surface-variant', 'hover:bg-surface-container-high');
          }
        }
      }
    });

    // Wire up logo click to home
    const brandLogo = document.querySelector('aside .h-16 a, aside .h-16');
    if (brandLogo && !brandLogo.closest('a')) {
      brandLogo.style.cursor = 'pointer';
      brandLogo.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }

    // System Settings & Guide click
    document.querySelectorAll('[data-path="system-settings-help"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.HoneyModal.open('honey-guide-modal');
      });
    });

    // Stakeholder Portals — open on-page modal instead of navigating away
    document.querySelectorAll('[data-path="stakeholder-portals"]').forEach(el => {
      el.setAttribute('href', 'javascript:void(0)');
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.HoneyModal.open('stakeholder-portals-modal');
      });
    });
  }

  // --- Header Profile & Role Sync ---
  function initHeaderUser() {
    if (!window.HoneyDataStore) return;
    const currentRole = window.HoneyDataStore.getCurrentRole();

    // Update Role Tag
    document.querySelectorAll('header .role-display-title, header span:has(+ expand_more)').forEach(el => {
      if (el.classList.contains('text-primary') && el.textContent.includes('Apiarist') || el.classList.contains('role-title-tag')) {
        el.textContent = currentRole.shortTitle || currentRole.title;
      }
    });

    // Update User Name and Role text in header
    const nameEl = document.querySelector('header .flex-col span.text-on-surface');
    if (nameEl) nameEl.textContent = currentRole.userName;

    const subEl = document.querySelector('header .flex-col span.text-on-surface-variant');
    if (subEl) subEl.textContent = currentRole.userRole;

    // Setup interactive role switcher dropdown on header role pill
    const rolePill = document.querySelector('header .bg-surface-container-low:has(expand_more), header .role-switcher-pill');
    if (rolePill && !rolePill.hasAttribute('data-has-dropdown')) {
      rolePill.setAttribute('data-has-dropdown', 'true');
      rolePill.style.cursor = 'pointer';
      rolePill.title = 'Click to switch stakeholder persona';

      rolePill.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleRoleDropdown(rolePill);
      });
    }

    // Header Notifications button
    const notifBtn = document.querySelector('header button:has(notifications)');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        window.HoneyModal.open('honey-notifications-modal');
      });
    }
  }

  function toggleRoleDropdown(anchorEl) {
    let dropdown = document.getElementById('header-role-dropdown');
    if (dropdown) {
      dropdown.remove();
      return;
    }

    const roles = window.HoneyDataStore.getRoles();
    const currentRole = window.HoneyDataStore.getCurrentRole();

    dropdown = document.createElement('div');
    dropdown.id = 'header-role-dropdown';
    dropdown.className = 'fixed bg-surface-container-lowest rounded-xl shadow-2xl border border-surface-variant p-2 w-72 max-w-[calc(100vw-24px)] z-50 flex flex-col gap-1';

    const rect = anchorEl.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + 8}px`;
    dropdown.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - 300))}px`;

    let html = `
      <div class="px-3 py-2 border-b border-surface-variant text-xs font-semibold text-on-surface-variant uppercase tracking-wider flex justify-between items-center">
        <span>Switch Stakeholder Persona</span>
        <span class="text-primary font-bold">v2.4</span>
      </div>
    `;

    Object.values(roles).forEach(role => {
      const isCurrent = role.key === currentRole.key;
      html += `
        <button class="flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${isCurrent ? 'bg-primary-fixed text-primary font-semibold' : 'hover:bg-surface-container text-on-surface'}" onclick="switchActiveRole('${role.key}')">
          <span class="material-symbols-outlined text-[20px] p-1.5 rounded-md ${isCurrent ? 'bg-primary text-white' : 'bg-surface-container-high'}">${role.icon}</span>
          <div class="flex flex-col min-w-0">
            <span class="text-sm font-semibold truncate">${role.shortTitle}</span>
            <span class="text-[11px] text-on-surface-variant truncate">${role.userName}</span>
          </div>
          ${isCurrent ? '<span class="material-symbols-outlined text-sm ml-auto text-primary">check</span>' : ''}
        </button>
      `;
    });

    dropdown.innerHTML = html;
    document.body.appendChild(dropdown);

    const closeHandler = (e) => {
      if (!dropdown.contains(e.target) && e.target !== anchorEl) {
        dropdown.remove();
        document.removeEventListener('click', closeHandler);
      }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 10);
  }

  window.switchActiveRole = function (roleKey) {
    const role = window.HoneyDataStore.setCurrentRole(roleKey);
    if (role) {
      window.HoneyToast(`Switched persona to: ${role.title}`, 'info');
      const dropdown = document.getElementById('header-role-dropdown');
      if (dropdown) dropdown.remove();
      initHeaderUser();

      // Ask if user wants to redirect to role dashboard
      if (window.location.pathname.split('/').pop() !== role.target) {
        setTimeout(() => {
          window.location.href = role.target;
        }, 300);
      }
    }
  };

  // --- Shared Modals Injection ---
  function injectSharedModals() {
    if (document.getElementById('honey-shared-modals-root')) return;

    const root = document.createElement('div');
    root.id = 'honey-shared-modals-root';
    root.innerHTML = `
      <!-- 1. Quick Verify / QR Scanner Modal -->
      <div id="quick-qr-modal" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm items-center justify-center p-4">
        <div class="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-4 sm:p-6 border border-surface-variant flex flex-col gap-4 sm:gap-5 relative max-h-[90vh] overflow-y-auto">
          <button class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container" onclick="HoneyModal.close('quick-qr-modal')">
            <span class="material-symbols-outlined">close</span>
          </button>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center">
              <span class="material-symbols-outlined text-2xl">qr_code_scanner</span>
            </div>
            <div>
              <h3 class="font-headline-sm text-headline-sm text-primary font-bold">Verify Honey Provenance</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">Instant Cryptographic Purity &amp; Batch Lookup</p>
            </div>
          </div>

          <!-- Simulated Camera Viewfinder -->
          <div class="relative w-full h-56 rounded-xl bg-[#121c2a] flex flex-col items-center justify-center overflow-hidden border-2 border-secondary/50">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/15 to-transparent animate-pulse"></div>
            <!-- Target Reticle -->
            <div class="w-40 h-40 border-2 border-dashed border-secondary rounded-xl flex items-center justify-center relative">
              <span class="material-symbols-outlined text-secondary text-5xl opacity-80 animate-bounce">center_focus_strong</span>
              <div class="absolute -top-3 bg-secondary text-on-secondary text-[10px] px-2 py-0.5 rounded font-metric-mono uppercase tracking-wider font-bold">Scanning Area</div>
            </div>
            <p class="text-white/80 text-xs mt-3 font-metric-mono">Align jar QR hologram inside target box</p>
          </div>

          <!-- Or Manual Batch ID Input -->
          <div class="space-y-2">
            <label class="font-label-sm text-label-sm text-on-surface font-semibold flex justify-between">
              <span>Or Enter Batch Serial ID</span>
              <span class="text-secondary font-metric-mono text-xs">e.g. BCH2026A001</span>
            </label>
            <div class="flex gap-2">
              <input id="quickBatchInput" type="text" class="flex-1 h-11 px-3.5 rounded-lg bg-surface-container text-on-surface font-metric-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Enter Batch ID (e.g. BCH2026A001)" value="BCH2026A001" />
              <button class="px-5 h-11 bg-secondary hover:bg-on-secondary-container text-on-secondary rounded-lg font-label-md text-label-md font-semibold transition-colors flex items-center gap-1.5 shadow" onclick="handleQuickBatchLookup()">
                <span class="material-symbols-outlined text-sm">verified</span>
                <span>Verify</span>
              </button>
            </div>
          </div>

          <!-- Quick presets -->
          <div class="flex items-center gap-2 pt-1 overflow-x-auto">
            <span class="text-xs text-on-surface-variant shrink-0">Sample Batches:</span>
            <button class="px-2 py-1 bg-surface-container-low hover:bg-surface-container text-primary rounded text-xs font-metric-mono" onclick="document.getElementById('quickBatchInput').value='BCH2026A001'">BCH2026A001 (Himalayan)</button>
            <button class="px-2 py-1 bg-surface-container-low hover:bg-surface-container text-primary rounded text-xs font-metric-mono" onclick="document.getElementById('quickBatchInput').value='BCH2026B002'">BCH2026B002 (Coorg)</button>
            <button class="px-2 py-1 bg-surface-container-low hover:bg-surface-container text-primary rounded text-xs font-metric-mono" onclick="document.getElementById('quickBatchInput').value='BCH2026C003'">BCH2026C003 (Sundarbans)</button>
          </div>
        </div>
      </div>

      <!-- 2. System Settings & Architecture Guide Modal -->
      <div id="honey-guide-modal" class="hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm items-center justify-center p-4">
        <div class="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full p-6 border border-surface-variant flex flex-col gap-4 max-h-[90vh] overflow-y-auto relative">
          <button class="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container" onclick="HoneyModal.close('honey-guide-modal')">
            <span class="material-symbols-outlined">close</span>
          </button>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-2xl">menu_book</span>
            </div>
            <div>
              <h3 class="font-headline-sm text-headline-sm text-primary font-bold">Honey Chain Platform Guide</h3>
              <p class="font-body-sm text-body-sm text-on-surface-variant">National Apiculture Platform • System Architecture</p>
            </div>
          </div>

          <div class="space-y-3 text-sm text-on-surface leading-relaxed">
            <div class="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
              <span class="font-semibold text-primary flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">sensors</span>
                1. Field IoT Telemetry Layer
              </span>
              <p class="text-xs text-on-surface-variant">
                Sensors embedded in smart beehives continuously stream internal brood temperature, relative humidity, colony weight gain, acoustic frequency, and optical bee traffic over energy-efficient LoRaWAN gateways.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
              <span class="font-semibold text-primary flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">psychology</span>
                2. Edge AI Colony Diagnostics
              </span>
              <p class="text-xs text-on-surface-variant">
                Machine learning models analyze bio-acoustic audio spectrograms to classify queen presence, swarming indicators (queen piping at ~300Hz+), varroa mite infestation behavior, and optimal nectar ripeness curves.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
              <span class="font-semibold text-primary flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">token</span>
                3. Polygon Blockchain Immutable Ledger
              </span>
              <p class="text-xs text-on-surface-variant">
                Every extraction event generates an immutable Merkle root anchored to an ERC-1155 smart contract on the Polygon PoS network. NABL lab NMR spectrometry certificates and IPFS metadata guarantee zero adulteration.
              </p>
            </div>

            <div class="p-3.5 rounded-xl bg-surface-container-low flex flex-col gap-1.5">
              <span class="font-semibold text-primary flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">qr_code_2</span>
                4. Consumer Dynamic QR Verification
              </span>
              <p class="text-xs text-on-surface-variant">
                Every retail jar carries a unique cryptographically signed QR hologram that consumers scan with any smartphone camera to inspect the full timeline from blossom to jar.
              </p>
            </div>
          </div>

          <!-- Reset Data Button -->
          <div class="pt-3 border-t border-surface-variant flex items-center justify-between">
            <button class="px-3 py-2 text-xs text-error hover:bg-error-container/40 rounded-lg flex items-center gap-1 transition-colors" onclick="resetDemoData()">
              <span class="material-symbols-outlined text-xs">restart_alt</span>
              <span>Reset Demo State to Defaults</span>
            </button>
            <button class="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container" onclick="HoneyModal.close('honey-guide-modal')">
              Close Guide
            </button>
          </div>
        </div>
      </div>

      <!-- 3. Notifications Slideout Modal -->
      <div id="honey-notifications-modal" class="hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm items-center justify-end">
        <div class="bg-surface-container-lowest h-full max-w-md w-full shadow-2xl p-6 flex flex-col justify-between border-l border-surface-variant animate-slide-left">
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between pb-3 border-b border-surface-variant">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary">notifications_active</span>
                <h3 class="font-title-lg text-title-lg text-on-surface font-bold">Apiary Alert Feed</h3>
              </div>
              <button class="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container" onclick="HoneyModal.close('honey-notifications-modal')">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="flex flex-col gap-3 overflow-y-auto max-h-[75vh]">
              <div class="p-3 rounded-xl bg-error-container/40 border border-error/20 flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-error uppercase">Critical Warning</span>
                  <span class="text-[11px] font-metric-mono text-on-surface-variant">12m ago</span>
                </div>
                <span class="text-xs font-semibold text-on-surface">Hive H-004: Swarm Acoustic Signature</span>
                <p class="text-[11px] text-on-surface-variant">Spectral frequency reached 310 Hz. Inspection recommended.</p>
              </div>

              <div class="p-3 rounded-xl bg-secondary-fixed/40 border border-secondary/20 flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-secondary uppercase">Harvest Readiness</span>
                  <span class="text-[11px] font-metric-mono text-on-surface-variant">1h ago</span>
                </div>
                <span class="text-xs font-semibold text-on-surface">Hive H-001: Peak Nectar Maturation</span>
                <p class="text-[11px] text-on-surface-variant">Moisture estimated at 17.2%. Optimal extraction window next 48h.</p>
              </div>

              <div class="p-3 rounded-xl bg-primary-fixed/40 border border-primary/20 flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-primary uppercase">Consensus Locked</span>
                  <span class="text-[11px] font-metric-mono text-on-surface-variant">3h ago</span>
                </div>
                <span class="text-xs font-semibold text-on-surface">Batch #BCH2026A001: 4,821 Blocks Confirmed</span>
                <p class="text-[11px] text-on-surface-variant">Polygon PoS consensus verified with zero tampering.</p>
              </div>

              <div class="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-primary uppercase">IoT Mesh Sync</span>
                  <span class="text-[11px] font-metric-mono text-on-surface-variant">Just now</span>
                </div>
                <span class="text-xs font-semibold text-on-surface">LoRaWAN Gateway AP-IND-09 Online</span>
                <p class="text-[11px] text-on-surface-variant">42 of 42 micro-nodes transmitting 100% packets.</p>
              </div>
            </div>
          </div>

          <button class="w-full py-2.5 bg-surface-container hover:bg-surface-container-high rounded-xl text-xs font-semibold text-on-surface transition-colors" onclick="HoneyToast('All alerts acknowledged', 'info'); HoneyModal.close('honey-notifications-modal');">
            Mark All as Acknowledged
          </button>
        </div>
      </div>
    `;

    // --- Stakeholder Portals Modal ---
    const portalDiv = document.createElement('div');
    portalDiv.id = 'stakeholder-portals-modal';
    portalDiv.className = 'hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm items-center justify-center p-4';
    
    const roles = window.HoneyDataStore ? window.HoneyDataStore.getRoles() : {};
    const currentRole = window.HoneyDataStore ? window.HoneyDataStore.getCurrentRole() : null;
    const roleKeys = Object.keys(roles);
    
    const roleColors = {
      beekeeper: { bg: 'bg-primary-fixed', text: 'text-primary', border: 'border-primary/30', badge: 'bg-primary text-on-primary' },
      processor: { bg: 'bg-secondary-fixed', text: 'text-secondary', border: 'border-secondary/30', badge: 'bg-secondary text-on-secondary' },
      testing_lab: { bg: 'bg-tertiary-fixed', text: 'text-tertiary', border: 'border-tertiary/30', badge: 'bg-tertiary-container text-on-tertiary-container' },
      gov: { bg: 'bg-surface-container', text: 'text-on-surface', border: 'border-outline-variant', badge: 'bg-error-container text-on-error-container' },
      consumer: { bg: 'bg-primary-fixed', text: 'text-primary', border: 'border-primary/30', badge: 'bg-secondary-container text-on-secondary-container' }
    };

    let portalHTML = '<div class="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full border border-surface-variant relative max-h-[90vh] flex flex-col overflow-hidden">';
    
    // Header
    portalHTML += '<div class="px-6 pt-6 pb-4 border-b border-surface-variant flex items-center justify-between">';
    portalHTML += '<div class="flex items-center gap-3">';
    portalHTML += '<div class="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center"><span class="material-symbols-outlined text-primary text-2xl">corporate_fare</span></div>';
    portalHTML += '<div><h3 class="font-headline-sm text-headline-sm text-primary font-bold">Stakeholder Portals</h3>';
    portalHTML += '<p class="font-body-sm text-body-sm text-on-surface-variant">Switch between roles to explore each stakeholder\'s dashboard</p></div></div>';
    portalHTML += '<button class="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" onclick="HoneyModal.close(\'stakeholder-portals-modal\')"><span class="material-symbols-outlined">close</span></button>';
    portalHTML += '</div>';

    // Role Cards Grid
    portalHTML += '<div class="p-3 sm:p-5 grid gap-2.5 sm:gap-3 overflow-y-auto max-h-[60vh]">';
    
    roleKeys.forEach(key => {
      const role = roles[key];
      const colors = roleColors[key] || roleColors.beekeeper;
      const isActive = currentRole && currentRole.key === key;
      const activeBorder = isActive ? 'ring-2 ring-primary ring-offset-2' : '';
      
      portalHTML += '<div class="flex items-center gap-4 p-4 rounded-xl border ' + colors.border + ' ' + activeBorder + ' hover:shadow-md transition-all cursor-pointer group" onclick="switchActiveRole(\'' + key + '\'); HoneyModal.close(\'stakeholder-portals-modal\');">';
      
      // Icon
      portalHTML += '<div class="w-12 h-12 rounded-xl ' + colors.bg + ' flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">';
      portalHTML += '<span class="material-symbols-outlined ' + colors.text + ' text-2xl">' + role.icon + '</span>';
      portalHTML += '</div>';
      
      // Info
      portalHTML += '<div class="flex-1 min-w-0">';
      portalHTML += '<div class="flex items-center gap-2 flex-wrap">';
      portalHTML += '<span class="font-title-sm text-title-sm text-on-surface font-semibold">' + role.shortTitle + '</span>';
      if (isActive) {
        portalHTML += '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold uppercase tracking-wider"><span class="w-1.5 h-1.5 rounded-full bg-on-primary animate-pulse"></span>Active</span>';
      }
      portalHTML += '</div>';
      portalHTML += '<p class="font-body-sm text-body-sm text-on-surface-variant truncate">' + role.desc + '</p>';
      portalHTML += '<div class="flex items-center gap-2 mt-1">';
      portalHTML += '<span class="font-metric-mono text-metric-mono text-xs text-on-surface-variant">' + role.userName + '</span>';
      portalHTML += '<span class="text-on-surface-variant text-xs">•</span>';
      portalHTML += '<span class="font-metric-mono text-metric-mono text-xs ' + colors.text + '">' + role.node + '</span>';
      portalHTML += '</div>';
      portalHTML += '</div>';
      
      // Arrow
      portalHTML += '<div class="shrink-0 text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all">';
      portalHTML += '<span class="material-symbols-outlined">arrow_forward</span>';
      portalHTML += '</div>';
      
      portalHTML += '</div>';
    });
    
    portalHTML += '</div>';
    
    // Footer
    portalHTML += '<div class="px-5 pb-4 pt-2 border-t border-surface-variant flex items-center justify-between">';
    portalHTML += '<span class="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5"><span class="material-symbols-outlined text-sm">info</span>Click any role to switch persona and open their dashboard</span>';
    portalHTML += '<a href="login.html" class="font-label-sm text-label-sm text-primary font-semibold hover:underline flex items-center gap-1">Full Login Page<span class="material-symbols-outlined text-sm">open_in_new</span></a>';
    portalHTML += '</div>';
    
    portalHTML += '</div>';
    
    portalDiv.innerHTML = portalHTML;
    root.appendChild(portalDiv);

    document.body.appendChild(root);
  }

  window.handleQuickBatchLookup = function () {
    const input = document.getElementById('quickBatchInput');
    const batchId = input ? input.value.trim().toUpperCase() : 'BCH2026A001';
    window.HoneyModal.close('quick-qr-modal');
    window.location.href = `consumer-qr.html?batch=${encodeURIComponent(batchId)}`;
  };

  window.resetDemoData = function () {
    if (confirm('Reset all batches and hives to initial demo defaults?')) {
      window.HoneyDataStore.resetToDefaults();
      window.HoneyToast('Demo state reset successfully!', 'success');
      setTimeout(() => window.location.reload(), 500);
    }
  };

  
    // --- Universal Responsive Sidebar Navigation (Mobile & Windows/Desktop) ---
  function initSidebarNavigation() {
    let backdrop = document.getElementById('sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sidebar-backdrop';
      backdrop.className = 'fixed inset-0 bg-black/60 backdrop-blur-xs z-40 hidden transition-opacity duration-300 opacity-0';
      document.body.appendChild(backdrop);
    }

    const sidebar = document.getElementById('app-sidebar') || document.querySelector('aside');
    if (!sidebar) return;

    if (!sidebar.id) sidebar.id = 'app-sidebar';
    sidebar.classList.add('transition-transform', 'duration-300', 'ease-in-out');

    const contentWrapper = document.getElementById('app-content-wrapper') || document.querySelector('.lg\\:pl-72, .pl-72');
    if (contentWrapper) {
      if (!contentWrapper.id) contentWrapper.id = 'app-content-wrapper';
      contentWrapper.classList.add('transition-all', 'duration-300');
    }

    const header = document.getElementById('app-header') || document.querySelector('header');
    if (header) {
      if (!header.id) header.id = 'app-header';
      header.classList.add('transition-all', 'duration-300');
    }

    // Ensure menu toggle button exists and is visible for BOTH Windows desktop and mobile
    let toggleBtn = document.getElementById('menu-toggle-btn') || document.getElementById('mobile-menu-btn');
    if (!toggleBtn && header) {
      const leftCol = header.querySelector('.flex.items-center:first-child');
      if (leftCol) {
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'menu-toggle-btn';
        toggleBtn.className = 'p-2 -ml-1 text-on-surface hover:bg-surface-container rounded-lg flex items-center justify-center shrink-0 transition-colors cursor-pointer';
        toggleBtn.setAttribute('aria-label', 'Toggle Navigation Panel');
        toggleBtn.setAttribute('title', 'Toggle Navigation Panel (Alt+M)');
        toggleBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">menu</span>';
        leftCol.insertBefore(toggleBtn, leftCol.firstChild);
      }
    } else if (toggleBtn) {
      toggleBtn.classList.remove('lg:hidden');
      toggleBtn.id = 'menu-toggle-btn';
      toggleBtn.setAttribute('title', 'Toggle Navigation Panel (Alt+M)');
      toggleBtn.classList.add('cursor-pointer');
    }

    // Ensure sidebar has close button
    let closeBtn = document.getElementById('sidebar-close-btn');
    if (!closeBtn) {
      const topBar = sidebar.querySelector('.h-16');
      if (topBar) {
        topBar.classList.add('justify-between');
        closeBtn = document.createElement('button');
        closeBtn.id = 'sidebar-close-btn';
        closeBtn.className = 'lg:hidden ml-auto p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors';
        closeBtn.setAttribute('aria-label', 'Close menu');
        closeBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
        topBar.appendChild(closeBtn);
      }
    }

    const isMobile = () => window.innerWidth < 1024;

    // Mobile: starts CLOSED by default so layout is clean and never messed up
    // Desktop: starts OPEN by default, or follows stored preference
    let mobileOpen = false;
    let desktopOpen = true;

    try {
      const saved = localStorage.getItem('honeychain_sidebar_desktop_open');
      if (saved !== null) desktopOpen = saved === 'true';
    } catch (e) {}

    function updateView() {
      if (isMobile()) {
        // --- MOBILE MODE ---
        if (contentWrapper) {
          contentWrapper.style.paddingLeft = '0px';
        }
        if (header) {
          header.style.left = '0px';
        }

        if (mobileOpen) {
          sidebar.classList.remove('-translate-x-full');
          sidebar.classList.add('translate-x-0');
          sidebar.style.transform = 'translateX(0)';
          backdrop.classList.remove('hidden');
          requestAnimationFrame(() => {
            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
          });
          document.body.style.overflow = 'hidden';
          if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">menu_open</span>';
          }
        } else {
          sidebar.classList.remove('translate-x-0');
          sidebar.classList.add('-translate-x-full');
          sidebar.style.transform = 'translateX(-100%)';
          backdrop.classList.remove('opacity-100');
          backdrop.classList.add('opacity-0');
          setTimeout(() => {
            if (!mobileOpen) {
              backdrop.classList.add('hidden');
              document.body.style.overflow = '';
            }
          }, 300);
          if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">menu</span>';
          }
        }
      } else {
        // --- WINDOWS / DESKTOP MODE ---
        backdrop.classList.add('hidden');
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        document.body.style.overflow = '';

        if (desktopOpen) {
          sidebar.classList.remove('-translate-x-full');
          sidebar.classList.add('translate-x-0');
          sidebar.style.transform = 'translateX(0)';
          if (contentWrapper) contentWrapper.style.paddingLeft = '18rem';
          if (header) header.style.left = '18rem';
          if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">menu_open</span>';
          }
        } else {
          sidebar.classList.remove('translate-x-0');
          sidebar.classList.add('-translate-x-full');
          sidebar.style.transform = 'translateX(-100%)';
          if (contentWrapper) contentWrapper.style.paddingLeft = '0px';
          if (header) header.style.left = '0px';
          if (toggleBtn) {
            toggleBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">menu</span>';
          }
        }
      }
    }

    function toggle() {
      if (isMobile()) {
        mobileOpen = !mobileOpen;
        updateView();
      } else {
        desktopOpen = !desktopOpen;
        try {
          localStorage.setItem('honeychain_sidebar_desktop_open', desktopOpen.toString());
        } catch (e) {}
        updateView();
      }
    }

    function closeMobile() {
      if (isMobile() && mobileOpen) {
        mobileOpen = false;
        updateView();
      }
    }

    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      };
    }

    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMobile();
      };
    }

    backdrop.onclick = () => {
      closeMobile();
    };

    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (isMobile()) {
          closeMobile();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobile();
      } else if (e.altKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        toggle();
      }
    });

    window.addEventListener('resize', () => {
      updateView();
    });

    updateView();
  }

    // --- Floating Screen Switcher HUD for Easy Evaluation ---
  function injectScreenSwitcherHUD() {
    if (document.getElementById('honey-screen-hud')) return;

    const hud = document.createElement('div');
    hud.id = 'honey-screen-hud';
    hud.className = 'fixed bottom-3 left-1/2 -translate-x-1/2 z-50 select-none max-w-[96vw] transition-all duration-300';

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const screens = [
      { name: '1. Overview', file: 'index.html' },
      { name: '2. Login', file: 'login.html' },
      { name: '3. Dashboard', file: 'beekeeper-dashboard.html' },
      { name: '4. Telemetry', file: 'telemetry.html' },
      { name: '5. AI Health', file: 'ai-health.html' },
      { name: '6. Harvest', file: 'harvest-batch.html' },
      { name: '7. Traceability', file: 'batch-traceability.html' },
      { name: '8. Consumer QR', file: 'consumer-qr.html' }
    ];

    let html = `
      <!-- Expanded State -->
      <div id="hud-expanded-bar" class="bg-[#121c2a]/95 text-white backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full shadow-2xl border border-white/10 flex items-center gap-1 text-[11px] sm:text-xs font-medium">
        <div class="flex items-center gap-1 pr-1.5 sm:pr-2 border-r border-white/20 shrink-0">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-bold text-emerald-300 hidden sm:inline">HoneyChain</span>
        </div>
        <div class="flex items-center gap-1 overflow-x-auto max-w-[calc(94vw-90px)] sm:max-w-none py-0.5" style="scrollbar-width: none; -ms-overflow-style: none;">
    `;

    screens.forEach(s => {
      const active = currentPath === s.file;
      html += `
        <a href="${s.file}" class="px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${active ? 'bg-emerald-600 text-white font-bold shadow' : 'text-slate-300 hover:text-white hover:bg-white/10'}">
          ${s.name}
        </a>
      `;
    });

    html += `
        </div>
        <button id="hud-collapse-btn" class="ml-1 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 shrink-0" title="Collapse HUD">
          <span class="material-symbols-outlined text-[16px]">expand_more</span>
        </button>
      </div>

      <!-- Collapsed State -->
      <button id="hud-expand-btn" class="hidden bg-[#121c2a]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xl border border-white/10 flex items-center gap-1.5 text-xs font-medium hover:bg-[#1b2a3f] transition-all">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-bold text-emerald-300">Screens (8)</span>
        <span class="material-symbols-outlined text-[16px]">expand_less</span>
      </button>
    `;

    hud.innerHTML = html;
    document.body.appendChild(hud);

    // Collapse / Expand Toggle Handlers
    const bar = document.getElementById('hud-expanded-bar');
    const pill = document.getElementById('hud-expand-btn');
    const collapseBtn = document.getElementById('hud-collapse-btn');

    if (collapseBtn && bar && pill) {
      collapseBtn.addEventListener('click', () => {
        bar.classList.add('hidden');
        pill.classList.remove('hidden');
      });
      pill.addEventListener('click', () => {
        pill.classList.add('hidden');
        bar.classList.remove('hidden');
      });
    }
  }

  // --- Initialize on DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', () => {
    initSidebarNavigation();
    initNavigation();
    initHeaderUser();
    injectSharedModals();
    injectScreenSwitcherHUD();

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.lang-btn').forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary');
          b.classList.add('text-on-surface', 'hover:bg-surface-variant');
        });
        this.classList.add('bg-primary', 'text-on-primary');
        this.classList.remove('text-on-surface', 'hover:bg-surface-variant');
        window.HoneyToast(`Language set to ${this.textContent.trim()}`, 'info');
      });
    });
  });
})();
