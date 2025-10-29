

import { FilterBar } from "./ui/FilterBar";
import "./ui/global.css"
import Header from "./ui/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body  className={`$antialiased `}>
          <Header /> 
          <FilterBar />
          {children}
        </body>
    </html>
  );
}
