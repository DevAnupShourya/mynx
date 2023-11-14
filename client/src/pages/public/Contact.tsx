import { Input, Textarea, Button } from "@nextui-org/react";

export default function Contact() {
  return (
    <div className="p-8 lg:p-16 mx-auto max-w-screen-md rounded-lg shadow-2xl bg-light-all dark:bg-dark-all">
      <p className="mb-4 text-center text-light-main dark:text-dark-main title-1">
        Contact Us
      </p>
      <p className="mb-8 lg:mb-16 font-light text-center title-3">
        Got a technical issue? Want to send feedback about a beta feature? Need
        details about our Business plan? Let us know.
      </p>
      <form className="space-y-8">
        <div>
          <Input
            size="lg"
            type="email"
            variant="underlined"
            label="Email"
            placeholder="Enter your email"
            isRequired
            required
          />
        </div>
        <div>
          <Input
            size="lg"
            type="text"
            variant="underlined"
            label="Subject"
            placeholder="Let us know how we can help you"
            isRequired
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            size="lg"
            variant="underlined"
            label="Message"
            labelPlacement="inside"
            placeholder="Leave a comment..."
            isRequired
            required
          />
        </div>
        <Button size="lg" color="primary" variant="flat" type="submit">
          Send Us
        </Button>
      </form>
    </div>
  );
}
