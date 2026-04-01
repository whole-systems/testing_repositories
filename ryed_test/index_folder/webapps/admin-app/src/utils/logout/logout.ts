export const logout = async () => {
  localStorage.clear();
  window.location.reload();
};
