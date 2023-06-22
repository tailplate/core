type Color = {
  text?: {
    primary?: String;
    secondary?: String;
  };
  bg?: {
    primary?: String;
    secondary?: String;
    active?: String;
  };
  border?: {
    primary?: String;
    secondary?: String;
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
