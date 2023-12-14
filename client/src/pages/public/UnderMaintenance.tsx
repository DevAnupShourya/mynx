import { TbPlugConnected } from "react-icons/tb";

function UnderMaintenance() {
  return (
    <section className="w-screen h-screen bg-zinc-900 text-zinc-100">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3  font-medium rounded-full bg-yellow-500 text-white text-5xl">
            <TbPlugConnected />
          </p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl capitalize">
            Under Maintenance
          </h1>
          <p className="mt-4">
            We're currently performing maintenance.
            <br />
            Please check back later..
          </p>
        </div>
      </div>
    </section>
  );
}

export default UnderMaintenance;
