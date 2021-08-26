/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */

import { v4 as uuidv4 } from 'uuid';
import ClientsTable from './clientsTable/ClientsTable.js';
import MedicalCardsTable from './medicalCardsTable/MedicalCardsTable.js';
import QueuesTable from './queuesTable/queuesTable.js';
// import DoctorsTable from './doctorsTable/DoctorsTable.js';

import createDatabase from '../../../../storage/database/createDatabase.js';
import sequelize from '../../../../storage/database/index.js';

import {
  allQueuesTable, clientsTable,
  doctorsTable, medicalCardsTable, queuesTable,
} from '../../../../storage/database/tables/index.js';

(async () => {
  try {
    await createDatabase();

    console.log(allQueuesTable, clientsTable,
      doctorsTable, medicalCardsTable, queuesTable);

    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
})();

//                       TODO Сделать нормальный джоин
export default class {
  constructor() {
    this.ID = uuidv4();
  }

  async set(client, doctorID) {
    const clientID = uuidv4();

    await QueuesTable.addRecord(this.ID, clientID,
      new Date().toISOString().slice(0, 19).replace('T', ' '));

    await MedicalCardsTable.addRecord(clientID, doctorID,
      new Date().toISOString().slice(0, 19).replace('T', ' '), null, null);

    return await ClientsTable.setClient(client, clientID);
  }

  async get(key) {
    return await ClientsTable.getClient(key);
  }

  async has(key) {
    return await ClientsTable.hasClient(key);
  }

  async delete(key) {
    // Удалять записи и в других таблица
    return await MedicalCardsTable.delResolution(key);
  }

  async values() {
    return await QueuesTable.getQueueList();
    // return await ClientsTable.getClients();
  }

  // async setTTL(key, TTL) {
  //   // return await HistorysTable.setTTL(key, TTL);
  // }

  async setDiagnose(key, diagnose, TTL) {
    return await MedicalCardsTable.updateRecord(key, diagnose, TTL);
  }
}
