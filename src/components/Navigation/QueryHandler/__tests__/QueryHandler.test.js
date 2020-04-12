import Router from "next/router";
import { QueryHandler } from "../index";

const pathname = "pathname/viewall";

const initProps = {
	router: {
		pathname,
		query: {
			page: "5",
		},
	},
};

const wrapper = mount(
	<QueryHandler {...initProps}>
		{props => (
			<>
				<button
					className="update"
					type="button"
					onClick={() => props.updateQuery({ page: "2" })}
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
	it("initally sets queries and queryString state", () => {
		expect(wrapper.state("queries")).toEqual({ page: 5 });
		expect(wrapper.state("queryString")).toEqual("page=5");
	});

	it("updates queries and queryString state when router prop has changed", () => {
		wrapper.setProps({ router: { pathname, query: { page: "100" } } });

		expect(wrapper.state("queries")).toEqual({ page: 100 });
		expect(wrapper.state("queryString")).toEqual("page=100");
	});

	it("it handles 'updateQuery' calls", () => {
		wrapper.find(".update").simulate("click");
		expect(Router.push).toHaveBeenCalledWith(`${pathname}?page=2`);
	});

	it("it handles 'clearFilters' calls", () => {
		wrapper.find(".clear").simulate("click");
		expect(Router.push).toHaveBeenCalledWith(`${pathname}?page=1`);
	});
});
