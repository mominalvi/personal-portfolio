import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AuroraBackground from "@/components/AuroraBackground";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mominalvi.com"),
  title: "Momin Alvi — Software Engineer",
  description:
    "CS student at Queen's and Software Engineering Intern at OTPP. Builder of AI systems, product tools, and clean web experiences.",
  openGraph: {
    title: "Momin Alvi — Software Engineer",
    description:
      "Builder of AI systems, product tools, and clean web experiences.",
    url: "https://mominalvi.com",
    siteName: "Momin Alvi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Momin Alvi — Software Engineer",
    description:
      "Builder of AI systems, product tools, and clean web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme — runs before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(s===null&&p)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bone text-primary antialiased font-body-md min-h-screen flex flex-col">
        <AuroraBackground />
        {children}
      </body>
    </html>
  );
}
