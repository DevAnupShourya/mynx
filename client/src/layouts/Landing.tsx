import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Divider } from "@nextui-org/react";

import Footer from "~/layouts/Footer";
import Navbar from "~/layouts/Navbar";
import NotFound from "~/components/loading_error_pages/NotFound";
import Home from "~/pages/public/Home";
// import Blogs from "~/pages/public/Blogs";
// import About from "~/pages/public/About";
// import Contact from "~/pages/public/Contact";
import Login from "~/pages/public/Login";
import Signup from "~/pages/public/Signup";

export default function Landing() {
  return (
    <section
      data-testid="Landing"
      className={`w-screen h-screen bg-main-text-default overflow-y-scroll`}
    >
      <BrowserRouter>
        <Navbar />
        <Divider />
        <main className="grid place-items-center py-24 max-md:py-16">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            {/* <Route path="/blogs" element={<Blogs />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Divider />
        <Footer />
      </BrowserRouter>
    </section>
  );
}
