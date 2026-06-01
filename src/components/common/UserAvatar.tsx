import { getInitials } from '../../utils/formatters'
import './UserAvatar.scss'

interface UserAvatarProps {
  name: string
  avatarUrl?: string
}

export const UserAvatar = ({ name, avatarUrl }: UserAvatarProps) => (
  <div className="user-avatar" aria-hidden="true">
    {avatarUrl ? <img src={avatarUrl} alt="" /> : <span>{getInitials(name)}</span>}
  </div>
)
