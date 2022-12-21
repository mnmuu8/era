import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase"
import { signInAction, signOutAction, fetchProductsInCartAction } from './actions' 

export const saveProfile = (username, tell, zipCord, address) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const timestamp = FirebaseTimestamp.now();
    const data = {
      username: username,
      tell: tell,
      zipCord: zipCord,
      address: address,
      updated_at: timestamp
    }

    return db.collection("users").doc(uid).set(data, {merge: true})
      .then(() => {
        dispatch(push("/user/mypage"))
      }).catch((err) => {
        throw new Error(err)
      })
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {

    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;

          db.collection("users").doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data();

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))
              
            })
      } else {
        dispatch(push("/signin"))
      }
    })
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    
    if (username === "" | email === "" | password === "" | confirmPassword === "" ) {
      alert("必須項目が未入力です")
      return false
    }
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください。")
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
            tell: "",
            zipCord: "",
            address: "",
          }

          db.collection("users").doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push("/"))
            })
        }
      })
    }
} 

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です")
      return false
    } else {
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert("入力されたアドレスにパスワードリセット用のメールを送信しました")
          dispatch(push("/signin"))
        })
        .catch(() => {
          alert("パスワードリセットに失敗しました。通信状況をご確認のうえ、もう一度お試しください。")
          dispatch(push("/"))
        })
    }
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {

    if (email === "" | password === "") {
      alert("必須項目が未入力です")
      return false
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        if (user) {
          const uid = user.uid;

          db.collection("users").doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data();

              dispatch(signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
                tell: data.tell,
                zipCord: data.zipCord,
                address: data.address
              }))

              dispatch(push("/"))
            })
        }
      })
  }
} 

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()
      .then(() => {
        dispatch(signOutAction())
        dispatch(push("/signin"))
      })
  }
}

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const cartRef = db.collection("users").doc(uid).collection("cart").doc()
    addedProduct["cartId"] = cartRef.id
    await cartRef.set(addedProduct)
    dispatch(push("/"))
  }
}

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products))
  }
}