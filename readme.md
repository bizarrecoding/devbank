# DevBank App

An Expo-based React Native application for managing products.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo Go](https://expo.dev/expo-go) app on your mobile device or an emulator (iOS Simulator/Android Emulator)
- npm

## Configuration

The app requires an API endpoint to function. Create a `.env` file in the root directory of the project with the following format:

```env
EXPO_PUBLIC_API_URL=http://localhost:3002
```

> Android emulators need to point to http://10.0.2.2:3002 due to how emulation "localhost" refers to the emulator itself, not the host  

## Building the project

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

Start the Expo development server:

```bash
npx expo start
```

From the Expo CLI, you can:
- Press `i` to open in iOS Simulator (macOS only)
- Press `a` to open in Android Emulator


## Testing

The project uses Jest and React Native Testing Library for verification.

### Run all tests
```bash
npm test
```