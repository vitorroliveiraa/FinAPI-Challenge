import { AppError } from '../../../../shared/errors/AppError';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })

  it('should be able to add a new statement', async () => {
    const user = await createUserUseCase.execute({
      name: 'User Test',
      email: 'user@test.com',
      password: 'admin',
    });

    expect(user).toHaveProperty("id");
  });

  it('should not be possible to register a statement with an existing email', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "User Test 1",
        email: "user@test.com",
        password: "admin",
      });

      await createUserUseCase.execute({
        name: "User Test 2",
        email: "user@test.com",
        password: "admin",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
