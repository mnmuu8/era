import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase"
import { fetchProductsAction } from "./actions";
import { deleteProductAction } from "./actions";

const productsRef = db.collection("products");

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
      .then(() => {
        const prevProducts = getState().products.list
        const nextProducts = prevProducts.filter(product => id !== product.id)
        dispatch(deleteProductAction(nextProducts))
      })
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef.orderBy('updated_at', 'desc').get()
      .then(snapshots => {
        const productList = []
        snapshots.forEach(snapshot => {
          const product = snapshot.data();
          productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
      })
  }
}

export const saveProduct = (id, name, description, price, images, size, accessories) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      name: name,
      images: images,
      description: description,
      price: parseInt(price, 10),
      size: size,
      accessories: accessories,
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