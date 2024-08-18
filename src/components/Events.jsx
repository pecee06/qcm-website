import { Container, SectionHead, EventCard } from "../components/components"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { eventDetails } from "../assets/qcmData.json"

const Events = () => {
  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    className: "w-full",
    autoplay: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 815,
        settings: { arrows: false, slidesToShow: 1 }
      }
    ]
  }

  return (
    <Container
      id="events"
      className="w-screen sm:px-[3.5vmax] p-[2vmax] sm:min-h-screen min-h-[70vh] flex flex-col sm:justify-between justify-center gap-5 items-center"
    >
      <SectionHead label="Events" className="text-white" />
      <Slider {...settings}>
        {eventDetails.map((dets, index) => (
          <EventCard dets={dets} key={index} />
        ))}
      </Slider>
    </Container>
  )
}

export default Events
