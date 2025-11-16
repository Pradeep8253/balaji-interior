const ChartTab = ({ selected, onChange }) => {
  const getButtonClass = (option) =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => onChange("month")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "month"
        )}`}
      >
        M
      </button>

      <button
        onClick={() => onChange("three-month")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "three-month"
        )}`}
      >
        3M
      </button>

      <button
        onClick={() => onChange("year")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "year"
        )}`}
      >
        1Y
      </button>
         <button
        onClick={() => onChange("all")}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "all"
        )}`}
      >
  All
      </button>
    </div>
  );
};

export default ChartTab;
