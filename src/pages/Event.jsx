import "./pages.css"
import { useParams } from "react-router-dom"
import { Container, SectionHead } from "../components/components"
import { eventDetails } from "../assets/qcmData.json"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Event = () => {
  const { eventId } = useParams()
  const event = eventDetails.filter((item) => item.id == eventId)[0]
  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    initialSlide: 0,
    autoplay: true,
    className: "w-full"
  }

  return (
    <Container
      id="event"
      className="min-h-screen flex flex-col px-5 justify-evenly items-center background-blue sm:gap-5 gap-1 pb-5"
    >
      <SectionHead
        logo
        lightLogo
        label="Event"
        className="self-start text-white"
      />
      <div className="sm:w-[70%] w-full flex flex-col p-[2vmax] bg-white gap-2">
        <Slider {...settings}>
          {event.images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt="Event Picture"
                className="aspect-video rounded-xl"
              />
            </div>
          ))}
        </Slider>
        <div className="p-2 flex flex-col md:gap-2 gap-1">
          <h3 className="font-bold text-2xl md:text-[3vmax] century-gothic first-letter:text-[#FCA311] md:py-4">
            {event.title}
          </h3>
          <hr />
          {event.content.split("\n").map((para, index) => (
            <p
              className="md:text-base text-xs leading-relaxed text-justify"
              key={index}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Event
