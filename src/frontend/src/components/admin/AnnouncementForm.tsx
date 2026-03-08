import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../../backend";
import type { Announcement } from "../../backend.d";
import {
  useCreateAnnouncement,
  useUpdateAnnouncement,
} from "../../hooks/useQueries";

interface AnnouncementFormProps {
  open: boolean;
  onClose: () => void;
  announcement?: Announcement;
}

export function AnnouncementForm({
  open,
  onClose,
  announcement,
}: AnnouncementFormProps) {
  const isEdit = !!announcement;
  const [title, setTitle] = useState(announcement?.title ?? "");
  const [body, setBody] = useState(announcement?.body ?? "");
  const [isPublished, setIsPublished] = useState(
    announcement?.isPublished ?? false,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createAnnouncement = useCreateAnnouncement();
  const updateAnnouncement = useUpdateAnnouncement();
  const isPending =
    createAnnouncement.isPending || updateAnnouncement.isPending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    let imageId: ReturnType<typeof ExternalBlob.fromBytes> | null =
      (announcement?.imageId as ReturnType<typeof ExternalBlob.fromBytes>) ??
      null;
    if (imageFile) {
      try {
        const buffer = await imageFile.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        const blob = ExternalBlob.fromBytes(bytes);
        imageId = blob.withUploadProgress((pct) => setUploadProgress(pct));
      } catch {
        toast.error("Failed to prepare image for upload.");
        return;
      }
    }

    try {
      if (isEdit && announcement) {
        await updateAnnouncement.mutateAsync({
          id: announcement.id,
          title: title.trim(),
          body: body.trim(),
          imageId,
          isPublished,
        });
        toast.success("Announcement updated!");
      } else {
        await createAnnouncement.mutateAsync({
          title: title.trim(),
          body: body.trim(),
          imageId,
        });
        toast.success("Announcement created!");
      }
      onClose();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setUploadProgress(0);
    }
  };

  const existingImageUrl = announcement?.imageId
    ? announcement.imageId.getDirectURL()
    : null;
  const displayImage = imagePreview ?? existingImageUrl;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEdit ? "Edit Announcement" : "Add Announcement"}
          </DialogTitle>
          <DialogDescription className="font-body text-sm">
            {isEdit
              ? "Update the announcement details."
              : "Create a new arrival announcement."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="flex flex-col gap-5"
        >
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ann-title" className="font-body font-medium">
              Title *
            </Label>
            <Input
              data-ocid="admin.announcement_form.input"
              id="ann-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New Summer Collection!"
              required
              className="font-body"
            />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ann-body" className="font-body font-medium">
              Description *
            </Label>
            <Textarea
              data-ocid="admin.announcement_form.textarea"
              id="ann-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe the new arrival..."
              rows={4}
              required
              className="font-body"
            />
          </div>

          {/* Photo */}
          <div className="flex flex-col gap-1.5">
            <Label className="font-body font-medium">Photo (optional)</Label>
            {displayImage && (
              <img
                src={displayImage}
                alt="Preview"
                className="w-full aspect-video object-cover rounded-lg border border-border mb-2"
              />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              data-ocid="admin.announcement_form.upload_button"
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="font-body gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              {displayImage ? "Change Photo" : "Upload Photo"}
            </Button>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <Progress value={uploadProgress} className="h-1.5" />
            )}
          </div>

          {/* Published toggle */}
          <div className="flex items-center justify-between gap-4 py-1">
            <Label htmlFor="ann-published" className="font-body font-medium">
              Publish (visible on storefront)
            </Label>
            <Switch
              data-ocid="admin.announcement_form.switch"
              id="ann-published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
          </div>

          <DialogFooter className="flex gap-2 pt-2">
            <Button
              data-ocid="admin.announcement_form.cancel_button"
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.announcement_form.save_button"
              type="submit"
              disabled={isPending}
              className="font-body bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
