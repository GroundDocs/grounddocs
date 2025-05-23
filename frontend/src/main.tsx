import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Check if the key exists
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key. Add it to your .env file: VITE_CLERK_PUBLISHABLE_KEY=your_key')
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} 
    afterSignOutUrl="/"
    afterSignInUrl="/home"
    afterSignUpUrl="/home"
    appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true,
      },
    }}
  >
    <App />
  </ClerkProvider>
);
