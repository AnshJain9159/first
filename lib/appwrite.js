import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";

import { APPWRITE_STORAGE_ID, APPWRITE_PROJECT_ID, APPWRITE_DATABASE_ID, APPWRITE_USER_COLLECTION_ID, APPWRITE_VIDEO_COLLECTION_ID } from "@env";

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.ansh.soul",
    projectId: APPWRITE_PROJECT_ID,
    storageId: APPWRITE_STORAGE_ID,
    databaseId: APPWRITE_DATABASE_ID,
    userCollectionId: APPWRITE_USER_COLLECTION_ID,
    videoCollectionId: APPWRITE_VIDEO_COLLECTION_ID,
}

const client = new Client();
const avatars=new Avatars(client);
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;



export const createUser = async (email,password,username)=>{
    try {
        const newAccount= await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if(!newAccount) throw(error);
        
        const avatarUrl=avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email:email,
                username:username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async(email, password)=>{
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async() => {
    try {
        const currentAccount=await account.get();
        if(!currentAccount){ throw error;}

        const currentUser= await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.where('accountId',currentAccount.$id)]
        )
        
        if(!currentUser){ throw error;}

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}