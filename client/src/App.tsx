import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TrackingPixels } from "@/components/TrackingPixels";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import ThankYou from "@/pages/ThankYou";
import ACRepair from "@/pages/ACRepair";
import FurnaceRepair from "@/pages/FurnaceRepair";
import MiniSplit from "@/pages/MiniSplit";
import CommercialHVAC from "@/pages/CommercialHVAC";
import About from "@/pages/About";
import Maintenance from "@/pages/Maintenance";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/ac-repair" component={ACRepair} />
      <Route path="/furnace-repair" component={FurnaceRepair} />
      <Route path="/mini-split" component={MiniSplit} />
      <Route path="/commercial-hvac" component={CommercialHVAC} />
      <Route path="/maintenance" component={Maintenance} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TrackingPixels
          facebookPixelId={import.meta.env.VITE_FACEBOOK_PIXEL_ID}
          googleTagId={import.meta.env.VITE_GOOGLE_TAG_ID}
        />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
