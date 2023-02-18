import { useUser } from "../../hooks/AuthContext";
import { getUserAvatar } from "../../utils";
import {useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axiosClient from "../../services/axios-client";
import { Button } from "react-bootstrap";

export default function NavBar() {
  const { user, logout } = useUser();
  const [dropdownActive, setDropdownActive] = useState(false);
  const [pageTitle, setPageTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosClient.get('/hackathon/view/'+router.query.slug);
        setPageTitle(res.data.event.name)
      } catch (error) {
        console.log(error)
      }
    }

    if (router.asPath.startsWith('/myhackathon')) {
      fetchData()
    }
  }, [router.asPath])

  return (
    <div className="hh-navbar">
      <Link href="/" className=" fw-bolder fs-3">HackHub</Link>
      <span className=" flex-grow-1 text-center fs-5 fw-semibold">{pageTitle}</span>
      <div className=" ms-auto flex items-center nav-user"
        onClick={() => {
          setDropdownActive(!dropdownActive)
        }}
      >
        {user && (
          <>
            <img 
              className=" rounded-circle me-2"
              style={{width: 36, height: 36}}
              src={getUserAvatar(user?.name)}
            />
            <span>{user?.name}</span>
          </>
        )}
        
        {!user && (
          <Link href="/login">
            <Button>
              Login
            </Button>
          </Link>
        )}

        {user && (
          <div className="nav-drop"
              style={{display: (dropdownActive ? 'flex' : 'none')}}
            >
              <NavItem href="/listings" title="My listings" />
              <NavItem href="/create" title="Host a hackathon" />
              <NavItem onClick={() => {
                logout()
                router.push('/')
              }} href="#logout" title="Logout" />
            </div>
        )}
      </div>
    </div>
  )
}

function NavItem({href, title, onClick = () => {}}) {
  return (
    <Link href={href} onClick={onClick}>{title}</Link>
  )
}