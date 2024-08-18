import { Container, SectionHead } from "./components"
import { about } from "../assets/qcmData.json"
import { aboutIllus } from "../assets/assets"
import { useState } from "react"

const About = () => {
  const [exploreMore, setExploreMore] = useState(false)
  const content = exploreMore ? about : about.split("\n")[0]

  function exploreMoreHandler() {
    setExploreMore(!exploreMore)
  }

  return (
    <Container id="about" className="w-screen">
      <div
        className="justify-center lg:h-[60vh] md:h-[30vh] flex"
        style={{
          background:
            window.innerWidth >= 768
              ? "url('/bg-about.png') no-repeat"
              : "url('/bg-gradient.png') no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "cover"
        }}
      >
        <SectionHead label="About Us" className="text-white" />
      </div>
      <div className="w-11/12 mx-auto flex my-4 items-center">
        <p className="md:w-[60%] p-4 whitespace-pre-wrap text-justify md:text-base text-sm leading-relaxed">
          {content}
          <span
            className="text-[#FCA311] cursor-pointer"
            onClick={exploreMoreHandler}
          >
            {exploreMore ? "\nExplore Less..." : "\nExplore More..."}
          </span>
        </p>
        <img src={aboutIllus} alt="about" className="mx-auto hidden md:flex" />
      </div>
    </Container>
  )
}

export default About
