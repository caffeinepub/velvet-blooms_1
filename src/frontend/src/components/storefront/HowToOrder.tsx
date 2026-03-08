import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Browse",
    description: "Browse our collection of handcrafted chenille flowers.",
  },
  {
    number: "02",
    title: "Tap WhatsApp",
    description: "Click the 'Order via WhatsApp' button on any product.",
  },
  {
    number: "03",
    title: "Share Colors",
    description:
      "Send the pre-filled message with your favorite color preferences.",
  },
  {
    number: "04",
    title: "We Craft",
    description:
      "We confirm your order and start crafting your forever flowers!",
  },
];

export function HowToOrder() {
  return (
    <section
      data-ocid="howtoorder.section"
      className="py-16 px-4 bg-background"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="divider-petal mb-4 max-w-xs mx-auto">
            <span className="font-serif-accent text-sm text-muted-foreground italic">
              It's that simple
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            How to Order
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col items-center text-center gap-4"
            >
              {/* Connector line (desktop) */}
              {idx < steps.length - 1 && (
                <div
                  className="absolute top-8 left-[calc(50%+2rem)] right-[-50%] h-px bg-gradient-to-r from-primary/30 to-transparent hidden lg:block"
                  aria-hidden="true"
                />
              )}

              {/* Step circle */}
              <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center shadow-bloom flex-shrink-0">
                <span className="font-display text-lg font-bold text-primary">
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
