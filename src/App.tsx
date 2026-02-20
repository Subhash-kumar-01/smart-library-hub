import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import LibraryPage from "./pages/LibraryPage";
import StudyRoomsPage from "./pages/StudyRoomsPage";
import DoubtDeskPage from "./pages/DoubtDeskPage";
import RequestsPage from "./pages/RequestsPage";
import SchedulerPage from "./pages/SchedulerPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/study-rooms" element={<StudyRoomsPage />} />
            <Route path="/doubt-desk" element={<DoubtDeskPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/scheduler" element={<SchedulerPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
