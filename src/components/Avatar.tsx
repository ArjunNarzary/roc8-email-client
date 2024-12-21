import { getFirstCharacter } from "../lib/utils"

const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="size-11 flex justify-center items-center rounded-full bg-accent">
      <span className="text-white font-semibold">
        {getFirstCharacter(name)}
      </span>
    </div>
  )
}

export default Avatar
