import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Product Types and Logic
  type Product = {
    id : Nat;
    name : Text;
    price : Nat;
    description : Text;
    imageId : ?Storage.ExternalBlob;
    isActive : Bool;
  };

  module Product {
    public func compareById(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  // Announcement Types
  type AnnouncementId = Nat;
  type ProductId = Nat;

  // Announcement Types and Logic
  type Announcement = {
    id : AnnouncementId;
    title : Text;
    body : Text;
    imageId : ?Storage.ExternalBlob;
    createdAt : Time.Time;
    isPublished : Bool;
  };

  module Announcement {
    public func compareById(announcement1 : Announcement, announcement2 : Announcement) : Order.Order {
      Nat.compare(announcement1.id, announcement2.id);
    };

    public func compare(announcement1 : Announcement, announcement2 : Announcement) : Order.Order {
      switch (Int.compare(announcement1.createdAt, announcement2.createdAt)) {
        case (#equal) { Nat.compare(announcement1.id, announcement2.id) };
        case (order) { order };
      };
    };
  };

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  // Admin Actor Initialization
  let adminAccounts = [
    "jasmeet.gill147147@gmail.com",
    "lalasinghh1313@gmail.com",
  ];

  // State Management
  var nextProductId = 11; // Start from 11 since 1-10 are seeded
  var nextAnnouncementId = 1;

  let products = Map.empty<ProductId, Product>();
  let announcements = Map.empty<AnnouncementId, Announcement>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Storage and Authorization Mixins
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public shared ({ caller }) func initializeAdmins() : async () {
    for (email in adminAccounts.values()) {
      // Initialization logic handled in authorization component
    };
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product CRUD Operations
  public shared ({ caller }) func createProduct(name : Text, price : Nat, description : Text, imageId : ?Storage.ExternalBlob) : async Product {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let newProduct : Product = {
      id = nextProductId;
      name;
      price;
      description;
      imageId;
      isActive = true;
    };
    products.add(nextProductId, newProduct);
    nextProductId += 1;
    newProduct;
  };

  public shared ({ caller }) func updateProduct(id : ProductId, name : Text, price : Nat, description : Text, imageId : ?Storage.ExternalBlob, isActive : Bool) : async Product {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existingProduct) {
        let updatedProduct : Product = {
          id;
          name;
          price;
          description;
          imageId;
          isActive;
        };
        products.add(id, updatedProduct);
        updatedProduct;
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  // Public Product Queries
  public query ({ caller }) func getProduct(id : ProductId) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func listActiveProducts() : async [Product] {
    let activeProductList = List.empty<Product>();
    for (product in products.values()) {
      if (product.isActive) {
        activeProductList.add(product);
      };
    };
    activeProductList.toArray().sort(Product.compareById);
  };

  public query ({ caller }) func listAllProducts() : async [Product] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can list all products");
    };
    products.values().toArray().sort(Product.compareById);
  };

  // Announcement CRUD Operations
  public shared ({ caller }) func createAnnouncement(title : Text, body : Text, imageId : ?Storage.ExternalBlob) : async Announcement {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create announcements");
    };
    let newAnnouncement : Announcement = {
      id = nextAnnouncementId;
      title;
      body;
      imageId;
      createdAt = Time.now();
      isPublished = true;
    };
    announcements.add(nextAnnouncementId, newAnnouncement);
    nextAnnouncementId += 1;
    newAnnouncement;
  };

  public shared ({ caller }) func updateAnnouncement(id : AnnouncementId, title : Text, body : Text, imageId : ?Storage.ExternalBlob, isPublished : Bool) : async Announcement {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update announcements");
    };
    switch (announcements.get(id)) {
      case (null) { Runtime.trap("Announcement not found") };
      case (?existingAnnouncement) {
        let updatedAnnouncement : Announcement = {
          id;
          title;
          body;
          imageId;
          createdAt = existingAnnouncement.createdAt;
          isPublished;
        };
        announcements.add(id, updatedAnnouncement);
        updatedAnnouncement;
      };
    };
  };

  public shared ({ caller }) func deleteAnnouncement(id : AnnouncementId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete announcements");
    };
    if (not announcements.containsKey(id)) {
      Runtime.trap("Announcement not found");
    };
    announcements.remove(id);
  };

  // Public Announcement Queries
  public query ({ caller }) func getAnnouncement(id : AnnouncementId) : async Announcement {
    switch (announcements.get(id)) {
      case (null) { Runtime.trap("Announcement not found") };
      case (?announcement) { announcement };
    };
  };

  public query ({ caller }) func listPublishedAnnouncements() : async [Announcement] {
    let publishedAnnouncementList = List.empty<Announcement>();
    for (announcement in announcements.values()) {
      if (announcement.isPublished) {
        publishedAnnouncementList.add(announcement);
      };
    };
    publishedAnnouncementList.toArray().sort();
  };

  public query ({ caller }) func listAllAnnouncements() : async [Announcement] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can list all announcements");
    };
    announcements.values().toArray().sort();
  };

  // Seed Initial Products
  public shared ({ caller }) func seedInitialProducts() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed initial products");
    };
    products.clear();
    nextProductId := 1;

    let initialProducts : [Product] = [
      {
        id = 1;
        name = "Single Flower Bouquet";
        price = 99;
        description = "A thoughtful single chenille bloom, hand-twisted and wrapped in premium paper.";
        imageId = null;
        isActive = true;
      },
      {
        id = 2;
        name = "Double Flower Bouquet";
        price = 199;
        description = "A charming duo of velvety blooms. Perfect for a sweet gift.";
        imageId = null;
        isActive = true;
      },
      {
        id = 3;
        name = "Triple Flower Bouquet";
        price = 299;
        description = "An elegant trio of plush flowers to brighten any corner.";
        imageId = null;
        isActive = true;
      },
      {
        id = 4;
        name = "Five Flower Bouquet";
        price = 499;
        description = "A lush, vibrant arrangement. Our most popular choice for birthdays.";
        imageId = null;
        isActive = true;
      },
      {
        id = 5;
        name = "Seven Flower Bouquet";
        price = 699;
        description = "A premium, full-bodied showstopper bouquet that never wilts.";
        imageId = null;
        isActive = true;
      },
      {
        id = 6;
        name = "Evil Eye Pot";
        price = 649;
        description = "Handcrafted chenille plant with a protective Evil Eye motif in a beautiful pot.";
        imageId = null;
        isActive = true;
      },
      {
        id = 7;
        name = "Single Sunflower";
        price = 249;
        description = "A bright, cheerful, everlasting sunflower to bring sunshine indoors.";
        imageId = null;
        isActive = true;
      },
      {
        id = 8;
        name = "Single Rose (Various Colors)";
        price = 199;
        description = "A timeless symbol of love, made soft and eternal.";
        imageId = null;
        isActive = true;
      },
      {
        id = 9;
        name = "Small Beautiful Pots";
        price = 149;
        description = "Adorable mini-potted chenille plants for desks or shelves.";
        imageId = null;
        isActive = true;
      },
      {
        id = 10;
        name = "Small Sunflower";
        price = 99;
        description = "A petite, budget-friendly drop of sunshine.";
        imageId = null;
        isActive = true;
      },
    ];

    for (product in initialProducts.values()) {
      products.add(product.id, product);
      nextProductId += 1;
    };
  };

  public shared ({ caller }) func resetCatalog() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reset catalog");
    };
    nextProductId := 1;
    products.clear();
    await seedInitialProducts();
  };
};
