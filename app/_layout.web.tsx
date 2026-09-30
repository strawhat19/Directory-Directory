import './globals.scss';
import '@fontsource-variable/inter';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/shared/auth/AuthProvider';
import { LandingProvider } from '../src/shared/landing/LandingProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <LandingProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: `#f7f8fa` },
          }}
        />
      </LandingProvider>
    </AuthProvider>
  );
}
