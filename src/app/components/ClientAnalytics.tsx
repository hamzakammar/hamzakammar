'use client';

import { useEffect, useState } from 'react';

export default function ClientAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only import after mount - this prevents any module-level code from running during SSR
    setMounted(true);
    
    Promise.all([
      import("@vercel/analytics/next"),
      import("@vercel/speed-insights/next")
    ]).then(([analyticsMod, speedInsightsMod]) => {
      // Create containers and render manually
      const analyticsContainer = document.createElement('div');
      analyticsContainer.id = '__vercel-analytics';
      document.body.appendChild(analyticsContainer);
      
      const speedInsightsContainer = document.createElement('div');
      speedInsightsContainer.id = '__vercel-speed-insights';
      document.body.appendChild(speedInsightsContainer);

      const React = require('react');
      const { createRoot } = require('react-dom/client');
      
      const analyticsRoot = createRoot(analyticsContainer);
      analyticsRoot.render(React.createElement(analyticsMod.Analytics));
      
      const speedInsightsRoot = createRoot(speedInsightsContainer);
      speedInsightsRoot.render(React.createElement(speedInsightsMod.SpeedInsights));
    }).catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Analytics failed to load:', err);
      }
    });
  }, []);

  // Return null - components are rendered via createRoot
  return null;
}
