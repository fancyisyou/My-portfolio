import { Outfit, JetBrains_Mono, Cairo } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageProvider from "@/components/LanguageProvider";
import CanvasParticles from "@/components/CanvasParticles";
import WordLoader from "@/components/WordLoader";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata = {
  title: "Daniel — Design & Development",
  description:
    "Portfolio of Daniel. Product designer and front-end developer crafting thoughtful digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${outfit.variable} ${jetbrainsMono.variable} ${cairo.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var t = localStorage.getItem('theme');
                if (t !== 'dark' && t !== 'light') {
                  t = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', t);
              })();
            `,
          }}
        />
        <style>{`
          #page-loader {
            position: fixed; inset: 0; z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            background: #0c0c0c;
            transition: opacity 0.6s ease, visibility 0.6s ease;
          }
          @media (prefers-color-scheme: light) {
            #page-loader { background: #fafaf9; }
          }
          #page-loader.done { opacity: 0; visibility: hidden; }
        `}</style>
      </head>
      <body className="min-h-dvh">
        <div id="page-loader">
          <WordLoader />
        </div>
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <CanvasParticles />
        </div>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
