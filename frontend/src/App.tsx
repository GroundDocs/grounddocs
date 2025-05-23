import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import APIKeys from "./pages/APIKeys";
import Billing from "./pages/Billing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Access Restricted</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access this page.</p>
          <a href="/sign-in" className="text-primary hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </SignedOut>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ClerkLoading>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/api-keys" element={<ProtectedRoute><APIKeys /></ProtectedRoute>} />
            {/* <Route path="/billing" element={<ProtectedRoute><Billing /></ProtectedRoute>} /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ClerkLoaded>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
