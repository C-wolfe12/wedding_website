export const SECTION_TOP_OFFSET = 96;

export const scrollToSection = (href: string): void => {
  if (typeof window === 'undefined') {
    return;
  }

  const section = document.querySelector<HTMLElement>(href);

  if (!section) {
    return;
  }

  const nextTop = Math.max(section.offsetTop - SECTION_TOP_OFFSET, 0);

  window.history.replaceState(null, '', href);
  window.scrollTo({
    top: nextTop,
    behavior: 'smooth',
  });
};