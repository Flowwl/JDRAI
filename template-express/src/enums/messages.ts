const MESSAGES = {

  // database
  updatedSuccess: 'was updated successfully.',
  createdSuccess: 'was created successfully.',
  deletedSuccess: 'was deleted successfully.',

  // models
  user: 'User',
  studio: 'Studio',

  // errors
  error: 'An error occured',
  databaseError: 'An error occured with the database connection',
  unauthorized: 'Unauthorized !',


  // validation token
  tokenExpired: 'Token expired',
  emptyOrInvalidToken: 'Empty or Invalid Token',

  // validation auth
  failPasswordLength: 'Password length need to have atleast 8 characters!',

  // validation format
  dateFormatInvalid: 'Date format is invalid',
  emailFormatInvalid: 'Email format is invalid',
  passwordFormatInvalid: 'Password format is invalid',

  // validation required
  canNotBeEmpty: 'One or many fields are missing or are empty',
  notFound: "Not found",
  alreadyExists: "Already Exists"

};

export {
  MESSAGES
};
