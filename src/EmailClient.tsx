import { useEffect, useState } from "react"
import EmailBody from "./components/EmailBody"
import { EmailListView } from "./components/EmailListView"
import FilterBy from "./components/FilterBy"
import { IEmailListResponse } from "./lib/interfaces"
import { useEmailContext } from "./context/EmailContext"
import Loader from "./components/Loader"

function EmailClient() {
  const { readEmails, favoriteEmails, markAsRead } = useEmailContext()

  const [emailList, setEmailList] = useState([])
  const [currentEmail, setCurrentEmail] = useState<IEmailListResponse[]>([])
  const [activeTab, setActiveTab] = useState<"unread" | "read" | "favorites">(
    "unread"
  )
  const [selectedEmail, setSelectedEmail] = useState<IEmailListResponse | null>(
    null
  )
  const [showEmailBody, setShowEmailBody] = useState(false)
  const [loading, setLoading] = useState(true)
  const [emailBodyloading, setEmailBodyLoading] = useState(true)
  const [error, setError] = useState(false)

  const filterEmails = (emails: IEmailListResponse[]) => {
    if (activeTab === "read") {
      return emails.filter((email) => readEmails.includes(email.id))
    } else if (activeTab === "favorites") {
      return emails.filter((email) => favoriteEmails.includes(email.id))
    } else {
      return emails.filter((email) => !readEmails.includes(email.id))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(false)
      try {
        const response = await fetch(`https://flipkart-email-mock.now.sh/`)
        const result = await response.json()
        setEmailList(result.list)
        setCurrentEmail(filterEmails(result.list))
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (emailList.length === 0) {
      fetchData()
    } else {
      setCurrentEmail(filterEmails(emailList))
      setLoading(false)
    }
    setShowEmailBody(false)
    // eslint-disable-next-line
  }, [activeTab])

  const handleEmailClick = async (email: IEmailListResponse) => {
    setEmailBodyLoading(true)
    setError(false)
    try {
      const response = await fetch(
        `https://flipkart-email-mock.vercel.app/?id=${email.id}`
      )
      const result = await response.json()
      setSelectedEmail({ ...email, longDescription: result.body })
      markAsRead(email.id)
      setShowEmailBody(true)
    } catch {
      setShowEmailBody(false)
      setError(true)
    } finally {
      setEmailBodyLoading(false)
    }
  }

  return (
    <main className="p-10 h-screen overflow-hidden">
      {error && <ErrorAlert />}
      <header>
        <FilterBy active={activeTab} setActiveTab={setActiveTab} />
      </header>
      <section className="flex justify-start items-start gap-6 pt-4 h-full">
        {loading ? (
          <div className="h-full w-full flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            <EmailListView
              emailList={currentEmail}
              emailBodyShown={showEmailBody}
              handleEmailClick={handleEmailClick}
              selectedEmailId={selectedEmail?.id}
            />
            {showEmailBody && (
              <EmailBody loading={emailBodyloading} email={selectedEmail} />
            )}
          </>
        )}
      </section>
    </main>
  )
}

const ErrorAlert = () => {
  return (
    <dialog
      className="position-absolute top-0 left-0 h-screen w-screen bg-gray-500/50 flex justify-center items-center"
      open
    >
      <div className="flex flex-col justify-center items-center gap-6 bg-white p-8 rounded-md">
        <h2 className="text-2xl font-semibold">
          Opps! Something went wrong. Please try again.
        </h2>
        <button
          className="px-4 py-1 rounded-3xl bg-accent text-white w-fit"
          onClick={() => window.location.reload()}
        >
          Reload
        </button>
      </div>
    </dialog>
  )
}

export default EmailClient
