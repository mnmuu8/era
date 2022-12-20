import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase"

const productsRef = db.collection("products");

export const saveProduct = (id, name, description, price, images, quantity) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      name: name,
      images: images,
      description: description,
      price: parseInt(price, 10),
      quantity: quantity,
      updated_at: timestamp
    }

    if (id === "") {
      const ref = productsRef.doc();
      id = ref.id
      data.id = id
      data.created_at = timestamp
    }

    return productsRef.doc(id).set(data, {merge: true})
      .then(() => {
        dispatch(push("/"))
      }).catch((err) => {
        throw new Error(err)
      })
  } 
}