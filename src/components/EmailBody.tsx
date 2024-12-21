import { useEmailContext } from "../context/EmailContext"
import { IEmailListResponse } from "../lib/interfaces"
import Avatar from "./Avatar"
import DateTime from "./DateTime"
import Loader from "./Loader"

interface IEmailBodyProps {
  loading: boolean
  email: IEmailListResponse | null
}
const EmailBody = ({ loading = false, email }: IEmailBodyProps) => {
  const { favoriteEmails, markAsFavorite, removeFromFavorite } =
    useEmailContext()
  return (
    <div className="w-2/3 px-4 border border-1 bg-white border-borderColor rounded-md flex justify-start items-start gap-5 p-6 h-[97%] overflow-hidden">
      {loading || !email ? (
        <Loader />
      ) : (
        <>
          <Avatar name={email.from.name} />
          <div className="flex flex-col gap-4 w-full pr-6">
            <div className="flex justify-between items-center w-full">
              <h2>{email.subject}</h2>
              <button
                className="px-4 py-1 rounded-3xl bg-accent text-white"
                onClick={() =>
                  favoriteEmails.includes(email.id)
                    ? removeFromFavorite(email.id)
                    : markAsFavorite(email.id)
                }
              >
                {favoriteEmails.includes(email.id)
                  ? "Remove from favorite"
                  : "Mark as favorite"}
              </button>
            </div>
            <DateTime timeStamp={email.date} />
            {email?.longDescription && (
              <article
                className="max-h-[calc(100vh-15rem)] overflow-auto aticle-container"
                dangerouslySetInnerHTML={{ __html: email.longDescription }}
              ></article>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default EmailBody
