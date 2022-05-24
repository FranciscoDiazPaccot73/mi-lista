import React from "react";
import classNames from "classnames";

import styles from '../../styles/Home.module.scss'

type Footer = {
  colorMode: string,
}

const Footer = ({ colorMode }: Footer) => {
  const footerClasses = classNames(styles.footer, colorMode === 'dark' && styles.footer_light)

  return (
    <footer className={footerClasses}>
      <div className={styles.dev}>
        Powered by <a href='https://franciscodiazpaccot.dev' target="_blank" rel="noreferrer noopener">
        Francisco Diaz Paccot</a>
      </div>
    </footer>
  )
}

export default Footer;
