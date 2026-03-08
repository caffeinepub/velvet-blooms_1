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
import { Loader2, Pencil, Plus, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { AdminLayout } from "../components/admin/AdminLayout";
import { ProductForm } from "../components/admin/ProductForm";
import {
  useAllProducts,
  useDeleteProduct,
  useSeedProducts,
} from "../hooks/useQueries";

export function AdminProductsPage() {
  const { data: products, isLoading } = useAllProducts();
  const deleteProduct = useDeleteProduct();
  const seedProducts = useSeedProducts();
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const handleAddNew = () => {
    setEditingProduct(undefined);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteProduct.mutateAsync(product.id);
      toast.success(`"${product.name}" deleted.`);
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const handleSeed = async () => {
    try {
      await seedProducts.mutateAsync();
      toast.success("Default products restored!");
    } catch {
      toast.error("Failed to restore products.");
    }
  };

  return (
    <AdminLayout>
      <section data-ocid="admin.products.section">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Products
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-0.5">
              Manage your catalog
            </p>
          </div>
          <div className="flex gap-2">
            {!isLoading && (!products || products.length === 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  void handleSeed();
                }}
                disabled={seedProducts.isPending}
                className="font-body gap-1.5"
              >
                {seedProducts.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Restore Default Products
              </Button>
            )}
            <Button
              data-ocid="admin.products.primary_button"
              onClick={handleAddNew}
              size="sm"
              className="font-body bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div
            data-ocid="products.loading_state"
            className="flex flex-col gap-3"
          >
            {["s1", "s2", "s3", "s4", "s5"].map((sk) => (
              <div
                key={sk}
                className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <Skeleton className="w-14 h-14 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-16 rounded-full" />
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && (!products || products.length === 0) && (
          <div
            data-ocid="admin.products.empty_state"
            className="flex flex-col items-center gap-4 py-16 text-center"
          >
            <p className="font-body text-muted-foreground">
              No products yet. Add your first product or restore the defaults.
            </p>
          </div>
        )}

        {/* Product list */}
        {!isLoading && products && products.length > 0 && (
          <div className="flex flex-col gap-3">
            {products.map((product, idx) => {
              const ocidIdx = idx + 1;
              const imageUrl = product.imageId
                ? product.imageId.getDirectURL()
                : "/assets/generated/product-placeholder.dim_600x600.jpg";

              return (
                <div
                  key={String(product.id)}
                  data-ocid={`admin.products.row.${ocidIdx}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card card-bloom"
                >
                  {/* Thumbnail */}
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-border/40"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body font-semibold text-foreground text-sm truncate">
                      {product.name}
                    </h3>
                    <p className="font-display text-base font-bold text-primary">
                      ₹{Number(product.price)}
                    </p>
                  </div>

                  {/* Status badge */}
                  <Badge
                    variant={product.isActive ? "default" : "secondary"}
                    className={`text-xs font-body flex-shrink-0 ${
                      product.isActive
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {product.isActive ? "Active" : "Hidden"}
                  </Badge>

                  {/* Edit */}
                  <Button
                    data-ocid={`admin.products.edit_button.${ocidIdx}`}
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(product)}
                    className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  {/* Delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        data-ocid={`admin.products.delete_button.${ocidIdx}`}
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-display">
                          Delete "{product.name}"?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="font-body">
                          This action cannot be undone. The product will be
                          permanently removed from your catalog.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          data-ocid="admin.products.cancel_button"
                          className="font-body"
                        >
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          data-ocid="admin.products.confirm_button"
                          onClick={() => {
                            void handleDelete(product);
                          }}
                          className="font-body bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          disabled={deleteProduct.isPending}
                        >
                          {deleteProduct.isPending ? (
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

      {/* Product form modal */}
      <ProductForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingProduct(undefined);
        }}
        product={editingProduct}
      />
    </AdminLayout>
  );
}
