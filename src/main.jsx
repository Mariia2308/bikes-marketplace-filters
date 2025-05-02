import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext'; // Імпортуємо ThemeProvider
import './index.css';
import App from './App.jsx';
import { store } from './redux/store'; // Підключаємо твій Redux store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
          <App />

      </ThemeProvider>
    </Provider>
  </StrictMode>
);
