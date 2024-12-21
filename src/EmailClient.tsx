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
  const [error, setError] = useState("")

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
      try {
        const response = await fetch(`https://flipkart-email-mock.now.sh/`)
        const result = await response.json()
        setEmailList(result.list)
        setCurrentEmail(filterEmails(result.list))
      } catch {
        setError("Something went wrong")
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
  }, [activeTab])

  const handleEmailClick = async (email: IEmailListResponse) => {
    setEmailBodyLoading(true)
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
      setError("Something went wrong")
    } finally {
      setEmailBodyLoading(false)
    }
  }

  return (
    <main className="p-10 h-screen overflow-hidden">
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

export default EmailClient
