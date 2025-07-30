import { ErrorOutline } from "@mui/icons-material";

const ErrorMessage = ({ children }) => {
  return (
    <div className="flex p-2 rounded-md text-center bg-red-600 items-center h-fit flex-row my-4 mx-10">
      <ErrorOutline className="text-white ml-2 text-3xl"></ErrorOutline>
      <p className="font-funnel text-white font-bold">{children}</p>
    </div>
  );
};
export default ErrorMessage;
