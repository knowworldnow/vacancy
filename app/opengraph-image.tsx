import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'VacancyBee';
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <h1
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #000000, #333333)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 24,
          }}
        >
          VacancyBee
        </h1>
        <p
          style={{
            fontSize: 32,
            color: '#666666',
          }}
        >
          Celebrity News and Lifestyle
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}