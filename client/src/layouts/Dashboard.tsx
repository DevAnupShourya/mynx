import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Navbar } from "~/layouts/layout.barrel";
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

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/follower" element={<FollowerPage />} />
          <Route path="/new" element={<NewPostPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="*" element={<NotFoundPrivate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
