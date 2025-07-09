"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function useFetchUser() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  const email = useSelector((state) => state.user.email);
  const name = useSelector((state) => state.user.name);
  const lastName = useSelector((state) => state.user.lastName);
  const phone = useSelector((state) => state.user.phone);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const user = await response.json();
          dispatch({ type: "user/setUserId", payload: user.id });
          dispatch({ type: "user/setUserEmail", payload: user.email });
          dispatch({ type: "user/setUserName", payload: user.name });
          dispatch({ type: "user/setUserLastName", payload: user.lastName });
          dispatch({ type: "user/setUserPhone", payload: user.phone });
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    }

    fetchUser();
  }, [dispatch]);

  return { id, email, name, lastName, phone };
}
