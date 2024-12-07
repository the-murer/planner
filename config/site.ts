export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Team Planner",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  authNavItems: [
    {
      label: "Dashboard",
      href: "/dash",
    },
    {
      label: "Usuários",
      href: "/users",
      isAdmin: true,
    },
    {
      label: "Reuniões",
      href: "/meets",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
  },
};
