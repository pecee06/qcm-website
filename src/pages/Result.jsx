import "./pages.css"
import { Link } from "react-router-dom"
import { Container } from "../components/components"

const Result = () => {
  return (
    <Container
      className="h-screen flex flex-col justify-center items-center gap-4 londrina-solid-regular"
      style={{
        background: 'url("/image-quiz-bg.png") no-repeat center center/cover'
      }}
    >
      <h1 className="text-[5vmax] text-[#FCA311] border border-white p-2 rounded-lg">
        Quiz Submitted Successfully
      </h1>
      <Link to="/" className="text-white underline text-lg">
        Back to home page
      </Link>
    </Container>
  )
}

export default Result
