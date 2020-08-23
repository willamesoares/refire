import { auth } from '../services/firebase';

const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signup = async (email, password, firstName, lastName) => {
  await auth().createUserWithEmailAndPassword(email, password);
  return auth().currentUser.updateProfile({
    displayName: `${firstName} ${lastName}`
  });
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
