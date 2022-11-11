import useToggler from "./useToggler";
import { useState } from "react";

import CustomModal from "../components/CustomModal";
import { Spinner, Alert } from "flowbite-react";

export default function useLoadingPopup() {
  const [isLoading, toggleLoadingPopup, setIsLoading] = useToggler(false);

  const closeLoadingPopup = () => setIsLoading(false);
  const openLoadingPopup = () => setIsLoading(true);

  const RenderLoadingPopup = () => (
    <CustomModal size={"md"} show={isLoading} onClose={closeLoadingPopup}>
      <div className="flex flex-col gap-3 justify-center items-center py-4">
        <Spinner color="purple" size="xl" aria-label="creating new novel..." />
        <h3 className="text-lg dark:text-white">Creating Novel...</h3>
        <div className="w-full mt-4 shadow">
          <Alert color="warning" rounded={true}>
            <span>
              <span className="font-bold">
                <i className="fa-solid fa-triangle-exclamation" />
              </span>{" "}
              This operation may take some time.
            </span>
          </Alert>
        </div>
      </div>
    </CustomModal>
  );

  return {
    RenderLoadingPopup,
    toggleLoadingPopup,
    openLoadingPopup,
    closeLoadingPopup,
  };
}
