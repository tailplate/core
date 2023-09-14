type Color = {
  text?: {
    primary?: String;
    invert?: String;
    base?: String;
    light?: String;
    visited?: String;
    hover?: String;
    secondary?: String;
    peerFocus?: String;
  };
  bg?: {
    primary?: String;
    gray?: String;
    lightGray?: String;
    invert?: String;
    secondary?: String;
    active?: String;
    focusLight?: String;
    focusSuccess?: String;
    light?: String;
    focus?: String;
    base?: String;
    groupHover?: String;
    checked?: String;
    hover?: String;
    hoverPrimary?: String;
    hoverLight?: String;
    success?: String;
    danger?: String;
    light?: String;
    dark?: String;
  };
  border?: {
    primary?: String;
    checked?: String;
    secondary?: String;
    inverted?: String;
    focus?: String;
    focusPrimary?: String;
    peerFocus?: String;
  };
  outline?: {
    focus?: String;
    primary?: String;
  };
  shadow?: {
    hover?: String;
  };
  ring?: {
    primary?: String;
    focus?: String;
    focusPrimary?: String;
  };
  divide?: {
    primary?: String;
  };
  range?: {
    primary?: String;
  };
};

declare module "#app" {
  interface NuxtApp {
    $color: Color;
    $dark: Boolean;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $color: Color;
    $dark: Boolean;
  }
}

declare function useNuxtApp(): NuxtApp;

export { Color };
