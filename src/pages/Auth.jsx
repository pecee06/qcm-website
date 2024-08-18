import "./pages.css"
import { useForm } from "react-hook-form"
import {
  Container,
  Input,
  SectionHead,
  Button,
  Footer
} from "../components/components"
import { authIllustration, registrationProcess } from "../assets/assets"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import authService from "../api/auth.service"
import dbService from "../api/db.service"
import { useCallback, useState } from "react"
import env from "../../constants"
import { useDispatch } from "react-redux"
import { setData, login } from "../redux/user.slice"
import toast from "react-hot-toast"

const Auth = ({ label = "signup" }) => {
  const { handleSubmit, setValue, formState, register } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      school: "",
      city: "",
      sex: 2
    }
  })
  const { errors } = formState
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const Eye = useCallback(() => {
    if (!showPassword)
      return (
        <IoEye
          className="text-xl cursor-pointer"
          onClick={() => {
            setShowPassword(true)
          }}
        />
      )
    return (
      <IoEyeOff
        className="text-xl cursor-pointer"
        onClick={() => {
          setShowPassword(false)
        }}
      />
    )
  }, [showPassword])

  const authenticate = useCallback((f = async () => {}, formData = {}) => {
    f({
      email: formData.email,
      password: formData.password,
      name: formData.name
    })
      .then((user) => {
        if (formData.name) {
          dbService
            .insert({
              collectionId: env.userId,
              data: {
                userId: user.$id,
                name: formData.name.toLowerCase(),
                contactNo: `+91${formData.phone}`,
                educationalInstitute: formData.school.toLowerCase(),
                city: formData.city.toLowerCase(),
                sex: formData.sex.toLowerCase()
              }
            })
            .then((res) => {
              user = { ...user, ...res }
              dispatch(setData(user))
              authService
                .addPhoneNumber({
                  phone: formData.phone,
                  password: formData.password
                })
                .then(() => {
                  authService
                    .sendVerificationToken()
                    .then(() => {
                      const dets = JSON.stringify({
                        userId: user.userId,
                        phone: `+91${formData.phone}`
                      })
                      navigate(`/account/verification/${dets}`)
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
            })
            .catch((error) => {
              console.error(error)
            })
        } else {
          dispatch(setData(user))
          dispatch(login())
          navigate("/")
          toast.success("Logged In Successfully")
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.message)
      })
      .finally(() => {
        setValue("name", "")
        setValue("email", "")
        setValue("password", "")
        setValue("phone", "")
        setValue("school", "")
        setValue("city", "")
        setValue("sex", "")
      })
  }, [])

  const requiredCheck = {
    required: {
      value: true,
      message: "This is a required field"
    }
  }

  return (
    <>
      <Container
        id="auth"
        className="poppins-regular sm:p-[3.5vmax] p-[2vmax] min-h-screen flex flex-col justify-center"
      >
        <div className="flex">
          <div className="left w-1/2 items-center hidden md:flex">
            <img src={authIllustration} alt="Auth Illustration" />
          </div>

          <div className="right md:w-1/2 sm:w-[70vw] w-full sm:h-full bg-white sm:pt-0 pt-4 pb-6 sm:px-8 px-6 rounded-2xl flex flex-col gap-8 my-auto">
            <SectionHead
              blue
              className="poppins-bold"
              label={label == "signup" ? "Register" : "Welcome"}
              logo
            />
            <form noValidate className="flex flex-col gap-4">
              {label == "signup" && (
                <>
                  <Input
                    error={errors.name}
                    placeholder="Name"
                    className="focus:outline-0 p-3 focus:bg-gray-100 transition-all"
                    style={{ borderBottom: "2px solid blue" }}
                    {...register("name")}
                  />
                  <div className="flex gap-5 items-center">
                    <select
                      className="p-1 cursor-pointer focus:outline-none"
                      defaultValue={2}
                      {...register("sex", requiredCheck)}
                    >
                      <option value={0}>Male</option>
                      <option value={1}>Female</option>
                      <option value={2}>Other</option>
                    </select>
                    <Input
                      type="tel"
                      error={errors.phone}
                      placeholder="Phone"
                      className="focus:outline-0 p-3 focus:bg-gray-100 transition-all"
                      style={{ borderBottom: "2px solid blue" }}
                      {...register("phone", {
                        ...requiredCheck,
                        pattern: {
                          value:
                            /^(?:(?:\+91|0)?(?:\s[-.\s])?\d{3}\s?\d{3}\s?\d{4})?$/,
                          message: "Enter a valid Indian phone number"
                        }
                      })}
                    />
                  </div>

                  <div className="flex gap-5">
                    <Input
                      error={errors.school}
                      placeholder="School"
                      className="focus:outline-0 p-3 focus:bg-gray-100 transition-all"
                      style={{ borderBottom: "2px solid blue" }}
                      {...register("school", requiredCheck)}
                    />

                    <Input
                      error={errors.city}
                      placeholder="City"
                      className="focus:outline-0 p-3 focus:bg-gray-100 transition-all"
                      style={{ borderBottom: "2px solid blue" }}
                      {...register("city", requiredCheck)}
                    />
                  </div>
                </>
              )}

              <Input
                className="focus:outline-0 p-2 focus:bg-gray-100 transition-all"
                style={{ borderBottom: "2px solid blue" }}
                error={errors.email}
                type="email"
                placeholder="Email"
                {...register("email", {
                  ...requiredCheck,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid Email"
                  }
                })}
              />

              <Input
                className="focus:outline-0 p-2 focus:bg-gray-100 transition-all"
                style={{ borderBottom: "2px solid blue" }}
                error={errors.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  ...requiredCheck,
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-+_])[^\s]{8,}$/,
                    message:
                      "Password should contain at least 1 lowercase, uppercase, special character and should at least be 8 characters long"
                  }
                })}
              >
                <Eye />
              </Input>

              <Button
                label={label == "signup" ? "Register" : "Login"}
                className="p-2 rounded-lg text-lg text-white hover:bg-[#1d2d50] bg-[#14213D]"
                onClick={handleSubmit((formData) => {
                  if (label == "signup")
                    authenticate(authService.signupAndLogin, formData)
                  else authenticate(authService.login, formData)
                })}
              />
            </form>

            <Link
              className="w-fit text-blue-500"
              to={label == "signup" ? "/login" : "/signup"}
            >
              {label == "signup"
                ? "Already have an account?"
                : "Not having an account?"}
            </Link>
          </div>
        </div>

        <a
          className="text-sm text-yellow-400 underline text-left cursor-pointer w-fit mt-1"
          href={registrationProcess}
          download
        >
          Download Instructions
        </a>
      </Container>
      <Footer />
    </>
  )
}

export default Auth
