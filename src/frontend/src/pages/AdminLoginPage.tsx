import { Button } from "@/components/ui/button";
import { Flower2, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function AdminLoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm flex flex-col items-center gap-6 text-center"
      >
        {/* Brand */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-bloom">
            <Flower2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Velvet Blooms
          </h1>
          <p className="font-serif-accent text-lg text-muted-foreground italic">
            Admin Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="w-full bg-card border border-border rounded-2xl p-6 flex flex-col gap-5 card-bloom">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-1">
              Sign In
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              Sign in with your Google account to access the CMS.
            </p>
          </div>

          <Button
            data-ocid="admin.login.primary_button"
            onClick={login}
            disabled={isLoggingIn || isInitializing}
            size="lg"
            className="w-full min-h-[48px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in with Google"
            )}
          </Button>

          <p className="font-body text-xs text-muted-foreground">
            Access is restricted to authorized administrators only.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
