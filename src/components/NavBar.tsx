import React, { useCallback, useState } from "react";
import { Search, User } from "lucide-react";
import axios from "axios";
import SearchResult from "./SearchResult";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isTvShowsDropdownOpen, setIsTvShowsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchResult = useCallback(
    async (input: string) => {
      try {
        setSearchInput(input);
        const response = await axios.get(`/api/movies/search/${searchInput}`);

        if (response.data.success) {
          setSearchResult(response.data.data.results);
        }
      } catch (error) {
        if (error instanceof Error) {
          //console.log(error);
        }
      }
    },
    [searchInput]
  );

  const dropdownClasses =
    "z-40 absolute left-0 font-normal bg-black divide-y divide-gray-700 rounded-lg shadow w-44 border border-white/20";
  const dropdownItemClasses =
    "block px-4 py-2 text-white hover:text-[#2d4263] hover:bg-white transition-colors duration-200";

  return (
    <nav className="bg-black border-b border-white/20">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-white hover:text-[#2d4263] transition-colors duration-200">
            BRAND
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-grow justify-center">
          <ul className="flex flex-row font-medium space-x-8">
            {/* Home */}
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-[#2d4263] transition-colors duration-200"
              >
                Home
              </a>
            </li>

            {/* Movies Dropdown */}
            <li
              className="relative"
              onMouseEnter={() =>
                setIsMoviesDropdownOpen(!isMoviesDropdownOpen)
              }
              onMouseLeave={() =>
                setIsMoviesDropdownOpen(!isMoviesDropdownOpen)
              }
            >
              <button className="flex items-center w-full py-2 px-3 text-white hover:text-[#2d4263] transition-colors duration-200">
                Movies
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isMoviesDropdownOpen && (
                <div className={dropdownClasses}>
                  <ul className="py-2">
                    <li>
                      <a href="#" className={dropdownItemClasses}>
                        Popular
                      </a>
                    </li>
                    <li>
                      <a href="#" className={dropdownItemClasses}>
                        Now Playing
                      </a>
                    </li>
                    <li>
                      <a href="#" className={dropdownItemClasses}>
                        Upcoming
                      </a>
                    </li>
                    <li>
                      <a href="#" className={dropdownItemClasses}>
                        Top Rated
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* TV Shows Dropdown */}
            <li
              className="relative"
              onMouseEnter={() =>
                setIsTvShowsDropdownOpen(!isTvShowsDropdownOpen)
              }
              onMouseLeave={() =>
                setIsTvShowsDropdownOpen(!isTvShowsDropdownOpen)
              }
            >
              <button className="flex items-center w-full py-2 px-3 text-white hover:text-[#2d4263] transition-colors duration-200">
                TV Shows
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isTvShowsDropdownOpen && (
                <div className={dropdownClasses}>
                  <ul className="py-2">
                    <li>
                      <a href="#" className={dropdownItemClasses}>
                        Popular
                      </a>
                    </li>
                    <li>
                      <a href="#" className={dropdownItemClasses}>
                        Airing Today
                      </a>
                    </li>
                    <li>
                      <a href="#" className={dropdownItemClasses}>
                        On TV
                      </a>
                    </li>
                    <li>
                      <a href="#" className={dropdownItemClasses}>
                        Top Rated
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        {/* Desktop Search and Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleSearchResult(e.target.value)}
                className="bg-black text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-[#2d4263] placeholder-gray-400"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="search-result">
              {searchResult.length > 0 && searchInput !== "" ? (
                <SearchResult result={searchResult} />
              ) : (
                ""
              )}
            </div>
          </div>

          <button className="text-white hover:text-[#2d4263] transition-colors duration-200">
            <User className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu Button - Moved to right */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg hover:bg-[#2d4263] focus:outline-none focus:ring-2 focus:ring-white"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 right-0 bg-black md:hidden z-40`}
        >
          <ul className="flex flex-col font-medium p-4">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white hover:text-[#2d4263] transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <button
                onClick={() => setIsMoviesDropdownOpen(!isMoviesDropdownOpen)}
                className="flex items-center w-full py-2 px-3 text-white hover:text-[#2d4263] transition-colors duration-200"
              >
                Movies
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isMoviesDropdownOpen && (
                <ul className="pl-6">
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-white hover:text-[#2d4263]"
                    >
                      Popular
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-white hover:text-[#2d4263]"
                    >
                      Now Playing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-white hover:text-[#2d4263]"
                    >
                      Upcoming
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-white hover:text-[#2d4263]"
                    >
                      Top Rated
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => setIsTvShowsDropdownOpen(!isTvShowsDropdownOpen)}
                className="flex items-center w-full py-2 px-3 text-white hover:text-[#2d4263] transition-colors duration-200"
              >
                TV Shows
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isTvShowsDropdownOpen && (
                <ul className="pl-6">
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-white hover:text-[#2d4263]"
                    >
                      Popular
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-white hover:text-[#2d4263]"
                    >
                      Airing Today
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-white hover:text-[#2d4263]"
                    >
                      On TV
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 text-white hover:text-[#2d4263]"
                    >
                      Top Rated
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <div className="py-2 px-3">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => handleSearchResult(e.target.value)}
                  className="w-full bg-black text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-[#2d4263] placeholder-gray-400"
                />
              </div>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center py-2 px-3 text-white hover:text-[#2d4263] transition-colors duration-200"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
