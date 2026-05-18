// These are real Unsplash photos matched to each product
const IMAGES = {
  'desk-org-1': {
    main: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?w=500&h=500&fit=crop',
  },
  'cable-box-1': {
    main: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
  },
  'monitor-riser-1': {
    main: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
  },
  'noise-earbuds-1': {
    main: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=500&fit=crop',
  },
  'white-noise-1': {
    main: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
  },
  'fidget-cube-1': {
    main: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
  },
  'ambient-light-1': {
    main: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&h=500&fit=crop',
  },
  'desk-lamp-1': {
    main: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
  },
  'aroma-diffuser-1': {
    main: 'https://images.unsplash.com/photo-1600612253971-33b71af39e64?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1600612253971-33b71af39e64?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1608181831718-c9fca4b3cbf6?w=500&h=500&fit=crop',
  },
  'cable-clips-1': {
    main: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
  },
  'cable-sleeves-1': {
    main: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
  },
  'smart-mug-1': {
    main: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&h=500&fit=crop',
  },
  'laptop-stand-1': {
    main: 'https://images.unsplash.com/photo-1611186871525-122bf4dc3830?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1611186871525-122bf4dc3830?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop',
  },
  'posture-1': {
    main: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=500&fit=crop',
  },
  'wireless-charger-1': {
    main: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
  },
  'usb-hub-1': {
    main: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop',
  },
  'sleep-mask-1': {
    main: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=500&fit=crop',
  },
  'blue-glasses-1': {
    main: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500&h=500&fit=crop',
  },
  'laptop-cooling-1': {
    main: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1611186871525-122bf4dc3830?w=500&h=500&fit=crop',
  },
  'drawer-org-1': {
    main: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1484100356142-db6ab6244067?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=500&fit=crop',
  },
  'webcam-light-1': {
    main: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop',
    alt1: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop&q=80',
    alt2: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop',
  },
};

export const products = [
  {
    id: 'desk-org-1',
    name: 'Minimalist Desk Organizer',
    price: 1499,
    originalPrice: 1999,
    image: IMAGES['desk-org-1'].main,
    images: [
      IMAGES['desk-org-1'].main,
      IMAGES['desk-org-1'].alt1,
      IMAGES['desk-org-1'].alt2,
    ],
    rating: 4.8,
    reviewCount: 342,
    shortSolution: 'Keeps all your pens and small items in one place.',
    description: 'A sleek, multi-compartment organizer made from sustainable bamboo and matte black aluminum. Designed to hold pens, sticky notes, your phone, and miscellaneous desk clutter, turning chaos into order.',
    tags: ['Organization', 'Bamboo', 'Minimal'],
    category: 'Desk Setup',
    solvesProblemIds: ['messy-desk', 'losing-items'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Minimalist Desk Organizer')}`, price: 1541 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Minimalist Desk Organizer')}`, price: 1510 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Minimalist Desk Organizer')}`, price: 1594 }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Best Seller'
  },
  {
    id: 'cable-box-1',
    name: 'Stealth Cable Management Box',
    price: 1299,
    originalPrice: 1599,
    image: IMAGES['cable-box-1'].main,
    images: [
      IMAGES['cable-box-1'].main,
      IMAGES['cable-box-1'].alt1,
      IMAGES['cable-box-1'].alt2,
    ],
    rating: 4.6,
    reviewCount: 215,
    shortSolution: 'Hides power strips and tangled wires instantly.',
    description: 'Instantly hide your power strip and all the messy cables plugged into it. The stealth box blends into your floor or desk, protecting cables from dust and pets while making your space look infinitely cleaner.',
    tags: ['Cables', 'Clean', 'Plastic'],
    category: 'Cable Management',
    solvesProblemIds: ['messy-desk', 'tangled-cables'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Stealth Cable Management Box')}`, price: 1342 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Stealth Cable Management Box')}`, price: 1294 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Stealth Cable Management Box')}`, price: 1365 }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Sale'
  },
  {
    id: 'monitor-riser-1',
    name: 'Ergonomic Monitor Riser',
    price: 2499,
    originalPrice: 2999,
    image: IMAGES['monitor-riser-1'].main,
    images: [
      IMAGES['monitor-riser-1'].main,
      IMAGES['monitor-riser-1'].alt1,
      IMAGES['monitor-riser-1'].alt2,
    ],
    rating: 4.9,
    reviewCount: 521,
    shortSolution: 'Elevates screen to eye level and creates storage space below.',
    description: 'Raise your monitor to the perfect ergonomic height to prevent neck strain. Features a spacious storage area underneath to slide your keyboard away when not in use, instantly creating more desk space.',
    tags: ['Ergonomics', 'Wood', 'Storage'],
    category: 'Desk Setup',
    solvesProblemIds: ['bad-posture', 'messy-desk'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Ergonomic Monitor Riser')}`, price: 2531 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Ergonomic Monitor Riser')}`, price: 2511 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Ergonomic Monitor Riser')}`, price: 2554 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'noise-earbuds-1',
    name: 'FocusPro ANC Earbuds',
    price: 5999,
    originalPrice: 7999,
    image: IMAGES['noise-earbuds-1'].main,
    images: [
      IMAGES['noise-earbuds-1'].main,
      IMAGES['noise-earbuds-1'].alt1,
      IMAGES['noise-earbuds-1'].alt2,
    ],
    rating: 4.7,
    reviewCount: 890,
    shortSolution: 'Blocks out distracting background noise completely.',
    description: 'Active noise-canceling earbuds tuned specifically for deep work. Blocks out chatter, traffic, and hums. Comes with a companion app featuring focus timers and built-in ambient soundscapes.',
    tags: ['Audio', 'ANC', 'Wireless'],
    category: 'Focus Tools',
    solvesProblemIds: ['cant-focus', 'noisy-room'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('FocusPro ANC Earbuds')}`, price: 6010 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('FocusPro ANC Earbuds')}`, price: 6019 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('FocusPro ANC Earbuds')}`, price: 6038 }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'New'
  },
  {
    id: 'white-noise-1',
    name: 'Zenith White Noise Machine',
    price: 1999,
    originalPrice: 2499,
    image: IMAGES['white-noise-1'].main,
    images: [
      IMAGES['white-noise-1'].main,
      IMAGES['white-noise-1'].alt1,
      IMAGES['white-noise-1'].alt2,
    ],
    rating: 4.8,
    reviewCount: 432,
    shortSolution: 'Masks distracting sounds to help you focus or sleep.',
    description: 'A mechanical sound conditioner that creates the soothing sound of rushing air without the disturbance of actual moving air. Excellent for masking tinnitus, blocking out loud neighbors, or creating a focus bubble.',
    tags: ['Audio', 'Sleep', 'Focus'],
    category: 'Sleep & Rest',
    solvesProblemIds: ['cant-focus', 'noisy-room', 'poor-sleep'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Zenith White Noise Machine')}`, price: 2031 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Zenith White Noise Machine')}`, price: 1986 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Zenith White Noise Machine')}`, price: 2005 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'fidget-cube-1',
    name: 'Infinity Fidget Cube',
    price: 999,
    originalPrice: 1299,
    image: IMAGES['fidget-cube-1'].main,
    images: [
      IMAGES['fidget-cube-1'].main,
      IMAGES['fidget-cube-1'].alt1,
      IMAGES['fidget-cube-1'].alt2,
    ],
    rating: 4.5,
    reviewCount: 156,
    shortSolution: 'Keeps hands busy to improve mental focus.',
    description: 'A premium aluminum infinity cube that folds endlessly. Perfect for tactile stimulation during long meetings or while thinking through complex problems. Silent operation won\'t disturb others.',
    tags: ['Tactile', 'Focus', 'Metal'],
    category: 'Focus Tools',
    solvesProblemIds: ['cant-focus'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Infinity Fidget Cube')}`, price: 1048 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Infinity Fidget Cube')}`, price: 1028 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Infinity Fidget Cube')}`, price: 1025 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'ambient-light-1',
    name: 'Aura Smart LED Light Bar',
    price: 3499,
    originalPrice: 4299,
    image: IMAGES['ambient-light-1'].main,
    images: [
      IMAGES['ambient-light-1'].main,
      IMAGES['ambient-light-1'].alt1,
      IMAGES['ambient-light-1'].alt2,
    ],
    rating: 4.8,
    reviewCount: 671,
    shortSolution: 'Adds dynamic, customizable color to any room.',
    description: 'Transform the mood of your room instantly. This smart light bar syncs with your music or screen, or can be set to any of 16 million colors to create the perfect vibe for working, relaxing, or gaming.',
    tags: ['RGB', 'Smart', 'Decor'],
    category: 'Lighting',
    solvesProblemIds: ['boring-room'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Aura Smart LED Light Bar')}`, price: 3510 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Aura Smart LED Light Bar')}`, price: 3523 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Aura Smart LED Light Bar')}`, price: 3592 }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Best Seller'
  },
  {
    id: 'desk-lamp-1',
    name: 'Lumina Task Lamp',
    price: 2199,
    originalPrice: 2899,
    image: IMAGES['desk-lamp-1'].main,
    images: [
      IMAGES['desk-lamp-1'].main,
      IMAGES['desk-lamp-1'].alt1,
      IMAGES['desk-lamp-1'].alt2,
    ],
    rating: 4.6,
    reviewCount: 289,
    shortSolution: 'Provides targeted lighting and reduces eye strain.',
    description: 'An adjustable, flicker-free LED desk lamp with auto-dimming technology that adjusts to the ambient light in your room. Features adjustable color temperature from warm white to cool daylight.',
    tags: ['Lighting', 'Eye Care', 'Adjustable'],
    category: 'Lighting',
    solvesProblemIds: ['bad-lighting', 'boring-room'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Lumina Task Lamp')}`, price: 2255 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Lumina Task Lamp')}`, price: 2205 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Lumina Task Lamp')}`, price: 2257 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'aroma-diffuser-1',
    name: 'ZenMist Essential Oil Diffuser',
    price: 1899,
    originalPrice: 2299,
    image: IMAGES['aroma-diffuser-1'].main,
    images: [
      IMAGES['aroma-diffuser-1'].main,
      IMAGES['aroma-diffuser-1'].alt1,
      IMAGES['aroma-diffuser-1'].alt2,
    ],
    rating: 4.7,
    reviewCount: 412,
    shortSolution: 'Improves room scent and adds gentle ambient light.',
    description: 'A ceramic ultrasonic diffuser that disperses essential oils into the air while providing a soft, pulsing ambient glow. Transforms a sterile room into a calming sensory experience.',
    tags: ['Aroma', 'Wellness', 'Decor'],
    category: 'Wellness',
    solvesProblemIds: ['boring-room', 'poor-sleep'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('ZenMist Essential Oil Diffuser')}`, price: 1932 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('ZenMist Essential Oil Diffuser')}`, price: 1884 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('ZenMist Essential Oil Diffuser')}`, price: 1939 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'cable-clips-1',
    name: 'Magnetic Cable Routing Clips',
    price: 899,
    originalPrice: 1099,
    image: IMAGES['cable-clips-1'].main,
    images: [
      IMAGES['cable-clips-1'].main,
      IMAGES['cable-clips-1'].alt1,
      IMAGES['cable-clips-1'].alt2,
    ],
    rating: 4.4,
    reviewCount: 89,
    shortSolution: 'Keeps charging cables from falling off your desk.',
    description: 'A set of 6 magnetic cable clips with a weighted base. Route your most-used charging cables through the clips, and they will snap back to the base when not in use. Never fish for a dropped cable again.',
    tags: ['Cables', 'Magnetic', 'Small'],
    category: 'Cable Management',
    solvesProblemIds: ['tangled-cables'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Magnetic Cable Routing Clips')}`, price: 914 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Magnetic Cable Routing Clips')}`, price: 915 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Magnetic Cable Routing Clips')}`, price: 906 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'cable-sleeves-1',
    name: 'Neoprene Zip Cable Sleeves',
    price: 1199,
    originalPrice: 1499,
    image: IMAGES['cable-sleeves-1'].main,
    images: [
      IMAGES['cable-sleeves-1'].main,
      IMAGES['cable-sleeves-1'].alt1,
      IMAGES['cable-sleeves-1'].alt2,
    ],
    rating: 4.5,
    reviewCount: 310,
    shortSolution: 'Bundles multiple wires into one clean, thick tube.',
    description: 'Wrap your ugly bundle of monitor, power, and peripheral cables into one sleek, manageable tube. The zip-up design makes it easy to add or remove cables without unplugging everything.',
    tags: ['Cables', 'Neoprene', 'Routing'],
    category: 'Cable Management',
    solvesProblemIds: ['tangled-cables'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Neoprene Zip Cable Sleeves')}`, price: 1213 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Neoprene Zip Cable Sleeves')}`, price: 1236 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Neoprene Zip Cable Sleeves')}`, price: 1262 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'smart-mug-1',
    name: 'Ember Smart Temperature Mug',
    price: 8999,
    originalPrice: 10999,
    image: IMAGES['smart-mug-1'].main,
    images: [
      IMAGES['smart-mug-1'].main,
      IMAGES['smart-mug-1'].alt1,
      IMAGES['smart-mug-1'].alt2,
    ],
    rating: 4.9,
    reviewCount: 1024,
    shortSolution: 'Keeps your drink at the exact perfect temperature for hours.',
    description: 'Set your exact preferred drinking temperature via the app, and this smart mug will keep it there for up to 2 hours on battery, or all day on the charging coaster. Never drink cold coffee again.',
    tags: ['Smart', 'Drinkware', 'Luxury'],
    category: 'Desk Setup',
    solvesProblemIds: ['cold-coffee'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Ember Smart Temperature Mug')}`, price: 9053 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Ember Smart Temperature Mug')}`, price: 9037 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Ember Smart Temperature Mug')}`, price: 9046 }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Sale'
  },
  {
    id: 'laptop-stand-1',
    name: 'Apex Aluminum Laptop Stand',
    price: 2799,
    originalPrice: 3499,
    image: IMAGES['laptop-stand-1'].main,
    images: [
      IMAGES['laptop-stand-1'].main,
      IMAGES['laptop-stand-1'].alt1,
      IMAGES['laptop-stand-1'].alt2,
    ],
    rating: 4.8,
    reviewCount: 745,
    shortSolution: 'Raises laptop screen and improves cooling airflow.',
    description: 'A heavy-duty, adjustable aluminum stand that brings your laptop screen up to eye level. The open back design significantly improves airflow, keeping your laptop cooler under heavy loads.',
    tags: ['Ergonomics', 'Cooling', 'Aluminum'],
    category: 'Desk Setup',
    solvesProblemIds: ['bad-posture', 'hot-laptop'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Apex Aluminum Laptop Stand')}`, price: 2816 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Apex Aluminum Laptop Stand')}`, price: 2783 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Apex Aluminum Laptop Stand')}`, price: 2886 }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Best Seller'
  },
  {
    id: 'posture-1',
    name: 'Align Posture Corrector Brace',
    price: 1599,
    originalPrice: 1999,
    image: IMAGES['posture-1'].main,
    images: [
      IMAGES['posture-1'].main,
      IMAGES['posture-1'].alt1,
      IMAGES['posture-1'].alt2,
    ],
    rating: 4.2,
    reviewCount: 198,
    shortSolution: 'Gently pulls shoulders back to train muscle memory.',
    description: 'Wear this discreet brace under your clothes for 1-2 hours a day. It provides gentle resistance when you slouch, helping to build the muscle memory needed to maintain upright posture naturally.',
    tags: ['Health', 'Wearable', 'Ergonomics'],
    category: 'Wellness',
    solvesProblemIds: ['bad-posture'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Align Posture Corrector Brace')}`, price: 1658 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Align Posture Corrector Brace')}`, price: 1607 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Align Posture Corrector Brace')}`, price: 1610 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'wireless-charger-1',
    name: 'Omni 3-in-1 Charging Station',
    price: 3999,
    originalPrice: 4999,
    image: IMAGES['wireless-charger-1'].main,
    images: [
      IMAGES['wireless-charger-1'].main,
      IMAGES['wireless-charger-1'].alt1,
      IMAGES['wireless-charger-1'].alt2,
    ],
    rating: 4.7,
    reviewCount: 512,
    shortSolution: 'Charges phone, watch, and earbuds simultaneously on one pad.',
    description: 'Ditch the separate cables. This sleek, monolithic charging station provides fast wireless charging for your phone, smartwatch, and wireless earbuds all at once. Features subtle LED charging indicators.',
    tags: ['Power', 'Wireless', 'Tech'],
    category: 'Desk Setup',
    solvesProblemIds: ['dying-battery', 'tangled-cables'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Omni 3-in-1 Charging Station')}`, price: 4047 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Omni 3-in-1 Charging Station')}`, price: 4013 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Omni 3-in-1 Charging Station')}`, price: 4055 }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'New'
  },
  {
    id: 'usb-hub-1',
    name: 'ProConnect 10-Port USB-C Hub',
    price: 4599,
    originalPrice: 5499,
    image: IMAGES['usb-hub-1'].main,
    images: [
      IMAGES['usb-hub-1'].main,
      IMAGES['usb-hub-1'].alt1,
      IMAGES['usb-hub-1'].alt2,
    ],
    rating: 4.6,
    reviewCount: 320,
    shortSolution: 'Expands your laptop\'s single port into 10 connections.',
    description: 'The ultimate connectivity solution. Plugs into a single USB-C port and provides HDMI, SD card readers, ethernet, audio, and multiple USB-A and USB-C data and charging ports.',
    tags: ['Connectivity', 'Tech', 'Hub'],
    category: 'Desk Setup',
    solvesProblemIds: ['dying-battery', 'tangled-cables'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('ProConnect 10-Port USB-C Hub')}`, price: 4621 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('ProConnect 10-Port USB-C Hub')}`, price: 4612 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('ProConnect 10-Port USB-C Hub')}`, price: 4693 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'sleep-mask-1',
    name: 'Eclipse Contoured Sleep Mask',
    price: 1299,
    originalPrice: 1599,
    image: IMAGES['sleep-mask-1'].main,
    images: [
      IMAGES['sleep-mask-1'].main,
      IMAGES['sleep-mask-1'].alt1,
      IMAGES['sleep-mask-1'].alt2,
    ],
    rating: 4.8,
    reviewCount: 840,
    shortSolution: 'Provides 100% blackout without pressing on your eyes.',
    description: 'A deeply contoured memory foam mask that completely blocks all light while leaving space for your eyes to blink freely. Essential for shift workers, travelers, or anyone sensitive to morning light.',
    tags: ['Sleep', 'Travel', 'Comfort'],
    category: 'Sleep & Rest',
    solvesProblemIds: ['poor-sleep'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Eclipse Contoured Sleep Mask')}`, price: 1313 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Eclipse Contoured Sleep Mask')}`, price: 1287 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Eclipse Contoured Sleep Mask')}`, price: 1372 }
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Best Seller'
  },
  {
    id: 'blue-glasses-1',
    name: 'Optic Blue Light Blocking Glasses',
    price: 1999,
    originalPrice: 2499,
    image: IMAGES['blue-glasses-1'].main,
    images: [
      IMAGES['blue-glasses-1'].main,
      IMAGES['blue-glasses-1'].alt1,
      IMAGES['blue-glasses-1'].alt2,
    ],
    rating: 4.5,
    reviewCount: 415,
    shortSolution: 'Reduces digital eye strain and protects sleep hormones.',
    description: 'Stylish glasses with virtually clear lenses that block harmful blue light emitted by screens. Wearing these in the evening helps preserve natural melatonin production, making it easier to fall asleep.',
    tags: ['Health', 'Wearable', 'Eyewear'],
    category: 'Wellness',
    solvesProblemIds: ['poor-sleep', 'cant-focus'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Optic Blue Light Blocking Glasses')}`, price: 2018 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Optic Blue Light Blocking Glasses')}`, price: 2006 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Optic Blue Light Blocking Glasses')}`, price: 2092 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'laptop-cooling-1',
    name: 'FrostBite Laptop Cooling Pad',
    price: 2299,
    originalPrice: 2999,
    image: IMAGES['laptop-cooling-1'].main,
    images: [
      IMAGES['laptop-cooling-1'].main,
      IMAGES['laptop-cooling-1'].alt1,
      IMAGES['laptop-cooling-1'].alt2,
    ],
    rating: 4.3,
    reviewCount: 275,
    shortSolution: 'Actively cools laptop with silent RGB fans.',
    description: 'A slim cooling pad featuring 3 whisper-quiet high-velocity fans. Draws heat away from the bottom of your laptop to prevent thermal throttling during heavy workloads or gaming.',
    tags: ['Cooling', 'Tech', 'RGB'],
    category: 'Desk Setup',
    solvesProblemIds: ['hot-laptop'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('FrostBite Laptop Cooling Pad')}`, price: 2341 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('FrostBite Laptop Cooling Pad')}`, price: 2319 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('FrostBite Laptop Cooling Pad')}`, price: 2310 }
    ],
    inStock: true,
    isFeatured: false,
    badge: 'Sale'
  },
  {
    id: 'drawer-org-1',
    name: 'Modular Drawer Organizer Trays',
    price: 1499,
    originalPrice: 1899,
    image: IMAGES['drawer-org-1'].main,
    images: [
      IMAGES['drawer-org-1'].main,
      IMAGES['drawer-org-1'].alt1,
      IMAGES['drawer-org-1'].alt2,
    ],
    rating: 4.6,
    reviewCount: 150,
    shortSolution: 'Customizable compartments for hidden desk storage.',
    description: 'A 10-piece set of interlocking, felt-lined trays. Arrange them however you like inside your desk drawers to create perfectly sized compartments for pens, paperclips, cables, and hard drives.',
    tags: ['Organization', 'Storage', 'Modular'],
    category: 'Desk Setup',
    solvesProblemIds: ['messy-desk', 'losing-items'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Modular Drawer Organizer Trays')}`, price: 1521 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Modular Drawer Organizer Trays')}`, price: 1510 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Modular Drawer Organizer Trays')}`, price: 1535 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  },
  {
    id: 'webcam-light-1',
    name: 'Halo Ring Light for Monitors',
    price: 2499,
    originalPrice: 2999,
    image: IMAGES['webcam-light-1'].main,
    images: [
      IMAGES['webcam-light-1'].main,
      IMAGES['webcam-light-1'].alt1,
      IMAGES['webcam-light-1'].alt2,
    ],
    rating: 4.7,
    reviewCount: 380,
    shortSolution: 'Provides soft, even lighting for professional video calls.',
    description: 'A compact LED ring light that clips onto the top of your monitor or laptop. Provides soft, diffused front-lighting that eliminates shadows and makes you look bright and professional on Zoom calls.',
    tags: ['Lighting', 'Video', 'Tech'],
    category: 'Lighting',
    solvesProblemIds: ['bad-lighting'],
    externalLinks: [
      { platform: 'Amazon', url: `https://www.amazon.in/s?k=${encodeURIComponent('Halo Ring Light for Monitors')}`, price: 2549 },
      { platform: 'Flipkart', url: `https://www.flipkart.com/search?q=${encodeURIComponent('Halo Ring Light for Monitors')}`, price: 2504 },
      { platform: 'Croma', url: `https://www.croma.com/searchB?q=${encodeURIComponent('Halo Ring Light for Monitors')}`, price: 2545 }
    ],
    inStock: true,
    isFeatured: false,
    badge: null
  }
];

export const productCategories = [
  { id: 'Desk Setup', name: 'Desk Setup' },
  { id: 'Cable Management', name: 'Cable Management' },
  { id: 'Focus Tools', name: 'Focus Tools' },
  { id: 'Lighting', name: 'Lighting' },
  { id: 'Wellness', name: 'Wellness' },
  { id: 'Sleep & Rest', name: 'Sleep & Rest' }
];

export const featuredProducts = products.filter(p => p.isFeatured);

export const aiBundles = [
  {
    id: 'ergonomic-bundle',
    name: 'The Ultimate Ergonomic Fix',
    description: 'Everything you need to stop neck and back pain at your desk.',
    price: 3599,
    originalPrice: 4998,
    items: [
      products.find(p => p.id === 'monitor-riser-1'),
      products.find(p => p.id === 'posture-1')
    ]
  },
  {
    id: 'focus-bundle',
    name: 'Deep Work Kit',
    description: 'Block out the world and find your flow state instantly.',
    price: 6999,
    originalPrice: 7998,
    items: [
      products.find(p => p.id === 'noise-earbuds-1'),
      products.find(p => p.id === 'fidget-cube-1')
    ]
  }
];

export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByIds = (ids) => {
  if (!ids) return [];
  return ids.map(id => getProductById(id)).filter(Boolean);
};