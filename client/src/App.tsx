import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import MTI26 from "./pages/MTI26";
import Contact from "./pages/Contact";
import TechStack from "./pages/TechStack";
import Synaps from "./pages/Synaps";
import TradingBot from "./pages/TradingBot";
import NotFound from "./pages/NotFound";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/services"} component={Services} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/mti26"} component={MTI26} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/tech-stack"} component={TechStack} />
      <Route path={"/synaps"} component={Synaps} />
      <Route path={"/trading-bot"} component={TradingBot} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
