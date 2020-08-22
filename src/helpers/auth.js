import { auth } from '../services/firebase';

const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export {
  signin
};
