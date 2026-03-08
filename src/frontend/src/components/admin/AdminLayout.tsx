import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useRouterState } from "@tanstack/react-router";
import { Flower2, LogOut, Megaphone, Package } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import { useInitializeAdmins } from "../../hooks/useQueries";

interface AdminLayoutProps {
  children: ReactNode;
}

const navLinks = [
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/admin/announcements",
    label: "New Arrivals",
    icon: Megaphone,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { clear, identity } = useInternetIdentity();
  const { mutate: initAdmins } = useInitializeAdmins();

  // Initialize admins once when authenticated
  useEffect(() => {
    if (identity) {
      initAdmins();
    }
  }, [identity, initAdmins]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-30 bg-card border-b border-border shadow-xs">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <Flower2 className="w-5 h-5 text-primary" />
            <span className="font-display text-lg font-bold text-primary">
              Velvet Blooms
            </span>
            <span className="font-body text-xs text-muted-foreground ml-1 hidden sm:inline">
              Admin
            </span>
          </Link>

          {/* Nav links */}
          <nav
            className="flex items-center gap-1"
            aria-label="Admin navigation"
          >
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} to={href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`font-body font-medium gap-1.5 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-2">
            <Separator orientation="vertical" className="h-5 hidden sm:block" />
            <Button
              data-ocid="admin.nav.button"
              variant="ghost"
              size="sm"
              onClick={clear}
              className="font-body text-muted-foreground hover:text-destructive gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {children}
      </main>
    </div>
  );
}
