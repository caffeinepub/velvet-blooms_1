import { motion } from "motion/react";
import type { Announcement } from "../../backend.d";
import { usePublishedAnnouncements } from "../../hooks/useQueries";

function AnnouncementCard({ item }: { item: Announcement }) {
  const imageUrl = item.imageId ? item.imageId.getDirectURL() : null;
  const date = new Date(Number(item.createdAt) / 1_000_000);
  const formatted = date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-5 bg-card rounded-2xl overflow-hidden border border-border/60 card-bloom"
    >
      {imageUrl && (
        <div className="sm:w-40 sm:flex-shrink-0">
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full sm:h-full aspect-video sm:aspect-auto object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col gap-2 p-4 sm:py-5 sm:pr-5">
        <span className="font-body text-xs text-muted-foreground">
          {formatted}
        </span>
        <h3 className="font-display text-lg font-semibold text-foreground leading-snug">
          {item.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {item.body}
        </p>
      </div>
    </motion.article>
  );
}

export function NewArrivals() {
  const { data: announcements, isLoading } = usePublishedAnnouncements();

  if (isLoading || !announcements || announcements.length === 0) return null;

  return (
    <section
      data-ocid="arrivals.section"
      className="py-16 px-4 bg-cream-dark/30"
    >
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="divider-petal mb-4 max-w-xs mx-auto">
            <span className="font-serif-accent text-sm text-muted-foreground italic">
              Fresh from the studio
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            New Arrivals
          </h2>
        </motion.div>

        <div className="flex flex-col gap-5">
          {announcements.map((item) => (
            <AnnouncementCard key={String(item.id)} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
