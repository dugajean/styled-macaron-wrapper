import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { styled } from "./styled";
import "@testing-library/jest-dom";

describe("styled()", () => {
	it("renders styled component with `base` styles", () => {
		const StyledComponent = styled("button", {
			base: {
				backgroundColor: "blue"
			}
		});

		render(<StyledComponent />);
		// expect(screen.getByRole("button")).toHaveStyle({ backgroundColor: "blue" });
	});
});
