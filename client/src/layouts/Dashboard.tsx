import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TopbarPrivate, BottomBarPrivate } from "~/layouts/layout.barrel";
import {
  ChatsPage,
  FeedPage,
  FollowerPage,
  NewPostPage,
  NotFoundPrivate,
  NotificationsPage,
  SettingsPage,
  TrendingPage,
  UserProfilePage,
} from "~/pages/private/private.pages.barrel";
import {
  VixsnapsContainer,
  VixetsContainer,
  VixdeoContainer,
  EngagementContainer,
} from "~/components/components.barrel";
import { ScrollShadow, Divider } from "@nextui-org/react";

export default function Dashboard() {
  return (
    <section className={`w-screen h-screen flex flex-col bg-main-text-default`}>
      <BrowserRouter>
        <main className="bg-main-text-main w-full h-auto fixed top-0 left-0 backdrop-blur-md bg-opacity-75 dark:bg-opacity-50 z-50">
          <TopbarPrivate />
          <Divider />
        </main>
        <section className="bg-main-text-main w-full flex-1 my-16 px-24 max-md:px-10 max-sm:px-2 overflow-x-hidden">
          <ScrollShadow
            hideScrollBar
            className="w-full h-full flex flex-row justify-between"
          >
            <main className="max-md:w-full w-2/3 h-full my-2">
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/new" element={<NewPostPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/follower" element={<FollowerPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/:username/" element={<UserProfilePage />}>
                  <Route index element={<VixetsContainer />} />
                  <Route path="vixsnaps" element={<VixsnapsContainer />} />
                  <Route path="vixdeos" element={<VixdeoContainer />} />
                  <Route path="engagements" element={<EngagementContainer />} />
                </Route>
                <Route element={<NotFoundPrivate />} />
              </Routes>
            </main>
            <aside className="max-md:hidden w-1/3 h-full px-5">
              {/* <TrendingCard /> */}
            </aside>
          </ScrollShadow>
        </section>
        <nav className="bg-main-text-main w-full h-auto fixed bottom-0 left-0 backdrop-blur-lg bg-opacity-75 dark:bg-opacity-50 z-50">
          <Divider />
          <BottomBarPrivate />
        </nav>
      </BrowserRouter>
    </section>
  );
}
