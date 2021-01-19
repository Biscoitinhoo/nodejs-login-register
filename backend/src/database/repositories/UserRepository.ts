import { EntityRepository, Repository } from "typeorm";
import User from "../../model/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | null> {
    const findUserByName = await this.findOne({
      where: { name },
    });
    /* return the user if find it, otherwise will return null */
    return findUserByName || null;
  }
}

export default UserRepository;
