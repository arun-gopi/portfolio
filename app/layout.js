import { Outfit, Ovo} from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ["400", "500", "600", "700"]
});

const ovo = Ovo({
  subsets: ["latin"], weight: ["400"]
});



export const metadata = {
  title: "Arun Gopi | Healthcare RCM & Analytics Leader",
  description:
    "Portfolio of Arun Gopi, a healthcare revenue cycle management leader and analytics specialist focused on RCM operations, Power BI, Microsoft Fabric, SQL, and Python.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-7 overflow-x-hidden text-slate-900 dark:bg-darkTheme dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
