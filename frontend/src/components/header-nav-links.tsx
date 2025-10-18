import { buttonVariants, NAV_LINKS } from "@/lib/consts"
import { Link, useLocation } from "react-router"

export const HeaderNavLinks = () => {
    const { pathname } = useLocation();
  return (
    <nav className="hidden md:block">
        <ul className="flex items-center gap-x-2">
            {
                NAV_LINKS.map((link) => (
                    <li key={link.id}>
                        <Link to={link.path} title={link.title} className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full ${pathname === link.path ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}`}>
                            <link.icon className="size-5" />
                            {link.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}
