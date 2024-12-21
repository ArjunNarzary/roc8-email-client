import { convertDateToLocal } from "../lib/utils"

interface IDateTimeProps {
  timeStamp: number
  showFavorite?: boolean
}

const DateTime = ({ timeStamp, showFavorite = false }: IDateTimeProps) => {
  return (
    <div className="flex justify-start gap-6">
      <div>{convertDateToLocal(timeStamp)}</div>
      {showFavorite && (
        <div className="text-accent font-semibold cursor-pointer">Favorite</div>
      )}
    </div>
  )
}

export default DateTime
