import { buttonVariants, NAV_LINKS } from "@/lib/consts"
import { Link } from "react-router"

export const HeaderNavLinks = () => {
  return (
    <nav>
        <ul className="flex items-center gap-x-2">
            {
                NAV_LINKS.map((link) => (
                    <li key={link.id}>
                        <Link to={link.path} title={link.title} className={`${buttonVariants({ variant: "outline", size: "lg" })} w-full`}>
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
