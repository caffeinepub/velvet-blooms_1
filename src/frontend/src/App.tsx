import { Toaster } from "@/components/ui/sonner";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { AdminAnnouncementsPage } from "./pages/AdminAnnouncementsPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminProductsPage } from "./pages/AdminProductsPage";
import { StorefrontPage } from "./pages/StorefrontPage";

// ── Root layout ───────────────────────────────────────────────────────────────
function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </>
  );
}

// ── Admin guard component ─────────────────────────────────────────────────────
function AdminGuard({ children }: { children: React.ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="font-body text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return <AdminLoginPage />;
  }

  return <>{children}</>;
}

// ── Route definitions ─────────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: StorefrontPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminGuard>
      <Navigate to="/admin/products" />
    </AdminGuard>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/products",
  component: () => (
    <AdminGuard>
      <AdminProductsPage />
    </AdminGuard>
  ),
});

const adminAnnouncementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/announcements",
  component: () => (
    <AdminGuard>
      <AdminAnnouncementsPage />
    </AdminGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  adminProductsRoute,
  adminAnnouncementsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
