import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase"
import { fetchProductsAction } from "./actions";
import { deleteProductAction } from "./actions";

const productsRef = db.collection("products");


export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const userRef = db.collection("users").doc(uid)
    const timestamp = FirebaseTimestamp.now();

    let products = [];
    let soldOutProducts = []

    const batch = db.batch()

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const accessories =  snapshot.data().accessories;

      const updatedAccessories = accessories.map(accessory => {
        if( accessory.id === product.accessory.id ) {
          if (accessory.quantity === 0) {
            soldOutProducts.push(product.name)
            return accessory
          }
          return {
            id: accessory.id,
            color: accessory.color,
            type: accessory.type,
            quantity: accessory.quantity - 1
          }
        } else {
          return accessory
        }
      })

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        accessory: product.accessory,
        size: product.size
      })

      batch.update(
        productsRef.doc(product.productId),
        {accessories: updatedAccessories}
      )

      batch.delete(
        userRef.collection("cart").doc(product.cartId)
      )
    }
    if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0]
      alert("大変申し訳ありません。" + errorMessage + "が在庫切れとなったため、注文処理を中断しました。")
      return false
    } else {
      batch.commit()
      .then(() => {
        const orderRef = userRef.collection("orders").doc()
        const date = timestamp.toDate()
        const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

        const history = {
          amount: amount,
          created_at: timestamp,
          id: orderRef.id,
          products: products,
          shipping_date: shippingDate,
          updated_at: timestamp,
        }

        orderRef.set(history)

        dispatch(push("/order/complate"))
      })
      .catch(() => {
        alert("注文処理に失敗しました。通信環境をご確認のうえ、もう一度お試しください。")
      })
    }
  }
}


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

export const fetchProducts = (category, search) => {
  return async (dispatch) => {
    let query = productsRef.orderBy('updated_at', 'desc')
    query = (category !== "") ? query.where('category', '==', category ) : query
    query = (search !== "") ? db.collection("products").orderBy("name").startAt(search).endAt(search + '\uf8ff') : query

    query.get()
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

export const saveProduct = (id, name, description, price, images, size, accessories, category) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      name: name,
      images: images,
      description: description,
      category: category,
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