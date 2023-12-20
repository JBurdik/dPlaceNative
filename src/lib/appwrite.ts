import { Account, Client, Databases, ID, Models } from "appwrite";

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("dplace");

export const databases = new Databases(client);
export const account = new Account(client);

export class Appwrite {
  private client: Client;
  private account: Account;

  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("dplace");
    this.account = new Account(this.client);
  }

  async user() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {}
  }

  async login(
    email: string,
    password: string
  ): Promise<Models.User<Models.Preferences> | null> {
    try {
      await this.account.createEmailSession(email, password);
      const user = await this.account.get();
      console.log("Logged in successfully");
      return user;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  }

  async register(email: string, password: string, name: string): Promise<void> {
    try {
      await this.account.create(ID.unique(), email, password, name);
      console.log("Registered successfully");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.account.deleteSession("current");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
}
