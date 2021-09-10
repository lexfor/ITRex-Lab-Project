/* eslint-disable class-methods-use-this */

import { addDoctor, findSpecialization, getDoctor } from './index.js';

class DoctorsTable {
  async addDoctor(doctor) {
    await addDoctor(doctor);
  }

  async findSpecialization(userID) {
    return await findSpecialization(userID);
  }

  async getDoctor(userID) {
    return await getDoctor(userID);
  }
}

export default new DoctorsTable();
