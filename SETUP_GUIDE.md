# 🚀 Quick Setup Guide for AI Product Advisor

## 📋 Prerequisites

- Node.js (v14+)
- Yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- Google Gemini API key

## ⚡ Quick Start

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Configure the App

1. Open `src/config/env.ts`
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```typescript
   export const ENV = {
     GEMINI_API_KEY: "your-actual-gemini-api-key-here",
     // ...
   };
   ```

### 3. Install and Run

```bash
# Install dependencies (already done if you see this)
yarn install

# Start the development server
yarn start

# Run on your device
# Scan QR code with Expo Go app
# OR run on simulator
yarn ios    # iOS simulator
yarn android # Android emulator
```

## 🎯 How to Use

1. **Launch the app** - You'll see the beautiful gradient interface
2. **Enter your query** - Describe what you need in natural language:
   - "I need a laptop for programming and travel"
   - "Looking for smart home security under ₹15,000"
   - "Want wireless headphones for gaming"
3. **Get AI recommendations** - See detailed product matches with:
   - Match scores out of 10
   - Detailed reasoning
   - Pros and cons
   - Product specifications
4. **Tap cards** for more details
5. **Use search history** for quick access to previous searches

## 🎨 Features to Try

- **Search History**: Previous searches are saved and easily accessible
- **Natural Language**: Describe needs conversationally
- **Rich Recommendations**: Each suggestion includes detailed reasoning
- **Visual Feedback**: Beautiful loading animations and error states
- **Interactive UI**: Smooth animations and intuitive interactions

## 🛠 Troubleshooting

### API Key Issues

- Ensure your Gemini API key is correctly set in `src/config/env.ts`
- Check the console for API key warnings
- Verify your API key has proper permissions

### App Not Starting

```bash
# Clear cache and restart
yarn start --clear
```

### No Recommendations

- Check your internet connection
- Verify the API key is working
- Try simpler search queries first

## 📱 Testing Queries

Try these example queries to see the AI in action:

**Electronics:**

- "I need a budget-friendly robot vacuum cleaner"
- "Looking for premium wireless earbuds under ₹5000"

**Health & Wellness:**

- "Want a massage device for neck pain relief"
- "Need a fitness tracker with heart rate monitoring"

**Home & Kitchen:**

- "Smart coffee maker for home office setup"
- "Air purifier for large living room"

**Security:**

- "Smart door lock with mobile app control"
- "Dashboard camera for car safety"

## 🎯 Next Steps

Once the app is running:

1. Test with various search queries
2. Explore the search history feature
3. Check the detailed product recommendations
4. Try the intuitive UI interactions

Enjoy your AI-powered product search experience! 🎉
