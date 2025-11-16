"use client";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export default function DemographicCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const sortedCountries = [...(data?.countryBasedPress || [])].sort((a, b) => {
    const aIsOthers = !a._id || a._id === "Others";
    const bIsOthers = !b._id || b._id === "Others";

    if (aIsOthers && !bIsOthers) return 1;
    if (!aIsOthers && bIsOthers) return -1;

    return b.total - a.total;
  });

  return (
    <div className="rounded-2xl border border-gray-200  bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Number of Interior Design based on country
          </h3>
        </div>

        {/* <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <BsThreeDots className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div> */}
      </div>

      {sortedCountries?.map((country) => {
        const code = countries
          ?.getAlpha2Code(country?._id, "en")
          ?.toLowerCase();

        const percentage = (
          (country?.total / data?.totalPress?.count) *
          100
        ).toFixed(3);

        return (
          <div key={country?._id} className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="items-center w-full rounded-full max-w-8">
                  <img
                    src={
                      code
                        ? `https://flagcdn.com/w40/${code}.png`
                        : "https://flagcdn.com/w40/un.png"
                    }
                    alt={country?._id}
                    style={{ width: "24px", height: "16px" }}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                    {country?._id ? country?._id : "Others"}
                  </p>

                  <span className="text-gray-500 text-theme-xs dark:text-gray-400 whitespace-nowrap">
                    {country?.total} Interior Design
                  </span>
                </div>
              </div>

              <div className="flex w-full max-w-[140px] items-center gap-3">
                <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                  <div
                    className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {percentage}%
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
