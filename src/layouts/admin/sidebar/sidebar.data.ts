import HomeIcon from "../../../assets/icons/home-icon.svg";
import MessagesIcon from "../../../assets/icons/messages-icon.svg";
import FavoritesIcon from "../../../assets/icons/favorites-icon.svg";
import MyProfileIcon from "../../../assets/icons/my-profile-icon.svg";
import ProfileManagementIcon from "../../../assets/icons/profile-management-icon.svg";
import AccountSettingIcon from "../../../assets/icons/account-settings.svg";


export const sidebarMenuData = [
    { icon: HomeIcon, heading: 'Home', path: '/dashboard', },
    { icon: MessagesIcon, heading: 'Messages', path: '/messages' },
    { icon: FavoritesIcon, heading: 'Favorites', path: '/favorites' },
    { icon: MyProfileIcon, heading: 'My Profiles', path: '/my-profile' },
    { icon: ProfileManagementIcon, heading: 'Profile Management', path: '/profile-management' },
    { icon: AccountSettingIcon, heading: 'Account Settings', path: '/account-settings' },
]
