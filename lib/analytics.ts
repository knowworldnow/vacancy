type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
};

export const Analytics = {
  pageView: (url: string) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if ('gtag' in window) {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
          page_path: url,
        });
      }

      // Plausible Analytics
      if ('plausible' in window) {
        (window as any).plausible('pageview', { props: { url } });
      }
    }
  },

  event: ({ name, properties = {} }: AnalyticsEvent) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if ('gtag' in window) {
        (window as any).gtag('event', name, properties);
      }

      // Plausible Analytics
      if ('plausible' in window) {
        (window as any).plausible(name, { props: properties });
      }
    }
  },
};