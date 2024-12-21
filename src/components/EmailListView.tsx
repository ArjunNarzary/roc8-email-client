import { useEmailContext } from "../context/EmailContext"
import { IEmailListResponse } from "../lib/interfaces"
import Avatar from "./Avatar"
import DateTime from "./DateTime"

interface IEmailListViewProps {
  emailList: IEmailListResponse[]
  emailBodyShown: boolean
  selectedEmailId: string | undefined
  handleEmailClick: (email: IEmailListResponse) => void
}

export const EmailListView = ({
  emailList,
  emailBodyShown = false,
  selectedEmailId,
  handleEmailClick,
}: IEmailListViewProps) => {
  const { favoriteEmails } = useEmailContext()
  return (
    <div className="flex flex-col gap-4 flex-1 h-screen overflow-auto pb-40">
      {emailList.map((email) => (
        <div
          onClick={() => handleEmailClick(email)}
          key={email.id}
          className={`flex justify-start items-start gap-4 w-full p-2 px-4 border border-1 border-borderColor rounded-md cursor-pointer hover:border-accent ${
            selectedEmailId === email.id && emailBodyShown
              ? "bg-readBackground"
              : "bg-white "
          }`}
        >
          <Avatar name={email.from.name} />
          <div
            className={`flex flex-col gap-2 ${
              emailBodyShown && "max-w-[30rem]"
            }`}
          >
            <div>
              <span>From: </span>
              <span className="font-semibold">
                {email.from.name} &lt;{email.from.email}m&gt;
              </span>
            </div>
            <div>
              <span>Subject: </span>
              <span className="font-semibold">{email.subject}</span>
            </div>
            <div className="truncate">{email.short_description}</div>
            <DateTime
              timeStamp={1582729505000}
              showFavorite={favoriteEmails.includes(email.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
