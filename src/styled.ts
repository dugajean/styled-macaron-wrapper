import {
	PatternOptions,
	VariantGroups,
	VariantSelection
} from "@vanilla-extract/recipes/dist/declarations/src/types";
import { PropsWithChildren, ComponentType } from "react";
import styledComponentsFn from "styled-components";
import { toCss } from "./utils";

type StyledComponent<
	TProps = {},
	Variants extends VariantGroups = {}
> = ComponentType<PropsWithChildren<TProps & { as?: string }>> & {
	variants: Array<keyof Variants>;
	selector: (variants: VariantSelection<Variants>) => string;
};

type IntrinsicProps<TComponent> = TComponent extends keyof JSX.IntrinsicElements
	? JSX.IntrinsicElements[TComponent]
	: any;

export function styled<TProps, Variants extends VariantGroups = {}>(
	component: ComponentType<TProps>,
	options: PatternOptions<Variants>
): StyledComponent<TProps & VariantSelection<Variants>, Variants>;

export function styled<
	TProps,
	TComponent extends string | keyof JSX.IntrinsicElements,
	Variants extends VariantGroups = {}
>(
	component: TComponent,
	options: PatternOptions<Variants>
): StyledComponent<
	IntrinsicProps<TComponent> & VariantSelection<Variants>,
	Variants
>;

export function styled<
	TProps extends object = {},
	Variants extends VariantGroups = {}
>(component: any, options: any): any {
	return styledComponentsFn(component)<TProps>`
		${(props) => generateStyles<TProps, Variants>(props, options)}
	`;
}

function generateStyles<
	TProps extends object = {},
	Variants extends VariantGroups = {}
>(props: TProps, options: PatternOptions<Variants>) {
	const styledStrings = [];

	if (options.base) {
		const anyBase = options.base as any;
		if ("selectors" in anyBase) {
			const selectors: string[] = [];
			Object.entries(anyBase.selectors).forEach(([selector, styles]) => {
				const selectorsCss = `${selector} {${toCss(styles as any)}}`;
				selectors.push(selectorsCss);
			});
			styledStrings.push(selectors);
			delete anyBase.selectors;
		}

		const baseStyles = toCss(options.base);
		styledStrings.push(baseStyles);
	}

	if (options.defaultVariants) {
		Object.entries(options.defaultVariants).forEach(([name, value]) => {
			const variantStyles: string[] = [];
			const variantProp = (props as any)[name];

			if (variantProp) return;
			if (!options.variants) return;
			if (!options.variants[name]) return;
			if (!options.variants[name][value]) return;

			variantStyles.push(toCss(options.variants[name][value]));
			styledStrings.push(variantStyles.join("\n"));
		});
	}

	if (options.variants) {
		Object.entries(options.variants).forEach(([variantName, styles]) => {
			const variantStyles: string[] = [];
			const variantProp = (props as any)[variantName];

			if (variantProp) variantStyles.push(toCss(styles[variantProp]));
			styledStrings.push(variantStyles.join("\n"));
		});
	}

	if (options.compoundVariants && options.variants) {
		const compoundStyles: string[] = [];
		options.compoundVariants.forEach((compoundVariant) => {
			const variantsPresent = Object.entries(compoundVariant.variants).every(
				([name, value]) => {
					const variantProp = (props as any)[name];
					return (
						variantProp &&
						options.variants![name] &&
						options.variants![name][value] &&
						variantProp === value
					);
				}
			);

			if (variantsPresent) {
				compoundStyles.push(toCss(compoundVariant.style));
			}
		});
		styledStrings.push(compoundStyles);
	}

	return styledStrings.join("\n");
}
