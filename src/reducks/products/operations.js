import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase"

const productsRef = db.collection("products");

export const saveProduct = (name, description, price) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      name: name,
      description: description,
      price: parseInt(price, 10),
      updated_at: timestamp
    }

    const ref = productsRef.doc();
    let id = ref.id
    data.id = id
    data.created_at = timestamp

    return productsRef.doc(id).set(data)
      .then(() => {
        dispatch(push("/"))
      }).catch((err) => {
        throw new Error(err)
      })
  } 
}