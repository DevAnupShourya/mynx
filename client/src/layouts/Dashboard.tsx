import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavbarPrivate, NavbarMobilePrivate } from "~/layouts/layout.barrel";
import {
  ChatsPage,
  FeedPage,
  FollowerPage,
  NewPostPage,
  NotFoundPrivate,
  NotificationsPage,
  SettingsPage,
  TrendingPage,
} from "~/pages/private/private.pages.barrel";

import { ScrollShadow } from "@nextui-org/react";

import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <section id="Dashboard Contanior" className={`w-screen h-screen bg-def`}>
      <BrowserRouter>
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="grid place-items-center w-full h-1/6 max-md:h-[15%] py-2 max-sm:py-0 "
        >
          <NavbarPrivate />
        </motion.div>
        <div className="f-row max-sm:w-full max-md:w-11/12 w-10/12 h-5/6 max-md:h-[75%] mx-auto ">
          <motion.aside
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="max-md:hidden w-1/3 h-full overflow-y-scroll noBars"
          >
            {/* <Aside /> */}
            Aside
          </motion.aside>
          <main className="max-md:w-full w-2/3 h-full md:pl-10 max-md:px-2">
            <ScrollShadow hideScrollBar className="w-full h-full">
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/follower" element={<FollowerPage />} />
                <Route path="/new" element={<NewPostPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="*" element={<NotFoundPrivate />} />
              </Routes>
            </ScrollShadow>
          </main>
        </div>
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="md:hidden grid place-items-center w-full h-1/6 max-md:h-[10%] py-2 max-sm:py-0"
        >
          <NavbarMobilePrivate />
        </motion.div>
      </BrowserRouter>
    </section>
  );
}
