import { Heart } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "velvetblooms";

  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-2xl font-bold text-primary">
              Velvet Blooms
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Handcrafted chenille flowers — made to last a lifetime.
            </p>
            <p className="font-body text-sm text-muted-foreground flex items-center gap-1">
              Handcrafted with{" "}
              <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-body font-semibold text-foreground text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <a
              href="tel:+919653203320"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <SiWhatsapp className="w-4 h-4 text-green-600" />
              +91 9653203320
            </a>
            <a
              href="https://www.instagram.com/Velvet.blooms__"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <SiInstagram className="w-4 h-4 text-pink-600" />
              @Velvet.blooms__
            </a>
          </div>

          {/* Order */}
          <div className="flex flex-col gap-3">
            <h4 className="font-body font-semibold text-foreground text-sm uppercase tracking-wider">
              Order Now
            </h4>
            <a
              href="https://wa.me/919653203320?text=Hi%20Velvet%20Blooms!%20%F0%9F%8C%B8%20I%27d%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <SiWhatsapp className="w-4 h-4 text-green-600" />
              WhatsApp us
            </a>
            <a
              href="https://www.instagram.com/Velvet.blooms__"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <SiInstagram className="w-4 h-4 text-pink-600" />
              Instagram DM
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground">
            © {year} Velvet Blooms. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Built with{" "}
            <Heart className="w-3 h-3 inline text-primary fill-primary" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
