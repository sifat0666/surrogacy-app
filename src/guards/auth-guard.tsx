'use client'
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "@/store";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard(props: AuthGuardProps): JSX.Element | null {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const check = () => {
      if (!isAuthenticated) {
        const searchParams = new URLSearchParams({
          returnTo: window.location.href = '/login',
        }).toString();
        router.replace(searchParams);
      } else {
        setChecked(true);
      }
    };

    check();
  }, [isAuthenticated, router]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
