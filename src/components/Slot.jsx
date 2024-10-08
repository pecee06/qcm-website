import { Outlet } from "react-router-dom"
import { NotAvailable } from "./components.js"
import dbService from "../api/db.service.js"
import { useState, useEffect } from "react"
import env from "../../constants.js"
import { useSelector } from "react-redux"
import { Query } from "appwrite"

const Slot = () => {
  const { data } = useSelector((state) => state.user)
  const slots = new Map()

  slots.set("bijuri", {
    start: "9/29/2024, 01:00:00 AM",
    end: "9/29/2024, 11:00:00 PM"
  })
  slots.set("indore", {
    start: "9/29/2024, 04:00:00 PM",
    end: "9/29/2024, 04:20:00 PM"
  })
  slots.set("ujjain", {
    start: "9/29/2024, 05:00:00 PM",
    end: "9/29/2024, 05:20:00 PM"
  })
  slots.set("gwalior", {
    start: "9/29/2024, 06:00:00 PM",
    end: "9/29/2024, 06:20:00 PM"
  })
  slots.set("jabalpur", {
    start: "9/29/2024, 07:00:00 PM",
    end: "9/29/2024, 07:20:00 PM"
  })
  slots.set("bhopal", {
    start: "9/29/2024, 08:00:00 PM",
    end: "9/29/2024, 08:20:00 PM"
  })
  const school = "Scindia Kanya Vidyalaya - 474007"
  slots.set(school, {
    start: "9/29/2024, 02:00:00 PM",
    end: "9/29/2024, 04:00:00 PM"
  })

  const [obj, setObj] = useState({})

  useEffect(() => {
    console.log(data)

    dbService
      .select({
        collectionId: env.userId,
        queries: [Query.equal("userId", [data.$id])]
      })
      .then((res) => {
        // let key = res[0]?.city?.toLowerCase()
        let key = res[0]?.educationalInstitute // isko change karna hai
        setObj(slots.get(key))
      })
      .catch((error) => console.error(error))
  }, [])

  const now = new Date()

  if (now >= new Date(obj?.start) && now < new Date(obj?.end)) return <Outlet />
  return (
    <NotAvailable
      message="Quiz ain't live right now"
      command="Back to Home Page"
      redirectURL="/"
    />
  )
}

export default Slot
