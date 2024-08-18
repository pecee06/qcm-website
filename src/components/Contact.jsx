import { FaLocationDot } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa"
import { MdWifiCalling3 } from "react-icons/md"
import { IoMdMail } from "react-icons/io"
import { contacts, email, address } from "../assets/qcmData.json"
import { Container } from "./components"

const Contact = () => {
  return (
    <Container className="flex flex-col sm:flex-row w-full gap-7 sm:my-[20vh] sm:py-5 py-10">
      <div className="left flex flex-col gap-5 w-full justify-start sm:pl-[8vmax] pl-2">
        <h3 className="century-gothic font-bold text-[2.5vmax] sm:text-[2vmax] text-yellow-400">
          Contact Us
        </h3>
        <div className="flex gap-4">
          <div className="flex flex-col">
            {contacts.map((contact, index) => (
              <div className="flex flex-col my-1" key={index}>
                <div className="flex gap-3 text-[2vmax] sm:text-[1.3vmax]">
                  <MdWifiCalling3 />
                  <span>{contact.name} -</span>
                </div>
                <span className="text-[#FCA311]">{contact.position}</span>
                <div className="flex gap-1">
                  <span
                    onClick={() => {
                      navigator.clipboard.writeText(contact.no)
                    }}
                    className="cursor-copy text-xs sm:text-base text-[#FCA311]"
                  >
                    {contact.no}
                  </span>
                  <a href={contact.linkedin} target="_blank">
                    <FaLinkedin className="sm:text-xl text-lg" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <IoMdMail className="sm:text-2xl text-lg" />
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${email}`}
            target="_blank"
            className="text-[2vmax] sm:text-[1.3vmax]"
          >
            {email}
          </a>
        </div>
      </div>
      <div className="right flex flex-col w-full justify-start gap-5 sm:border-l sm:pl-[8vmax] pl-2 border-gray-300">
        <h3 className="century-gothic font-bold text-[2.5vmax] sm:text-[2vmax] text-yellow-400">
          Locate Us
        </h3>
        <div className="flex gap-4">
          <FaLocationDot className="sm:text-2xl text-lg" />
          <div className="text-[2vmax] sm:text-[1.3vmax]">
            <p>{address.college}</p>
            <p>{address.locality}</p>
            <p>
              {address.city}, PIN: {address.pin}
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Contact
