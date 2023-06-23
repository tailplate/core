type Color = {
  text?: {
    primary?: String;
    base?: String;
    light?: String;
    hover?: String;
    secondary?: String;
  };
  bg?: {
    primary?: String;
    secondary?: String;
    active?: String;
    light?: String;
    focus?: String;
    base?: String;
    hover?: String;
  };
  border?: {
    primary?: String;
    secondary?: String;
    focus?: String;
  };
  shadow?: {
    hover?: String;
  };
  ring?: {
    focus?: String;
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
