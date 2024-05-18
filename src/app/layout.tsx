import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Layout as RootLayout } from "../layouts/root";
import "./globals.scss";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "",
  description: "",
  viewport: "initial-scale=1, width=device-width",
};

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  return (
    <html lang="en">
      <head>

        <link rel="icon" href="/favicon.ico" sizes="any" />

      </head>
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}

export default Layout;
