import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

import { GiftProvider } from "@/contexts/GiftContext";
import { LiveStreamProvider } from "@/contexts/LiveStreamContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Index from "@/pages/Index";
import ProfilesFeed from "@/pages/ProfilesFeed";
import Messenger from "@/pages/Messenger";

import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import People from "@/pages/People";
import Reels from "@/pages/Reels";
import LiveStream from "@/pages/LiveStream";
import GoLive from "@/pages/GoLive";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <GiftProvider>
        <LiveStreamProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <ProfilesFeed />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  <ProtectedRoute>
                    <Messenger />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/people"
                element={
                  <ProtectedRoute>
                    <People />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reels"
                element={
                  <ProtectedRoute>
                    <Reels />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/live/:id"
                element={
                  <ProtectedRoute>
                    <LiveStream />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/go-live"
                element={
                  <ProtectedRoute>
                    <GoLive />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </LiveStreamProvider>
      </GiftProvider>
    </AuthProvider>
  );
}

export default App;
