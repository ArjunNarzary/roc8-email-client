const FilterBy = ({
  active = "unread",
  setActiveTab,
}: {
  active: "unread" | "read" | "favorites"
  setActiveTab: React.Dispatch<
    React.SetStateAction<"unread" | "read" | "favorites">
  >
}) => {
  return (
    <div className="flex justify-start items-center gap-8">
      <h2>Filter By:</h2>
      <div className="flex justify-start items-center gap-2">
        <div
          className={`cursor-pointer px-4 py-1 rounded-3xl ${
            active === "unread" &&
            "bg-filterButton border border-borderColor border-1"
          }`}
          onClick={() => setActiveTab("unread")}
        >
          Unread
        </div>

        <div
          className={`cursor-pointer px-4 py-1 rounded-3xl ${
            active === "read" &&
            "bg-filterButton border border-borderColor border-1"
          }`}
          onClick={() => setActiveTab("read")}
        >
          Read
        </div>

        <div
          className={`cursor-pointer px-4 py-1 rounded-3xl ${
            active === "favorites" &&
            "bg-filterButton border border-borderColor border-1"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </div>
      </div>
    </div>
  )
}

export default FilterBy
