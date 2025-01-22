"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const {
  Client,
  Account,
  Avatars,
  Databases,
  Storage,
  ID,
  Query,
} = require("appwrite");

const config = {
  endPoint: "https://cloud.appwrite.io/v1",
  projectId: "678bb7d2000e661b8838",
  databaseId: "678bbbd30012325a62d7",
  admincollectionId: "678bdba8000f4331eb78",
  postsCollectionId: "678bdc2b002847d09839",
  servicesCollectionId: "6790cfea0008da99ab01",
  storageId: "678bbf6b003bdfad54a5",
};

const {
  endPoint,
  projectId,
  databaseId,
  admincollectionId,
  postsCollectionId,
  storageId,
  servicesCollectionId,
} = config;

const client = new Client();

client.setEndpoint(endPoint).setProject(projectId);

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      toast.error("Failed to create account");
    }
    const avatarUrl = avatar.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      admincollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    const response = {
      account: newUser.accountId,
      email: newUser.email,
      username: newUser.username,
      avatar: newUser.avatar,
    };
    toast.success("user created");
    return response;
  } catch (error) {
    console.error("Error creating user:", error.message);
    toast.error("error creating user");
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Error in Sign In", error.message);
    toast.error("Error in sign In");
  }
};

export const AdminLogOut = async () => {
  nav = useRouter()
  try {
    await account.deleteSession("current");
    toast.success("Logout successful."); 
    nav.push("/");
  } catch (error) {
    console.error("Error logging out:", error.message); 
  }
};


export const getCurrentUser = async () => {
  try {
    // Get the current account
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("No current account found");
    }

    // Fetch user documents based on the account ID
    const userDocuments = await databases.listDocuments(
      databaseId,
      admincollectionId,
      [Query.equal("accountId", currentAccount.$id)] // Use currentAccount.$id here
    );
    if (!userDocuments || userDocuments.documents.length === 0) {
      throw new Error("No user document found for the current account");
    }

    // Return the first matching user document
    return userDocuments.documents[0];
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw new Error(error.message || "Failed to fetch current user");
  }
};

export const uploadPost = async (file, title, description, Id) => {
  try {
    // Upload the file to Appwrite Storage
    const fileRes = await storage.createFile(
      storageId, // Bucket ID
      ID.unique(), // Unique file ID
      file // File to upload (e.g., File object or Blob)
    );

    // Get the file URL
    const fileUrl = storage.getFileView(storageId, fileRes.$id);

    // Save the post metadata (title, description, fileUrl) to Appwrite Database
    const postRes = await databases.createDocument(
      databaseId, // Database ID
      postsCollectionId, // Collection ID
      ID.unique(), // Unique document ID
      {
        title: title, // Title of the post
        desc: description, // Description of the post
        fileUrl: fileUrl, // URL of the uploaded file
        admin: Id,
      }
    );

    console.log("Post uploaded successfully:", postRes);
    return postRes; // Return the created post data
  } catch (error) {
    console.error("Error uploading post:", error.message);
    throw error; // Re-throw error for handling in the calling function
  }
};
export const GetAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, postsCollectionId, [
      Query.orderDesc("$createdAt"), // Orders posts by creation date in descending order
    ]);
    return posts.documents; // Returns the array of post documents
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array if there's an error
  }
};
export const uploadServices = async (file, title, description, Id) => {
  try {
    // Upload the file to Appwrite Storage
    const fileRes = await storage.createFile(
      storageId, // Bucket ID
      ID.unique(), // Unique file ID
      file // File to upload (e.g., File object or Blob)
    );

    // Get the file URL
    const fileUrl = storage.getFileView(storageId, fileRes.$id);

    // Save the post metadata (title, description, fileUrl) to Appwrite Database
    const postRes = await databases.createDocument(
      databaseId, // Database ID
      servicesCollectionId, // Collection ID
      ID.unique(), // Unique document ID
      {
        title: title, // Title of the post
        desc: description, // Description of the post
        fileUrl: fileUrl, // URL of the uploaded file
        admin: Id,
      }
    );

    console.log("Post uploaded successfully:", postRes);
    return postRes; // Return the created post data
  } catch (error) {
    console.error("Error uploading post:", error.message);
    throw error; // Re-throw error for handling in the calling function
  }
};
export const GetAllServices = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, servicesCollectionId, [
      Query.orderDesc("$createdAt"), // Orders posts by creation date in descending order
    ]);
    return posts.documents; // Returns the array of post documents
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return an empty array if there's an error
  }
};

export const deleteEvent = async (id) => {
  try {
    await databases.deleteDocument(databaseId, postsCollectionId, id);
    toast.success("Document deleted successfully");
  } catch (error) {
    toast.error("Failed to delete document:", error.message);
  }
};
export const deleteServices = async (id) => {
  try {
    await databases.deleteDocument(databaseId, servicesCollectionId, id);
    toast.success("Document deleted successfully");
  } catch (error) {
    toast.error("Failed to delete document:", error.message);
  }
};

export const updateField = async (id, fieldName, value, file) => {
  try {
    let fieldValue = value; // Default to text value

    if (fieldName === "fileUrl" && file) {
      // Handle file upload if field is 'fileUrl'
      const fileRes = await storage.createFile(storageId, ID.unique(), file);
      fieldValue = storage.getFileView(storageId, fileRes.$id);
    }

    const response = await databases.updateDocument(
      databaseId,
      postsCollectionId,
      id,
      { [fieldName]: fieldValue } // Dynamically update the specified field
    );

    toast.success(`Document updated successfully!`);
    return response;
  } catch (error) {
    toast.error(`Failed to update document (${fieldName}): ${error.message}`);
    throw error;
  }
};
export const updateServiceField = async (id, fieldName, value, file) => {
  try {
    let fieldValue = value; // Default to text value

    if (fieldName === "fileUrl" && file) {
      // Handle file upload if field is 'fileUrl'
      const fileRes = await storage.createFile(storageId, ID.unique(), file);
      fieldValue = storage.getFileView(storageId, fileRes.$id);
    }

    const response = await databases.updateDocument(
      databaseId,
      servicesCollectionId,
      id,
      { [fieldName]: fieldValue } // Dynamically update the specified field
    );

    toast.success(`Document updated successfully!`);
    return response;
  } catch (error) {
    toast.error(`Failed to update document (${fieldName}): ${error.message}`);
    throw error;
  }
};

export const ActiveSession = async () => {
  try {
    const user = await account.get(); // Retrieves the current session if it exists
    // console.log("User session is active:", user);
    return user; // Return true if session exists
  } catch (error) {
    console.log("No active session:", error.message); // Improved error logging
    return false; // Return false if no session exists
  }
};