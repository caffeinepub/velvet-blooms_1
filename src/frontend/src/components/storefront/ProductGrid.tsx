import { Skeleton } from "@/components/ui/skeleton";
import { Flower2 } from "lucide-react";
import { motion } from "motion/react";
import { useActiveProducts } from "../../hooks/useQueries";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const { data: products, isLoading } = useActiveProducts();

  return (
    <section
      id="products-section"
      data-ocid="products.section"
      className="py-16 px-4 bg-cream-dark/30"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="divider-petal mb-4 max-w-xs mx-auto">
            <span className="font-serif-accent text-sm text-muted-foreground italic">
              Made with care
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Collection
          </h2>
          <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed">
            Every bloom is hand-twisted with premium chenille yarn, crafted to
            last forever — and perfectly customizable for you.
          </p>
        </motion.div>

        {/* Loading state */}
        {isLoading && (
          <div
            data-ocid="products.loading_state"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((sk) => (
              <div
                key={sk}
                className="rounded-2xl overflow-hidden border border-border/60 bg-card"
              >
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-40 rounded-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-12 w-full rounded-full" />
                  <Skeleton className="h-12 w-full rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!products || products.length === 0) && (
          <div
            data-ocid="products.empty_state"
            className="flex flex-col items-center gap-4 py-20 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Flower2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Our blooms are on their way!
            </h3>
            <p className="font-body text-muted-foreground max-w-xs">
              Check back soon or contact us on WhatsApp to see our full
              collection.
            </p>
          </div>
        )}

        {/* Product grid */}
        {!isLoading && products && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product, idx) => (
              <ProductCard
                key={String(product.id)}
                product={product}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
