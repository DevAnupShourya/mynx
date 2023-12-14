import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Footer, Navbar } from "~/layouts/layout.barrel";
import { NotFound } from "~/components/components.barrel";
import {
  Home,
  About,
  Contact,
  Blogs,
  Login,
  Signup,
} from "~/pages/public/public.pages.barrel";
import { Divider } from "@nextui-org/react";

export default function Landing() {
  return (
    <section
      aria-label="Landing Page Container"
      className={`w-screen min-h-screen bg-main-text-default overflow-x-hidden`}
    >
      <BrowserRouter>
        <Navbar />
        <Divider />
        <main className="grid place-items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
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
