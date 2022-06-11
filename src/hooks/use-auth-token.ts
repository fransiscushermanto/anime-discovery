import { useEffect, useState } from "react";
import Cookie from "js-cookie";

export default function useAuthToken() {
  const [token, setToken] = useState<string | null>(
    Cookie.get("authorization"),
  );

  useEffect(() => {
    console.log(window.location.hash);
  }, []);

  return { token };
}
