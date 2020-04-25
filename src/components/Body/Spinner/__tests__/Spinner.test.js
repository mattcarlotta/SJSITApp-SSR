import { Spinner } from "../index";

const initProps = {
	className: "example-class",
	children: <p>Hi</p>,
};

describe("Spinner", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Spinner {...initProps} />);
	});

	it("renders nothing if not mounted in the browser", () => {
		wrapper.setState({ isMounted: false });

		expect(wrapper.find("div.container").exists()).toBeFalsy();
		expect(wrapper.find("img").exists()).toBeFalsy();
	});

	it("renders a dynamic spinner", () => {
		expect(wrapper.find("div.container").exists()).toBeTruthy();
	});

	it("renders a static image for IE11", () => {
		wrapper.setState({ isIE: true });

		expect(wrapper.find("img").exists()).toBeTruthy();
	});

	it("renders a static image for Edge", () => {
		wrapper.setState({ isEdge: true });

		expect(wrapper.find("img").exists()).toBeTruthy();
	});
});
