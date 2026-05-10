import { ViteSSG } from 'vite-ssg/single-page'; // Use 'single-page' if not using a complex router, or just 'vite-ssg'
import App from './App';
import './index.css';

// This replaces your existing ReactDOM.createRoot logic
export const createApp = ViteSSG(
  App,
  ({ app, router, routes, isClient, initialState }) => {
    // You can add plugins or analytics here if needed
  }
);
