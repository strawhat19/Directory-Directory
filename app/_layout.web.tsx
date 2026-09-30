import './globals.scss';
import '@fontsource-variable/inter';
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/shared/auth/AuthProvider';
import { useTheme } from '../src/shared/theme/useTheme';
import { LandingProvider } from '../src/shared/landing/LandingProvider';
import { ThemeProvider } from '../src/shared/theme/ThemeProvider';

function RootStack() {
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: isDark ? `#0b1220` : `#f7f8fa` },
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LandingProvider>
          <RootStack />
        </LandingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
