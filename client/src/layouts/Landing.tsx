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
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}
