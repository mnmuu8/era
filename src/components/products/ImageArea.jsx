import React, { useCallback } from 'react'
import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate"
import { storage } from '../../firebase'
import ImagePreview from './ImagePreview'

const ImageArea = ({images, setImages}) => {
  const deleteImage = useCallback(async (id) => {
    const ret = window.confirm("この画像を削除しますか？")
    if (!ret) {
      return false
    } else {
      const newImages = images.filter(image => image.id !== id)
      setImages(newImages);
      return storage.ref("images").child(id).delete()
    }
  }, [images])

  const uploadImage = useCallback((e) => {
    const file = e.target.files;
    let blob = new Blob(file, { type: "image/jpeg" });

    // Generate random 16 digits strings
    const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N=16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

    const uploadRef = storage.ref('images').child(fileName);
    const uploadTask = uploadRef.put(blob);

    uploadTask.then(() => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            const newImage = {id: fileName, path: downloadURL};
            setImages((prevState => [...prevState, newImage]))
        });
    })
  }, [setImages])

  return (
    <div className='c-image-area'>
      <div className='preview__all'>
        {images.length > 0 && (
          images.map(image => <ImagePreview id={image.id} key={image.id} path={image.path} delete={deleteImage} />)
        )}
      </div>
      <div className='preview__label'>
        <span>商品画像を登録する</span>
        <IconButton className='circle-icon'>
          <label>
            <AddPhotoAlternateIcon />
            <input className='d-none' type="file" onChange={(e) => uploadImage(e)} />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
