import { Container } from "./components"
import { about } from "../assets/qcmData.json"
import { aboutIllus, manit } from "../assets/assets"

const About = () => {
  function exploreMoreHandler() {
    setExploreMore(!exploreMore)
  }

  return (
    <Container
      id="about"
      className="md:w-11/12 mx-auto flex flex-col gap-3 my-8"
    >
      <div className="p-4 text-justify md:text-base text-sm flex gap-3 items-center justify-between">
        <p
          className="md:w-1/2 leading-relaxed p-8 rounded-xl text-white transition-all duration-300"
          style={{
            backgroundColor: "#0f3a2e",
            backgroundImage: "linear-gradient(180deg, #0f3a2e 0%, #2b7966 100%)"
          }}
        >
          {about.manit}
        </p>
        <img
          src={manit}
          alt="about"
          className="object-contain rounded-xl hidden md:inline-block w-[40%]"
        />
      </div>
      <div className="p-4 text-justify md:text-base text-sm flex gap-3 items-center">
        <img
          src={aboutIllus}
          alt="about"
          className="mx-auto hidden md:inline-block object-contain aspect-[9/16]"
        />
        <p
          className="md:w-1/2 leading-relaxed p-8 rounded-xl text-white transition-all duration-300 relative md:right-12"
          style={{
            backgroundColor: "#0f3a2e",
            backgroundImage: "linear-gradient(180deg, #0f3a2e 0%, #2b7966 100%)"
          }}
        >
          {about.qcm}
        </p>
      </div>
    </Container>
  )
}

export default About
