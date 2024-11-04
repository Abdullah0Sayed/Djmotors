// Import React Package
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// End

// Import Assets / Images

// End

// Import Componets 

// End

// Import Css Files

// End

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


export default ScrollToTop;