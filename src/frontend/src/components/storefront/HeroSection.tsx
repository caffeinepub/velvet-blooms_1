import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export function HeroSection() {
  const scrollToProducts = () => {
    const el = document.getElementById("products-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-ocid="hero.section"
      className="relative overflow-hidden min-h-[90vh] flex items-center"
    >
      {/* Background mesh */}
      <div className="absolute inset-0 bg-hero-mesh" aria-hidden="true" />

      {/* Decorative petal blobs */}
      <div
        className="absolute top-10 right-8 w-64 h-64 rounded-full opacity-30 animate-petal-float"
        style={{
          background:
            "radial-gradient(circle, oklch(var(--blush-light)) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 left-4 w-48 h-48 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, oklch(var(--sage-light)) 0%, transparent 70%)",
          animation: "petal-float 7s ease-in-out infinite 2s",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-6"
        >
          {/* Brand badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-body font-semibold tracking-widest uppercase text-primary">
              Handcrafted with love
            </span>
          </motion.div>

          {/* Brand name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-foreground"
          >
            Velvet
            <br />
            <span className="text-primary italic">Blooms</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="font-serif-accent text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-md"
          >
            Handcrafted Chenille Flowers —{" "}
            <em>Eternal Beauty, Artisan Touch</em>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <Button
              data-ocid="hero.primary_button"
              onClick={scrollToProducts}
              size="lg"
              className="min-h-[52px] px-8 text-base font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-bloom hover:shadow-bloom-lg transition-all duration-300"
            >
              🌸 Shop Now
            </Button>
            <a
              href="https://www.instagram.com/Velvet.blooms__"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[52px] px-8 text-base font-body font-semibold rounded-full border border-sage bg-sage/10 text-sage-foreground hover:bg-sage/20 transition-all duration-300"
            >
              Follow on Instagram
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-8 pt-2"
          >
            {[
              { value: "10+", label: "Designs" },
              { value: "100%", label: "Handmade" },
              { value: "✨", label: "Customizable" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Decorative frame */}
            <div
              className="absolute -inset-3 rounded-3xl opacity-40"
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--blush-light)), oklch(var(--sage-light)))",
              }}
              aria-hidden="true"
            />
            <img
              src="/assets/generated/hero-bouquet.dim_1200x800.jpg"
              alt="Handcrafted chenille flower bouquet by Velvet Blooms"
              className="relative z-10 w-full rounded-2xl object-cover aspect-[4/3] shadow-bloom-lg"
              loading="eager"
            />
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -bottom-4 -left-4 z-20 bg-card border border-border rounded-2xl shadow-bloom px-4 py-3"
            >
              <p className="font-body text-xs text-muted-foreground">
                Starting at
              </p>
              <p className="font-display text-xl font-bold text-primary">₹99</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          role="presentation"
          aria-hidden="true"
        >
          <title>Decorative wave divider</title>
          <path
            d="M0 48 C360 0, 1080 0, 1440 48 L1440 48 L0 48Z"
            fill="oklch(var(--cream-dark))"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
