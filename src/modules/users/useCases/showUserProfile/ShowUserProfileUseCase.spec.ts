import { User } from '../../entities/User';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

const user = {
  name: 'User Test',
  email: 'user@test.com',
  password: '12345',
}

let newUser: User;

describe('Show User Profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
  })

  it('should should be able to authenticate user information and return', async () => {
    newUser = await inMemoryUsersRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    const result = await showUserProfileUseCase.execute(newUser.id!);

    expect(result).toBeInstanceOf(User);
  });
});
