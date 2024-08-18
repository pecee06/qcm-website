import { sponsors } from "../assets/qcmData.json"
import { Container, SectionHead } from "./components"

const Sponsors = () => {
  return (
    <Container
      id="sponsors"
      className="w-screen sm:px-[3.5vmax] p-[2vmax] sm:min-h-screen min-h-[70vh] gap-x-8 flex flex-col"
    >
      <SectionHead label="Our Sponsors" className="mx-auto sm:mb-8 mb-3" />
      <div className="flex flex-col">
        {sponsors.map((sponsor, index) => {
          if (!Array.isArray(sponsor))
            return (
              <div key={index}>
                <p className="text-3xl p-1 text-center font-semibold bg-[#187b93] text-[#fff]">
                  {sponsor.category}
                </p>
                <div className="flex justify-evenly items-center flex-wrap">
                  {sponsor.brands.map((obj, idx) => (
                    <a
                      key={idx + Date.now()}
                      href={obj.website}
                      target="_blank"
                      className="h-[20vh] mx-4 sm:mx-0 flex justify-center items-center border-2 border-black p-1 my-8 shadow-[10px_10px_18px_-1px_rgba(88,163,232,1)] hover:scale-110 transition-all duration-300"
                    >
                      <img
                        src={obj.logo}
                        alt={`${obj.brand} logo`}
                        className="max-h-full "
                      />
                    </a>
                  ))}
                </div>
              </div>
            )
        })}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {sponsors.map((sponsor, index) => {
          if (Array.isArray(sponsor))
            return sponsor.map((obj, idx) => (
              <div
                key={index + idx + Date.now()}
                className="flex flex-col items-center"
              >
                <p className="text-3xl w-full p-1 text-center font-semibold bg-[#187b93] text-[#fff]">
                  {obj.category}
                </p>
                <a
                  href={obj.brand.website}
                  target="_blank"
                  className="h-[20vh] mx-4 sm:mx-0 flex justify-center items-center border-2 border-black p-1 my-8 shadow-[10px_10px_18px_-1px_rgba(88,163,232,1)] hover:scale-110 transition-all duration-300 w-fit"
                >
                  <img
                    src={obj.brand.logo}
                    alt={`${obj.brand.name} logo`}
                    className="max-h-full "
                  />
                </a>
              </div>
            ))
        })}
      </div>
    </Container>
  )
}

export default Sponsors
