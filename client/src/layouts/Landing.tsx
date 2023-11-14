import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Footer, Navbar } from "~/layouts/layout.barrel";
import { NotFound } from "~/components/components.barrel";
import {
  Home,
  About,
  Contact,
  Blogs,
  Login
} from "~/pages/public/public.pages.barrel";

export default function Landing() {
  return (
    <section
      aria-label="Landing Page Containor"
      className={`w-screen h-screen bg-def`}
    >
      <section className="w-screen h-auto bg-def p-5">
        <BrowserRouter>
          <Navbar />
          <main className="py-20 max-sm:py-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </section>
    </section>
  );
}
