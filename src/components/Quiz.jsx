import env from "../../constants"
import dbService from "../api/db.service"
import { Input, Button } from "./components"
import { useForm } from "react-hook-form"
import { addQuiz, editQuiz } from "../redux/quiz.slice"
import { useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { useState, useCallback } from "react"
import { CiFileOn, CiFileOff } from "react-icons/ci"
import { uploadFiles, deleteFiles } from "../utils/utils"

const Quiz = ({ quiz = {}, setShowModal = () => {} }) => {
  const { setValue, handleSubmit, formState, register } = useForm({
    defaultValues: {
      question: quiz.question || "",
      supportingPic: quiz.supportingPic || "",
      options: quiz.options || new Array(4).fill(""),
      answers: quiz.answers || new Array(4).fill(false),
      reward: quiz.reward || 0,
      nagativeMarking: quiz.nagativeMarking || 0,
      section: quiz.section || 1
    }
  })
  const { errors } = formState
  const editTab = Boolean(quiz.$id)
  const dispatch = useDispatch()
  const options = ["A", "B", "C", "D"]
  const [acceptFileFrom, setAcceptFileFrom] = useState(new Array(5).fill(false))
  const [optionsContainImg, setOptionsContainImg] = useState(false)

  const resetVals = useCallback(() => {
    setValue("question", "")
    setValue("options", new Array(4).fill(""))
    setValue("answers", new Array(4).fill(false))
    setValue("reward", 0)
    setValue("nagativeMarking", 0)
    setValue("section", 1)
    setValue("supportingPic", "")
  }, [])

  const File = useCallback(
    ({ index }) => {
      function toggleAcceptFile(index) {
        setAcceptFileFrom((prev) =>
          prev.map((bool, idx) => (idx == index ? !bool : bool))
        )
      }

      if (acceptFileFrom[index])
        return (
          <CiFileOff
            className="text-2xl cursor-pointer ml-4 bg-white rounded"
            onClick={() => {
              if (index > 0) setOptionsContainImg(true)
              toggleAcceptFile(index)
            }}
          />
        )
      return (
        <CiFileOn
          className="text-2xl cursor-pointer ml-4 bg-white rounded"
          onClick={() => {
            if (index > 0) setOptionsContainImg(false)
            toggleAcceptFile(index)
          }}
        />
      )
    },
    [acceptFileFrom]
  )

  const uploadQuizHandler = useCallback((formData) => {
    let QNOs = {
      supportingPic: "",
      options: new Array(4)
    }

    uploadFiles(formData)
      .then((results) => {
        QNOs.supportingPic = results[0].value?.$id || ""
        for (let i = 0; i < 4; i++)
          QNOs.options[i] = results[i + 1].value?.$id || formData.options[i]

        dbService
          .insert({
            collectionId: env.quizId,
            data: {
              ...formData,
              ...QNOs,
              optionsContainImg,
              reward: Number(formData.reward),
              nagativeMarking: Number(formData.nagativeMarking),
              section: Number(formData.section)
            }
          })
          .then((doc) => {
            dispatch(addQuiz(doc))
            toast("Quiz Added Successfully")
          })
          .catch((error) => {
            toast(error.message)
            console.error(error)
          })
          .finally(resetVals)
      })
      .catch((error) => {
        toast(error.message)
        console.error(error)
      })
  }, [])

  const editQuizHandler = useCallback((formData) => {
    const obj = {
      supportingPicChanged: Boolean(formData.supportingPic),
      optionsChanged: [
        quiz?.options[0] != formData.options[0],
        quiz?.options[1] != formData.options[1],
        quiz?.options[2] != formData.options[2],
        quiz?.options[3] != formData.options[3]
      ]
    }

    deleteFiles(quiz, [
      obj.supportingPicChanged,
      obj.optionsChanged[0],
      obj.optionsChanged[1],
      obj.optionsChanged[2],
      obj.optionsChanged[3]
    ])
      .then(() => {
        let QNOs = {
          supportingPic: "",
          options: new Array(4)
        }

        uploadFiles(formData)
          .then((results) => {
            console.log(results)
            QNOs.supportingPic = results[0].value?.$id || ""
            for (let i = 0; i < 4; i++)
              QNOs.options[i] = results[i + 1].value?.$id || formData.options[i]

            dbService
              .update({
                collectionId: env.quizId,
                documentId: quiz.$id,
                changes: {
                  ...formData,
                  ...QNOs,
                  setOptionsContainImg,
                  reward: Number(formData.reward),
                  nagativeMarking: Number(formData.nagativeMarking),
                  section: Number(formData.section)
                }
              })
              .then((doc) => {
                dispatch(
                  editQuiz({
                    $id: quiz.$id,
                    changes: doc
                  })
                )
                toast("Quiz Updated Successfully")
              })
              .catch((error) => {
                console.error(error)
                toast(error.message)
              })
              .finally(() => {
                setShowModal(false)
              })
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <form noValidate className="sm:w-2/3 w-4/5 flex flex-col gap-4">
      <Input
        error={errors.question}
        placeholder="Question here..."
        className="p-4 rounded-lg text-lg focus:outline-0"
        {...register("question", {
          required: {
            value: true,
            message: "This is a required field"
          }
        })}
      >
        <File index={0} />
      </Input>
      {acceptFileFrom[0] && (
        <Input
          oneline
          label="Supporting Picture"
          type="file"
          className="p-4 rounded-lg text-lg focus:outline-0"
          {...register("supportingPic")}
        />
      )}
      <div>
        {options.map((option, index) => (
          <Input
            type={acceptFileFrom[index + 1] ? "file" : "text"}
            key={index}
            className="px-4 py-2 rounded-lg focus:outline-0"
            error={errors.options}
            placeholder={`Option ${option}`}
            {...register(`options.${index}`, {
              required: {
                value: true,
                message: "This is a required field"
              }
            })}
          >
            <File index={index + 1} />
          </Input>
        ))}
      </div>
      <div className="flex flex-col items-center justify-between gap-6 bg-pink-500 p-2 rounded-lg">
        <div className="flex gap-6 items-center bg-pink-300 p-2 rounded-lg">
          <label className="text-lg" htmlFor="section">
            Section
          </label>
          <select
            id="section"
            className="p-1 cursor-pointer rounded-lg"
            defaultValue={0}
            {...register("section")}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className="flex gap-5 items-center bg-pink-300 p-2 rounded-lg">
          <p className="text-lg">Answers: </p>
          <div className="flex items-center gap-5">
            {options.map((option, index) => (
              <Input
                label={option}
                key={index}
                type="checkbox"
                className="w-5 h-5 rounded focus:ring-blue-500 focus:ring-2"
                {...register(`answers.${index}`)}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <Input
            className="p-2 rounded-lg focus:outline-0 focus:bg-pink-200 transition-all bg-pink-300"
            oneline
            label="Negative Marking"
            error={errors.nagativeMarking}
            {...register("nagativeMarking")}
          />
          <Input
            rules={{
              required: {
                value: true,
                message: "This is a required field"
              }
            }}
            className="p-2 rounded-lg focus:outline-0 focus:bg-pink-200 transition-all bg-pink-300"
            oneline
            label="Enter Points"
            error={errors.reward}
            {...register("reward")}
          />
        </div>
      </div>
      <Button
        className="text-xl hover:bg-[#FCA311] bg-yellow-400 w-full p-3 rounded-lg"
        label={editTab ? "Save" : "+ Add Question"}
        onClick={handleSubmit((formData) => {
          if (editTab) editQuizHandler(formData)
          else uploadQuizHandler(formData)
        })}
      />
    </form>
  )
}

export default Quiz
