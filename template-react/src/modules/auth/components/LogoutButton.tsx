import * as React from "react";
import { FC } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IconHeaderButton } from "@/components/atoms/actions";
import { ConfirmDialog } from "@/components/atoms/dialogs";
import { ROUTES } from "@/components/routes/constants/routes";
import { useToggle } from "@/hooks/useToggle";
import { useLogout } from "@/modules/auth/services/useLogout";
import { userQueryKeys } from "@/modules/users/services/_userQueryKeys";

interface LogoutToolbarButtonProps {
  className?: string;
}

const LogoutButton: FC<LogoutToolbarButtonProps> = ({ className }) => {
  const { state: isLogoutModalOpen, setTrue: openLogoutModal, setFalse: closeLogoutModal } = useToggle();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: disconnect } = useLogout({
    onSuccess: () => {
      toast.success("Successfully logged out");
    },
    onSettled: async () => {
      await queryClient.resetQueries(userQueryKeys.getMe);
      navigate(ROUTES.LOGIN.path);
    }
  });

  return (
    <>
      <IconHeaderButton label="Logout" icon="LOGOUT" onClick={() => openLogoutModal()} className={className} />
      <ConfirmDialog
        onConfirm={disconnect}
        closeModal={closeLogoutModal}
        isModalOpen={isLogoutModalOpen}
        title="Logout"
        dangerAction
      >
        Are you sure you want to logout ?
      </ConfirmDialog>
    </>
  );
};

export default LogoutButton;
