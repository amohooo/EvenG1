import { AuthenticatedRequest, AppServer } from '@mentra/sdk';
import express from 'express';
import path from 'path';

/**
 * Sets up all Express routes and middleware for the server
 * @param server The server instance
 */
export function setupExpressRoutes(server: AppServer): void {
  // Get the Express app instance
  const app = server.getExpressApp();

  // Set up EJS as the view engine
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs').__express);
  app.set('views', path.join(__dirname, 'views'));

  // Add a root route for debugging
  app.get('/', (req, res) => {
    res.json({ 
      message: 'MentraOS App Server is running!',
      endpoints: ['/webview', '/health'],
      timestamp: new Date().toISOString()
    });
  });

  // Add health check route
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Register a route for handling webview requests
  app.get('/webview', (req: AuthenticatedRequest, res) => {
    try {
      if (req.authUserId) {
        // Render the webview template
        res.render('webview', {
          userId: req.authUserId,
        });
      } else {
        res.render('webview', {
          userId: undefined,
        });
      }
    } catch (error) {
      console.error('Error rendering webview:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  });

  // Add 404 handler
  app.use((req, res) => {
    res.status(404).json({ 
      error: 'Resource not found',
      path: req.path,
      method: req.method,
      availableRoutes: ['/', '/webview', '/health']
    });
  });
}
