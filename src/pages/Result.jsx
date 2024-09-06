import "./pages.css"
import { Container } from "../components/components"
import { useParams } from "react-router-dom"

const Result = () => {
  const { msg } = useParams()
  return (
    <Container
      className="h-screen flex flex-col justify-center items-center gap-4 londrina-solid-regular"
      style={{
        background: 'url("/image-quiz-bg.png") no-repeat center center/cover'
      }}
    >
      <h1 className="text-[5vmax] text-[#FCA311] border border-white p-2 rounded-lg">
        {msg}
      </h1>
      <a href="/" className="text-white underline text-lg">
        Back to home page
      </a>
    </Container>
  )
}

export default Result
