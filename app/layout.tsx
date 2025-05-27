import type { Metadata } from "next";

import "@/app/globals.css";

import ThemeProvider from "./components/ThemeProvider";
import HomePage from "./page";

export const metadata: Metadata = {
  title: "CyberixAdmin",
  description: "Cyberix Admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
          <HomePage children={children} />
        </ThemeProvider>
      </body>
    </html>
  );
}
