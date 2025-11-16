"use client";
import { Provider } from "react-redux";
import balajiInteriorStore from "./store/store";

export default function StoreProvider({ children }) {
  return <Provider store={balajiInteriorStore}>{children}</Provider>;
}
