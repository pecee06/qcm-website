import { useNavigate, Link } from "react-router-dom"
import { Button, DropDown, UserBtn, Logo } from "./components"
import authService from "../api/auth.service"
import { useEffect, useState, forwardRef, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { login, setData } from "../redux/user.slice"

const Nav = forwardRef(({ className, offModal = () => {} }, ref) => {
  const tabs = [
    {
      name: "Home",
      to: "#hero"
    },
    {
      name: "About",
      to: "#about"
    },
    {
      name: "Events",
      to: "#events"
    },
    {
      name: "Team",
      to: "team"
    },
    {
      name: "Sponsors",
      to: "#sponsors"
    },
    {
      name: "Contact Us",
      to: "#contacts"
    }
  ]
  const { data, loggedIn } = useSelector((state) => state.user)
  const name = data.name?.split(" ")[0] || "User"
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const logoRef = useRef(null)
  const [showDropDown, setShowDropDown] = useState(false)
  const dropDownRef = useRef(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        dispatch(setData(user))
        dispatch(login())
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <nav
        ref={ref}
        className={`poppins-regular md:items-center md:justify-between justify-between flex md:flex-row flex-col items-center md:overflow-y-hidden md:h-[12vh] w-full ${className}`}
      >
        <Logo
          ref={logoRef}
          className="hidden md:block md:w-[3vmax] w-[5vmax] cursor-default"
        />
        <div className="tabs-bar flex flex-col gap-[2vw] mt-0 pt-0 md:flex-row h-full items-center px-2 rounded-2xl">
          {tabs.map((tab, index) =>
            tab.to.startsWith("#") ? (
              <a
                key={index}
                href={tab.to}
                className="hover:text-yellow-400 transition-all text-base no-underline text-black 
                border-2 rounded-[25px] py-[5px] px-[10px] 
                md:hover:scale-125 md:text-white md:border-none md:rounded-none md:p-2"
                style={{ borderColor: "currentColor" }}
                onClick={offModal}
              >
                {tab.name}
              </a>
            ) : (
              <Link
                key={index}
                to={tab.to}
                className="hover:text-yellow-400 transition-all text-base no-underline text-black 
                border-2 rounded-[25px] py-[5px] px-[10px] 
                md:hover:scale-125 md:text-white md:border-none md:rounded-none md:p-2"
                style={{ borderColor: "currentColor" }}
                onClick={offModal}
              >
                {tab.name}
              </Link>
            )
          )}
        </div>
        {loggedIn ? (
          <div className="flex sm:flex-row flex-col gap-2">
            <Button
              label="Play Quiz"
              onClick={() => navigate("/quiz/instr/1")}
              className="poppins-regular flex items-center md:gap-2 sm:bg-[#E5E5E5] rounded-lg md:p-2 justify-center gap-3 py-1 overflow-y-hidden sm:border-none border border-black p-2"
            />
            <UserBtn
              name={name}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
              ref={dropDownRef}
            />
          </div>
        ) : (
          <Button
            label="Signup"
            className="poppins-regular ml-2vmax py-2 px-5 text-sm text-white rounded-3xl border-2 overflow-y-hidden"
            style={{
              backgroundColor: isMobile && "rgb(15, 109, 115)",
              borderColor: isMobile && "rgb(15, 109, 115)",
              ...(window.innerWidth < 768 && { marginTop: "10px" })
            }}
            onClick={() => {
              navigate("register")
            }}
          />
        )}
      </nav>
      <DropDown ref={dropDownRef} user={name} visible={showDropDown} />
    </>
  )
})

export default Nav
