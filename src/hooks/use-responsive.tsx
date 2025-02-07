import { useMediaQuery } from "usehooks-ts"; // ou o caminho correto para o seu hook useMediaQuery

const breakpoints = {
  phone: "640px", // Tailwind's small breakpoint (phone)
  tablet: "768px", // Tailwind's medium breakpoint (tablet)
  desktop: "1024px", // Tailwind's large breakpoint (desktop)
  largeDesktop: "1280px", // Tailwind's extra-large breakpoint (large desktop)
};

export const useResponsive = () => {
  const isPhone = useMediaQuery(`(max-width: ${breakpoints.phone})`);
  const isTablet = useMediaQuery(`(max-width: ${breakpoints.tablet})`);
  const isDesktop = useMediaQuery(`(max-width: ${breakpoints.desktop})`);
  const isLargeDesktop = useMediaQuery(
    `(max-width: ${breakpoints.largeDesktop})`
  );

  return { isPhone, isTablet, isDesktop, isLargeDesktop };
};
