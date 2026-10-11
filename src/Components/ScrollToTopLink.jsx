import { Link, useLocation } from 'react-router-dom';

function ScrollToTopLink({ to, children, ...props }) {
  const location = useLocation();

  const handleClick = (event) => {
    if (
      event.button === 0 &&
      !event.ctrlKey &&
      !event.metaKey &&
      !event.shiftKey &&
      !event.altKey &&
      location.pathname === to
    ) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }

    props.onClick?.(event);
  };

  return (
    <Link to={to} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default ScrollToTopLink;
