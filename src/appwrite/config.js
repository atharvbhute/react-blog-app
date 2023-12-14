import { Client, Databases, Query } from "appwrite";
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
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId, slug }) {
    try {
      return this.databases.createDocument(
        conf.appwritePDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwritePDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.appwritePDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  }

  async getAllPosts(query = [Query.equal('Status', 'active')]) { // get's only active posts
    
    try {
      const allPosts = await this.databases.listDocuments(
        conf.appwritePDatabaseId,
        conf.appwriteCollectionId,
        query
      );
      return allPosts;
    } catch (error) {
      console.log("error : ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        conf.appwritePDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return post;
    } catch (error) {
      console.log("error : ", error);
      return false;
    }
  }

  async uploadImage(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }// delete image
  }

  async deleteImage(fileId){
    try {
       await this.bucket.deleteFile(conf.appwriteBucketId, fileId);        
       return true;
    } catch (error) {
        throw error        
    }
  }

  async getImagePreview(fileId){
    const imagePreview = storage.getFilePreview(conf.appwriteBucketId, fileId);
    return imagePreview;
  }
}

const service = new Service();
export default service;