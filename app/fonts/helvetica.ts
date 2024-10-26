import localFont from 'next/font/local';

export const helvetica = localFont({
  src: [
    {
      path: './HelveticaNowDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './HelveticaNowDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './HelveticaNowDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
  display: 'swap',
});