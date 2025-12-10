# GEM Nexus: Architecture & Logic Flow

This document outlines the proposed architecture, data structures, and core logic for the "GEM Nexus" mobile application.

## Data Structures

Below are the JSON-formatted data structures for the core entities of the application.

### User Data Structure

This structure represents a user of the app, their role, preferences, and progress.

```json
{
  "user": {
    "id": "user-123",
    "role": "subscribed",
    "name": "Anas",
    "email": "anas@example.com",
    "persona": "The Master Builder",
    "selectedEra": "1550-1069 BC",
    "isSubscribed": true,
    "gemWrap": [
      "artifact-456",
      "artifact-789"
    ],
    "onboardingComplete": true
  }
}
```

*   **`role`**: Can be one of `"guest"`, `"signed-up"`, or `"subscribed"`. This determines the user's access level.
*   **`persona`**: The persona selected by the user during onboarding (e.g., "The Master Builder").
*   **`selectedEra`**: The time period selected by the user.
*   **`isSubscribed`**: A boolean flag indicating if the user has an active subscription.
*   **`gemWrap`**: An array of artifact IDs that the user has saved to their collection.

### Gallery Data Structure

This structure represents one of the 12 main galleries in the museum.

```json
{
  "gallery": {
    "id": "gallery-1",
    "name": "Tutankhamun's Treasures",
    "description": "Explore the dazzling treasures from the tomb of the boy king.",
    "tags": ["The Royal Heir", "The Explorer"],
    "era": "1550-1069 BC",
    "crowdDensity": 0.75,
    "artifacts": [
      "artifact-101",
      "artifact-102"
    ]
  }
}
```

*   **`tags`**: An array of personas that this gallery is relevant to.
*   **`era`**: The historical era that this gallery belongs to.
*   **`crowdDensity`**: A real-time value between 0 (empty) and 1 (full) representing the crowd level in the gallery.

### Artifact Data Structure

This structure represents a single artifact within a gallery.

```json
{
  "artifact": {
    "id": "artifact-101",
    "name": "Mask of Tutankhamun",
    "description": "The iconic golden funerary mask of the pharaoh.",
    "image": "url_to_image",
    "audioGuide": "url_to_audio_file"
  }
}
```

## Core Logic: Dynamic Path Generator

The following pseudo-code outlines the algorithm for generating a unique and optimized path for each user.

### Pseudo-code

```
FUNCTION generateDynamicPath(userPersona, selectedEra, allGalleries):

  // 1. Filter galleries based on user's persona and selected era
  filteredGalleries = []
  FOR EACH gallery in allGalleries:
    personaMatch = userPersona IN gallery.tags
    eraMatch = (selectedEra == "All Centuries" OR selectedEra == gallery.era)

    IF personaMatch AND eraMatch:
      add gallery to filteredGalleries

  // 2. Sort the filtered galleries by crowd density in ascending order
  sortedGalleries = SORT filteredGalleries BY crowdDensity ASCENDING

  // 3. To ensure different paths for users with the same preferences,
  //    we introduce a mechanism to vary the starting point.
  finalPath = []
  IF length of sortedGalleries > 1:
    // Find all galleries with the lowest crowd density
    lowestDensity = sortedGalleries[0].crowdDensity
    leastCrowdedGalleries = []
    FOR EACH gallery in sortedGalleries:
      IF gallery.crowdDensity == lowestDensity:
        add gallery to leastCrowdedGalleries
      ELSE:
        BREAK

    // Randomly select one of the least crowded galleries as the starting point
    startingGallery = RANDOM_CHOICE from leastCrowdedGalleries

    // Build the final path, starting with the selected gallery
    finalPath = [startingGallery]
    FOR EACH gallery in sortedGalleries:
      IF gallery.id != startingGallery.id:
        add gallery to finalPath
  ELSE:
    finalPath = sortedGalleries

  RETURN finalPath

```

### How it Works

1.  **Filtering:** The algorithm first selects a list of galleries that are relevant to the user's chosen persona and time period.
2.  **Crowd Control:** It then sorts the filtered galleries by their real-time `crowdDensity`, from least crowded to most crowded.
3.  **Unique Path Generation:** To prevent users with the same preferences from being sent on the exact same path, the algorithm randomly selects a starting point from the least crowded galleries. This ensures that the paths are distributed and helps to manage the flow of visitors.
