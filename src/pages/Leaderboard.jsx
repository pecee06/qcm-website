import env from "../../constants"
import { useEffect, useState, useMemo } from "react"
import dbService from "../api/db.service"
import { Query } from "appwrite"
import {
  Container,
  Logo,
  Loader,
  NotAvailable,
  SearchBar
} from "../components/components"
import toast from "react-hot-toast"

const Leaderboard = () => {
  const [leaderBoard, setLeaderBoard] = useState([])
  const [loading, setLoading] = useState(true)
  let data = useMemo(() => new Map())
  const [searchCity, setSearchCity] = useState("")
  const [searchSchool, setSearchSchool] = useState("")

  const bars = [
    {
      name: "City",
      content: searchCity,
      setContent: setSearchCity
    },
    {
      name: "School",
      content: searchSchool,
      setContent: setSearchSchool
    }
  ]

  useEffect(() => {
    dbService
      .select({
        collectionId: env.leaderboardId,
        queries: [Query.equal("disqualified", [false])]
      })
      .then((res) => {
        res.forEach((obj) => data.set(obj.userId, obj.score))
        let ids = []
        for (let [key, _] of data) ids.push(key)
        dbService
          .select({
            collectionId: env.userId,
            queries: [Query.equal("userId", ids)]
          })
          .then((usersData) => {
            setLeaderBoard(
              usersData
                .map((userData) => ({
                  ...userData,
                  score: data.get(userData.userId)
                }))
                .sort((a, b) => b.score - a.score)
            )
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
        toast.error(error.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <Loader />
  if (leaderBoard.length == 0)
    return (
      <NotAvailable
        message="None of the Contestants played yet"
        command="Back to Home Page"
        redirectURL="/"
      />
    )

  return (
    <Container
      id="results"
      className="poppins-regular w-screen sm:p-[3.5vmax] p-[2vmax] min-h-screen flex flex-col sm:justify-start gap-5 items-center sm:items-start background-blue"
    >
      <Logo className="w-[8vmax] md:w-[5vmax] sm:w-[7vmax]" />
      <div className="flex w-full sm:gap-[10vw] gap-2">
        {bars.map((bar, index) => (
          <SearchBar
            key={index}
            content={bar.content}
            setContent={bar.setContent}
            placeholder={bar.name}
            className="p-2 bg-white rounded-xl focus:outline-0 w-full"
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full items-center">
        <div className="flex justify-between w-full sm:text-[2vmax] text-[3vmax] text-white font-bold text-outline-thin">
          <span>Rank</span>
          <span>Details</span>
          <span>Score</span>
        </div>
        {leaderBoard
          .filter(
            (user) =>
              user.city?.toLowerCase().startsWith(searchCity?.toLowerCase()) &&
              user.educationalInstitute
                ?.toLowerCase()
                .startsWith(searchSchool?.toLowerCase())
          )
          .map((user, index) => (
            <div
              key={index}
              className="bg-white py-3 pl-5 rounded-xl justify-between px-5 flex gap-5 items-center w-full"
            >
              <span className="text-yellow-500">{index + 1}. </span>
              <p
                className="uppercase w-[70%] md:w-auto"
                onClick={() => {
                  console.log(user)
                }}
              >
                {user.name} | {user.educationalInstitute} | {user.city}
              </p>
              <span>{user.score}</span>
            </div>
          ))}
      </div>
    </Container>
  )
}

export default Leaderboard
