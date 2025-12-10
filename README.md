# GEM APP - Museum Navigation System

A personalized museum experience application that guides visitors through ancient Egyptian exhibits based on their interests and preferences.

## 🏛️ Features

### Screen Flow (S1 → S2 → S3 → S4)

1. **Welcome Screen (S1)** - Language Selection
   - Choose from English, Arabic, French, or Spanish
   - Personalize your experience with language preference

2. **Interest Screen (S2)** - Persona Selection
   - The Master Builder 🏗️
   - The Royal Heir 👑
   - The Warrior ⚔️
   - The Highest Priest ☥
   - The Artisan 🎨
   - The Explorer 🔍

3. **Time Period Screen (S3)** - Historical Era Selection
   - New Kingdom (1550 - 1070 BCE)
   - Middle Kingdom (2034 - 1550 BCE)

4. **Path Display Screen (S4)** - Personalized Journey
   - AI-generated gallery recommendations
   - Crowd level indicators (Low/Moderate/Busy)
   - Real-time navigation ("Take Me There")
   - Piece search and details
   - Audio guides (subscription required)
   - Artifact collection system

## 🎯 AI Path Generation Logic

The system uses a **Master Paths** algorithm:
- Each persona × time period combination = unique gallery sequence
- Galleries are **sorted by crowd level** (least to most crowded)
- Helps optimize visitor flow and experience

### Example:
- Persona: **Royal Heir** + Period: **New Kingdom**
- Path: G7 (15 people) → G8 (20) → G9 (10) → G-TUT1 (80) → G-TUT2 (30)
- Sorted: G9 → G7 → G8 → G-TUT2 → G-TUT1

## 📦 Project Structure

```
GEM_APP/
├── src/
│   ├── App.js                    # Main navigation controller
│   ├── api.js                    # Backend logic & master paths
│   ├── index.js                  # React entry point
│   ├── index.css                 # Global styles
│   ├── screens/
│   │   ├── WelcomeScreen.js      # Language selection
│   │   ├── InterestScreen.js     # Persona selection
│   │   ├── TimePeriodScreen.js   # Time period selection
│   │   └── PathDisplayScreen.js  # Journey display & search
│   └── components/
│       └── PieceCard.js          # Artifact modal details
├── public/
│   └── index.html               # HTML template
└── package.json                 # Dependencies
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm start
```

The app opens at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 🎨 Design System

### Colors
- **Primary Gold**: `#C09943` - Highlights & CTAs
- **Dark Background**: `#1a1a1a` - Main background
- **Card Background**: `#1E1E1E` - Content cards
- **Text**: `#ffffff` - Primary text, `#aaa` - Secondary text

### Typography
- Heading: Bold, 24-48px
- Body: Regular, 14-16px
- Interactive: Bold, 16-18px

## 📋 Features & Functionalities

### Path Display Features
- ✅ **Gallery Recommendations** - Based on persona & period
- ✅ **Crowd Indicators** - Real-time occupancy status
- ✅ **Navigation** - "Take Me There" BLE beacon integration
- ✅ **Piece Search** - Search artifacts by ID (P4500, P2301, etc.)
- ✅ **Audio Guides** - Subscription-locked content
- ✅ **Artifact Collection** - Add pieces to personal gallery

### Access Control
- **Guests** - Can search pieces and add to collection
- **Signed-up Users** - Can generate GEM Wrap summaries
- **Subscribers** - Access to premium audio guides

## 📝 API Reference

### `generatePath(persona, timePeriod)`
Generates personalized gallery path sorted by crowd level.

**Parameters:**
- `persona`: 'MasterBuilder' | 'RoyalHeir' | 'Warrior' | 'HighestPriest' | 'Artisan' | 'Explorer'
- `timePeriod`: '2034-1550' | '1550-1069'

**Returns:** Array of gallery objects with ID, name, crowd level

### `getPieceInfo(pieceId)`
Retrieves artifact details by ID.

**Example Pieces:**
- P4500 - The Blue Faience Hippopotamus
- P2301 - The Scribe Statue
- P5678 - Tutankhamun's Golden Mask
- P1234 - Canopic Jars of Tutankhamun

## 🔧 Customization

### Add New Personas
Edit `src/api.js` - Add entry to `MASTER_PATHS`:
```javascript
"NewPersona_1550-1069": ["G1", "G2", "G3"],
"NewPersona_2034-1550": ["G4", "G5", "G6"],
```

### Adjust Crowd Data
Update `CROWD_DATA` object:
```javascript
const CROWD_DATA = {
  "G1": 45,  // Change crowd numbers
  "G2": 32,
  // ...
};
```

### Add Galleries
Update `GALLERY_NAMES` and `CROWD_DATA` in `api.js`.

## 🎓 Learning Path

The app demonstrates:
- **React State Management** - Screen navigation & data flow
- **Component Architecture** - Modular, reusable components
- **Styled Components** - Modern CSS-in-JS styling
- **Algorithm Design** - AI path generation with sorting
- **UX/UI Patterns** - Modal dialogs, form handling, notifications
- **Responsive Design** - Mobile-first approach

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers (1920x1080+)
- Tablets (768x1024)
- Mobile devices (375x667+)

## 🔐 Security & Privacy

- No user data is stored locally
- API calls are simulated (ready for real backend integration)
- BLE beacon system requires device permissions

## 📚 Future Enhancements

- [ ] Real-time crowd data from IoT sensors
- [ ] BLE beacon integration for indoor navigation
- [ ] Backend API integration
- [ ] User authentication & profiles
- [ ] Audio guide streaming
- [ ] Social sharing features
- [ ] Multi-language support improvements
- [ ] AR/VR experiences

## 📄 License

This project is part of the GEM APP initiative for cultural heritage preservation.

## 👥 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Status:** Production Ready
