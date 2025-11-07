export type ColorScale = {
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  accent: {
    blue: string;
    emerald: string;
    amber: string;
  };
  border: string;
};

export type RadiiScale = Record<string, string>;
export type ShadowScale = Record<string, string>;
export type SpacingScale = Record<string | number, string>;

export interface DesignSystem {
  colors: ColorScale;
  radii: RadiiScale;
  shadows: ShadowScale;
  spacing: SpacingScale;
  typography: {
    scale: Record<string, [string, { lineHeight: string }]>
  };
  layout: {
    maxWidth: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokens: DesignSystem = require('./theme.js');

export default tokens as DesignSystem;
