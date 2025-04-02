import { Suspense } from "react";
import Footer from "./components/Footer/Footer";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      {/* <Header /> */}
      <main className="content">
        <Suspense fallback={null}>{children}</Suspense>
        <SignUpPage/>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
