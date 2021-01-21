import { EntityRepository, Repository } from "typeorm";
import User from "../../domain/model/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | null> {
    const findUserByName = await this.findOne({
      where: { name },
    });
    return findUserByName || null;
  }
}

export default UserRepository;
