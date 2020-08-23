import { auth } from '../services/firebase';

const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signup = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

const signInWithGoogle = () => {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
};

export {
  signin,
  signInWithGoogle,
  signup,
};
