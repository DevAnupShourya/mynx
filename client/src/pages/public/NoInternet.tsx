import { MdOutlineSignalWifiConnectedNoInternet4 } from "react-icons/md";

function NoInternet() {
  return (
    <section className="w-screen h-screen bg-main-text-default bg-red-200">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3  font-medium rounded-full bg-red-500 text-white text-5xl">
            <MdOutlineSignalWifiConnectedNoInternet4 />
          </p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl capitalize">
            No Internet
          </h1>
          <p className="mt-4">Check your internet connection.</p>
        </div>
      </div>
    </section>
  );
}

export default NoInternet;
