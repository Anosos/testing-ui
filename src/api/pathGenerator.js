import { ARTIFACTS_DB, getCategoryForPiece } from '../api';

const galleries = [
  { id: 1, name: "Tutankhamun's Treasures", tags: ["The Royal Heir", "The Explorer"], era: "700000-2034 BC" },
  { id: 2, name: "Old Kingdom", tags: ["The Master Builder", "The High Priest"], era: "700000-2034 BC" },
  { id: 3, name: "Middle Kingdom", tags: ["The Master Builder", "The Artisan"], era: "700000-2034 BC" },
  { id: 4, name: "New Kingdom", tags: ["The Warrior", "The Royal Heir"], era: "2034-1550 BC" },
  { id: 5, name: "Late Period", tags: ["The High Priest", "The Explorer"], era: "2034-1550 BC" },
  { id: 6, name: "Greco-Roman Period", tags: ["The Explorer", "The Artisan"], era: "2034-1550 BC" },
  { id: 7, name: "Royal Mummies", tags: ["The Royal Heir", "The High Priest"], era: "1550-1069 BC" },
  { id: 8, name: "Funerary Beliefs", tags: ["The High Priest", "The Explorer"], era: "1550-1069 BC" },
  { id: 9, name: "Military History", tags: ["The Warrior"], era: "1550-1069 BC" },
  { id: 10, name: "Artisans and Workers", tags: ["The Artisan", "The Master Builder"], era: "1069 BC-394 AD" },
  { id: 11, name: "Boats of Khufu", tags: ["The Master Builder", "The Explorer"], era: "1069 BC-394 AD" },
  { id: 12, name: "Colossal Statue of Ramesses II", tags: ["The Royal Heir", "The Warrior"], era: "1069 BC-394 AD" },
];

const getCrowdStatus = (density) => {
  if (density < 0.4) return 'Low';
  if (density < 0.7) return 'Medium';
  return 'High';
};

const statusPriority = {
  'Low': 1,
  'Medium': 2,
  'High': 3,
};

// This function is the core of the dynamic path generation.
export const generateDynamicPath = (userPersonas, selectedGalleries, selectedCategories) => {
  const galleryGroupMapping = {
    '1-3': [1, 2, 3],
    '4-6': [4, 5, 6],
    '7-9': [7, 8, 9],
    '10-12': [10, 11, 12],
  };

  let applicableGalleries = [];
  if (selectedGalleries.includes("all")) { // 'all' is not yet implemented in TimePeriodScreen, but for future
    applicableGalleries = galleries;
  } else {
    const galleryIds = selectedGalleries.flatMap(key => galleryGroupMapping[key] || []);
    applicableGalleries = galleries.filter(g => galleryIds.includes(g.id));
  }

  // Filter by categories
  if (selectedCategories && selectedCategories.length > 0) {
    const categoriesSet = new Set(selectedCategories);
    applicableGalleries = applicableGalleries.filter(gallery => {
        // Find all artifacts for the current gallery
        const artifactsInGallery = ARTIFACTS_DB.filter(artifact => 
            parseInt(artifact.galleryId) === gallery.id
        );
        // Check if any artifact in this gallery matches a selected category
        return artifactsInGallery.some(artifact => 
            categoriesSet.has(getCategoryForPiece(artifact))
        );
    });
  }

  const filteredGalleries = applicableGalleries.filter(gallery => {
    return userPersonas.some(p => gallery.tags.includes(p)) || userPersonas.includes("Select All");
  });

  const galleriesWithCrowdStatus = filteredGalleries.map(gallery => {
    const crowdDensity = Math.random(); // Mock crowd data
    return {
      ...gallery,
      crowdDensity,
      crowdStatus: getCrowdStatus(crowdDensity),
    };
  });

  // Sort by crowd status first (Low -> Medium -> High)
  const sortedGalleries = galleriesWithCrowdStatus.sort((a, b) => {
    return statusPriority[a.crowdStatus] - statusPriority[b.crowdStatus];
  });
  
  // To ensure variability for users with identical choices, randomize the starting point among the least crowded galleries.
  if (sortedGalleries.length > 1) {
    const lowestPriority = statusPriority[sortedGalleries[0].crowdStatus];
    const leastCrowdedGalleries = sortedGalleries.filter(g => statusPriority[g.crowdStatus] === lowestPriority);
    
    // Pick a random gallery from the least crowded ones to start the path
    const startingGallery = leastCrowdedGalleries[Math.floor(Math.random() * leastCrowdedGalleries.length)];

    const finalPath = [startingGallery];
    sortedGalleries.forEach(gallery => {
      if (gallery.id !== startingGallery.id) {
        finalPath.push(gallery);
      }
    });
    return finalPath;
  }

  return sortedGalleries;
};