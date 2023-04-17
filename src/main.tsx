import React from "react";
import ReactDOM from "react-dom/client";
import { styled } from "./styled";

const StyledComponent = styled("button", {
	base: {
		color: "red",
		selectors: {
			"& > .boom": {
				fontSize: "50px"
			}
		}
	},
	variants: {
		bgColor: {
			violet: {
				background: "violet"
			},
			blue: {
				background: "blue"
			}
		},
		size: {
			xl: {
				width: "200px"
			},
			sm: {
				width: "20px"
			}
		}
	},
	defaultVariants: {
		bgColor: "violet"
	},
	compoundVariants: [
		{
			variants: {
				bgColor: "blue",
				size: "xl"
			},
			style: {
				height: "400px"
			}
		}
	]
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<StyledComponent bgColor="blue" size="xl">
			<span className="boom">Red text button</span>
		</StyledComponent>
	</React.StrictMode>
);
