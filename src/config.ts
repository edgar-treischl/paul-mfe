/**
 * Application Configuration
 * 
 * API base URL configuration for backend integration.
 */

interface AppConfig {
  /** API base URL (to be configured when backend is ready) */
  API_BASE_URL: string;
}

export const config: AppConfig = {
  // API configuration (update when backend is ready)
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
};
