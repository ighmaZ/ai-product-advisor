# AI Product Advisor

A React Native application built with TypeScript that provides AI-powered product recommendations.

## Project Structure

```
/my-ai-advisor-app
|-- /src
|   |-- /components
|   |   |-- AdvisorScreen.tsx    # The main screen containing most of your logic
|   |-- catalog.ts               # The product catalog data
|-- App.tsx                      # Root component
|-- README.md                    # Your detailed explanation
|-- package.json
```

## Features

- **AdvisorScreen**: Main interface for the AI product advisor
- **Product Catalog**: Comprehensive product database with categories
- **TypeScript Support**: Full type safety and modern development experience
- **React Native**: Cross-platform mobile application

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server:

   ```bash
   yarn start
   # or
   npm start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your device

## Development

This project uses:

- **React Native**: For cross-platform mobile development
- **TypeScript**: For type safety and better development experience
- **Expo**: For simplified React Native development and deployment

## File Descriptions

### `src/components/AdvisorScreen.tsx`

The main screen component that contains the core logic for the AI product advisor interface. This is where users interact with the recommendation system.

### `src/catalog.ts`

Contains the product catalog data including:

- Product interfaces and types
- Sample product data
- Category definitions
- Helper functions for searching and filtering products

### `App.tsx`

The root component that sets up the application structure and renders the main AdvisorScreen component.
