import { Suspense } from "react";

const Layout = ({ children }) => {
  return (
    <div>
      {/* <Header /> */}
      <Suspense fallback={null}>{children}</Suspense>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
