import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'oryx_user.iguru.co.ke',
  appName: 'oryx',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  }
};

export default config;
