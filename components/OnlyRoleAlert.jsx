import { Alert } from "flowbite-react";

const OnlyRoleAlert = ({ className, role, action }) => {
  return (
    <Alert
      className={`mt-3 rounded ${className ?? ""}`}
      color={"warning"}
      withBorderAccent
    >
      <p className="font-semibold">
        <span className="font-bold">
          <i className="fa-solid fa-triangle-exclamation" />
        </span>{" "}
        Only <span className="font-bold capitalize">{role ?? "user"}s</span>{" "}
        have the right to
        <span className="font-bold"> {action ?? "read."}</span>
      </p>
    </Alert>
  );
};

export default OnlyRoleAlert;
