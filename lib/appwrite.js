"use client";
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
  postsCollectionId: "678bdba8000f4331eb78",
  storageId: "678bbf6b003bdfad54a5",
};

const {
  endPoint,
  projectId,
  databaseId,
  admincollectionId,
  eventCollectionId,
  storageId,
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
      alert("Failed to create account");
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
    alert("user created");
    return response;
  } catch (error) {
    console.error("Error creating user:", error.message);
    alert("error creating user");
  }
};

export const signIn = async (email, password) => {
  try {
    await account.deleteSession("current");
    const session = await account.createEmailPasswordSession(email, password);
    alert("user logged in");
    return session;
  } catch (error) {
    console.error("Error in Sign In", error.message);
    alert("Error in sign In");
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
