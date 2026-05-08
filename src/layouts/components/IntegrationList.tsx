
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import type { IntegrationType } from "@/types/index";
import ImageFallback from "@/helpers/ImageFallback";
import { buildUrl } from "@/lib/utils/url";

const IntegrationList = ({
  items,
}: {
  items: IntegrationType[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // Get unique categories for the dropdown
  const categories = [
    "All Categories",
    ...Array.from(
      new Set(items.map((item) => item.frontmatter.category)),
    ),
  ];

  const filteredList = items.filter((integration) => {
    const matchesSearch = integration.frontmatter.page_header.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      integration.frontmatter.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const prioritizedList = [...filteredList].sort((a, b) => {
    if (a.slug === "specorator") return -1;
    if (b.slug === "specorator") return 1;
    return a.frontmatter.page_header.title.localeCompare(
      b.frontmatter.page_header.title,
    );
  });

  return (
    <section>
      <div className="main-container"><div className="container">
        <div className="container-padding-y container-padding-x">
          {/* Search Box and Filter */}
          <div className="flex justify-between items-center mb-12 flex-col sm:flex-row gap-y-5">
            <div className="relative flex items-center bg-light/5 rounded-xl w-2/3 sm:w-1/3">
              <span className="absolute left-4 text-gray">
                <FiSearch size={22} className="stroke-[1.5px]" />
              </span>
              <input
                type="text"
                placeholder={`Search ${items.length} integrations...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-4 pl-14 pr-6 text-lg text-text placeholder:text-gray focus:outline-none border-none ring-0"
              />
            </div>

            <div className="flex items-center justify-between  bg-light/5 rounded-xl sm:w-1/3 w-2/3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent py-4 pl-4 pr-10 text-lg text-text focus:outline-none border-none ring-0  w-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: `right 0.5rem center`,
                  backgroundRepeat: `no-repeat`,
                  backgroundSize: `1.5em 1.5em`,
                }}
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="text-gray">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {prioritizedList.map((integration, index) => (
              <a
                href={buildUrl("integrations/" + integration.slug)}
                key={index}
                className="bg-linear-white-gradient p-px rounded-3xl h-full block"
              >
                <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl bg-primary-dark py-10 px-6 text-left border border-border/6 h-full min-h-[340px]">
                  {/* Gradient overlay for smooth transition */}
                  <div className="absolute inset-0 rounded-3xl bg-radial-purple-dark opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 w-full h-full" />

                  {/* Content wrapper to stay above gradient overlay */}
                  <div className="relative z-10 flex flex-1 flex-col">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center">
                      <ImageFallback
                        src={integration.frontmatter.icon}
                        alt={integration.frontmatter.title}
                        width={40}
                        height={40}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-text">
                      {integration.frontmatter.page_header.title}
                    </h3>

                    <p className="text-gray mb-5 line-clamp-4">
                      {integration.frontmatter.page_header.subtitle}
                    </p>

                    <div className="mt-auto grid grid-cols-1 gap-2 text-sm">
                      <div className="rounded-xl border border-border/10 bg-light/5 px-3 py-2">
                        <p className="text-gray">Problem solved</p>
                        <p className="text-text font-medium">
                          {integration.frontmatter.problemSolved ?? "Defined in project docs"}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-xl border border-border/10 bg-light/5 px-3 py-2">
                          <p className="text-gray">Health</p>
                          <p className="text-text font-medium">
                            {integration.frontmatter.health ?? "Monitoring"}
                          </p>
                        </div>
                        <div className="rounded-xl border border-border/10 bg-light/5 px-3 py-2">
                          <p className="text-gray">Progress</p>
                          <p className="text-text font-medium">
                            {integration.frontmatter.progress ?? "Roadmap in progress"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filteredList.length === 0 && (
            <div className="py-20 text-center text-lg text-gray">
              No integrations found matching &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      </div></div>
    </section>
  );
};

export default IntegrationList;
