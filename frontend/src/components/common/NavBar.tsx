import { useUser } from "../../hooks/AuthContext";
import { getUserAvatar } from "../../utils";
import {useState} from "react";
import Link from "next/link";

export default function NavBar() {
  const { user } = useUser();
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div className="hh-navbar">
      <span className=" fw-bolder fs-3">HackHub</span>
      <span className=" flex-grow-1 text-center">S.P.I.T Hackathon 2023</span>
      <div className=" ms-auto flex items-center nav-user"
        onClick={() => {
          setDropdownActive(!dropdownActive)
        }}
      >
        <img 
          className=" rounded-circle me-2"
          style={{width: 36, height: 36}}
          src={getUserAvatar(user?.name)}
        />
        <span>{user?.name}</span>

        <div className="nav-drop"
          style={{display: (dropdownActive ? 'flex' : 'none')}}
        >
          <NavItem href="/listings" title="My listings" />
          <NavItem href="/create" title="Host a hackathon" />
        </div>
      </div>
    </div>
  )
}

function NavItem({href, title}) {
  return (
    <Link href={href}>{title}</Link>
  )
}