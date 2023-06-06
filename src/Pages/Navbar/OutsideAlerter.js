import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, setLogoutButton, logoutButton) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setLogoutButton(!true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter(props) {
  console.log(props);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.setLogoutButton, props.logoutButton);

  return <div ref={wrapperRef}>{props.children}</div>;
}
