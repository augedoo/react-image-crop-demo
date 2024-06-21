import React, { useRef, useState } from 'react'
import { Crop } from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'
import './custom-pet-upload.css'
import PetProfileAvatar from './pet-profile-avatar'
import ReactModal from 'react-modal'
import PetImageCropper, { MIN_WIDTH_DIMENSION } from './pet-image-cropper'

export const MODAL_MAX_WIDTH = 500

const CustomPetPhoto = () => {
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState<Crop>()
  const [isModalOpen, setModalOpen] = React.useState(false)
  const [error, setError] = React.useState('')
  const avatarUrl = useRef('')
  const closeModal = () => setModalOpen(false)

  const updateAvatar = (imgUrl: string) => {
    avatarUrl.current = imgUrl
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const imageElement = new Image()
      const imageUrl = reader.result?.toString() || ''
      imageElement.src = imageUrl

      imageElement.addEventListener('load', (e) => {
        if (error) setError('')
        const { naturalWidth, naturalHeight } = e.currentTarget as any
        if (
          naturalWidth < MIN_WIDTH_DIMENSION ||
          naturalHeight < MIN_WIDTH_DIMENSION
        ) {
          setError(
            `Image must be at least ${MIN_WIDTH_DIMENSION} x ${MIN_WIDTH_DIMENSION} pixels.`,
          )
          return setImgSrc('')
        }
      })
      setImgSrc(reader.result?.toString() || '')
      setModalOpen(true)
    })
    reader.readAsDataURL(file)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100vw',
      }}
    >
      <PetProfileAvatar
        onSelectFile={onSelectFile}
        avatarUrl={avatarUrl.current}
      />

      <ReactModal
        isOpen={isModalOpen}
        contentLabel="onRequestClose Example"
        onRequestClose={() => setModalOpen(false)}
        className="Modal"
        overlayClassName="Modal-Overlay"
      >
        <PetImageCropper
          onSelectFile={onSelectFile}
          crop={crop}
          setCrop={setCrop}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          updateAvatar={updateAvatar}
          closeModal={closeModal}
        />
      </ReactModal>
    </div>
  )
}

export default CustomPetPhoto
