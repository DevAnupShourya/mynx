import { AboutPageCardsData } from "~/utils/raw_data/PagesData";

export default function About() {
  return (
    <div className="w-11/12">
      <div className="mx-auto max-w-3xl lg:text-center">
        <h1 className="mt-2 text-5xl font-bold tracking-widest capitalize text-light-main dark:text-dark-main">
          About Me
        </h1>
        <p className="mt-6 text-sm font-medium -tracking-wider capitalize">
          Unleash the potential of seamless task management and collaboration
          with Echo. Our innovative platform is designed to elevate your
          productivity, foster teamwork, and bring your projects to life. Say
          goodbye to complexity and embrace simplicity in every click.
        </p>
      </div>
      <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {AboutPageCardsData.map((feature) => (
            <div
              key={feature.name}
              className="relative px-20 py-4 rounded-lg shadow-2xl"
            >
              <dt className="text-base font-semibold leading-7">
                <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon
                    className="h-6 w-6 text-dark-main"
                    aria-hidden="true"
                  />
                </div>
                <h1 className="text-xl font-semibold tracking-wider capitalize">
                  {feature.name}
                </h1>
              </dt>
              <dd className="mt-2 text-sm font-medium -tracking-wider capitalize">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
