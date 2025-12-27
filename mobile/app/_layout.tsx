import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { Stack, useRouter, useSegments } from 'expo-router';
import { store, RootState } from '../src/state/store'; // Ensure path is correct
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we check authentication
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const { token } = useSelector((state: RootState) => state.auth);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Hide splash screen once we have evaluated the state
    SplashScreen.hideAsync();

    const inTabsGroup = segments[0] === '(tabs)';

    if (!token && inTabsGroup) {
      // If no token and trying to see dashboard, go to login
      router.replace('/login');
    } else if (token && segments[0] === 'login') {
      // If logged in and on login page, go to dashboard
      router.replace('/(tabs)/home');
    }
  }, [token, segments]);

  return (
    <Stack>
      {/* Ensure name="login" matches your file app/login.tsx */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}