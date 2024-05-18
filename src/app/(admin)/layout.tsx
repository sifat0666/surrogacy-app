import * as React from "react";
import Header from "@/layouts/dashboard/header/header";
import Footer from "@/layouts/dashboard/footer/footer";
import AdminLayout from "@/layouts/admin";
import { withAuthGuard } from "@/hoc/with-auth-guard";

interface LayoutProps {
  children?: React.ReactNode;
}

const AdminPageLayout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <Header />
      <AdminLayout>{children}</AdminLayout>
      <Footer />
    </React.Fragment>
  );
};

export default withAuthGuard(AdminPageLayout);
// export default AdminPageLayout;
