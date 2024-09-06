import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

const Layout = () => {
  document.addEventListener("copy", (e) => {
    e.preventDefault()
  })

  document.addEventListener("cut", (e) => {
    e.preventDefault()
  })

  return (
    <>
      <Outlet />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </>
  )
}

export default Layout
