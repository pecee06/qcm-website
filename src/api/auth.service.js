import { Client, Account, ID } from "appwrite"
import env from "../../constants"

const client = new Client()
  .setEndpoint(env.apiEndpoint)
  .setProject(env.projectId)
const account = new Account(client)

class Auth {
  async signupAndLogin({ email, password, name }) {
    try {
      if (name == "admin")
        throw new Error("Name is reserved. Please enter another name")
      const res = await account.create(ID.unique(), email, password, name)
      if (res) await account.createEmailPasswordSession(email, password)
      return res
    } catch (error) {
      throw error
    }
  }

  async login({ email = "", password = "" }) {
    try {
      const res = await account.createEmailPasswordSession(email, password)
      return res
    } catch (error) {
      throw error
    }
  }

  async getCurrentUser() {
    try {
      const res = await account.get()
      return res
    } catch (error) {
      throw error
    }
  }

  async logout() {
    try {
      const res = await account.deleteSessions()
      return res
    } catch (error) {
      throw error
    }
  }

  async addPhoneNumber({ phone, password }) {
    try {
      const res = account.updatePhone(`+91${phone}`, password)
      return res
    } catch (error) {
      throw error
    }
  }

  async sendVerificationToken() {
    try {
      const res = await account.createPhoneVerification()
      return res
    } catch (error) {
      throw error
    }
  }

  async verifyToken({ userId, secret }) {
    try {
      const res = await account.updatePhoneVerification(userId, secret)
      return res
    } catch (error) {
      throw error
    }
  }

  async resetPassword({ oldPass, newPass }) {
    try {
      const res = await account.updatePassword(newPass, oldPass)
      return res
    } catch (error) {
      throw error
    }
  }
}

const authService = new Auth()
export default authService
