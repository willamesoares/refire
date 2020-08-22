import { auth } from '../services/firebase';

const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signup = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

export {
  signin,
  signup
};
