import {
	PatternOptions,
	VariantGroups
} from "@vanilla-extract/recipes/dist/declarations/src/types";

export const kebabCase = (str: string) =>
	str.replace(
		/[A-Z]+(?![a-z])|[A-Z]/g,
		($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
	);

export const toCss = (
	obj: NonNullable<PatternOptions<VariantGroups>["base"]>
) => {
	return Object.entries(obj)
		.map(([rule, value]) => `${kebabCase(rule)}: ${value};`)
		.join("\n");
};
