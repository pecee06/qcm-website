import { forwardRef, useEffect } from "react"
import { IoIosArrowDropdownCircle } from "react-icons/io"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const UserBtn = forwardRef(({ name, showDropDown, setShowDropDown }, ref) => {
  const { contextSafe } = useGSAP()

  const animateDropDown = contextSafe((cond) => {
    if (cond) {
      gsap.to(ref.current, {
        opacity: 1,
        transform: "translateY(0)",
        ease: "back.out"
      })
    } else {
      gsap.to(ref.current, {
        opacity: 0,
        transform: "translateY(-25%)",
        duration: 0.3,
        ease: "power1.out"
      })
    }
  })

  useEffect(() => {
    return () => {
      animateDropDown(false)
    }
  }, [])

  return (
    <div className="poppins-regular flex items-center md:gap-2 sm:bg-[#E5E5E5] rounded-lg md:p-2 justify-center gap-3 py-1 overflow-y-hidden sm:border-none border border-black p-2">
      <span className="uppercase text-black">{name}</span>
      <IoIosArrowDropdownCircle
        className="text-xl cursor-pointer"
        onClick={() => {
          setShowDropDown((prev) => !prev)
          animateDropDown(!showDropDown)
        }}
      />
    </div>
  )
})

export default UserBtn
