namespace DOM {
    export const DEFAULT = -1;
    export const INHERIT = -2;

    export enum StyleName {
        width,
        height,
        paddingLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        padding,
        borderColor,
        borderLeft,
        borderTop,
        borderRight,
        borderBottom,
        border,
        color,
        contentAlign,
        font
    }

    export enum ContentAlign {
        Left,
        Center,
        Right
    }

    export enum Font {
        Normal,
        Small
    }

    export class Style {
        readonly name: StyleName;
        value: number;
        constructor(name: StyleName, value = DEFAULT) {
            this.name = name;
            this.value = value;
        }
    }

    export class StyleRule {
        readonly className: string;
        protected styles: Style[];

        constructor(className: string, styles?: Style[]) {
            this.className = className;
            this.styles = styles || [];
        }

        getStyles() {
            return this.styles;
        }

        add(s: Style) {
            if (s) {
                for (const style of this.styles) {
                    if (style.name === s.name) {
                        style.value = s.value;
                        return;
                    }
                }
                this.styles.push(s);
            }
        }
    }

    export class StyleSheet {
        protected rules: StyleRule[];

        constructor() {
            this.rules = [];
        }

        createClass(name: string, styles: Style[]) {
            this.addRule(new StyleRule(name, styles));
        }

        addRule(r: StyleRule) {
            for (const rule of this.rules) {
                if (rule.className === r.className) {
                    for (const s of r.getStyles()) {
                        rule.add(s);
                    }
                    return;
                }
            }
            this.rules.push(r);
        }

        getStylesForClass(className: string): Style[] {
            for (const rule of this.rules) {
                if (rule.className === className) {
                    return rule.getStyles();
                }
            }
            return [];
        }
    }
}