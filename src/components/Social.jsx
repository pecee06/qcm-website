import { FaFacebook, FaLinkedin } from "react-icons/fa"
import { FaSquareInstagram, FaYoutube } from "react-icons/fa6"
import {
  facebook,
  instagram,
  linkedin,
  youtube,
  organization
} from "../assets/qcmData.json"
import { Container } from "./components"

const Social = () => {
  const social = [
    {
      href: instagram,
      image: FaSquareInstagram
    },
    {
      href: youtube,
      image: FaYoutube
    },
    {
      href: linkedin,
      image: FaLinkedin
    },
    {
      href: facebook,
      image: FaFacebook
    }
  ]
  const date = new Date()

  return (
    <Container className="flex justify-between w-full bg-[#e5e5e51d] px-4 py-2 rounded-2xl border border-gray-600">
      <span className="sm:text-[1.5vmax] text-[1.7vmax] flex items-center gap-2">
        {date.getFullYear()}: {organization}
      </span>
      <div className="flex items-center sm:gap-3 gap-1">
        {social.map((item, index) => (
          <a key={index} href={item.href} target="_blank">
            <item.image className="text-[3vmax] sm:text-[2vmax] cursor-pointer" />
          </a>
        ))}
      </div>
    </Container>
  )
}

export default Social
