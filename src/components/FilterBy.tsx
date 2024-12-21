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
    <div className="flex justify-start items-center gap-4">
      <span>Filter By:</span>
      <ul className="flex justify-start items-center gap-1">
        <li
          className={`cursor-pointer px-2 py-1 rounded-3xl ${
            active === "unread" &&
            "bg-filterButton border border-borderColor border-1"
          }`}
          onClick={() => setActiveTab("unread")}
        >
          Unread
        </li>

        <li
          className={`cursor-pointer px-4 py-1 rounded-3xl ${
            active === "read" &&
            "bg-filterButton border border-borderColor border-1"
          }`}
          onClick={() => setActiveTab("read")}
        >
          Read
        </li>

        <li
          className={`cursor-pointer px-4 py-1 rounded-3xl ${
            active === "favorites" &&
            "bg-filterButton border border-borderColor border-1"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </li>
      </ul>
    </div>
  )
}

export default FilterBy
