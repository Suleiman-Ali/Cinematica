import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavbarLinkPropTypes {
  cls: string;
  text: string;
  link: string;
}

export default function NavbarLink({ cls, text, link }: NavbarLinkPropTypes) {
  const { pathname } = useRouter();
  const className = `${cls} ${pathname === link ? 'bold' : ''}`;
  return (
    <li>
      <Link href={link} className={className} prefetch={false}>
        {text}
      </Link>
    </li>
  );
}
