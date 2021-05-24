import firebase from "firebase";
import { ref, onUnmounted } from "vue";

const config = {
    //firebase config
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const userCollection = db.collection("users");

//Create User
export const createUser = (user) => {
    return userCollection.add(user);
};

//Read User
export const getUser = async (id) => {
    const user = await userCollection.doc(id).get();
    return user.exists ? user.data() : null;
};

//Update User
export const updateUser = (id, user) => {
    return userCollection.doc(id).update(user);
};

//Delete User
export const deleteUser = (id) => {
    return userCollection.doc(id).delete();
};

export const useLoadUsers = () => {
    const users = ref([]);
    const close = userCollection.onSnapshot((snapshot) => {
        users.value = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    });
    onUnmounted(close);
    return users;
};
