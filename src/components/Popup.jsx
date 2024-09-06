import { Button } from "./components"

const Popup = ({ functionality, submitLabel = "", fieldComponents = [] }) => {
  return (
    <form className="flex flex-col gap-3">
      {fieldComponents.map((Component) => Component)}
      <Button
        label={submitLabel}
        className="p-2 rounded-xl text-white hover:bg-[#1d2d50] bg-[#14213D]"
        onClick={functionality}
      />
    </form>
  )
}

export default Popup
