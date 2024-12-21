import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

type EmailContextType = {
  readEmails: string[]
  favoriteEmails: string[]
  markAsRead: (id: string) => void
  markAsFavorite: (id: string) => void
  removeFromFavorite: (id: string) => void
}

const EmailContext = createContext<EmailContextType | undefined>(undefined)

export const EmailContextProvider = ({ children }: { children: ReactNode }) => {
  const [readEmails, setReadEmails] = useState<string[]>(() => {
    const saved = localStorage.getItem("readEmails")
    return saved ? JSON.parse(saved) : new Set()
  })

  const [favoriteEmails, setFavoriteEmails] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteEmails")
    return saved ? JSON.parse(saved) : new Set()
  })

  //Sync localstoarge when there is a changes in reacEmail
  useEffect(() => {
    localStorage.setItem("readEmails", JSON.stringify(readEmails))
  }, [readEmails])

  //Sync localstorage when there is a changes in favoriteEmail
  useEffect(() => {
    localStorage.setItem("favoriteEmails", JSON.stringify(favoriteEmails))
  }, [favoriteEmails])

  const markAsRead = (id: string) => {
    setReadEmails((prev) => [...new Set(prev).add(id)])
  }

  const markAsFavorite = (id: string) => {
    setFavoriteEmails((prev) => [...new Set(prev).add(id)])
  }

  const removeFromFavorite = (id: string) => {
    setFavoriteEmails((prev) => prev.filter((email) => email !== id))
  }

  return (
    <EmailContext.Provider
      value={{
        readEmails,
        favoriteEmails,
        markAsRead,
        markAsFavorite,
        removeFromFavorite,
      }}
    >
      {children}
    </EmailContext.Provider>
  )
}

// Custom hook to use the EmailContext
export const useEmailContext = () => {
  const context = useContext(EmailContext)
  if (!context) {
    throw new Error("useEmailContext must be used within an EmailProvider")
  }
  return context
}
