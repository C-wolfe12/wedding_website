"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  id: string;
  label: string;
};

type SectionNavProps = {
  items: NavItem[];
  className?: string;
  brandClassName?: string;
  brandLinkClassName?: string;
  navLinksClassName?: string;
  linkClassName?: string;
  activeLinkClassName?: string;
};

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export default function SectionNav({
  items,
  className,
  brandClassName,
  brandLinkClassName,
  navLinksClassName,
  linkClassName,
  activeLinkClassName,
}: SectionNavProps) {
  const [activeSection, setActiveSection] = useState("home");
  const visibleSectionsRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const sectionIds = ["home", ...items.map((item) => item.id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const getClosestSection = () => {
      const closestSection = sections.reduce<{
        id: string;
        distance: number;
      } | null>((closest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - 140);

        if (!closest || distance < closest.distance) {
          return {
            id: section.id,
            distance,
          };
        }

        return closest;
      }, null);

      return closestSection?.id ?? "home";
    };

    const syncActiveSection = () => {
      const visibleSections = [...visibleSectionsRef.current.entries()]
        .filter(([, intersectionRatio]) => intersectionRatio > 0)
        .sort((left, right) => right[1] - left[1]);

      if (visibleSections.length > 0) {
        setActiveSection(visibleSections[0][0]);
        return;
      }

      const currentHash = window.location.hash.slice(1);

      if (currentHash && sectionIds.includes(currentHash)) {
        setActiveSection(currentHash);
        return;
      }

      setActiveSection(getClosestSection());
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleSectionsRef.current.set(
            (entry.target as HTMLElement).id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }

        syncActiveSection();
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    const handleHashChange = () => {
      syncActiveSection();
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [items]);

  return (
    <nav className={className} aria-label="Primary">
      <span className={brandClassName}>
        <a
          className={joinClassNames(
            brandLinkClassName,
            activeSection === "home" && activeLinkClassName,
          )}
          href="#home"
          aria-current={activeSection === "home" ? "page" : undefined}
          onClick={() => setActiveSection("home")}
        >
          Hugeoleen & Carl
        </a>
      </span>

      <div className={navLinksClassName}>
        {items.map((item) => (
          <a
            key={item.id}
            className={joinClassNames(
              linkClassName,
              activeSection === item.id && activeLinkClassName,
            )}
            href={`#${item.id}`}
            aria-current={activeSection === item.id ? "page" : undefined}
            onClick={() => setActiveSection(item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}