export const metadata = {
  title: "Smart Energy IQ — PEA Hackathon 2026 · Precise Nextxus",
  description:
    "AI Energy Management สำหรับโครงข่ายไฟฟ้าเกาะ — Pitch Deck 4 นาที (Team Precise Nextxus)",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06101f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
