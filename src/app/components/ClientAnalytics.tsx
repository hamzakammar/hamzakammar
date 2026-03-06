"use client";

import { useEffect } from "react";

export default function ClientAnalytics() {
  useEffect(() => {
    Promise.all([
      import("@vercel/analytics/next"),
      import("@vercel/speed-insights/next"),
    ])
      .then(([analyticsMod, speedInsightsMod]) => {
        const analyticsContainer = document.createElement("div");
        analyticsContainer.id = "__vercel-analytics";
        document.body.appendChild(analyticsContainer);

        const speedInsightsContainer = document.createElement("div");
        speedInsightsContainer.id = "__vercel-speed-insights";
        document.body.appendChild(speedInsightsContainer);

        import("react").then((React) => {
          import("react-dom/client").then(({ createRoot }) => {
            const analyticsRoot = createRoot(analyticsContainer);
            analyticsRoot.render(
              React.createElement(analyticsMod.Analytics)
            );

            const speedInsightsRoot = createRoot(speedInsightsContainer);
            speedInsightsRoot.render(
              React.createElement(speedInsightsMod.SpeedInsights)
            );
          });
        });
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.warn("Analytics failed to load:", err);
        }
      });
  }, []);

  return null;
}
