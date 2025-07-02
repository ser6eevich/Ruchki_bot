import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

// Регистрация пользователя
export const registerUser = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Сохраняем дополнительную информацию в Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      createdAt: new Date().toISOString(),
      uid: user.uid,
    })

    return { success: true, user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Вход пользователя
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Выход пользователя
export const logoutUser = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Получение данных пользователя из Firestore
export const getUserData = async (uid) => {
  try {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() }
    } else {
      return { success: false, error: "Пользователь не найден" }
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Слушатель состояния аутентификации
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}
