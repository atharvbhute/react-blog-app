import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

class AuthService {
  client = new Client();
  acount;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  async createAccount({username, email, password}) {
    try {
      const userAcount = await this.account.create(ID.unique(), email, password, username);
      if (userAcount) {
        return this.loginUser(email,password);
      } else {
        return userAcount;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password){
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(){
    try{
      return await this.account.get();
    }catch(error){
      throw error;
    }
    return null;
  }

  async logout(){
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authService =  new AuthService();
export default authService;