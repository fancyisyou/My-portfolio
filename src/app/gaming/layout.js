import { Noto_Sans_Arabic } from "next/font/google";
import "./gaming.css";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
});

export const metadata = {
  title: "ANVAR — Esports Team | فريق أنفار",
  description:
    "Official website of ANVAR esports team. Compete. Dominate. Win.",
};

export default function GamingLayout({ children }) {
  return (
    <div className={notoSansArabic.variable}>
      {children}
    </div>
  );
}
