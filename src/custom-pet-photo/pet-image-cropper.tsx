import 'react-image-crop/dist/ReactCrop.css'
import './pet-image-cropper.css'
import React, { useState, useRef } from 'react'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { MODAL_MAX_WIDTH } from '.'
import setCanvasPreview from './setCanvasPreview'
const ASPECT_RATIO = 1
export const MIN_WIDTH_DIMENSION = 150

interface Props {
  crop: Crop | undefined
  setCrop: (value: Crop) => void
  imgSrc: string
  setImgSrc: (value: string) => void
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  updateAvatar: (croppedImageUrl: string) => void
  closeModal: () => void
}

const PetImageCropper = (props: Props) => {
  const {
    crop,
    setCrop,
    imgSrc,
    setImgSrc,
    onSelectFile,
    updateAvatar,
    closeModal,
  } = props
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const [isImageLoading, setImageLoading] = useState(false)

  const onImageLoad = (e: any) => {
    const { width, height } = e.currentTarget
    const cropWidthInPercent = (MIN_WIDTH_DIMENSION / width) * 100

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  return (
    <div className="modal-content-wrapper">
      <div className="heading">
        <h1>Want to make this your pet's profile pic?</h1>
      </div>

      {imgSrc && (
        <div className="cropper-wrapper">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_WIDTH_DIMENSION - 10}
            className="relative"
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{
                maxHeight: '50vh',
                maxWidth: MODAL_MAX_WIDTH,
              }}
              onLoadStart={() => setImageLoading(true)}
              onLoad={onImageLoad}
            />

            {isImageLoading && (
              <div className="image-load-indicator">Image Loading</div>
            )}
          </ReactCrop>

          {crop && (
            <canvas
              ref={previewCanvasRef}
              className="mt-4"
              style={{
                display: 'none',
                border: '1px solid black',
                objectFit: 'contain',
                width: 150,
                height: 150,
              }}
            />
          )}
        </div>
      )}

      <div className="add-pet-photo-actions">
        <button
          onClick={() => {
            if (!imgRef.current || !previewCanvasRef.current || !crop) return //You can return a message to the user

            setCanvasPreview({
              canvas: previewCanvasRef.current,
              crop: convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height,
              ),
              image: imgRef.current,
            })
            const dataUrl = previewCanvasRef.current.toDataURL()
            updateAvatar(dataUrl)
            closeModal()
          }}
        >
          Yes, Next
        </button>
        <button
          type="button"
          title="Edit Pet Photo"
          className=""
          onClick={() => {
            document.getElementById('file-input')?.click()
          }}
        >
          No, Choose Another
        </button>
        <input
          hidden
          id="file-input"
          placeholder="Select pet photo"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
        />
      </div>
    </div>
  )
}

export default PetImageCropper
