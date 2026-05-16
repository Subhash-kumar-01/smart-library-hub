import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import LibraryPage from "./pages/LibraryPage";
import StudyRoomsPage from "./pages/StudyRoomsPage";
import DoubtDeskPage from "./pages/DoubtDeskPage";
import RequestsPage from "./pages/RequestsPage";
import SchedulerPage from "./pages/SchedulerPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Protected = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <AppLayout>{children}</AppLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public auth routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected app routes */}
            <Route path="/" element={<Protected><Dashboard /></Protected>} />
            <Route path="/library" element={<Protected><LibraryPage /></Protected>} />
            <Route path="/study-rooms" element={<Protected><StudyRoomsPage /></Protected>} />
            <Route path="/doubt-desk" element={<Protected><DoubtDeskPage /></Protected>} />
            <Route path="/requests" element={<Protected><RequestsPage /></Protected>} />
            <Route path="/scheduler" element={<Protected><SchedulerPage /></Protected>} />
            <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="admin">
                  <AppLayout><AdminPanel /></AppLayout>
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
