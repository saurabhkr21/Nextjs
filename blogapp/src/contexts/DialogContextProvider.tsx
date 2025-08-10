//@ts-nocheck
'use client'
import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export function useDialog() {
  return useContext(DialogContext);
}

export default function DialogContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <DialogContext.Provider value={{ open, setOpen, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
}
