import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Layout from "./Layout.jsx"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet
} from "react-router-dom"
import {
  Home,
  Auth,
  Event,
  Result,
  Verification,
  Instructions,
  Team,
  Leaderboard
} from "./pages/pages.js"
import { AddQuiz, ManageQuiz, PlayQuiz } from "./dashboards/dashboards.js"
import { Admin, FAQs, NotAvailable } from "./components/components.js"
import { Provider } from "react-redux"
import store from "./redux/store.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="team" element={<Team />} />
      <Route path="register" element={<Auth />} />
      <Route path="login" element={<Auth label="login" />} />
      <Route path="update-phone" element={<Auth label="update" />} />
      <Route path="account/verification/:dets" element={<Verification />} />
      <Route path="events/:eventId" element={<Event />} />
      <Route path="quiz/" element={<Outlet />}>
        {/* <Route path="instr/:sec" element={<Instructions />} /> */}
        <Route
          path="instr/:sec"
          element={
            <NotAvailable
              message="Quiz ain't live right now"
              command="Back to Home Page"
              redirectURL="/"
            />
          }
        />
        <Route path="play/:sec" element={<PlayQuiz />} />
        <Route path="result/:msg" element={<Result />} />
      </Route>
      <Route path="admin/" element={<Admin />}>
        <Route path="add" element={<AddQuiz />} />
        <Route path="manage" element={<ManageQuiz />} />
        <Route path="results" element={<Leaderboard />} />
      </Route>
      <Route path="faqs" element={<FAQs />} />
    </Route>
  )
)

const elem = document.getElementById("root")
const root = ReactDOM.createRoot(elem)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
