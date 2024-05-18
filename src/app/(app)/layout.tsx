import * as React from "react";
import Header from "@/layouts/dashboard/header/header";
import Footer from "@/layouts/dashboard/footer/footer";
interface LayoutProps {
  children?: React.ReactNode;
}

const HomePageLayout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};

export default HomePageLayout;
