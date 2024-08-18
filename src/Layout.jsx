import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

const Layout = () => {
  // document.documentElement.addEventListener("keydown", (e) => {
  //   if (e.code == "F12") e.preventDefault()
  // })

  return (
    <>
      <Outlet />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </>
  )
}

export default Layout
