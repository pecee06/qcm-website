import { forwardRef } from "react"
import toast from "react-hot-toast"
import { Button } from "./components"
import { logout } from "../redux/user.slice"
import { useDispatch } from "react-redux"
import authService from "../api/auth.service"
import { useNavigate } from "react-router-dom"

const DropDown = forwardRef(({ user, visible = false }, ref) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const buttons = [
    {
      label: "Logout",
      f: () => {
        const proceedToLogout = confirm("Proceed to Logout?")
        if (!proceedToLogout) return
        authService
          .logout()
          .then(() => {
            dispatch(logout())
            window.location.reload()
          })
          .catch((error) => {
            toast.error(error.message)
            console.error(error)
          })
      },
      visible: true
    },
    {
      label: "Add Quiz",
      f: () => {
        navigate("/admin/add")
      },
      visible: user == "admin"
    },
    {
      label: "Manage Quiz",
      f: () => {
        navigate("/admin/manage")
      },
      visible: user == "admin"
    },
    {
      label: "Show Leaderboard",
      f: () => {
        navigate("/admin/results")
      },
      visible: user == "admin"
    }
  ]

  return (
    <div
      ref={ref}
      className={`poppins-regular md:w-[20vw] sm:w-[35vw] w-[45vw] sm:min-h-[20vh] sm:top-[20%] top-[10%] sm:right-10 right-2 text-black bg-[#fff7] transparent-white shadow-lg rounded-lg flex flex-col items-center justify-evenly gap-3 p-6 backdrop-blur ${!visible && "opacity-0 pointer-events-none"}`}
      style={{
        transform: "translateY(-25%)",
        position: "fixed"
      }}
    >
      {buttons.map((btn, index) => (
        <Button
          key={index}
          label={btn.label}
          onClick={btn.f}
          className={`${!btn.visible && "hidden"} text-lg border border-blue-800 w-full py-2 rounded-lg hover:bg-[#ffffff8e]`}
        />
      ))}
    </div>
  )
})

export default DropDown
