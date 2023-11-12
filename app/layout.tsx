import { Inter } from "next/font/google";
import "./globals.css";
import LinkButton from "./components/linkButton";
import Branding from "./components/branding";

const inter = Inter({ subsets: ["latin"] });

/*
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const test = false;
  return (
    <html>
      <body>
        <main className="h-[calc(100vh-110px)]">
          <Branding />
          {children}
        </main>
        <footer>
          <div className="flex flex-col items-center max-w-m p-0 align-bottom">
            <LinkButton
              Title="Home"
              Subtext="return home"
              link="/"
              Dir="up"
              HideSelf={true}
            />
          </div>
        </footer>
      </body>
    </html>
  );
}