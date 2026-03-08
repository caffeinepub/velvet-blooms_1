import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { SiInstagram } from "react-icons/si";

export function InstagramSection() {
  return (
    <section
      data-ocid="instagram.section"
      className="py-20 px-4 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(var(--blush-light)), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto max-w-xl text-center flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center mx-auto mb-6 shadow-bloom">
            <SiInstagram className="w-8 h-8 text-primary" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Follow Our Journey
          </h2>
          <p className="font-body text-muted-foreground text-base leading-relaxed mb-2">
            See our latest creations and customer favorites on Instagram
          </p>
          <p className="font-serif-accent text-lg text-primary italic mb-6">
            @Velvet.blooms__
          </p>

          <Button
            data-ocid="instagram.primary_button"
            asChild
            size="lg"
            className="min-h-[52px] px-8 rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-body font-semibold text-base shadow-bloom hover:shadow-bloom-lg transition-all duration-300"
          >
            <a
              href="https://www.instagram.com/Velvet.blooms__"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiInstagram className="w-5 h-5 mr-2" />
              Visit our Instagram
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
