import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Layout from "./components/layout/Layout";
import RecipeWizard from "./components/recipe/RecipeWizard";
import RecipeInputStep from "./components/recipe/steps/RecipeInputStep";
import StoryStep from "./components/recipe/steps/StoryStep";
import PresentationStep from "./components/recipe/steps/PresentationStep";
import PrivacyStep from "./components/recipe/steps/PrivacyStep";
import RecipientsStep from "./components/recipe/steps/RecipientsStep";
import ReviewStep from "./components/recipe/steps/ReviewStep";
import routes from "tempo-routes";
import { AuthProvider } from "./lib/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  // Combine application routes with tempo routes
  const appRoutes = [
    {
      path: "/",
      element: (
        <Layout>
          <Home />
        </Layout>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/recipe/input",
      element: (
        <ProtectedRoute>
          <Layout>
            <RecipeInputStep />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/recipe/story",
      element: (
        <ProtectedRoute>
          <Layout>
            <StoryStep />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/recipe/presentation",
      element: (
        <ProtectedRoute>
          <Layout>
            <PresentationStep />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/recipe/privacy",
      element: (
        <ProtectedRoute>
          <Layout>
            <PrivacyStep />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/recipe/recipients",
      element: (
        <ProtectedRoute>
          <Layout>
            <RecipientsStep />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/recipe/review",
      element: (
        <ProtectedRoute>
          <Layout>
            <ReviewStep />
          </Layout>
        </ProtectedRoute>
      ),
    },
  ];

  const allRoutes =
    import.meta.env.VITE_TEMPO === "true"
      ? [...appRoutes, ...routes]
      : appRoutes;

  const element = useRoutes(allRoutes);

  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-lg">Loading...</p>
          </div>
        }
      >
        {element}
      </Suspense>
    </AuthProvider>
  );
}

export default App;
