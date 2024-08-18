import { Container, Accordion } from "./components"
import { qna } from "../assets/qcmData.json"

const FAQs = () => {
  return (
    <Container
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        background: 'url("/bg-gradient.png") no-repeat center center/cover'
      }}
    >
      <div className="flex flex-col gap-4 bg-white py-4 rounded sm:w-3/4 w-11/12">
        <h3 className="poppins-bold sm:text-[2.5vmax] text-[3vmax] text-center">
          Frequently Asked Questions
        </h3>
        <Accordion qna={qna} />
      </div>
    </Container>
  )
}

export default FAQs
