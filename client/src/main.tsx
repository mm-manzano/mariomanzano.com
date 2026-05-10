import { ViteSSG } from 'vite-ssg/single-page';
import App from './App';
import './index.css';

export const createApp = ViteSSG(
  App,
  ({ app, router, routes, isClient, initialState }) => {
    // This function runs during both build and client-side hydration.
    // You can add global plugins or analytics here if needed in the future.
  }
);
