# AI Product Advisor

A React Native application that helps users find the perfect products by describing their needs in natural language. Powered by Google's Gemini AI and built with modern React Native architecture.

## 🚀 Features

- **Natural Language Search**: Describe what you need in plain English
- **AI-Powered Recommendations**: Get intelligent product suggestions with detailed reasoning
- **Beautiful UI/UX**: Modern design with smooth animations and intuitive interactions
- **Real-time Results**: Fast AI-powered search with loading states and error handling
- **Search History**: Keep track of previous searches for quick access
- **Detailed Product Cards**: Rich product information with pros, cons, and match scores

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **State Management**: Zustand (global state) + React Query (server state)
- **AI Integration**: Google Gemini API
- **UI/UX**: Custom components with Expo Vector Icons and Linear Gradients
- **Language**: TypeScript for type safety

## 📱 Screenshots

_Add screenshots of your app here once it's running_

## 🎬 Demo

![App Demo](

https://github.com/user-attachments/assets/9e211bab-5882-4e8a-810a-71ec1ff5644e

)

_Experience the AI Product Advisor: describe what you need and get personalized product recommendations powered by Google's Gemini AI._

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v14 or later)
- Yarn package manager
- Expo CLI
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd ai-product-advisor
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Setup Google Gemini API**

   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Update `src/config/env.ts` with your API key:
     ```typescript
     export const ENV = {
       GEMINI_API_KEY: "your-actual-api-key-here",
       // ...
     };
     ```

4. **Start the development server**

   ```bash
   yarn start
   ```

5. **Run on your device**
   - Install Expo Go on your phone
   - Scan the QR code displayed in the terminal
   - Or run on simulator: `yarn ios` or `yarn android`

## 🏗 Architecture

### State Management

- **Zustand**: Manages global app state (search history, user preferences)
- **React Query**: Handles API calls, caching, and server state management

### Project Structure

```
src/
├── components/          # React components
│   ├── AdvisorScreen.tsx
│   ├── SearchInput.tsx
│   ├── RecommendationCard.tsx
│   ├── LoadingState.tsx
│   └── EmptyState.tsx
├── stores/              # Zustand stores
│   └── useAppStore.ts
├── services/            # API services
│   └── aiService.ts
├── hooks/               # Custom React hooks
│   └── useProductSearch.ts
├── providers/           # React providers
│   └── QueryProvider.tsx
├── types/               # TypeScript interfaces
│   └── index.ts
├── config/              # Configuration
│   └── env.ts
└── catalog.ts           # Product catalog data
```

### Key Components

1. **AdvisorScreen**: Main application screen
2. **SearchInput**: Natural language input with search history
3. **RecommendationCard**: Rich product display with AI reasoning
4. **LoadingState**: Animated loading component
5. **AIService**: Google Gemini integration with prompt engineering

## 🤖 AI Integration

The app uses Google's Gemini AI with carefully crafted prompts to:

- Analyze user requirements from natural language
- Match products from the catalog based on features, price, and use case
- Provide detailed reasoning for each recommendation
- Score matches out of 10 for relevance
- Identify pros and cons for each suggestion

### Prompt Engineering

The AI prompt includes:

- Clear instructions for product matching
- Structured JSON response format
- Specific guidelines for scoring and reasoning
- Product catalog context injection

## 📊 Product Catalog

The app includes a comprehensive catalog of 60+ products across categories:

- **Entertainment**: Audio devices, gaming accessories, smart toys
- **Kitchen Appliances**: AI cooking assistants, coffee machines
- **Home Improvement**: Robot vacuums, air purifiers, smart devices
- **Travel & Lifestyle**: Smart luggage, tracking devices
- **Smart Mobility**: E-scooters, hoverboards, wheelchairs
- **Security & Surveillance**: Smart locks, cameras, door phones
- **Healthtech and Wellness**: Massagers, health monitors
- **Personal Care**: Hair styling tools, grooming devices

## 🎨 UI/UX Design

### Design Principles

- **Intuitive**: Natural language input feels conversational
- **Visual**: Rich product cards with clear information hierarchy
- **Responsive**: Smooth animations and loading states
- **Accessible**: Clear typography and color contrast

### Color Scheme

- Primary gradient: Purple to indigo (`#C4B5FD` → `#9333EA`)
- Accent: Golden yellow (`#FCD34D`)
- Success: Green (`#10B981`)
- Warning: Amber (`#F59E0B`)
- Error: Red (`#EF4444`)

## 🔧 Configuration

### Environment Variables

Update `src/config/env.ts` with:

- `GEMINI_API_KEY`: Your Google Gemini API key
- Additional configuration as needed

### Product Catalog

The catalog is defined in `src/catalog.ts` and can be extended with additional products following the same schema.

## 🚀 Deployment

### Expo Build

```bash
expo build:android
expo build:ios
```

**Built by ighmaz with ❤️ using React Native, TypeScript, and Google Gemini AI**
