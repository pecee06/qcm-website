import { Container, Quiz, Logo } from "../components/components"

const Admin = () => {
  return (
    <Container
      id="add-quiz"
      className="poppins-bold background-blue sm:p-[3.5vmax] p-[2vmax] min-h-screen flex justify-center items-center flex-col gap-5"
    >
      <Logo className="w-[8vmax] md:w-[5vmax] sm:w-[7vmax]" />
      <Quiz />
    </Container>
  )
}

export default Admin
