/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search, User, Menu, LogOut } from "lucide-react";
import axios from "axios";
import SearchResult from "./SearchResult";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import logo from "@/images/logo.jpg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isTvShowsDropdownOpen, setIsTvShowsDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const pathName = usePathname();
  const noNav = ["/signin", "/signup"];
  const router = useRouter();

  const searchResultRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside the search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultRef.current &&
        !searchResultRef.current.contains(event.target as Node)
      ) {
        setShowSearchResult(false); // Hide search results
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeSearchResults = () => {
    setShowSearchResult(false);
  };
  // Handle search functionality
  const handleSearchResult = useCallback(
    async (input: string) => {
      try {
        setSearchInput(input);
        const response = await axios.get(`/api/movies/search/${searchInput}`);

        if (response.data.success) {
          setSearchResult(response.data.data.results);
          setShowSearchResult(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          //console.log(error);
        }
      }
    },
    [searchInput]
  );

  const handleLogout = useCallback(async () => {
    try {
      const response = await axios.post("/api/user/logout");
      console.log(response.data.success);
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/signin");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }, [router]);
  // Dropdown and mobile menu styles
  const dropdownClasses =
    "z-40 absolute left-0 font-normal bg-black divide-y divide-gray-700 rounded-lg shadow w-44 border border-white/20";
  const dropdownItemClasses =
    "block px-4 py-2 text-white hover:text-[#6a11cb] transition-colors duration-200";

  return noNav.includes(pathName) ? null : (
    <nav className="bg-black">
      {/* Container */}
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/home" className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-white hover: transition-colors duration-200">
            <img
              className="rounded-2xl shadow-lg hover:shadow-[#6a11cb] transition-all duration-200"
              width={50}
              height={50}
              src={logo.src}
              alt=""
            />
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-grow justify-center">
          <ul className="flex flex-row font-medium space-x-8">
            {/* Home */}
            <li>
              <a
                href="/home"
                className=" block py-2 px-3 text-white hover:font-bold hover:text-[#6a11cb] transition-colors duration-200"
              >
                Home
              </a>
            </li>

            {/* Movies Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setIsMoviesDropdownOpen(true)}
              onMouseLeave={() => setIsMoviesDropdownOpen(false)}
            >
              <button className="hover:font-bold  flex items-center w-full py-2 px-3 text-white hover:text-[#6a11cb] transition-colors duration-200">
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
              onMouseEnter={() => setIsTvShowsDropdownOpen(true)}
              onMouseLeave={() => setIsTvShowsDropdownOpen(false)}
            >
              <button className="flex items-center w-full py-2 px-3 text-white hover:text-[#6a11cb] transition-colors duration-200">
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
                onChange={(e) => {
                  handleSearchResult(e.target.value);
                }}
                className="bg-black text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-[#6a11cb] placeholder-gray-400"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="search-result">
              {showSearchResult &&
              searchResult.length > 0 &&
              searchInput !== "" ? (
                <div ref={searchResultRef}>
                  <SearchResult
                    result={searchResult}
                    onClose={closeSearchResults}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <button className="text-white hover:text-[#6a11cb] transition-colors duration-200">
            <User className="h-6 w-6" />
          </button>
          <button
            className="text-white hover:text-[#6a11cb] transition-colors duration-200"
            onClick={handleLogout}
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mr-3 md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg hover:bg-[#6a11cb] focus:outline-none focus:ring-2 focus:ring-white"
          >
            <Menu className="h-6 w-6" />
          </button>
          <button
            className="md:hidden text-white hover:text-[#6a11cb] transition-colors duration-200"
            onClick={handleLogout}
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
        <ul className="flex flex-col font-medium p-4 bg-black">
          <li>
            <a
              href="/home"
              className="block py-2 px-3 text-white hover:text-[#6a11cb] transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <button
              onClick={() => setIsMoviesDropdownOpen(!isMoviesDropdownOpen)}
              className="flex items-center w-full py-2 px-3 text-white hover:text-[#6a11cb] transition-colors duration-200"
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
              <ul className="py-2 pl-4">
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
              <ul className="py-2 pl-4">
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
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
