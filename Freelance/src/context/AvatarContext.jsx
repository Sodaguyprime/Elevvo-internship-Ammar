import { createContext, useContext, useState } from "react";

const AvatarContext = createContext();

export function AvatarProvider({ children }) {
  const [avatarUrl, setAvatarUrl] = useState("/Avatar.png");

  const updateAvatar = (file) => {
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  return (
    <AvatarContext.Provider value={{ avatarUrl, updateAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
}

export function useAvatar() {
  return useContext(AvatarContext);
}