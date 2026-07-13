'use client';

// Global error handler — renders instead of layout when layout itself crashes

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 40,
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        <h1>Application error</h1>
        <p>{error.message}</p>
        <button onClick={() => reset()} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Reload
        </button>
      </body>
    </html>
  );
}
