import Link from 'next/link';

interface NavbarLinksPropTypes {
  ulCls: string;
  linkCls: string;
}

export default function NavbarLinks({ ulCls, linkCls }: NavbarLinksPropTypes) {
  return (
    <ul className={ulCls}>
      <li>
        <Link href="/" className={linkCls}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/movies/popular" className={linkCls}>
          Popular Movies
        </Link>
      </li>
      <li>
        <Link href="/movies/top-rated" className={linkCls}>
          Top Movies
        </Link>
      </li>
      <li>
        <Link href="/tv/popular" className={linkCls}>
          Popular TV
        </Link>
      </li>
      <li>
        <Link href="/tv/top-rated" className={linkCls}>
          Top TV
        </Link>
      </li>
    </ul>
  );
}
