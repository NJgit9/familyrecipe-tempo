import { Suspense } from "react";
import { useRoutes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  // Combine application routes with tempo routes
  const appRoutes = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  const allRoutes =
    import.meta.env.VITE_TEMPO === "true"
      ? [...appRoutes, ...routes]
      : appRoutes;

  const element = useRoutes(allRoutes);

  return <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>;
}

export default App;
