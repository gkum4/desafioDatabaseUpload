import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const incomeArr = await this.find({
      where: { type: 'income' },
    });

    const outcomeArr = await this.find({
      where: { type: 'outcome' },
    });

    const income = incomeArr.reduce((total, element) => {
      return total + element.value;
    }, 0);

    const outcome = outcomeArr.reduce((total, element) => {
      return total + element.value;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
