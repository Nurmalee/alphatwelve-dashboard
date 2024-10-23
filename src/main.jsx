import { UIProvider } from '../contexts/UIContext.jsx';
import { createRoot } from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import { StrictMode } from 'react';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </StrictMode>
);
