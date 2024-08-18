import { RiPencilFill } from "react-icons/ri"
import { MdDelete } from "react-icons/md"
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from "react-icons/io"
import dbService from "../api/db.service"
import env from "../../constants"
import { Modal, Quiz, Container } from "./components"
import { useState, useCallback } from "react"
import { deleteQuiz, editQuiz } from "../redux/quiz.slice"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { deleteFiles } from "../utils/utils"

const QuizRibbon = ({ quiz = {} }) => {
  const [showQuizModal, setShowQuizModal] = useState(false)
  const dispatch = useDispatch()
  const [inActive, setInActive] = useState(quiz.inActive)
  const setActiveStatus = useCallback((state) => {
    dbService
      .update({
        collectionId: env.quizId,
        documentId: quiz.$id,
        changes: { inActive: state }
      })
      .then((doc) => {
        dispatch(
          editQuiz({
            $id: quiz.$id,
            changes: {
              $id: doc.$id,
              inActive: state
            }
          })
        )
        setInActive(state)
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.message)
      })
  }, [])

  return (
    <Container
      className="flex items-center md:w-1/2 sm:w-4/5 w-full justify-between pl-3 bg-white"
      style={{
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px"
      }}
    >
      <p
        className={`sm:text-xl w-[90%] continue-text ${inActive && "line-through"}`}
      >
        Q. {quiz.question}
      </p>
      <div className="flex">
        {inActive ? (
          <IoIosRadioButtonOn
            className="md:text-[3vmax] text-[5vmax] cursor-pointer md:p-2"
            onClick={() => {
              setActiveStatus(false)
            }}
          />
        ) : (
          <IoIosRadioButtonOff
            className="md:text-[3vmax] text-[5vmax] cursor-pointer md:p-2"
            onClick={() => {
              setActiveStatus(true)
            }}
          />
        )}
        <RiPencilFill
          className="md:text-[3vmax] text-[5vmax] cursor-pointer bg-yellow-400 md:p-2"
          onClick={() => {
            setShowQuizModal(true)
          }}
        />
        <MdDelete
          className="md:text-[3vmax] text-[5vmax] cursor-pointer bg-red-500 md:p-2"
          onClick={() => {
            deleteFiles(quiz)
              .then(() => {
                dbService
                  .delete({
                    collectionId: env.quizId,
                    documentId: quiz.$id
                  })
                  .then(() => {
                    dispatch(deleteQuiz(quiz.$id))
                    toast.success("Quiz Deleted Successfully")
                  })
                  .catch((error) => {
                    console.error(error)
                    toast.error(error.message)
                  })
              })
              .catch((error) => {
                console.error(error)
                toast.error(error.message)
              })
          }}
        />
      </div>
      {showQuizModal && (
        <Modal setShowModal={setShowQuizModal}>
          <Quiz quiz={quiz} setShowModal={setShowQuizModal} />
        </Modal>
      )}
    </Container>
  )
}

export default QuizRibbon
