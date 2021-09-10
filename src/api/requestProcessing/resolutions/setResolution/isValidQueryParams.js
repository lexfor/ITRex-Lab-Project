import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';
import config from '../../../../../config.js';

class SetDiagnoseDTO {
  constructor({ body: { value, TTL }, query: { id: ID }, patientID }, defaultTTL) {
    // TODO По умолчанию время не применяется так как всегда приходит значение с фронта
    this.diagnose = value;
    this.TTL = new Date((TTL || new Date().getTime() + defaultTTL));
    this.ID = ID;
    this.userID = patientID;
  }
}

const isValid = (diagnose, ID, TTL, userID) => validator.isAlpha(diagnose)
  && validator.isUUID(ID)
  && validator.isDate(TTL)
  && validator.isUUID(userID);

export default async (req, res, next) => {
  try {
    const { client: { TTL: defaultTTL } } = config;
    const {
      diagnose, TTL, ID, userID,
    } = new SetDiagnoseDTO(req, defaultTTL);

    if (!(diagnose && ID && TTL && userID)) {
      throw new ApiError(400, 'Invalid request body');
    }

    if (!isValid(diagnose, ID, TTL, userID)) {
      throw new ApiError(400, 'Not valid diagnose');
    }

    req.data = {
      TTL,
      diagnose,
      ID,
      userID,
    };
    next();
  } catch (error) {
    next(error);
  }
};
