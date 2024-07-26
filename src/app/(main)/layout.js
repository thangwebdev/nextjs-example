import React from "react";
import Footer from "~/components/common/footer/Footer";
import Header from "~/components/common/header/Header";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
