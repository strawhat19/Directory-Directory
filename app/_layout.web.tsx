import '@fontsource-variable/inter'
import './globals.scss'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
