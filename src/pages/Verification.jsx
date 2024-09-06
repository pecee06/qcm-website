import {
  Container,
  Input,
  Button,
  Modal,
  Popup
} from "../components/components"
import { useForm } from "react-hook-form"
import authService from "../api/auth.service"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { login } from "../redux/user.slice"
import { useDispatch } from "react-redux"
import { useState } from "react"

const Verification = () => {
  const [code, setCode] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { dets } = useParams()
  dets = JSON.parse(dets)
  const [disableResendBtn, setDisableResendBtn] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const user = useSelector((state) => state.user.data)
  const { register, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      password: "",
      phone: ""
    }
  })
  const { errors } = formState
  const fields = [
    <Input
      className="text-sm focus:outline-0 p-3 font-normal rounded-xl border border-blue-500"
      error={errors.password}
      type="password"
      placeholder="Password"
      {...register("password", {
        required: true,
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+_])[^\s]{8,}$/,
          message:
            "Password should contain at least 1 lowercase, uppercase, special character and should at least be 8 characters long"
        }
      })}
    />,
    <Input
      className="text-sm focus:outline-0 p-3 font-normal rounded-xl border border-blue-500"
      error={errors.phone}
      type="tel"
      placeholder="Phone"
      {...register("phone", {
        required: true,
        pattern: {
          value: /^(?:(?:\+91|0)?(?:\s[-.\s])?\d{3}\s?\d{3}\s?\d{4})?$/,
          message: "Enter a valid Indian phone number"
        }
      })}
    />
  ]

  return (
    <Container className="poppins-regular relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl flex flex-col gap-7">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <p className="font-semibold text-[2vmax]">Phone Verification</p>
          <p className="flex flex-row text-sm font-medium text-gray-400">
            We have sent a code to {dets.phone}
          </p>
        </div>
        <form noValidate className="flex flex-col gap-3 p-4">
          <div>
            <Input
              className="h-[8vh] flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-5">
            <div>
              <Button
                label="Verify Account"
                className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-[#020062] hover:bg-[#2b2b67] border-none text-white text-sm shadow-sm"
                onClick={(e) => {
                  e.preventDefault()
                  authService
                    .verifyToken({
                      userId: dets.userId,
                      secret: code
                    })
                    .then(() => {
                      dispatch(login())
                      navigate("/")
                      toast("Logged In Successfully")
                    })
                    .catch((error) => {
                      toast(error.message)
                      console.error(error)
                    })
                    .finally(() => {
                      setValue("code", "")
                    })
                }}
              />
            </div>

            <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
              <p>Didn't recieve code?</p>{" "}
              <Button
                className={`flex flex-row items-center ${disableResendBtn ? "text-gray-500" : "text-blue-600"}`}
                disabled={disableResendBtn}
                label="Resend"
                onClick={(e) => {
                  e.preventDefault()
                  authService
                    .sendVerificationToken()
                    .catch((error) => {
                      console.error(error)
                      toast(error.message)
                    })
                    .finally(() => {
                      setDisableResendBtn(true)
                    })
                }}
              />
            </div>

            <Button
              label="Change Phone Number?"
              className="text-sm text-blue-600"
              onClick={(e) => {
                e.preventDefault()
                setShowModal(true)
                setDisableResendBtn(false)
              }}
            />
          </div>
        </form>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <Popup
            submitLabel="Update"
            fieldComponents={fields}
            functionality={handleSubmit((formData) => {
              authService
                .addPhoneNumber({
                  phone: formData.phone,
                  password: formData.password
                })
                .then(() => {
                  dets.phone = `+91${formData.phone}`
                  dbService
                    .update({
                      collectionId: constants.userId,
                      documentId: user.$id,
                      changes: {
                        contactNo: `+91${formData.phone}`
                      }
                    })
                    .then(() => {
                      dispatch(
                        setData({ ...user, contactNo: `+91${formData.phone}` })
                      )
                      authService.sendVerificationToken()
                      navigate(`/account/verification/${JSON.stringify(dets)}`)
                      setShowModal(false)
                    })
                    .catch((error) => console.error(error))
                })
                .catch((error) => console.error(error))
                .finally(() => {
                  setValue("phone", "")
                  setValue("password", "")
                })
            })}
          />
        </Modal>
      )}
    </Container>
  )
}

export default Verification
