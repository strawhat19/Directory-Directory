import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LandingProvider } from '../src/shared/landing/LandingProvider';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LandingProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: `#f7f8fa` },
          }}
        />
        <StatusBar style={`dark`} />
      </LandingProvider>
    </SafeAreaProvider>
  );
}
