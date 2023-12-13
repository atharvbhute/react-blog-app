import { Client, Databases } from "appwrite";
import conf from "../conf/conf";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId, slug }) {
    try {
      return this.databases.createDocument(conf.appwritePDatabaseId, conf.appwriteCollectionId, slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, {title, content, featuredImage, status}){
    try {
        return await this.databases.updateDocument(conf.appwritePDatabaseId, conf.appwriteCollectionId, slug, 
            {title, content, featuredImage, status}
         );
    } catch (error) {
        throw error        
    }
  }

  async deletePost({slug}){
    try {
        await this.databases.deleteDocument(conf.appwritePDatabaseId, conf.appwriteCollectionId, slug)
        return true
    } catch (error) {
        console.log("Error: ", error);
        return false
    }
  }

  async getAllPosts(user){ // build this using query query(status == active) 
    try {
        const allPosts =  await this.databases.listDocuments(conf.appwritePDatabaseId, conf.appwriteCollectionId);
        return allPosts;
    } catch (error) {
        console.log("error : ", error);  
        return false    
    }
  }

  async getPost(slug){
    try {
        const post = this.databases.getDocument(conf.appwritePDatabaseId, conf.appwriteCollectionId, slug);   
        return post;     
    } catch (error) {
        console.log("error : ", error); 
        return false;
    }
  }

  // upload image
  // delete image
}
