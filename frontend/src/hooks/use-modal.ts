import { useLocation, useNavigate, useSearchParams } from "react-router";

export const useModal = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  function setModal(state: boolean) {
    const params = new URLSearchParams(searchParams);

    if (state) {
      params.set("modal", "true");
    } else {
      params.delete("modal");
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }
  function toggleModal() {
    setModal(!isOpen);
  }
  const isOpen = searchParams.get("modal") === "true";

  return {
    isOpen,
    toggleModal
  };
};
