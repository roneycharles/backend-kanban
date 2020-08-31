import { Repository, EntityRepository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
    findById(id: string) {
        return this.findOne({ id });
    }
}

export default UserRepository;
