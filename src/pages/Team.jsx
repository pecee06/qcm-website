import { useState } from "react"
import {
  Container,
  Button,
  SectionHead,
  Footer
} from "../components/components"
import { team } from "../assets/qcmData.json"

const Team = () => {
  const buttons = [
    {
      label: "Pre Final Year",
      f: () => setYear(3)
    },
    {
      label: "Final Year",
      f: () => setYear(4)
    }
  ]
  const [year, setYear] = useState(3)

  return (
    <>
      <Container
        id="team-gallery"
        className="bg-[#fbfbfd] flex flex-col gap-5 items-center min-h-screen pb-8 px-2"
      >
        <SectionHead label="Team" className="text-black" logo />
        <div className="flex sm:justify-around justify-between sm:w-[50%] w-full items-center">
          {buttons.map((btn, index) => (
            <Button
              key={index}
              label={btn.label}
              className={`border-2 border-black bg-opacity-15 h-fit sm:text-lg text-sm py-1 sm:px-5 px-1 rounded-3xl transition-all cursor-pointer hover:text-[#fe9c02] ${index + 3 == year ? "text-[#fe9c02]" : "text-black"}`}
              onClick={btn.f}
            />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4 md:px-[15vw] px-[10vw]">
          {team[`${year}`].map((obj, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow gap-2 items-center justify-center transition-all p-2 rounded cursor-default h-[45vh] md:text-sm text-xs font-bold overflow-y-hidden"
            >
              <img src={obj.image} alt="Member" className="h-3/4 rounded" />
              <div>
                <h3 className="uppercase">{obj.name}</h3>
                <p className="text-center text-[#fe9c02]">{obj.post}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Team
