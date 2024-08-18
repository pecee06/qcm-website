import "../pages/pages.css"
import { useEffect, useState, useCallback, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setQuizes, editQuiz } from "../redux/quiz.slice"
import { setScore } from "../redux/user.slice"
import env, { timeLimits } from "../../constants"
import { Navigate, useParams } from "react-router-dom"
import {
  Button,
  Container,
  Loader,
  NotAvailable
} from "../components/components"
import { useNavigate } from "react-router-dom"
import dbService from "../api/db.service"
import storeService from "../api/store.service"
import { Query } from "appwrite"
import toast from "react-hot-toast"
import { arraysEqual } from "../utils/utils"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import { liveGif } from "../assets/assets"

const PlayQuiz = () => {
  const { sec } = useParams()
  const [section, setSection] = useState(sec)
  const quizes = useSelector((state) => state.quizes)
  const { loggedIn, data, score } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [currentQue, setCurrentQue] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState(
    new Array(4).fill(false)
  )
  const [roundScore, setRoundScore] = useState(0)
  const navigate = useNavigate()
  const [showSubmitBtn, setShowSubmitBtn] = useState(false)
  const [timer, setTimer] = useState(undefined)

  const handleNext = useCallback(() => {
    let len = quizes.length
    if (currentQue >= len || timer <= 0) {
      // Handles calculation part
      quizes.forEach((quiz) => {
        if (arraysEqual(quiz.markedAnswers || [], quiz.answers))
          setRoundScore((prev) => prev + quiz.reward)
        else setRoundScore((prev) => prev - quiz.nagativeMarking)
      })
      setShowSubmitBtn(true)
    } else {
      setCurrentQue((prev) => prev + 1)
      setSelectedOptions([false, false, false, false])
    }
  }, [quizes])

  function submitQuiz({ disqualified = false }) {
    dbService
      .insert({
        collectionId: env.leaderboardId,
        data: { userId: data.$id, score, disqualified }
      })
      .then(() => {
        navigate(`/quiz/result`)
        toast.success("Quiz Submitted Succesfully")
      })
      .catch((error) => {
        toast.error(error.message)
        console.error(error)
      })
  }

  const handleSubmit = useCallback(() => {
    if (section <= 3) {
      dispatch(setScore(score + roundScore))
      if (sec < 3) navigate(`/quiz/instr/${Number(sec) + 1}`)
      else setSection(sec + 1)
      return
    }
    submitQuiz()
  }, [roundScore, section])

  useEffect(() => {
    dbService
      .select({
        collectionId: env.quizId,
        queries: [
          Query.and([
            Query.equal("section", Number(sec)),
            Query.equal("inActive", false)
          ])
        ]
      })
      .then((docs) => {
        dispatch(setQuizes(docs))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    dbService
      .select({
        collectionId: env.leaderboardId,
        queries: [Query.equal("userId", data.$id)]
      })
      .then((docs) => {
        if (docs.length != 0) {
          navigate("/")
          toast("You've already attempted the quiz")
        }
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        document.documentElement
          .requestFullscreen()
          .then(() => setLoading(false))
          .catch((error) => console.error(error))
      })

    const handle = document.documentElement.addEventListener(
      "fullscreenchange",
      () => !document.fullscreenElement && submitQuiz({ disqualified: true })
    )
    document.documentElement.addEventListener("keydown", (e) => {
      if (e.code == "F12") e.preventDefault()
    })

    return () => {
      document.documentElement.removeEventListener("fullscreenchange", handle)
    }
  }, [])

  useEffect(() => {
    dispatch(
      editQuiz({
        $id: quizes[currentQue - 1]?.$id || 0,
        changes: { markedAnswers: selectedOptions }
      })
    )
  }, [selectedOptions])

  useEffect(() => {
    let timeleft = timeLimits[quizes[currentQue - 1]?.section - 1] || 5
    setTimer(timeleft)
    const interval = setInterval(() => {
      timeleft--
      setTimer((prev) => (prev > 0 ? prev - 1 : prev))
    }, 60000)
    return () => {
      clearInterval(interval)
    }
  }, [quizes.length, sec])

  if (!loggedIn) return <Navigate to="/signup" />
  if (loading) return <Loader />

  if (quizes.length == 0)
    return <NotAvailable command="Back to Home Page" redirectURL="/" />

  return (
    <Container
      id="play-quiz"
      className="Fira Sans w-screen sm:p-[3.5vmax] p-[2vmax] min-h-screen flex flex-col justify-around items-center sm:items-center sm:gap-5 gap-1 relative"
      onContextMenu={(e) => {
        e.preventDefault()
      }}
    >
      <img
        src={liveGif}
        alt="Live Gif"
        className="absolute top-0 right-3 w-1/5 md:w-fit"
      />
      <div className="flex w-full md:w-[70vw] justify-between mt-6 items-center glass-box">
        <div className="flex w-[45%] flex-col text-white font-bold overflow-y-hidden uppercase sm:text-2xl">
          <p className="flex items-center text-sm sm:text-xl">
            Section -&nbsp;
            <span className="overflow-y-hidden text-[#FCA311] ">
              {quizes[currentQue - 1]?.section}
            </span>
          </p>
        </div>
        <div className="flex justify-end w-[45%] text-[#FCA311] font-bold overflow-y-hidden sm:text-2xl">
          <p className="text-white text-sm sm:text-xl overflow-y-hidden flex items-center uppercase">
            Time Left -&nbsp;
            <span className="text-[#FCA311] overflow-y-hidden">
              {timer} minutes
            </span>
          </p>
        </div>
      </div>
      <span className="md:text-2xl text-xs leading-none overflow-y-hidden m-3 font-bold text-white z-1 glass-box">
        {currentQue}/{quizes.length}
      </span>
      <p className="p-1 rounded-lg text-center sm:text-lg text-white leading-relaxed focus:outline-0  md:w-1/2 sm:w-4/5 cursor-default z-10 glass-box">
        Q. {quizes[currentQue - 1]?.question}
      </p>
      {quizes[currentQue - 1]?.supportingPic && (
        <img
          src={storeService.fetchFilePreview({
            fileId: quizes[currentQue - 1]?.supportingPic
          })}
          alt="Supporting Picture"
          className="w-1/3"
        />
      )}
      <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-2 gap-5 md:w-1/2 sm:w-4/5 w-full mt-4 sm:mt-0">
        {quizes[currentQue - 1]?.options.map((option, index) =>
          quizes[currentQue - 1]?.optionsContainImg ? (
            <img
              key={index}
              src={storeService.fetchFilePreview({
                fileId: option
              })}
              className={`w-full mx-auto rounded z-10 aspect-video cursor-pointer border-4 ${selectedOptions[index] ? "border-yellow-400" : "border-white"} ${!timer && "pointer-events-none"}`}
              alt={`Option ${index}`}
              onClick={() => {
                setSelectedOptions((prev) =>
                  prev.map((bool, idx) => (idx == index ? !bool : bool))
                )
              }}
            />
          ) : (
            <p
              key={index}
              className={`p-4 z-10 rounded-lg focus:outline-0 w-full cursor-pointer transition-all ${selectedOptions[index] ? "bg-yellow-400" : "bg-white hover:bg-gray-100"} ${!timer && "pointer-events-none"}`}
              onClick={() => {
                setSelectedOptions((prev) =>
                  prev.map((bool, idx) => (idx == index ? !bool : bool))
                )
              }}
            >
              {option}
            </p>
          )
        )}
      </div>
      {showSubmitBtn ? (
        <Button
          label="Submit"
          className="font-bold p-1 uppercase mt-4 py-1 px-4 bg-green-400 rounded-2xl hover:bg-green-500"
          onClick={handleSubmit}
        />
      ) : (
        <div className="flex z-10 justify-between items-center md:w-[60%] sm:w-4/5 w-full p-4 rounded">
          <Button
            label="Prev"
            className="font-bold uppercase previous flex justify-between items-center py-1 px-4 rounded-2xl bg-[#E5E5E5] hover:bg-gray-300 gap-1"
            onClick={() => {
              setCurrentQue((prev) => (prev > 1 ? prev - 1 : prev))
              setSelectedOptions([false, false, false, false])
            }}
          >
            <FaAngleLeft />
          </Button>
          <Button
            label="Next"
            className="font-bold uppercase next flex flex-row-reverse justify-between items-center py-1 px-4 rounded-2xl bg-[#FCA311] hover:bg-yellow-500 gap-1"
            onClick={handleNext}
          >
            <FaAngleRight />
          </Button>
        </div>
      )}
      <img
        src="/image-quiz-left-illustration.png"
        className="absolute hidden md:block  z-0 left-0 top-[25vh]"
      />
      <img
        src="/image-quiz-left-illustration.png"
        className="absolute hidden md:block z-0 right-0 top-[25vh] scale-x-[-1]"
      />
    </Container>
  )
}

export default PlayQuiz
