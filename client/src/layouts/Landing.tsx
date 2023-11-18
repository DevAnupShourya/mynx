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

export default function Landing() {
  return (
    <section aria-label="Landing Page Container" className={`h-auto bg-def`}>
      <BrowserRouter>
        <Navbar />
        <main className="flex- py-20 max-sm:py-10">
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
        <Footer />
      </BrowserRouter>
    </section>
  );
}
