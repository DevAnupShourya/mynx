import BlogCard from "~/components/cards/BlogCard";

function Blogs() {
  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <p className="mb-4 text-5xl font-bold tracking-widest capitalize text-light-main dark:text-dark-main">
          Our Blog
        </p>
        <p className="text-sm font-medium -tracking-wider capitalize">
          We use an agile approach to test assumptions and connect with the
          needs of your audience early and often.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2 text-center">
        <BlogCard
          blogType="Tutorial"
          heading={"How to quickly deploy a static website"}
          description={
            "Static websites are now used to lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers."
          }
          authorName={"Jese Leos"}
        />
        <BlogCard
          blogType="Article"
          heading={"Our first project with React"}
          description={
            "Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers."
          }
          authorName={"Bonnie Green"}
        />
      </div>
    </div>
  );
}

export default Blogs;
