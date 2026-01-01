
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@/index.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/context/ThemeContext';
import { LocalizationProvider } from '@/context/LocalizationContext';
import '@/lib/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <LocalizationProvider>
        <App />
        <Toaster />
      </LocalizationProvider>
    </ThemeProvider>
  </BrowserRouter>
);
