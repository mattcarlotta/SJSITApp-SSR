import { ServerMessages } from "../index";

const hideServerMessage = jest.fn();
const resetServerMessage = jest.fn();

const initProps = {
	hideServerMessage,
	message: "",
	resetServerMessage,
	show: false,
	type: "",
};

describe("Server Messages", () => {
	let wrapper;
	let findMsgCtnr;
	beforeEach(() => {
		wrapper = mount(<ServerMessages {...initProps} />);
		findMsgCtnr = () => wrapper.find("MessageContainer");
	});

	afterEach(() => {
		hideServerMessage.mockClear();
		resetServerMessage.mockClear();
	});

	it("initially renders nothing", () => {
		const SrvrMsgComponent = wrapper.find("ServerMessages");
		expect(SrvrMsgComponent.exists()).toBeTruthy();
		expect(SrvrMsgComponent.prop("messages")).toBeFalsy();
	});

	it("renders without errors when a message has been set", () => {
		wrapper.setProps({
			message: "Testing.",
			show: true,
			type: "info",
		});
		expect(wrapper.find("WindowContainer").exists()).toBeTruthy();
		expect(wrapper.find("TextContainer").text()).toEqual("Testing.");
	});

	it("renders a red 'error' message", () => {
		wrapper.setProps({
			message: "You do not have permission to do that.",
			show: true,
			type: "",
		});

		expect(findMsgCtnr()).toHaveStyleRule("background-color", "#D32F2F");
	});

	it("renders a green 'success' message", () => {
		wrapper.setProps({
			message: "Added a new game!",
			show: true,
			type: "success",
		});

		expect(findMsgCtnr()).toHaveStyleRule("background-color", "#43A047");
	});

	it("renders a yellow 'warning' message", () => {
		wrapper.setProps({
			message: "Unable to locate 		wrapper.instance().forceUpdate();that game.",
			show: true,
			type: "warning",
		});

		expect(findMsgCtnr()).toHaveStyleRule("background-color", "#FFA000");
	});

	it("renders a blue 'info' message", () => {
		wrapper.setProps({
			message: "A new event has been added to the schedule.",
			show: true,
			type: "info",
		});

		expect(findMsgCtnr()).toHaveStyleRule("background-color", "#2979ff");
	});

	it("if missing a 'type' prop, renders a 'FaTimesCircle' icon", () => {
		wrapper.setProps({
			message: "A new event has been added to the schedule.",
			show: true,
			type: "",
		});
		wrapper.instance().forceUpdate();

		expect(wrapper.find("FaTimesCircle").exists()).toBeTruthy();
	});

	it("closes the alert when twrapperhe 'X' button has been clicked", () => {
		wrapper.setProps({
			message: "This message is manually closable.",
			show: true,
			type: "info",
		});

		wrapper.find("button").simulate("click");

		expect(hideServerMessage).toHaveBeenCalledTimes(1);
	});

	it("doesn't update if props haven't changed", () => {
		wrapper.setProps({
			message: "This message is manually closable.",
			show: true,
			type: "info",
		});

		wrapper.setProps({
			message: "This message is manually closable.",
			show: true,
			type: "info",
		});

		wrapper.find("button").simulate("click");

		expect(hideServerMessage).toHaveBeenCalledTimes(1);
	});

	it("automatically closes after 10 seconds", done => {
		jest.useFakeTimers();
		wrapper.setProps({
			message: "This message auto closes in 10 seconds.",
			show: true,
			type: "info",
		});
		jest.advanceTimersByTime(10500);

		expect(hideServerMessage).toHaveBeenCalledTimes(1);
		wrapper.setProps({
			show: false,
		});

		jest.advanceTimersByTime(400);
		expect(resetServerMessage).toHaveBeenCalledTimes(1);
		jest.runAllTimers();
		done();
	});

	it("resets the timer and hide the message on unmount", () => {
		wrapper.unmount();

		expect(hideServerMessage).toHaveBeenCalledTimes(1);
	});
});
