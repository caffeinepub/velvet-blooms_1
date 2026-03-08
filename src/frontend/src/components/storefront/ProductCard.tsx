import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import type { Product } from "../../backend.d";

interface ProductCardProps {
  product: Product;
  index: number;
}

function buildWhatsAppUrl(productName: string): string {
  const message = `Hi Velvet Blooms! 🌸 I'm interested in ordering the ${productName}. Can we discuss the custom colors?`;
  return `https://wa.me/919653203320?text=${encodeURIComponent(message)}`;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const ocidIndex = index + 1;
  const imageUrl = product.imageId
    ? product.imageId.getDirectURL()
    : "/assets/generated/product-placeholder.dim_600x600.jpg";

  return (
    <motion.article
      data-ocid={`products.item.${ocidIndex}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group flex flex-col bg-card rounded-2xl overflow-hidden card-bloom hover:card-bloom-hover transition-shadow duration-300 border border-border/60"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-cream-dark">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Price overlay */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm font-display text-lg font-bold text-primary shadow-xs border border-border/40">
            ₹{Number(product.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Customization badge */}
        <Badge
          variant="secondary"
          className="self-start text-xs font-body font-medium bg-blush/10 text-primary border-blush/20 rounded-full px-3"
        >
          ✨ Fully Customizable – Choose your favorite colors!
        </Badge>

        <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
          {product.name}
        </h3>

        <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <Button
            data-ocid={`products.item.${ocidIndex}.primary_button`}
            asChild
            size="lg"
            className="w-full min-h-[48px] rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold text-sm shadow-bloom hover:shadow-bloom-lg transition-all"
          >
            <a
              href={buildWhatsAppUrl(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${product.name} via WhatsApp`}
            >
              💬 Order via WhatsApp
            </a>
          </Button>
          <Button
            data-ocid={`products.item.${ocidIndex}.secondary_button`}
            asChild
            variant="outline"
            size="lg"
            className="w-full min-h-[48px] rounded-full border-sage/50 text-sage-DEFAULT bg-sage/5 hover:bg-sage/15 font-body font-semibold text-sm transition-all"
          >
            <a
              href="https://www.instagram.com/Velvet.blooms__"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order ${product.name} via Instagram`}
            >
              📷 Order via Instagram
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
