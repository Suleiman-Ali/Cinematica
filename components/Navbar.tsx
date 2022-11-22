import Link from 'next/link';
import Image from 'next/image';
import NavbarLinks from './NavbarLinks';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const router = useRouter();
  const [screen, setScreen] = useState<number | undefined>(undefined);
  const [model, setModel] = useState<boolean>(false);
  const modelSwitch = () => setModel((model) => !model);
  const resizeHandler = () => {
    setModel(false);
    setScreen(window.innerWidth);
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener('resize', resizeHandler);
    router.events.on('routeChangeStart', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
      router.events.off('routeChangeStart', resizeHandler);
    };
  }, []);

  if (!screen) return <></>;

  return (
    <div className={styles.parent}>
      <nav className={styles.nav}>
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={250}
            height={25}
            className={styles.nav__logo}
          />
        </Link>

        {screen >= 1000 && (
          <NavbarLinks
            ulCls={styles.nav__linksBig}
            linkCls={styles.nav__linkBig}
          />
        )}

        {screen < 1000 && (
          <button className={styles.nav__button} onClick={modelSwitch}>
            {!model && <FaCaretUp />}
            {model && <FaCaretDown />}
          </button>
        )}

        {screen < 1000 && model && (
          <NavbarLinks
            ulCls={styles.nav__linksSmall}
            linkCls={styles.nav__linkSmall}
          />
        )}
      </nav>
    </div>
  );
}
