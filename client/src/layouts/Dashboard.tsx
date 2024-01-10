import { BrowserRouter, Routes, Route } from "react-router-dom";

import BottomBarPrivate from "~/layouts/BottomBarPrivate";
import TopbarPrivate from "~/layouts/TopbarPrivate";

import ChatsPage from "~/pages/private/ChatsPage";
import FeedPage from "~/pages/private/FeedPage";
import UserProfilePage from "~/pages/private/UserProfilePage";
import NewPostPage from "~/pages/private/NewPostPage";
import FriendsPage from "~/pages/private/FriendsPage";
import FollowerPage from "~/pages/private/FollowerPage";
import FollowingPage from "~/pages/private/FollowingPage";
import NotificationsPage from "~/pages/private/NotificationsPage";
import SettingsPage from "~/pages/private/SettingsPage";
import TrendingPage from "~/pages/private/TrendingPage";
import NotFoundPrivate from "~/pages/private/NotFoundPrivate";
import Contact from "~/pages/public/Contact";

import ActivityTab from "~/components/UserTabs/ActivityTab";
import PostsTab from "~/components/UserTabs/PostsTab";
import FollowersTab from "~/components/UserTabs/FollowersTab";
import FollowingTab from "~/components/UserTabs/FollowingTab";
import LiveAside from "~/components/cards/LiveAside";
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
            <main className="max-md:w-full w-2/3 h-auto my-2">
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/:username/" element={<UserProfilePage />}>
                  <Route index element={<PostsTab />} />
                  <Route path="followers" element={<FollowersTab />} />
                  <Route path="following" element={<FollowingTab />} />
                  <Route path="activity" element={<ActivityTab />} />
                </Route>
                <Route path="/new" element={<NewPostPage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/friends" element={<FriendsPage />}>
                  <Route index element={<FollowerPage />} />
                  <Route path="following" element={<FollowingPage />} />
                </Route>
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route element={<NotFoundPrivate />} />
              </Routes>
            </main>
            <aside className="max-md:hidden w-1/3 h-auto px-5">
              <LiveAside />
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
