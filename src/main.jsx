//main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext'; 
import App from './App.jsx';  
import { store } from './redux/store';
import './styles/main.scss'; 
import ErrorBoundary from './utils/ErrorBoundary.jsx'; 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary> 
    <Provider store={store}>  
      <ThemeProvider>         
        <App />              
      </ThemeProvider>
    </Provider>
    </ErrorBoundary>
  </StrictMode>
);
