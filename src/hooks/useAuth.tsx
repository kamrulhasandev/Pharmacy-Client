import { AuthContext, AuthInfo } from "@/context/AuthProvider";
import { useContext } from "react";

export default function useAuth(): AuthInfo {
  const authInfo = useContext(AuthContext) as AuthInfo;
  return authInfo;
}
