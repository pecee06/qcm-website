import {
  Container,
  Button,
  SectionHead,
  Footer
} from "../components/components"
import { team } from "../assets/qcmData.json"
import storeService from "../api/store.service"
import env from "../../constants"

const Team = () => {
  return (
    <>
      <Container
        id="team-gallery"
        className="bg-[#fdfef9] flex flex-col gap-5 items-center min-h-screen pb-8 px-2"
      >
        <SectionHead label="Team" className="text-black" logo />
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4 md:px-[15vw] px-[10vw]">
          {team.map((obj, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow justify-between transition-all p-4 rounded cursor-default min-h-[45vh] md:text-sm text-xs font-bold"
            >
              <img
                src={storeService.fetchFilePreview({
                  fileId: obj.fileId,
                  bucketId: env.teamBucketId
                })}
                alt="Member"
                className="aspect-square h-3/4 object-contain"
              />
              <div className="flex flex-col gap-1 items-center">
                <a
                  className="uppercase text-blue-800"
                  href={obj.linkedIn}
                  target={obj.linkedIn ? "_blank" : "_parent"}
                >
                  {obj.name}
                </a>
                <p className="text-[#fe9c02]">{obj.post}</p>
                <p className="text-[#fe9c02]">{obj.domain || ""}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default Team
