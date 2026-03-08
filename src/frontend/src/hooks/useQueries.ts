import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ExternalBlob } from "../backend";
import type {
  Announcement,
  AnnouncementId,
  Product,
  ProductId,
} from "../backend.d";
import { useActor } from "./useActor";

// ─── Products ────────────────────────────────────────────────────────────────

export function useActiveProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "active"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listActiveProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      price: bigint;
      description: string;
      imageId: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createProduct(
        args.name,
        args.price,
        args.description,
        args.imageId,
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: ProductId;
      name: string;
      price: bigint;
      description: string;
      imageId: ExternalBlob | null;
      isActive: boolean;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateProduct(
        args.id,
        args.name,
        args.price,
        args.description,
        args.imageId,
        args.isActive,
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ProductId) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteProduct(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useSeedProducts() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not authenticated");
      return actor.seedInitialProducts();
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// ─── Announcements ───────────────────────────────────────────────────────────

export function usePublishedAnnouncements() {
  const { actor, isFetching } = useActor();
  return useQuery<Announcement[]>({
    queryKey: ["announcements", "published"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublishedAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllAnnouncements() {
  const { actor, isFetching } = useActor();
  return useQuery<Announcement[]>({
    queryKey: ["announcements", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllAnnouncements();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateAnnouncement() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      title: string;
      body: string;
      imageId: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.createAnnouncement(args.title, args.body, args.imageId);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useUpdateAnnouncement() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      id: AnnouncementId;
      title: string;
      body: string;
      imageId: ExternalBlob | null;
      isPublished: boolean;
    }) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.updateAnnouncement(
        args.id,
        args.title,
        args.body,
        args.imageId,
        args.isPublished,
      );
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: AnnouncementId) => {
      if (!actor) throw new Error("Not authenticated");
      return actor.deleteAnnouncement(id);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useInitializeAdmins() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not authenticated");
      return actor.initializeAdmins();
    },
  });
}
