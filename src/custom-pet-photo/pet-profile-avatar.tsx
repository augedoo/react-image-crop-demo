import React, { useRef } from 'react'

import './pet-profile-avatar.css'
import AvatarPencilIcon from './avatar-pencil-icon'
import AvatarPlusIcon from './avatar-plus-icon'
import DogAvatar from './dog-avatar'

interface Props {
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  avatarUrl: string | null
}

const PetProfileAvatar = (props: Props) => {
  const { onSelectFile, avatarUrl } = props

  return (
    <div className="profile-avatar-trigger">
      {avatarUrl ? (
        <img src={avatarUrl} alt="Pet Avatar" />
      ) : (
        <div className="pet-initial-avatar">
          <DogAvatar />
        </div>
      )}

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
        {avatarUrl ? <AvatarPencilIcon /> : <AvatarPlusIcon />}
      </button>
    </div>
  )
}

export default PetProfileAvatar
