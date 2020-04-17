import csv from 'csvtojson';
import path from 'path';
import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(transactionsFilename: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();
    const filePath = path.join(uploadConfig.directory, transactionsFilename);

    const dataArray = await csv().fromFile(filePath);

    dataArray.forEach(async (item, index) => {
      dataArray[index].value = Number(item.value);
    });

    for (const item of dataArray) {
      await createTransaction.execute(item);
    }

    return dataArray;
  }
}

export default ImportTransactionsService;
