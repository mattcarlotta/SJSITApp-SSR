import moment from "moment-timezone";
import DisplayTime from "../index";

const initProps = {
	times: [
		moment("2019-08-09T17:45:26-07:00").format(),
		moment("2019-08-09T18:15:26-07:00").format(),
	],
};

const wrapper = mount(<DisplayTime {...initProps} />);

describe("Display Time", () => {
	it("renders a full date with format", () => {
		expect(
			wrapper
				.find("div")
				.first()
				.text(),
		).toEqual("5:45 pm");
		expect(
			wrapper
				.find("div")
				.at(1)
				.text(),
		).toEqual("6:15 pm");
	});

	it("renders an invalid date if missing a 'date' prop", () => {
		wrapper.setProps({ times: [] });
		expect(wrapper.find("span").text()).toEqual("-");
	});
});
