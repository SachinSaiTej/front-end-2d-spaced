import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserManagerProvider } from './contexts/UserManager.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <UserManagerProvider>
      <App />
    </UserManagerProvider>
  // </StrictMode>,
)
