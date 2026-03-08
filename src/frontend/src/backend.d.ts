import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Product {
    id: bigint;
    name: string;
    description: string;
    isActive: boolean;
    imageId?: ExternalBlob;
    price: bigint;
}
export type Time = bigint;
export type AnnouncementId = bigint;
export type ProductId = bigint;
export interface Announcement {
    id: AnnouncementId;
    title: string;
    isPublished: boolean;
    body: string;
    createdAt: Time;
    imageId?: ExternalBlob;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAnnouncement(title: string, body: string, imageId: ExternalBlob | null): Promise<Announcement>;
    createProduct(name: string, price: bigint, description: string, imageId: ExternalBlob | null): Promise<Product>;
    deleteAnnouncement(id: AnnouncementId): Promise<void>;
    deleteProduct(id: ProductId): Promise<void>;
    getAnnouncement(id: AnnouncementId): Promise<Announcement>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(id: ProductId): Promise<Product>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAdmins(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    listActiveProducts(): Promise<Array<Product>>;
    listAllAnnouncements(): Promise<Array<Announcement>>;
    listAllProducts(): Promise<Array<Product>>;
    listPublishedAnnouncements(): Promise<Array<Announcement>>;
    resetCatalog(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    seedInitialProducts(): Promise<void>;
    updateAnnouncement(id: AnnouncementId, title: string, body: string, imageId: ExternalBlob | null, isPublished: boolean): Promise<Announcement>;
    updateProduct(id: ProductId, name: string, price: bigint, description: string, imageId: ExternalBlob | null, isActive: boolean): Promise<Product>;
}
