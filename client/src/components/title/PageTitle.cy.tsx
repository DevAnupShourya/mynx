import { mount } from "cypress/react18";
import PageTitle from "./PageTitle";

describe("<Logo />", () => {
  it("renders", () => {
    mount(<PageTitle title="Title" />);
  });
});
