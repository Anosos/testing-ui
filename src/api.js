// api.js (Mobile App - Updated Backend Logic)

// 1. TIME PERIODS (5 Historical Eras)
export const TIME_PERIODS = [
  { key: '1059-394', label: 'Ancient Kingdom', desc: '1059 - 394 BCE', icon: '🏺' },
  { key: '1550-1069', label: 'New Kingdom', desc: '1550 - 1069 BCE', icon: '👑' },
  { key: '2034-1550', label: 'Middle Kingdom', desc: '2034 - 1550 BCE', icon: '🏰' },
  { key: '70000-2034', label: 'Early Dynastic', desc: '70000 - 2034 BCE', icon: '⚱️' },
  { key: 'all', label: 'All Periods', desc: 'Complete Collection', icon: '🌍' },
];

// 2. SUPPORTED LANGUAGES (50+ Languages)
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', icon: '🇬🇧' },
  { code: 'ar', name: 'العربية', icon: '🇪🇬' },
  { code: 'fr', name: 'Français', icon: '🇫🇷' },
  { code: 'es', name: 'Español', icon: '🇪🇸' },
  { code: 'de', name: 'Deutsch', icon: '🇩🇪' },
  { code: 'zh', name: '中文', icon: '🇨🇳' },
  { code: 'ja', name: '日本語', icon: '🇯🇵' },
  { code: 'pt', name: 'Português', icon: '🇵🇹' },
  { code: 'ru', name: 'Русский', icon: '🇷🇺' },
  { code: 'it', name: 'Italiano', icon: '🇮🇹' },
  { code: 'ko', name: '한국어', icon: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', icon: '🇮🇳' },
  { code: 'th', name: 'ไทย', icon: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', icon: '🇻🇳' },
  { code: 'tr', name: 'Türkçe', icon: '🇹🇷' },
  { code: 'pl', name: 'Polski', icon: '🇵🇱' },
  { code: 'nl', name: 'Nederlands', icon: '🇳🇱' },
  { code: 'sv', name: 'Svenska', icon: '🇸🇪' },
  { code: 'no', name: 'Norsk', icon: '🇳🇴' },
  { code: 'da', name: 'Dansk', icon: '🇩🇰' },
  { code: 'fi', name: 'Suomi', icon: '🇫🇮' },
  { code: 'el', name: 'Ελληνικά', icon: '🇬🇷' },
  { code: 'cs', name: 'Čeština', icon: '🇨🇿' },
  { code: 'hu', name: 'Magyar', icon: '🇭🇺' },
  { code: 'ro', name: 'Română', icon: '🇷🇴' },
  { code: 'bg', name: 'Български', icon: '🇧🇬' },
  { code: 'hr', name: 'Hrvatski', icon: '🇭🇷' },
  { code: 'sr', name: 'Српски', icon: '🇷🇸' },
  { code: 'sk', name: 'Slovenčina', icon: '🇸🇰' },
  { code: 'sl', name: 'Slovenščina', icon: '🇸🇮' },
  { code: 'lt', name: 'Lietuvių', icon: '🇱🇹' },
  { code: 'lv', name: 'Latvian', icon: '🇱🇻' },
  { code: 'et', name: 'Eesti', icon: '🇪🇪' },
  { code: 'uk', name: 'Українська', icon: '🇺🇦' },
  { code: 'be', name: 'Беларусь', icon: '🇧🇾' },
  { code: 'ka', name: 'ქართული', icon: '🇬🇪' },
  { code: 'hy', name: 'Հայերեն', icon: '🇦🇲' },
  { code: 'az', name: 'Azərbaycanca', icon: '🇦🇿' },
  { code: 'uz', name: "O'zbek", icon: '🇺🇿' },
  { code: 'kk', name: 'Қазақ', icon: '🇰🇿' },
  { code: 'tg', name: 'Тоҷикӣ', icon: '🇹🇯' },
  { code: 'ky', name: 'Кыргызча', icon: '🇰🇬' },
  { code: 'mn', name: 'Монгол', icon: '🇲🇳' },
  { code: 'my', name: 'မြန်မာ', icon: '🇲🇲' },
  { code: 'km', name: 'ខ្មែរ', icon: '🇰🇭' },
  { code: 'lo', name: 'ລາວ', icon: '🇱🇦' },
  { code: 'tl', name: 'Tagalog', icon: '🇵🇭' },
  { code: 'id', name: 'Bahasa Indonesia', icon: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', icon: '🇲🇾' },
];

// 3. MASTER PATHS (Period-based galleries)
const MASTER_PATHS = {
  '1059-394': ['G1', 'G2', 'G3', 'G-TUT1'],
  '1550-1069': ['G7', 'G8', 'G9', 'G-TUT1', 'G-TUT2'],
  '2034-1550': ['G1', 'G2', 'G3', 'G12'],
  '70000-2034': ['G4', 'G5', 'G6', 'G-TUT2'],
  'all': ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G-TUT1', 'G-TUT2'],
};

// 4. CROWD DATA
const CROWD_DATA = {
  'G1': 45,
  'G2': 32,
  'G3': 28,
  'G4': 50,
  'G5': 18,
  'G6': 38,
  'G7': 15,
  'G8': 20,
  'G9': 10,
  'G10': 42,
  'G11': 25,
  'G12': 35,
  'G-TUT1': 80,
  'G-TUT2': 30,
};

// 5. GALLERY NAMES
const GALLERY_NAMES = {
  'G-TUT1': 'Tutankhamun\'s Golden Treasures',
  'G-TUT2': 'Ancient Pharaoh\'s Legacy',
  'G1': 'Royal Throne Room',
  'G2': 'Hieroglyphic Archives',
  'G3': 'Monumental Statues',
  'G4': 'Sacred Temples',
  'G5': 'Artisan Workshops',
  'G6': 'Trade & Commerce',
  'G7': 'Royal Funerary Rites',
  'G8': 'Divine Rituals',
  'G9': 'Astronomical Knowledge',
  'G10': 'Military Expeditions',
  'G11': 'Warfare & Conquest',
  'G12': 'Administrative Records',
};

// 6. GALLERY-SPECIFIC PIECE DATASETS
const GALLERY_PIECES = {
  'G-TUT1': [
    { id: 'P5678', name: 'Tutankhamun\'s Golden Mask', info: 'The iconic golden mask of pharaoh Tutankhamun, 22.5 pounds of solid gold.', image: '👑' },
    { id: 'P5679', name: 'Gold Throne of Tutankhamun', info: 'An ornate wooden throne covered in gold and inlaid with semi-precious stones.', image: '🪑' },
    { id: 'P5680', name: 'Tutankhamun\'s Sandals', info: 'Golden sandals worn by the young pharaoh, decorated with the names of his enemies.', image: '👟' },
    { id: 'P5681', name: 'Funeral Chariot', info: 'An ornate chariot buried with the pharaoh for the afterlife.', image: '🛞' },
  ],
  'G-TUT2': [
    { id: 'P4500', name: 'The Blue Faience Hippopotamus', info: 'A masterpiece symbolizing rebirth and the Nile\'s fertility.', image: '🦛' },
    { id: 'P4501', name: 'Pharaoh\'s Ceremonial Necklace', info: 'An ornate gold necklace with lapis lazuli and carnelian stones.', image: '📿' },
    { id: 'P4502', name: 'Royal Diadems', info: 'Ceremonial crowns worn by pharaohs during official events.', image: '👑' },
  ],
  'G1': [
    { id: 'P2301', name: 'The Scribe Statue', info: 'A limestone statue of a seated scribe with inlaid eyes of rock crystal.', image: '📜' },
    { id: 'P2302', name: 'Royal Scepter', info: 'A ceremonial scepter used by pharaohs during religious rituals.', image: '✨' },
    { id: 'P2303', name: 'Pharaoh\'s Throne', info: 'The actual throne used by ancient Egyptian pharaohs.', image: '🪑' },
  ],
  'G2': [
    { id: 'P3401', name: 'Papyrus Scroll', info: 'Ancient Egyptian papyrus with hieroglyphic inscriptions.', image: '📜' },
    { id: 'P3402', name: 'Hieroglyphic Palette', info: 'A scribe\'s palette used for grinding pigments and writing.', image: '🎨' },
    { id: 'P3403', name: 'Writing Instruments', info: 'Ancient pens and writing tools made from reed and bone.', image: '✒️' },
  ],
  'G3': [
    { id: 'P1001', name: 'Colossal Sphinx Fragment', info: 'A massive limestone statue fragment from the Great Sphinx.', image: '🗿' },
    { id: 'P1002', name: 'Pharaoh Statue', info: 'A towering statue of a pharaoh in traditional regalia.', image: '👑' },
    { id: 'P1003', name: 'Guardian Lions', info: 'Massive limestone lion statues that guarded temple entrances.', image: '🦁' },
  ],
  'G4': [
    { id: 'P6001', name: 'Temple Relief', info: 'Stone relief depicting religious ceremonies in temples.', image: '🏛️' },
    { id: 'P6002', name: 'Isis Statue', info: 'A marble statue of the goddess Isis.', image: '✨' },
    { id: 'P6003', name: 'Altar Stone', info: 'Sacred stone altar used for religious offerings.', image: '⛪' },
  ],
  'G5': [
    { id: 'P7001', name: 'Pottery Vessel', info: 'Ancient ceramic vessel used for storing grain and water.', image: '🏺' },
    { id: 'P7002', name: 'Weaving Loom', info: 'Ancient loom used for textile production and clothing.', image: '🪡' },
    { id: 'P7003', name: 'Craft Tools', info: 'Ancient tools used by artisans and craftsmen.', image: '🔨' },
  ],
  'G6': [
    { id: 'P8001', name: 'Trade Routes Map', info: 'Ancient map showing commercial routes across Egypt.', image: '🗺️' },
    { id: 'P8002', name: 'Merchant Weights', info: 'Bronze weights used in ancient commerce and trade.', image: '⚖️' },
    { id: 'P8003', name: 'Trading Goods', info: 'Samples of goods traded along the Nile.', image: '📦' },
  ],
  'G7': [
    { id: 'P9001', name: 'Canopic Jars', info: 'Stone jars used to store organs during mummification.', image: '🏺' },
    { id: 'P9002', name: 'Sarcophagus', info: 'A decorated stone coffin from the New Kingdom.', image: '⚱️' },
    { id: 'P9003', name: 'Mummy Wrappings', info: 'Original linens used to wrap and preserve mummies.', image: '👜' },
  ],
  'G8': [
    { id: 'P10001', name: 'Ritual Vessel', info: 'Ceremonial vessel used in religious rites and ceremonies.', image: '🏺' },
    { id: 'P10002', name: 'Incense Burner', info: 'Bronze burner used for sacred incense in temples.', image: '🔥' },
    { id: 'P10003', name: 'Offering Table', info: 'Stone table used for religious offerings to gods.', image: '🪨' },
  ],
  'G9': [
    { id: 'P11001', name: 'Star Map', info: 'Ancient star chart showing constellations and planets.', image: '⭐' },
    { id: 'P11002', name: 'Astronomical Papyrus', info: 'Papyrus documenting celestial observations.', image: '📜' },
    { id: 'P11003', name: 'Water Clock', info: 'Ancient clock used to measure time by water flow.', image: '⏳' },
  ],
  'G10': [
    { id: 'P12001', name: 'Military Standard', info: 'Ancient military banner used in expeditions.', image: '🚩' },
    { id: 'P12002', name: 'Pharaoh\'s Chariot', info: 'An ornate war chariot used by pharaohs in battle.', image: '🛞' },
    { id: 'P12003', name: 'Military Maps', info: 'Ancient maps documenting military campaigns.', image: '🗺️' },
  ],
  'G11': [
    { id: 'P13001', name: 'Battle Axe', info: 'Bronze war axe used in ancient Egyptian warfare.', image: '🪓' },
    { id: 'P13002', name: 'Shield', info: 'Ancient wooden shield with ceremonial decorations.', image: '🛡️' },
    { id: 'P13003', name: 'Spear Collection', info: 'Bronze and copper spears used in battle.', image: '⚔️' },
  ],
  'G12': [
    { id: 'P14001', name: 'Administrative Tablet', info: 'Clay tablet with government records and decrees.', image: '📋' },
    { id: 'P14002', name: 'Tax Records', info: 'Ancient papyrus documenting tax collection data.', image: '📊' },
    { id: 'P14003', name: 'Census Documents', info: 'Population records from ancient Egypt.', image: '📈' },
  ],
};

// Flatten all gallery pieces into a single array for easier searching
export const ARTIFACTS_DB = Object.values(GALLERY_PIECES).flat();

// Function to determine the category of a piece based on its name
export const getCategoryForPiece = (piece) => {
  const nameLower = piece.name.toLowerCase();
  if (nameLower.includes('mask') || nameLower.includes('throne') || nameLower.includes('diadem') || nameLower.includes('scepter')) {
    return 'Royal Regalia';
  }
  if (nameLower.includes('scribe') || nameLower.includes('papyrus') || nameLower.includes('hieroglyphic') || nameLower.includes('tablet') || nameLower.includes('records') || nameLower.includes('documents')) {
    return 'Writing & Administration';
  }
  if (nameLower.includes('sphinx') || nameLower.includes('statue') || nameLower.includes('relief')) {
    return 'Sculpture & Art';
  }
  if (nameLower.includes('vessel') || nameLower.includes('pottery') || nameLower.includes('loom') || nameLower.includes('tools')) {
    return 'Daily Life & Crafts';
  }
  if (nameLower.includes('jar') || nameLower.includes('sarcophagus') || nameLower.includes('mummy')) {
    return 'Funerary & Burial';
  }
  if (nameLower.includes('ritual') || nameLower.includes('incense') || nameLower.includes('altar') || nameLower.includes('temple') || nameLower.includes('isis')) {
    return 'Religion & Beliefs';
  }
  if (nameLower.includes('map') || nameLower.includes('astronomical') || nameLower.includes('star') || nameLower.includes('clock')) {
    return 'Science & Astronomy';
  }
  if (nameLower.includes('military') || nameLower.includes('chariot') || nameLower.includes('axe') || nameLower.includes('shield') || nameLower.includes('spear')) {
    return 'Military & Warfare';
  }
  if (nameLower.includes('trade') || nameLower.includes('merchant') || nameLower.includes('goods') || nameLower.includes('weights')) {
    return 'Trade & Commerce';
  }
  return 'General Artifact'; // Default category if no keywords match

};

// 7. GALLERY DESCRIPTIONS
const getGalleryDescription = (id) => {
  const descriptions = {
    'G-TUT1': 'Explore the magnificent treasures of Tutankhamun.',
    'G-TUT2': 'Witness the grandeur of ancient pharaohs.',
    'G1': 'Discover opulent throne rooms of Egyptian royalty.',
    'G2': 'Decipher ancient hieroglyphic scripts.',
    'G3': 'Marvel at colossal statues.',
    'G4': 'Experience spiritual grandeur of temples.',
    'G5': 'Learn about master craftsmen.',
    'G6': 'Understand ancient commerce networks.',
    'G7': 'Explore funerary customs.',
    'G8': 'Understand sacred rituals.',
    'G9': 'Discover ancient astronomical knowledge.',
    'G10': 'Witness military expeditions.',
    'G11': 'Learn about warfare and strategy.',
    'G12': 'Review administrative records.',
  };
  return descriptions[id] || 'An ancient Egyptian exhibit.';
};

// 8. GENERATE PATH BY TIME PERIOD
export const generatePath = (timePeriodKey) => {
  const baseGalleries = MASTER_PATHS[timePeriodKey];

  if (!baseGalleries) {
    console.error(`Path not found for period: ${timePeriodKey}`);
    return [];
  }

  const sortedPath = baseGalleries
    .map(id => ({
      id: id,
      crowd: CROWD_DATA[id] || 0,
      name: `${id} - ${GALLERY_NAMES[id] || 'Exhibit Hall'}`,
      description: getGalleryDescription(id),
      pieces: GALLERY_PIECES[id] || [],
    }))
    .sort((a, b) => a.crowd - b.crowd);

  return sortedPath;
};

// 9. SEARCH PIECE IN SPECIFIC GALLERY
export const searchPieceInGallery = (galleryId, pieceId) => {
  const galleryPieces = GALLERY_PIECES[galleryId] || [];
  return galleryPieces.find(p => p.id.toUpperCase() === pieceId.toUpperCase());
};

// 10. GET ALL PIECES IN GALLERY
export const getGalleryPieces = (galleryId) => {
  return GALLERY_PIECES[galleryId] || [];
};

// 11. GET PIECE INFO FROM ANY GALLERY
export const getPieceInfo = (pieceId) => {
  for (const gallery in GALLERY_PIECES) {
    const piece = GALLERY_PIECES[gallery].find(p => p.id.toUpperCase() === pieceId.toUpperCase());
    if (piece) return { ...piece, gallery };
  }
  return {
    id: pieceId,
    name: 'Unknown Artifact',
    info: 'This piece is not currently in our database.',
    image: '❓',
    gallery: 'Unknown'
  };
};

// 12. GENERATE AI RECOMMENDED PATH
export const generateAIRecommendedPath = (selectedInterests, selectedTimePeriods) => {
  let combinedGalleries = [];

  // Combine galleries from all selected time periods
  selectedTimePeriods.forEach(periodKey => {
    const periodGalleries = MASTER_PATHS[periodKey];
    if (periodGalleries) {
      combinedGalleries = [...combinedGalleries, ...periodGalleries];
    }
  });

  // Remove duplicates and create full gallery objects
  const uniqueGalleries = Array.from(new Set(combinedGalleries));

  // Construct full gallery objects with crowd data, name, description, and pieces
  const recommendedPath = uniqueGalleries
    .map(id => ({
      id: id,
      crowd: CROWD_DATA[id] || 0, // Default to 0 if no crowd data
      name: `${id} - ${GALLERY_NAMES[id] || 'Exhibit Hall'}`,
      description: getGalleryDescription(id),
      pieces: GALLERY_PIECES[id] || [],
    }))
    .sort((a, b) => a.crowd - b.crowd); // Sort by crowd, least crowded first

  // Note: For a more advanced AI, interests could be used to
  // filter specific pieces within galleries or reorder galleries based on interest relevance.
  // For this mock, the path is primarily driven by time periods and then sorted by crowd.

  return recommendedPath;
};
