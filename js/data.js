/**
 * Honey Chain - Shared Data Store & State Management
 * Honey Chain Platform — National Apiculture Ledger
 */

const STORAGE_KEYS = {
  HIVES: 'honeychain_hives_v1',
  BATCHES: 'honeychain_batches_v1',
  CURRENT_ROLE: 'honeychain_current_role_v1',
  INSPECTIONS: 'honeychain_inspections_v1',
  NOTIFICATIONS: 'honeychain_notifications_v1',
  LANG: 'honeychain_language_v1'
};

const SEED_ROLES = {
  beekeeper: {
    key: 'beekeeper',
    name: 'Rural Beekeeper (FPO Partner)',
    title: 'Rural Beekeeper (FPO Partner)',
    shortTitle: 'Beekeeper',
    icon: 'hive',
    desc: 'Log harvests, hive IoT & AI alerts',
    node: 'IND-PROV-90',
    phone: '98452 11048',
    target: 'beekeeper-dashboard.html',
    userName: 'Dr. Priya Sharma',
    userRole: 'Agri Officer / Lead Apiarist',
    avatar: 'assets/officer_avatar.jpg',
    cluster: 'Kullu Apiary Society'
  },
  processor: {
    key: 'processor',
    name: 'Processing Plant & Packaging Facility',
    title: 'Processing Plant & Packaging Facility',
    shortTitle: 'Processor',
    icon: 'precision_manufacturing',
    desc: 'Track batches, processing & lots',
    node: 'PROC-HP-771',
    phone: '98160 44210',
    target: 'harvest-batch.html',
    userName: 'Vikram Mehta',
    userRole: 'Processing Plant Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    cluster: 'Solan Honey Processing Hub'
  },
  testing_lab: {
    key: 'testing_lab',
    name: 'Accredited Testing Laboratory (NMR & Pollen)',
    title: 'Accredited Testing Laboratory (NMR & Pollen)',
    shortTitle: 'Testing Lab',
    icon: 'biotech',
    desc: 'NMR fingerprint & purity scan',
    node: 'NABL-LAB-042',
    phone: '94180 88931',
    target: 'ai-health.html',
    userName: 'Dr. Ananya Ray',
    userRole: 'Senior NMR Spectroscopist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    cluster: 'National Honey Quality Centre'
  },
  gov: {
    key: 'gov',
    name: 'Government Regulatory & KVIC Field Auditor',
    title: 'Government Regulatory & KVIC Field Auditor',
    shortTitle: 'Gov / KVIC',
    icon: 'account_balance',
    desc: 'Cluster subsidies & certification',
    node: 'KVIC-AUDIT-99',
    phone: '98720 12345',
    target: 'batch-traceability.html',
    userName: 'Rajeshwar Singh (IAS)',
    userRole: 'KVIC Joint Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    cluster: 'KVIC Northern Directorate'
  },
  consumer: {
    key: 'consumer',
    name: 'Consumer & Retail Verifier',
    title: 'Consumer & Retail Verifier',
    shortTitle: 'Consumer',
    icon: 'qr_code_scanner',
    desc: 'Jar verification & bee origin',
    node: 'PUB-CONSUMER',
    phone: '98200 99887',
    target: 'consumer-qr.html',
    userName: 'Verified Consumer',
    userRole: 'Retail Authenticator',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    cluster: 'Verified Consumer Portal'
  }
};

const SEED_HIVES = [
  {
    id: 'H-001',
    name: 'Mustard & Acacia Super-Box',
    cluster: 'Himachal Apple Cluster',
    beekeeper: 'Ramdas Patel',
    society: 'Kullu Apiary Society',
    lat: '31.9579° N',
    lng: '77.1095° E',
    alt: '1,220m ASL',
    queen: 'Italian Buckfast (2nd Year Marked Yellow)',
    installDate: '14 Oct 2025',
    cycleDays: 138,
    healthScore: 94,
    status: 'Healthy',
    temp: 35.1,
    humidity: 58.4,
    weight: 44.2,
    acousticFreq: 240,
    co2: 1250,
    traffic: 42,
    lastSync: '14s ago',
    alert: null,
    alertLevel: 'safe',
    symptoms: 'Optimal queen pheromone distribution, active pollen foraging',
    purityYield: '34.5 kg ready'
  },
  {
    id: 'H-002',
    name: 'Wild Acacia Deep Box',
    cluster: 'Himachal Apple Cluster',
    beekeeper: 'Ramdas Patel',
    society: 'Kullu Apiary Society',
    lat: '31.9582° N',
    lng: '77.1098° E',
    alt: '1,224m ASL',
    queen: 'Apis Cerana (Active Marked Green)',
    installDate: '20 Nov 2025',
    cycleDays: 102,
    healthScore: 91,
    status: 'Healthy',
    temp: 34.8,
    humidity: 61.2,
    weight: 39.6,
    acousticFreq: 235,
    co2: 1180,
    traffic: 38,
    lastSync: '32s ago',
    alert: null,
    alertLevel: 'safe',
    symptoms: 'Steady worker traffic, excellent honey capping observed',
    purityYield: '28.0 kg ready'
  },
  {
    id: 'H-003',
    name: 'Clover & Berry Box',
    cluster: 'Himachal Apple Cluster',
    beekeeper: 'Sunita Devi',
    society: 'Kullu Apiary Society',
    lat: '31.9571° N',
    lng: '77.1089° E',
    alt: '1,215m ASL',
    queen: 'Carniolan (Active Marked Red)',
    installDate: '05 Dec 2025',
    cycleDays: 88,
    healthScore: 78,
    status: 'Attention',
    temp: 37.2,
    humidity: 52.0,
    weight: 34.1,
    acousticFreq: 275,
    co2: 1420,
    traffic: 29,
    lastSync: '1m ago',
    alert: 'Elevated Brood Temp (+2.1°C Spike)',
    alertLevel: 'warning',
    symptoms: 'Mild fanning activity at entrance, hive ventilation recommended',
    purityYield: '18.2 kg ready'
  },
  {
    id: 'H-004',
    name: 'Valley Flora Hive',
    cluster: 'Himachal Apple Cluster',
    beekeeper: 'Ramdas Patel',
    society: 'Kullu Apiary Society',
    lat: '31.9565° N',
    lng: '77.1102° E',
    alt: '1,220m ASL',
    queen: 'Italian Buckfast (Unmarked)',
    installDate: '12 Jan 2026',
    cycleDays: 52,
    healthScore: 62,
    status: 'Critical',
    temp: 38.4,
    humidity: 48.5,
    weight: 29.8,
    acousticFreq: 310,
    co2: 1680,
    traffic: 18,
    lastSync: '45s ago',
    alert: 'Acoustic Swarm Signature Detected (310Hz Piping)',
    alertLevel: 'critical',
    symptoms: 'Queen cell construction underway, swarm impulse detected',
    purityYield: '12.0 kg ready'
  },
  {
    id: 'H-005',
    name: 'Coorg Blossom Hive #1',
    cluster: 'Coorg Multi-Floral',
    beekeeper: 'Bopaiah K.',
    society: 'Coorg Planters Honey FPO',
    lat: '12.3375° N',
    lng: '75.8069° E',
    alt: '980m ASL',
    queen: 'Apis Dorsata Hybrid (Active)',
    installDate: '10 Sep 2025',
    cycleDays: 172,
    healthScore: 89,
    status: 'Healthy',
    temp: 34.9,
    humidity: 68.0,
    weight: 42.8,
    acousticFreq: 238,
    co2: 1190,
    traffic: 45,
    lastSync: '2m ago',
    alert: null,
    alertLevel: 'safe',
    symptoms: 'High coffee bloom foraging activity recorded',
    purityYield: '31.4 kg ready'
  },
  {
    id: 'H-006',
    name: 'Coorg Coffee Blossom #2',
    cluster: 'Coorg Multi-Floral',
    beekeeper: 'Bopaiah K.',
    society: 'Coorg Planters Honey FPO',
    lat: '12.3380° N',
    lng: '75.8075° E',
    alt: '985m ASL',
    queen: 'Apis Cerana Indica (Active)',
    installDate: '15 Sep 2025',
    cycleDays: 167,
    healthScore: 86,
    status: 'Healthy',
    temp: 35.0,
    humidity: 66.5,
    weight: 41.2,
    acousticFreq: 242,
    co2: 1210,
    traffic: 40,
    lastSync: '3m ago',
    alert: null,
    alertLevel: 'safe',
    symptoms: 'Good nectar ripening progression, comb capped at 85%',
    purityYield: '26.8 kg ready'
  },
  {
    id: 'H-007',
    name: 'Sundarbans Khalsi Node',
    cluster: 'Sundarbans Mangrove',
    beekeeper: 'Tapan Mondal',
    society: 'Sundarbans Mouli Collective',
    lat: '21.9497° N',
    lng: '88.8999° E',
    alt: '8m ASL',
    queen: 'Apis Dorsata Wild',
    installDate: '02 Jan 2026',
    cycleDays: 62,
    healthScore: 82,
    status: 'Attention',
    temp: 36.1,
    humidity: 79.2,
    weight: 38.5,
    acousticFreq: 260,
    co2: 1310,
    traffic: 34,
    lastSync: '5m ago',
    alert: 'High Saline Humidity Spike (>78%)',
    alertLevel: 'warning',
    symptoms: 'Moisture accumulation in lower mesh, dehumidification alert',
    purityYield: '22.0 kg ready'
  },
  {
    id: 'H-008',
    name: 'Sundarbans Goran Box',
    cluster: 'Sundarbans Mangrove',
    beekeeper: 'Tapan Mondal',
    society: 'Sundarbans Mouli Collective',
    lat: '21.9510° N',
    lng: '88.9020° E',
    alt: '9m ASL',
    queen: 'Apis Dorsata Wild',
    installDate: '05 Jan 2026',
    cycleDays: 59,
    healthScore: 88,
    status: 'Healthy',
    temp: 35.3,
    humidity: 76.4,
    weight: 40.0,
    acousticFreq: 244,
    co2: 1240,
    traffic: 36,
    lastSync: '4m ago',
    alert: null,
    alertLevel: 'safe',
    symptoms: 'Active nectar inflow from Goran mangrove blossoms',
    purityYield: '24.5 kg ready'
  }
];

const SEED_BATCHES = [
  {
    id: 'BCH2026A001',
    name: 'Pure Himalayan Multiflora Honey',
    sourceHives: ['H-001', 'H-002'],
    cluster: 'Himachal Pradesh Apiculture Cluster • Zone 4B',
    beekeeper: 'Ramdas Patel',
    society: 'Kullu Valley Beekeepers Cooperative Society',
    netWeightKg: 142.50,
    unitsCount: 285,
    jarSize: '500g UV-Shield Glass',
    unitIdSample: 'UNIT #142 / 285',
    harvestDate: '14 Feb 2026, 08:42 IST',
    floralSource: 'Mustard & Wild Acacia Blossom',
    elevation: '1,220m ASL',
    purityGrade: 'Grade-A Unheated Raw',
    smartContract: 'ERC-1155: 0x9A4eF48B227cA710d8F35B3B709C2fF98A190b41',
    polygonTx: '0x7f3ab9812eef43109a8bc43d1004fa920e81b82e917d6c6e7a2b0246a489dc2',
    rootHash: '0x7f3ab9812eef43109a8bc43d1004fa920e81b82e91',
    blockHeight: 54910284,
    confirmations: 4821,
    consensusStatus: 'POLYGON PoS CONSENSUS LOCKED',
    ipfsUri: 'ipfs://QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    laboratory: {
      name: 'National Bee Board & NABL Accredited Honey Testing Lab #HP-04',
      nmrCertificate: 'NABL-NMR-2026-9812',
      pollenPurity: '96.4% Pure Floral Pollen Spectrum',
      c4SugarRatio: '-26.8‰ (Natural C3 nectar benchmark, 0% added C4 cane/corn sugar)',
      hmfLevel: '8.4 mg/kg (Strictly unheated raw honey, FSSAI limit <40 mg/kg)',
      moistureContent: '17.2% (Optimal fermentation-free shelf stability)',
      antibiotics: 'Zero Detected (<0.01 ppb limit)',
      pesticides: 'ND (Not Detected)'
    },
    milestones: [
      {
        step: 1,
        title: 'Hive Registered & Monitored',
        date: '14 Oct 2025 • 06:00 IST',
        desc: 'Deployed on Smart Hive H-001. Integrated LoRaWAN telemetry verified uninterrupted internal brood thermoregulation (steady at 35.1°C) with low vibrational acoustic anomalies prior to comb filling.',
        temp: '35.1 °C (±0.2)',
        coords: '31.1048° N, 77.1734° E',
        witness: '0x81b0...d431',
        status: 'Verified'
      },
      {
        step: 2,
        title: 'Honey Harvested & Sealed',
        date: '14 Feb 2026 • 09:15 IST',
        desc: 'Raw comb uncapping under certified food-grade centrifugal extraction. Weight logged at 142.50 kg net. Zero heat processing applied.',
        temp: '24.5 °C ambient',
        coords: 'Cluster Extraction Point 04',
        witness: '0x34c1...89fa',
        status: 'Verified'
      },
      {
        step: 3,
        title: 'Processing & Gentle Cold Filtration',
        date: '15 Feb 2026 • 11:30 IST',
        desc: 'Gravity multi-stage micro-filtration removing wax particles while preserving live enzymes, diastase activity, and delicate bio-active pollen grains.',
        temp: 'Gravity 80-mesh',
        coords: 'Solan Organic Unit',
        witness: '0x992b...e012',
        status: 'Verified'
      },
      {
        step: 4,
        title: 'NABL Accredited Lab NMR Analysis',
        date: '17 Feb 2026 • 15:40 IST',
        desc: 'Nuclear Magnetic Resonance (NMR) spectral profiling and carbon isotope ratio mass spectrometry (EA-IRMS) confirmed zero foreign syrups.',
        temp: 'NMR Spectral: Valid',
        coords: 'Central Food Tech Lab #02',
        witness: '0xba45...66d1',
        status: 'Verified'
      },
      {
        step: 5,
        title: 'Packaging & Smart QR Tagging',
        date: '19 Feb 2026 • 14:10 IST',
        desc: 'Sealed into 285 tamper-evident dark amber UV-protective glass jars. Dynamic cryptographically signed QR serial labels assigned.',
        temp: 'Batch #BCH2026A001',
        coords: 'Packing Line 01',
        witness: '0xd180...99ac',
        status: 'Verified'
      },
      {
        step: 6,
        title: 'Distributed Ledger Seal',
        date: '20 Feb 2026 • 16:00 IST',
        desc: 'Merkle root anchored on Polygon PoS mainnet under ERC-1155 smart contract. Metadata sealed on decentralized IPFS node.',
        temp: 'Block #54910284',
        coords: 'Contract 0x9A4e...48B2',
        witness: 'Polygon PoS Multi-Sig',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'BCH2026B002',
    name: 'Coorg Wild Coffee Blossom Honey',
    sourceHives: ['H-005', 'H-006'],
    cluster: 'Western Ghats Organic Biome • Coorg Cluster',
    beekeeper: 'Bopaiah K.',
    society: 'Coorg Planters Honey FPO',
    netWeightKg: 95.00,
    unitsCount: 190,
    jarSize: '500g Artisanal Pot',
    unitIdSample: 'UNIT #44 / 190',
    harvestDate: '28 Jan 2026, 09:00 IST',
    floralSource: 'Arabica & Robusta Coffee Blossom',
    elevation: '980m ASL',
    purityGrade: 'Grade-A Raw Organic',
    smartContract: 'ERC-1155: 0x9A4eF48B227cA710d8F35B3B709C2fF98A190b41',
    polygonTx: '0x5c8e41982bbf6109a8bc43d1004fa920e81b82e917d6c6e7a2b0246a489d713',
    rootHash: '0x5c8e41982bbf6109a8bc43d1004fa920e81b82e91',
    blockHeight: 54890120,
    confirmations: 6140,
    consensusStatus: 'POLYGON PoS CONSENSUS LOCKED',
    ipfsUri: 'ipfs://QmZ8xTPbB23sXf789nemtYgPpHdWEz79ojWnPbdG112',
    laboratory: {
      name: 'CFTRI Mysuru NABL Accredited Food Laboratory',
      nmrCertificate: 'CFTRI-NMR-2026-4412',
      pollenPurity: '97.8% Coffee Blossom Signature',
      c4SugarRatio: '-27.1‰ (Natural C3 spectrum)',
      hmfLevel: '6.2 mg/kg (Unheated pristine)',
      moistureContent: '16.8% (Exceptional density)',
      antibiotics: 'Zero Detected (<0.01 ppb)',
      pesticides: 'ND (Not Detected)'
    },
    milestones: [
      {
        step: 1,
        title: 'Hive Registered & Monitored',
        date: '10 Sep 2025 • 07:00 IST',
        desc: 'Smart Hives H-005 & H-006 deployed across shade-grown organic coffee plantations in Coorg valley.',
        temp: '34.9 °C',
        coords: '12.3375° N, 75.8069° E',
        witness: '0x7120...f881',
        status: 'Verified'
      },
      {
        step: 2,
        title: 'Honey Harvested & Sealed',
        date: '28 Jan 2026 • 09:00 IST',
        desc: 'Harvested directly after peak 9-day coffee flowering burst. Pure dark amber aromatic nectar collected.',
        temp: '22.0 °C ambient',
        coords: 'Coorg Field Lab #01',
        witness: '0x19a0...3321',
        status: 'Verified'
      },
      {
        step: 3,
        title: 'Cold Settling & Quality Analysis',
        date: '30 Jan 2026 • 14:00 IST',
        desc: 'Cold clarified and transferred to stainless steel food-grade storage drums.',
        temp: 'Gravity micro-filter',
        coords: 'Madikeri Honey Center',
        witness: '0x2289...cbb0',
        status: 'Verified'
      },
      {
        step: 4,
        title: 'NABL NMR Isotope Purity Certification',
        date: '02 Feb 2026 • 16:30 IST',
        desc: 'CFTRI test confirmed negative for adulterants with 97.8% coffee pollen fidelity.',
        temp: 'NMR Profile: 100% Pass',
        coords: 'CFTRI Mysuru',
        witness: '0x88ea...9011',
        status: 'Verified'
      },
      {
        step: 5,
        title: 'Packaging & QR Inscription',
        date: '05 Feb 2026 • 11:15 IST',
        desc: '190 units packaged into embossed glass jars with unique encrypted QR provenance code.',
        temp: 'Batch #BCH2026B002',
        coords: 'Coorg Packing Line',
        witness: '0xfa01...6612',
        status: 'Verified'
      },
      {
        step: 6,
        title: 'Polygon Blockchain Imprint',
        date: '06 Feb 2026 • 12:00 IST',
        desc: 'Batch cryptographic root anchored on Polygon PoS mainnet ledger.',
        temp: 'Block #54890120',
        coords: 'Contract 0x9A4e...48B2',
        witness: 'Polygon PoS Multi-Sig',
        status: 'Verified'
      }
    ]
  },
  {
    id: 'BCH2026C003',
    name: 'Sundarbans Wild Mangrove Honey',
    sourceHives: ['H-007', 'H-008'],
    cluster: 'Sundarbans Biosphere Reserve • Coastal Mangrove Cluster',
    beekeeper: 'Tapan Mondal',
    society: 'Sundarbans Traditional Mouli Collective',
    netWeightKg: 80.00,
    unitsCount: 160,
    jarSize: '500g Jar',
    unitIdSample: 'UNIT #18 / 160',
    harvestDate: '10 Jan 2026, 07:45 IST',
    floralSource: 'Wild Khalsi & Goran Mangrove Blossom',
    elevation: '8m ASL',
    purityGrade: 'Grade-A Wild Raw',
    smartContract: 'ERC-1155: 0x9A4eF48B227cA710d8F35B3B709C2fF98A190b41',
    polygonTx: '0x3b1c99812eef43109a8bc43d1004fa920e81b82e917d6c6e7a2b0246a489d98a',
    rootHash: '0x3b1c99812eef43109a8bc43d1004fa920e81b82e91',
    blockHeight: 54760812,
    confirmations: 9400,
    consensusStatus: 'POLYGON PoS CONSENSUS LOCKED',
    ipfsUri: 'ipfs://QmX9z7TPbB23sXf789nemtYgPpHdWEz79ojWnPbdG334',
    laboratory: {
      name: 'Jadavpur University Food Tech & NABL Lab',
      nmrCertificate: 'JU-NMR-2026-1109',
      pollenPurity: '98.2% Mangrove Flora',
      c4SugarRatio: '-26.5‰ (Natural)',
      hmfLevel: '9.1 mg/kg',
      moistureContent: '18.0%',
      antibiotics: 'Zero Detected',
      pesticides: 'ND'
    },
    milestones: [
      {
        step: 1,
        title: 'Hive Registered & Monitored',
        date: '02 Jan 2026 • 06:30 IST',
        desc: 'Deployed on Khalsi and Goran mangrove tidal zones under Mouli eco-cooperative monitoring.',
        temp: '35.3 °C',
        coords: '21.9497° N, 88.8999° E',
        witness: '0x3310...b901',
        status: 'Verified'
      },
      {
        step: 2,
        title: 'Honey Harvested & Sealed',
        date: '10 Jan 2026 • 07:45 IST',
        desc: 'Collected under sustainable traditional harvesting standards with bio-protective gear.',
        temp: '26.0 °C ambient',
        coords: 'Mouli Basecamp 02',
        witness: '0x7781...cc12',
        status: 'Verified'
      },
      {
        step: 3,
        title: 'Natural Settling & Debris Filtering',
        date: '12 Jan 2026 • 10:00 IST',
        desc: 'Centrifugally clarified and tested for organic mangrove pollen density.',
        temp: 'Raw unheated',
        coords: 'Gosaba Packaging Center',
        witness: '0x8891...dd23',
        status: 'Verified'
      },
      {
        step: 4,
        title: 'NABL & NMR Spectrometry Validation',
        date: '15 Jan 2026 • 14:20 IST',
        desc: 'NMR purity profiling demonstrated zero added C4/C3 syrups and strong antioxidant bio-markers.',
        temp: 'NMR Profile: 100% Pass',
        coords: 'Kolkata Central NABL Lab',
        witness: '0x9912...ee34',
        status: 'Verified'
      },
      {
        step: 5,
        title: 'Packaging & QR Tagging',
        date: '17 Jan 2026 • 11:00 IST',
        desc: 'Bottled into 160 sealed consumer jars with tamper-evident cryptographic QR hologram.',
        temp: 'Batch #BCH2026C003',
        coords: 'Kolkata Organic Facility',
        witness: '0xaa23...ff45',
        status: 'Verified'
      },
      {
        step: 6,
        title: 'Polygon Blockchain Imprint',
        date: '18 Jan 2026 • 15:30 IST',
        desc: 'Anchored onto Polygon PoS blockchain with public verifiability.',
        temp: 'Block #54760812',
        coords: 'Contract 0x9A4e...48B2',
        witness: 'Polygon PoS Multi-Sig',
        status: 'Verified'
      }
    ]
  }
];

const SEED_INSPECTIONS = [
  {
    id: 'INSP-2026-001',
    hiveId: 'H-001',
    date: '14 Feb 2026',
    inspector: 'Dr. Priya Sharma',
    queenStatus: 'Active & laying uniformly (marked yellow)',
    broodPattern: 'Solid compact brood, 8 frames full',
    temperament: 'Calm and steady',
    treatment: 'None required (Natural thymol tray clean)',
    notes: 'Brood nest healthy, honey supers capping rapidly, ready for harvest extraction.'
  },
  {
    id: 'INSP-2026-002',
    hiveId: 'H-004',
    date: '13 Feb 2026',
    inspector: 'Ramdas Patel',
    queenStatus: 'Queen active, 3 swarm queen cups identified on lower frame edge',
    broodPattern: 'High drone brood density',
    temperament: 'Restless, high buzzing sound',
    treatment: 'Frame spacing increased, swarm prevention divider inserted',
    notes: 'Acoustic frequency elevated to 310 Hz. Monitoring closely for swarming.'
  }
];

// Data Store Class
class HoneyChainStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.HIVES)) {
      localStorage.setItem(STORAGE_KEYS.HIVES, JSON.stringify(SEED_HIVES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BATCHES)) {
      localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(SEED_BATCHES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INSPECTIONS)) {
      localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(SEED_INSPECTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'beekeeper');
    }
    if (!localStorage.getItem(STORAGE_KEYS.LANG)) {
      localStorage.setItem(STORAGE_KEYS.LANG, 'en');
    }
  }

  getRoles() {
    return SEED_ROLES;
  }

  getCurrentRole() {
    const key = localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'beekeeper';
    return SEED_ROLES[key] || SEED_ROLES.beekeeper;
  }

  setCurrentRole(roleKey) {
    if (SEED_ROLES[roleKey]) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, roleKey);
      return SEED_ROLES[roleKey];
    }
    return null;
  }

  getHives() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HIVES);
      return data ? JSON.parse(data) : SEED_HIVES;
    } catch (e) {
      return SEED_HIVES;
    }
  }

  getHiveById(id) {
    const hives = this.getHives();
    if (!id) return hives[0];
    return hives.find(h => h.id.toUpperCase() === id.toUpperCase()) || hives[0];
  }

  saveHive(newHive) {
    const hives = this.getHives();
    const index = hives.findIndex(h => h.id.toUpperCase() === newHive.id.toUpperCase());
    if (index >= 0) {
      hives[index] = { ...hives[index], ...newHive };
    } else {
      hives.push(newHive);
    }
    localStorage.setItem(STORAGE_KEYS.HIVES, JSON.stringify(hives));
    return newHive;
  }

  getBatches() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BATCHES);
      return data ? JSON.parse(data) : SEED_BATCHES;
    } catch (e) {
      return SEED_BATCHES;
    }
  }

  getBatchById(id) {
    if (!id) return this.getBatches()[0];
    const batches = this.getBatches();
    const cleanId = id.trim().toUpperCase();
    return batches.find(b => b.id.toUpperCase() === cleanId) || batches[0];
  }

  saveBatch(newBatch) {
    const batches = this.getBatches();
    const index = batches.findIndex(b => b.id.toUpperCase() === newBatch.id.toUpperCase());
    if (index >= 0) {
      batches[index] = { ...batches[index], ...newBatch };
    } else {
      batches.unshift(newBatch);
    }
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(batches));
    return newBatch;
  }

  getInspections() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INSPECTIONS);
      return data ? JSON.parse(data) : SEED_INSPECTIONS;
    } catch (e) {
      return SEED_INSPECTIONS;
    }
  }

  addInspection(inspection) {
    const inspections = this.getInspections();
    const newEntry = {
      id: `INSP-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...inspection
    };
    inspections.unshift(newEntry);
    localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(inspections));
    return newEntry;
  }

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.HIVES, JSON.stringify(SEED_HIVES));
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(SEED_BATCHES));
    localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(SEED_INSPECTIONS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, 'beekeeper');
  }
}

// Global instance
window.HoneyDataStore = new HoneyChainStore();
