import { qcmLogo } from "../assets/assets"
import { Link } from "react-router-dom"
import { forwardRef } from "react"

const Logo = forwardRef(({ className = "" }, ref) => {
  return (
    <Link to="/" className="self-center">
      <img ref={ref} src={qcmLogo} alt="QCM Logo" className={`${className}`} />
    </Link>
  )
})

export default Logo
