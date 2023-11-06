import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Footer, Navbar } from "~/layouts/layout.barrel";
import {
  Home,
  NotFound,
  About,
  Contact,
} from "~/pages/public/public.pages.barrel";

export default function Landing() {
  return (
    <section
      aria-label="Landing Page Containor"
      className={`w-screen h-screen bg-def selection:text-secondary selection:bg-primary `}
    >
      <section className="w-full h-full flex-col justify-between items-center p-5 border-2 border-red-600">
        <BrowserRouter>
          <Navbar />
          <main className="border">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </section>
    </section>
  );
}
