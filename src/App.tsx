import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { StoriesProvider } from "@/contexts/StoriesContext";
import { GiftProvider } from "@/contexts/GiftContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Feed from "@/pages/Feed";
import Messages from "@/pages/Messages";
import Discover from "@/pages/Discover";
import Gifts from "@/pages/Gifts";
import Stories from "@/pages/Stories";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import Profile from "@/pages/Profile";
import People from "@/pages/People";
import Reels from "@/pages/Reels";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <StoriesProvider>
          <GiftProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feed"
                  element={
                    <ProtectedRoute>
                      <Feed />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <ProtectedRoute>
                      <Messages />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/discover"
                  element={
                    <ProtectedRoute>
                      <Discover />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/gifts"
                  element={
                    <ProtectedRoute>
                      <Gifts />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/stories"
                  element={
                    <ProtectedRoute>
                      <Stories />
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
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </Router>
          </GiftProvider>
        </StoriesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
