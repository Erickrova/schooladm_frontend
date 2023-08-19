import Link from "next/link"

type AdminLinkProps = {
  href: string
  text: string
}

const AdminLink = ({ href, text }: AdminLinkProps): JSX.Element => {
  return (
    <Link
      href={href}
      className=" text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize "
    >
      {text}
    </Link>
  )
}

export default AdminLink
