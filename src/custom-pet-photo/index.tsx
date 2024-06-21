import React, { useRef, useState } from 'react'
import PetPhotoCropper from './pet-photo-cropper'
import Modal from 'react-modal'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import './custom-pet-upload.css'
import PetUploadInitialTrigger from './pet-upload-initial-trigger'
import ReactModal from 'react-modal'

const CustomPetPhoto = () => {
  const [imgSrc, setImgSrc] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [isModalOpen, setModalOpen] = React.useState(false)

  const handleOnSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '')
        setModalOpen(true)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div>
      <div>
        <PetUploadInitialTrigger
          setCrop={setCrop}
          setImgSrc={setImgSrc}
          onSelectFile={handleOnSelectFile}
        />
      </div>
      {/* 
      <ReactModal
        isOpen={isModalOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setModalOpen(false)}
        className="Modal"
        overlayClassName="Modal-Overlay"
      >
        <div style={{
          height: "100%",
          width: "100%",
          display: 'flex',
        }}>

        <PetPhotoCropper crop={crop} setCrop={setCrop} imgSrc={imgSrc} setImgSrc={setImgSrc}   />
        </div>
      </ReactModal> */}
      <PetPhotoCropper
        crop={crop}
        setCrop={setCrop}
        imgSrc={imgSrc}
        setImgSrc={setImgSrc}
      />
    </div>
  )
}

export default CustomPetPhoto
