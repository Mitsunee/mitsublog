import styles from "./IconSvg.module.css";

export default function IconSvg({
  children,
  href,
  className,
  viewBox,
  onClick
}) {
  if (href) {
    const hrefExternal = href?.startsWith?.("http");
    return hrefExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className ? `${styles.icon} ${className}` : styles.icon}>
        <svg xmlns="https://www.w3.org/2000/svg" viewBox={viewBox}>
          {children}
        </svg>
      </a>
    ) : (
      <a
        href={href}
        className={className ? `${styles.icon} ${className}` : styles.icon}>
        <svg xmlns="https://www.w3.org/2000/svg" viewBox={viewBox}>
          {children}
        </svg>
      </a>
    );
  }

  if (onClick) {
    const baseStyles = `${styles.icon} ${styles.cleanButton}`;
    return (
      <button
        onClick={onClick}
        className={className ? `${baseStyles} ${className}` : baseStyles}>
        <svg xmlns="https://www.w3.org/2000/svg" viewBox={viewBox}>
          {children}
        </svg>
      </button>
    );
  }

  return (
    <div className={className ? `${styles.icon} ${className}` : styles.icon}>
      <svg xmlns="https://www.w3.org/2000/svg" viewBox={viewBox}>
        {children}
      </svg>
    </div>
  );
}
