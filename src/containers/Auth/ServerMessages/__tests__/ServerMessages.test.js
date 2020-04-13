import { ServerMessages } from "../index";

const resetServerMessage = jest.fn();

const initProps = {
	serverMessage: "",
	resetServerMessage,
};

describe("Server Messages", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ServerMessages {...initProps} />);
	});

	afterEach(() => {
		resetServerMessage.mockClear();
	});

	it("automatically resets server messages after 8 seconds", done => {
		jest.useFakeTimers();
		wrapper.setProps({
			serverMessage: "This message auto resets in 8 seconds.",
		});
		jest.advanceTimersByTime(8500);

		expect(resetServerMessage).toHaveBeenCalledTimes(1);
		jest.runAllTimers();
		done();
	});

	it("doesn't call resetServerMessage if the serverMessage has been reset", () => {
		const nextProps = { ...initProps, serverMessage: "Hello" };
		wrapper = mount(<ServerMessages {...nextProps} />);

		wrapper.setProps({
			serverMessage: "",
		});

		expect(resetServerMessage).toHaveBeenCalledTimes(0);
	});

	it("resets the timer and hide the message on unmount", () => {
		wrapper.unmount();

		expect(resetServerMessage).toHaveBeenCalledTimes(1);
	});
});
