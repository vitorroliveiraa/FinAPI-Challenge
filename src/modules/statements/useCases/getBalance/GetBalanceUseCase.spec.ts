import { userInfo } from 'os';
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { GetBalanceUseCase } from './GetBalanceUseCase';

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;

const user = {
  name: 'User Test',
  email: 'user@test.com',
  password: '12345',
}

describe('Get Balance', () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it('should be able to return a list of deposit, withdrawal and balance operations', async () => {
    const newUser = await inMemoryUsersRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    await inMemoryStatementsRepository.create({
      user_id: newUser.id!,
      type: 'deposit' as any,
      amount: 4,
      description: 'Transf test'
    });

    const results = await getBalanceUseCase.execute({
      user_id: newUser.id!,
    });

    expect(results).toHaveProperty('statement');
    expect(results).toHaveProperty('balance');
  });
});
