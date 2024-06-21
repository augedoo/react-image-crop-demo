import React from 'react'

import './pet-upload-initial-trigger.css'

interface Props {
  setCrop: (val: any) => void
  setImgSrc: (value: string) => void
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PetUploadInitialTrigger = (props: Props) => {
  const { setCrop, setImgSrc, onSelectFile } = props

  return (
    <div className="initial-upload-trigger">
      <input
        hidden
        id="file-input"
        placeholder="Select pet photo"
        type="file"
        accept="image/*"
        onChange={onSelectFile}
      />
      <button
        type="button"
        title="Edit Pet Photo"
        className=""
        onClick={() => {
          document.getElementById('file-input')?.click()
        }}
      >
        {/* Plus Icon */}
        <svg
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </button>
    </div>
  )
}

export default PetUploadInitialTrigger
