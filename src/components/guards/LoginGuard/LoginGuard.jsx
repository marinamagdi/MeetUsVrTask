"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const LoginGuard = ({ children }) => {
  const router = useRouter();
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    
    if (id) {
      router.replace("/dashboard"); 
    }
  }, [id, router]);

    console.log(id);
  if (id) return null;

  return children;
};

export default LoginGuard;
