import { Input, Textarea, Button } from "@nextui-org/react";

export default function Contact() {
  return (
    <div className="w-11/12">
      
    <div className="p-8 lg:p-16 mx-auto max-w-screen-md rounded-lg shadow-2xl">
      <p className="mb-4 text-center text-5xl font-bold tracking-widest capitalize text-light-main dark:text-dark-main">
        Contact me
      </p>
      <p className="mb-8 lg:mb-16 text-center text-sm font-medium -tracking-wider capitalize">
        Got a technical issue? Want to send feedback about a beta feature? Need
        details about our Business plan? Let us know.
      </p>
      <form className="space-y-8">
        <div>
          <Input
            size="sm"
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
            size="sm"
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
            size="sm"
            variant="underlined"
            label="Message"
            labelPlacement="inside"
            placeholder="Leave a comment..."
            isRequired
            required
          />
        </div>
        <Button size="sm" color="primary" variant="flat" type="submit">
          Send Us
        </Button>
      </form>
    </div>

    
    </div>
  );
}
