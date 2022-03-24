import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { CreateStatementUseCase } from './CreateStatementUseCase';

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;

describe('Create Statement', () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it('should be able to return a deposit statement', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'user test',
      email: 'user@test.com',
      password: '12345',
    });

    const statementDeposit = await createStatementUseCase.execute({
      user_id: user.id!,
      type: 'deposit' as any,
      amount: 8,
      description: 'statement test'
    });

    expect(statementDeposit).toHaveProperty('id');
    expect(statementDeposit.type).toBe('deposit');

    const statementWithdraw = await createStatementUseCase.execute({
      user_id: user.id!,
      type: 'withdraw' as any,
      amount: 8,
      description: 'statement test'
    });

    expect(statementWithdraw).toHaveProperty('id');
    expect(statementWithdraw.type).toBe("withdraw");
  });
});
