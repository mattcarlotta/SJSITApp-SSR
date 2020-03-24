import QueryHandler from "../index";

const push = jest.fn();
const pathname = "pathname/viewall";

const initProps = {
	location: {
		pathname,
		search: "?page=5",
	},
	push,
};

const wrapper = mount(
	<QueryHandler {...initProps}>
		{props => (
			<>
				<button
					className="update"
					type="button"
					onClick={() => props.updateQuery({ page: 2 })}
				>
					Update
				</button>
				<button className="clear" type="button" onClick={props.clearFilters}>
					Clear
				</button>
			</>
		)}
	</QueryHandler>,
);

describe("Query Handler", () => {
	afterEach(() => {
		push.mockClear();
	});

	it("initally sets queries and queryString state", () => {
		expect(wrapper.state("queries")).toEqual({ page: 5 });
		expect(wrapper.state("queryString")).toEqual("page=5");
	});

	it("updates queries and queryString state when location prop has changed", () => {
		wrapper.setProps({ location: { pathname, search: "page=100" } });

		expect(wrapper.state("queries")).toEqual({ page: 100 });
		expect(wrapper.state("queryString")).toEqual("page=100");
	});

	it("it handles 'updateQuery' calls", () => {
		wrapper.find(".update").simulate("click");
		expect(push).toHaveBeenCalledWith(`${pathname}?page=2`);
	});

	it("it handles 'clearFilters' calls", () => {
		wrapper.find(".clear").simulate("click");
		expect(push).toHaveBeenCalledWith(`${pathname}?page=1`);
	});
});
