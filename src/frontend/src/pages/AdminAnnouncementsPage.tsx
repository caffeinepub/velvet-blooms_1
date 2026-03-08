import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Announcement } from "../backend.d";
import { AdminLayout } from "../components/admin/AdminLayout";
import { AnnouncementForm } from "../components/admin/AnnouncementForm";
import {
  useAllAnnouncements,
  useDeleteAnnouncement,
} from "../hooks/useQueries";

export function AdminAnnouncementsPage() {
  const { data: announcements, isLoading } = useAllAnnouncements();
  const deleteAnnouncement = useDeleteAnnouncement();
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | undefined>();

  const handleAddNew = () => {
    setEditingItem(undefined);
    setFormOpen(true);
  };

  const handleEdit = (item: Announcement) => {
    setEditingItem(item);
    setFormOpen(true);
  };

  const handleDelete = async (item: Announcement) => {
    try {
      await deleteAnnouncement.mutateAsync(item.id);
      toast.success(`"${item.title}" deleted.`);
    } catch {
      toast.error("Failed to delete announcement.");
    }
  };

  return (
    <AdminLayout>
      <section data-ocid="admin.announcements.section">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              New Arrivals
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-0.5">
              Manage announcements shown on the storefront
            </p>
          </div>
          <Button
            data-ocid="admin.announcements.primary_button"
            onClick={handleAddNew}
            size="sm"
            className="font-body bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Add Announcement
          </Button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div
            data-ocid="admin.announcements.loading_state"
            className="flex flex-col gap-3"
          >
            {["a1", "a2", "a3", "a4"].map((sk) => (
              <div
                key={sk}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && (!announcements || announcements.length === 0) && (
          <div
            data-ocid="admin.announcements.empty_state"
            className="flex flex-col items-center gap-4 py-16 text-center"
          >
            <p className="font-body text-muted-foreground">
              No announcements yet. Add your first New Arrival!
            </p>
          </div>
        )}

        {/* List */}
        {!isLoading && announcements && announcements.length > 0 && (
          <div className="flex flex-col gap-3">
            {announcements.map((item, idx) => {
              const ocidIdx = idx + 1;
              const date = new Date(Number(item.createdAt) / 1_000_000);
              const formatted = date.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

              return (
                <div
                  key={String(item.id)}
                  data-ocid={`admin.announcements.row.${ocidIdx}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card card-bloom"
                >
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-foreground text-sm truncate">
                      {item.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">
                      {formatted}
                    </p>
                  </div>

                  {/* Status */}
                  <Badge
                    variant={item.isPublished ? "default" : "secondary"}
                    className={`text-xs font-body flex-shrink-0 ${
                      item.isPublished
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.isPublished ? "Published" : "Draft"}
                  </Badge>

                  {/* Edit */}
                  <Button
                    data-ocid={`admin.announcements.edit_button.${ocidIdx}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                    aria-label={`Edit ${item.title}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  {/* Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        data-ocid={`admin.announcements.delete_button.${ocidIdx}`}
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                        aria-label={`Delete ${item.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-display">
                          Delete "{item.title}"?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="font-body">
                          This will permanently remove the announcement from the
                          storefront.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          data-ocid="admin.announcements.cancel_button"
                          className="font-body"
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          data-ocid="admin.announcements.confirm_button"
                          onClick={() => {
                            void handleDelete(item);
                          }}
                          className="font-body bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          disabled={deleteAnnouncement.isPending}
                        >
                          {deleteAnnouncement.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          ) : null}
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Form modal */}
      <AnnouncementForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingItem(undefined);
        }}
        announcement={editingItem}
      />
    </AdminLayout>
  );
}
