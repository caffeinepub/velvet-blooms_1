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
import type { Product } from "../../backend.d";
import { useCreateProduct, useUpdateProduct } from "../../hooks/useQueries";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  product?: Product; // if editing
}

export function ProductForm({ open, onClose, product }: ProductFormProps) {
  const isEdit = !!product;
  const [name, setName] = useState(product?.name ?? "");
  const [price, setPrice] = useState(
    product ? String(Number(product.price)) : "",
  );
  const [description, setDescription] = useState(product?.description ?? "");
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isPending = createProduct.isPending || updateProduct.isPending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const priceNum = Number(price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    let imageId: ReturnType<typeof ExternalBlob.fromBytes> | null =
      (product?.imageId as ReturnType<typeof ExternalBlob.fromBytes>) ?? null;

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
      if (isEdit && product) {
        await updateProduct.mutateAsync({
          id: product.id,
          name: name.trim(),
          price: BigInt(Math.round(priceNum)),
          description: description.trim(),
          imageId,
          isActive,
        });
        toast.success("Product updated successfully!");
      } else {
        await createProduct.mutateAsync({
          name: name.trim(),
          price: BigInt(Math.round(priceNum)),
          description: description.trim(),
          imageId,
        });
        toast.success("Product created successfully!");
      }
      onClose();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setUploadProgress(0);
    }
  };

  const existingImageUrl = product?.imageId
    ? product.imageId.getDirectURL()
    : null;
  const displayImage = imagePreview ?? existingImageUrl;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription className="font-body text-sm">
            {isEdit
              ? "Update the product details below."
              : "Fill in the details to add a new product."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="product-name" className="font-body font-medium">
              Product Name *
            </Label>
            <Input
              data-ocid="admin.product_form.input"
              id="product-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Double Flower Bouquet"
              required
              className="font-body"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="product-price" className="font-body font-medium">
              Price (₹) *
            </Label>
            <Input
              id="product-price"
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 499"
              required
              className="font-body"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="product-description"
              className="font-body font-medium"
            >
              Description *
            </Label>
            <Textarea
              data-ocid="admin.product_form.textarea"
              id="product-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product..."
              rows={3}
              required
              className="font-body"
            />
          </div>

          {/* Photo upload */}
          <div className="flex flex-col gap-1.5">
            <Label className="font-body font-medium">Product Photo</Label>
            {displayImage && (
              <img
                src={displayImage}
                alt="Preview"
                className="w-full aspect-square object-cover rounded-lg border border-border mb-2"
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
              data-ocid="admin.product_form.upload_button"
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

          {/* Active toggle (edit only) */}
          {isEdit && (
            <div className="flex items-center justify-between gap-4 py-1">
              <Label htmlFor="product-active" className="font-body font-medium">
                Active (visible on storefront)
              </Label>
              <Switch
                data-ocid="admin.product_form.switch"
                id="product-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          )}

          <DialogFooter className="flex gap-2 pt-2">
            <Button
              data-ocid="admin.product_form.cancel_button"
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="font-body"
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.product_form.save_button"
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
                "Add Product"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
