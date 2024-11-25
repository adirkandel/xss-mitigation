import { BackendMethod, remult } from 'remult'
import { User } from './User'

export class AuthController {
  @BackendMethod({ allowed: true })
  static async register(user: User) {
    const userRepo = remult.repo(User);
    return await userRepo.save(user);
  }

  @BackendMethod({ allowed: true })
  static async login({ id }: { id: string }) {
    const userRepo = remult.repo(User);
    return await userRepo.findOne({ where: { id } });
  }
}