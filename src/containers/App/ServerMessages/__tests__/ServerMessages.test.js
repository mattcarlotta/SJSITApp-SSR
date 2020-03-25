import { ServerMessages } from "../index";

const resetServerMessage = jest.fn();

const initProps = {
	message: "",
	resetServerMessage,
};

describe("Server Messages", () => {
	let wrapper;
	let findMsgCtnr;
	beforeEach(() => {
		wrapper = mount(<ServerMessages {...initProps} />);
		findMsgCtnr = () => wrapper.find("MessageContainer");
	});

	afterEach(() => {
		resetServerMessage.mockClear();
	});

	it("automatically resets server messages after 7.5 seconds", done => {
		jest.useFakeTimers();
		wrapper.setProps({
			message: "This message auto resets in 7.5 seconds.",
		});
		jest.advanceTimersByTime(7500);

		expect(resetServerMessage).toHaveBeenCalledTimes(1);
		jest.runAllTimers();
		done();
	});

	it("resets the timer and hide the message on unmount", () => {
		wrapper.unmount();

		expect(resetServerMessage).toHaveBeenCalledTimes(1);
	});
});
