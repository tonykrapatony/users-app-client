import React, { FC, useEffect, useState, useRef  } from 'react'
import { Link } from 'react-router-dom'
import s from './ProfileDropdown.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/authSlice'
import { useGetFriendsListQuery } from '../../../redux/friendsApi'
import { RootState } from '../../../redux/store'

type ProfileDropdownProps = {}

const ProfileDropdown: FC<ProfileDropdownProps> = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const {data, isSuccess, isError, error, refetch} = useGetFriendsListQuery(userId!);
  const [showList, setShowList] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const showListToggle = () => {
    setShowList(!showList);
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setShowList(false);
    }
  }

  useEffect(() => {
    if (showList) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showList]);

  const signOut = () => {
    dispatch(logout());
  }
  return (
    <div className={s.profile_dropdown} ref={dropdownRef}>
      <button className={s.dropdown_toggle} onClick={showListToggle}>
        <img src="/assets/images/svg/avatar_icon.svg" alt="avatar icon" width={50} height={50} />
      </button>
      {showList && <ul className={s.dropdown_list}>
        <li onClick={() => setShowList(false)}><Link to="/profile">Your Profile</Link></li>
        <li onClick={() => setShowList(false)}>
          <Link to="/friends">
            Friends 
            {isSuccess && <span>{data.data?.requestedFriends.length}</span>}
          </Link>
        </li>
        <li onClick={() => setShowList(false)}><Link to="/settings">Settings</Link></li>
        <li onClick={signOut}>Sign out</li>
      </ul>}
    </div>
  )
}

export default ProfileDropdown