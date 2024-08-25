import { RiseLoader } from "react-spinners";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <RiseLoader color="#36d7b7" loading={true} size={40} />{" "}
      {/* Adjust size here */}
    </div>
  );
}

export default Loader;
