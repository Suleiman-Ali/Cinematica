import NavbarLink from './navbar-link';

interface NavbarLinksPropTypes {
  ulCls: string;
  linkCls: string;
}

// prettier-ignore
export default function NavbarLinks({ ulCls, linkCls }: NavbarLinksPropTypes) {
  return (
    <ul className={ulCls}>
      <NavbarLink cls={linkCls} link="/" text="Home"/>
      <NavbarLink cls={linkCls} link="/pictures/movies/popular" text="Popular Movies"/>
      <NavbarLink cls={linkCls} link="/pictures/movies/top-rated" text="Top Movies"/>
      <NavbarLink cls={linkCls} link="/pictures/tv/popular" text="Popular TV"/>
      <NavbarLink cls={linkCls} link="/pictures/tv/top-rated" text="Top TV"/>
    </ul>
  );
}
