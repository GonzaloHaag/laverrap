import { supabaseClient } from "@/supabase/supabase-client";
import { type Session } from "@supabase/supabase-js";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
type AuthContextType = {
  session: Session | null;
};
const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session);
      setLoading(false);
    };
    getSession();
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        session,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
