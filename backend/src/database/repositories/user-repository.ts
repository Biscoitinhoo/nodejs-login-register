import { EntityRepository, Repository } from "typeorm";

import User from "../../domain/model/user";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async emailExists(email: string): Promise<User | undefined> {
    const userEmail = await this.findOne({
      where: { email },
    });
    return userEmail;
  }
}

export default UserRepository;
