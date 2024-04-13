"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { defaultStore } from "@/lib/store";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = defaultStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
