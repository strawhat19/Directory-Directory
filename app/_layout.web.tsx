import './globals.scss';
import '@fontsource-variable/inter';
import { Stack } from 'expo-router';
import { LandingProvider } from '../src/shared/landing/LandingProvider';

export default function RootLayout() {
  return (
    <LandingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: `#f7f8fa` },
        }}
      />
    </LandingProvider>
  );
}
