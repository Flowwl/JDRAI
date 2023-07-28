import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";

export const getSelectedCharacter = () => {
  const selectedChar = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_CHARACTER);
  if (!selectedChar) {
    return;
  }
  return JSON.parse(selectedChar) || {};
};
