<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({
  slider: {
    default: 70,
  },
  popover: {
    default: false,
  },
  dialog: {
    base: false,
    side: false,
    variant: {
      left: false,
      right: false,
      bottom: false,
      top: false,
    },
  },
  show: {
    one: true,
    two: false,
    three: false,
    four: false,
  },
  openCollapse: false,
  dark: false,
  toggleMode: {
    marketing: {
      name: "Marketing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi possimus incidunt delectus.",
      done: false,
      id: "marketing",
    },
    deployment: {
      name: "Deployment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi possimus incidunt delectus.",
      done: false,
      id: "deployment",
    },
    activate: {
      name: "Activate user account",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi possimus incidunt delectus.",
      done: false,
      id: "activate",
    },
  },
  switchedMode: {
    banana: {
      name: "Banana 🍌",
      done: false,
      id: "banana",
    },
    avocado: {
      name: "Avocado 🥑",
      done: false,
      id: "avocado",
    },
    melon: {
      name: "Melon 🍈",
      done: false,
      id: "melon",
    },
    apple: {
      name: "Apple 🍎",
      done: false,
      id: "apple",
    },
  },
});

const darkMode = () => (state.dark = !state.dark);

const callback = (obj: { id: string; bool: boolean }) => {
  state.switchedMode[obj.id as keyof typeof state.switchedMode].done = obj.bool;
};

const callbackToggle = (obj: { id: string; bool: boolean }) => {
  console.log("🚀 ~ file: index.vue:60 ~ callbackToggle ~ obj:", obj);
  state.toggleMode[obj.id as keyof typeof state.toggleMode].done = obj.bool;
  console.log(
    "🚀 ~ file: index.vue:62 ~ callbackToggle ~ state.toggleMode[obj.id as keyof typeof state.toggleMode].done:",
    state.toggleMode[obj.id as keyof typeof state.toggleMode].done
  );
};

const closeDialogBase = () => {
  state.dialog.base = false;
};
const closeDialogSide = () => {
  state.dialog.side = false;
};

const updateSliderValue = (v: number) => {
  state.slider.default = v;
};

const closeDialogVariant = (v: { variant: string }) => {
  console.log("🚀 ~ file: index.vue:93 ~ closeDialogVariant ~ v:", v);
  state.dialog.variant[v.variant as keyof typeof state.dialog.variant] = false;
};

const carousel = [
  { src: "/img/1.jpg", alt: "Test" },
  { src: "/img/2.jpg", alt: "Test" },
  { src: "/img/3.jpg", alt: "Test" },
  { src: "/videos/video.mp4", alt: "Test", type: "video" },
  { src: "/img/4.jpg", alt: "Test" },
];
</script>

<template>
  <t-dark
    :dark="state.dark"
    class="relative min-h-screen p-6"
    :class="state.dark ? 'bg-slate-900' : 'bg-white'"
  >
    <t-icon-button @click="darkMode" className="ml-auto top-6 right-6 fixed">
      <svg
        v-if="!state.dark"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-4 w-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </t-icon-button>
    <div
      class="flex h-full flex-col items-center justify-center space-y-6 duration-100"
    >
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <t-button>
            <p>filled</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z"
                clip-rule="evenodd"
              />
            </svg>
          </t-button>
        </div>
        <div class="flex items-center justify-center">
          <t-button variant="outlined">
            <p>Outlined</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z"
                clip-rule="evenodd"
              />
            </svg>
          </t-button>
        </div>
        <div class="flex items-center justify-center">
          <t-button variant="text">
            <p>Text</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z"
                clip-rule="evenodd"
              />
            </svg>
          </t-button>
        </div>
        <div class="flex items-center justify-center">
          <t-button variant="text" :dark="false">
            <p>Text</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z"
                clip-rule="evenodd"
              />
            </svg>
          </t-button>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <t-button rounded> Filled </t-button>
        </div>
        <div class="flex items-center justify-center">
          <t-button rounded variant="outlined"> Outlined </t-button>
        </div>
        <div class="flex items-center justify-center">
          <t-button rounded variant="text"> Text </t-button>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <t-button size="sm"> Small </t-button>
        </div>
        <div class="flex items-center justify-center">
          <t-button size="md"> Base </t-button>
        </div>
        <div class="flex items-center justify-center">
          <t-button size="lg"> Large </t-button>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <t-icon-button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </t-icon-button>
        </div>
        <div class="flex items-center justify-center">
          <t-icon-button variant="outlined">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </t-icon-button>
        </div>
        <div class="flex items-center justify-center">
          <t-icon-button variant="text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          </t-icon-button>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <tGroupButton>
            <tButton group>test</tButton>
            <tButton group>test</tButton>
            <tButton group>test</tButton>
          </tGroupButton>
        </div>

        <div class="flex items-center justify-center">
          <tGroupButton>
            <t-icon-button group>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 p-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                /></svg
            ></t-icon-button>
            <t-icon-button group>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 p-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                /></svg
            ></t-icon-button>
            <tIconButton group>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6 p-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                /></svg
            ></tIconButton>
          </tGroupButton>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <tSwitch></tSwitch>
        <tSwitch disabled></tSwitch>
        <tSwitch active></tSwitch>
        <tSwitch danger></tSwitch>
        <tSwitch danger active></tSwitch>
        <tSwitch danger active disabled></tSwitch>
        <tSwitch size="sm" />
        <tSwitch size="md" />
        <tSwitch size="lg" />
        <div class="flex flex-col space-y-4">
          <div
            v-for="item in state.switchedMode"
            :key="item.name"
            class="flex space-x-4"
          >
            <tSwitch @switched="callback" :id="item.id">
              <p
                :class="[
                  state.dark ? 'text-slate-300' : 'text-slate-800',
                  item.done ? 'line-through' : '',
                ]"
              >
                {{ item.name }}
              </p></tSwitch
            >
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center space-x-4">
          <tCheckbox>
            <p>Example</p>
          </tCheckbox>
        </div>
        <div class="flex items-center justify-center space-x-4">
          <tCheckbox disabled>
            <p>Disabled Example</p>
          </tCheckbox>
        </div>
        <div class="flex items-center justify-center space-x-4">
          <tCheckbox active>
            <p>Active Example</p>
          </tCheckbox>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4 py-12">
        <div></div>
        <div class="flex flex-col justify-center space-y-6">
          <div v-for="item in state.toggleMode" :key="item.id">
            <tCheckbox :id="item.id" @toggled="callbackToggle">
              <div>
                <TYpo
                  variant="h4"
                  class="text-lg font-bold"
                  :className="item.done ? 'line-through' : ''"
                >
                  {{ item.name }}
                </TYpo>
                <TYpo variant="small">
                  {{ item.description }}
                </TYpo>
              </div>
            </tCheckbox>
          </div>
        </div>
        <div></div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <TBadge>
            <TButton>badge</TButton>
          </TBadge>
        </div>
        <div class="flex items-center justify-center">
          <TBadge content="9">
            <TButton>content</TButton>
          </TBadge>
        </div>
        <div class="flex items-center justify-center">
          <TBadge border content="9">
            <TButton>border</TButton>
          </TBadge>
        </div>
      </div>

      <div class="grid grid-cols-4 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <TBadge content="9" position="top-left">
            <TButton>Top Left</TButton>
          </TBadge>
        </div>
        <div class="flex items-center justify-center">
          <TBadge content="9" position="bottom-left">
            <TButton>Bottom Left</TButton>
          </TBadge>
        </div>
        <div class="flex items-center justify-center">
          <TBadge content="9" position="top-right">
            <TButton>Top Right</TButton>
          </TBadge>
        </div>
        <div class="flex items-center justify-center">
          <TBadge content="9" position="bottom-right">
            <TButton>Bottom Right</TButton>
          </TBadge>
        </div>
      </div>
      <div class="grid grid-cols-4 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <TBadge position="top-left">
            <TButton>Top Left</TButton>
          </TBadge>
        </div>
        <div class="flex items-center justify-center">
          <TBadge position="bottom-left">
            <TButton>Bottom Left</TButton>
          </TBadge>
        </div>
        <div class="flex items-center justify-center">
          <TBadge position="top-right">
            <TButton>Top Right</TButton>
          </TBadge>
        </div>
        <div class="flex items-center justify-center">
          <TBadge position="bottom-right">
            <TButton>Bottom Right</TButton>
          </TBadge>
        </div>
      </div>
      <div class="flex flex-col justify-center space-y-12 py-12">
        <tYpo variant="h1"> Tailplate is Awesome </tYpo>
        <TYpo variant="h2"> Tailplate is Awesome </TYpo>
        <TYpo variant="h3"> Tailplate is Awesome </TYpo>
        <TYpo variant="h4"> Tailplate is Awesome </TYpo>
        <TYpo variant="h5"> Tailplate is Awesome </TYpo>
        <TYpo variant="lead"> Tailplate is Awesome </TYpo>
        <TYpo variant="p"> Tailplate is Awesome </TYpo>
        <TYpo variant="xs"> Tailplate is Awesome </TYpo>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div></div>
        <div class="flex flex-col justify-center space-y-4">
          <TYpo variant="h2">
            A new TailwindCSS components library for Nuxt.
          </TYpo>
          <TYpo variant="lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            ipsam necessitatibus cum ratione amet voluptates dolorum.
          </TYpo>
        </div>
        <div></div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <tAvatar
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </div>
        <div class="flex items-center justify-center">
          <tAvatar
            variant="rounded"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </div>
        <div class="flex items-center justify-center">
          <tAvatar
            variant="squared"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </div>
        <div class="flex items-center justify-center">
          <tBadge rounded>
            <tAvatar
              src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
            ></tAvatar
          ></tBadge>
        </div>
        <div class="flex items-center justify-center">
          <tBadge>
            <tAvatar
              variant="rounded"
              src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
            ></tAvatar
          ></tBadge>
        </div>
        <div class="flex items-center justify-center">
          <tBadge>
            <tAvatar
              variant="squared"
              src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
            ></tAvatar
          ></tBadge>
        </div>
      </div>
      <div class="flex items-end space-x-4">
        <t-badge rounded>
          <tAvatar
            size="xs"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
        <t-badge rounded>
          <tAvatar
            size="sm"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
        <t-badge rounded>
          <tAvatar
            size="md"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
        <t-badge rounded size="lg">
          <tAvatar
            size="lg"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
        <t-badge rounded size="xl">
          <tAvatar
            size="xl"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
        <t-badge size="2xl" rounded>
          <tAvatar
            size="2xl"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
      </div>
      <div class="flex items-end space-x-4">
        <t-badge rounded content="5">
          <tAvatar
            size="md"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
        <t-badge rounded content="5">
          <tAvatar
            size="lg"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
        <t-badge rounded content="5">
          <tAvatar
            size="xl"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
        <t-badge rounded content="5">
          <tAvatar
            variant="rounded"
            size="2xl"
            src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
          ></tAvatar>
        </t-badge>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <t-breadcrumbs>
            <t-bread-link>
              <a href="#">Home</a>
            </t-bread-link>
            <t-bread-link>
              <a href="#">Documentation</a>
            </t-bread-link>
            <t-bread-link current>
              <a href="#">Breadcrumbs</a>
            </t-bread-link>
          </t-breadcrumbs>
        </div>
        <div class="flex items-center justify-center">
          <t-breadcrumbs>
            <t-bread-link>
              <a href="#"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </t-bread-link>
            <t-bread-link>
              <a href="#">Documentation</a>
            </t-bread-link>
            <t-bread-link current>
              <a href="#">Breadcrumbs</a>
            </t-bread-link>
          </t-breadcrumbs>
        </div>
        <div class="flex items-center justify-center">
          <t-breadcrumbs>
            <t-bread-link separator="-">
              <a href="#">Home</a>
            </t-bread-link>
            <t-bread-link separator="-">
              <a href="#">Documentation</a>
            </t-bread-link>
            <t-bread-link current>
              <a href="#">Breadcrumbs</a>
            </t-bread-link>
          </t-breadcrumbs>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex h-24 w-48 flex-col items-center space-y-6">
          <t-button @click="state.openCollapse = !state.openCollapse">
            Open
          </t-button>
          <t-collapse :open="state.openCollapse">
            <t-ypo variant="h3">Hello, world.</t-ypo>
          </t-collapse>
        </div>
      </div>
      <div class="grid grid-cols-1 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <t-carousel :sources="carousel"></t-carousel>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4">
        <div class="flex items-center justify-center">
          <t-tooltip
            content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, excepturi"
          >
            <t-button>submit</t-button>
          </t-tooltip>
        </div>
        <div class="flex items-center justify-center">
          <t-tooltip content="Lorem ipsum dolor.">
            <t-switch></t-switch>
          </t-tooltip>
        </div>
        <div class="flex items-center justify-center">
          <div class="flex items-center justify-center">
            <t-breadcrumbs>
              <t-tooltip content="Lorem ipsum dolor, sit amet.">
                <t-bread-link>
                  <a href="#"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="h-4 w-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </t-bread-link>
              </t-tooltip>
              <t-tooltip content="Lorem ipsum.">
                <t-bread-link>
                  <a href="#">Documentation</a>
                </t-bread-link>
              </t-tooltip>
              <t-tooltip content="Lorem ipsum.">
                <t-bread-link current>
                  <a href="#">Breadcrumbs</a>
                </t-bread-link>
              </t-tooltip>
            </t-breadcrumbs>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 items-center justify-center gap-4 py-12">
        <div class="flex w-[800px] items-center justify-center">
          <t-accordion>
            <t-accordion-header @click="state.show.one = !state.show.one">
              Lorem ipsum dolor sit amet consectetur adipisicing elit?
            </t-accordion-header>
            <t-accordion-body :show="state.show.one">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              maiores eaque magni aspernatur, hic placeat consequuntur earum
              ipsa eligendi quasi.
            </t-accordion-body>
            <t-accordion-header @click="state.show.two = !state.show.two">
              Lorem ipsum dolor sit amet consectetur adipisicing elit?
            </t-accordion-header>
            <t-accordion-body :show="state.show.two">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              maiores eaque magni aspernatur, hic placeat consequuntur earum
              ipsa eligendi quasi.
            </t-accordion-body>
            <t-accordion-header @click="state.show.three = !state.show.three">
              Lorem ipsum dolor sit amet consectetur adipisicing elit?
            </t-accordion-header>
            <t-accordion-body :show="state.show.three">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              maiores eaque magni aspernatur, hic placeat consequuntur earum
              ipsa eligendi quasi.
            </t-accordion-body>
          </t-accordion>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4 py-12">
        <div class="flex items-center justify-center">
          <t-button @click="state.dialog.base = !state.dialog.base">
            Show
          </t-button>
          <t-dialog @close="closeDialogBase" :show="state.dialog.base">
            <div class="rounded-md bg-slate-100 p-4 shadow">
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                obcaecati eos quidem exercitationem impedit sapiente, ipsa eum.
                Debitis, deleniti suscipit aut neque minus porro at, voluptate
                autem nihil perspiciatis, voluptatibus reiciendis ab iste.
                Doloremque eligendi dolorem magnam quaerat temporibus
                voluptatibus ullam dolor voluptate praesentium a!
              </p>
            </div>
          </t-dialog>
        </div>
        <div class="flex items-center justify-center">
          <t-button @click="state.dialog.side = !state.dialog.side">
            Drawer
          </t-button>
          <t-drawer @close="closeDialogSide" :show="state.dialog.side">
            <div class="w-48 rounded-md bg-slate-100 p-4 shadow">
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
            </div>
          </t-drawer>
        </div>
      </div>
      <div class="grid grid-cols-4 items-center justify-center gap-4 py-12">
        <div class="flex items-center justify-center">
          <t-button
            @click="state.dialog.variant.left = !state.dialog.variant.left"
          >
            Left
          </t-button>
          <t-drawer
            variant="left"
            @close="closeDialogVariant"
            :show="state.dialog.variant.left"
          >
            <div class="flex flex-col">
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
            </div>
          </t-drawer>
        </div>
        <div class="flex items-center justify-center">
          <t-button
            @click="state.dialog.variant.bottom = !state.dialog.variant.bottom"
          >
            Bottom
          </t-button>
          <t-drawer
            variant="bottom"
            @close="closeDialogVariant"
            :show="state.dialog.variant.bottom"
          >
            <div class="flex">
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
            </div>
          </t-drawer>
        </div>
        <div class="flex items-center justify-center">
          <t-button
            @click="state.dialog.variant.right = !state.dialog.variant.right"
          >
            Right
          </t-button>
          <t-drawer
            variant="right"
            @close="closeDialogVariant"
            :show="state.dialog.variant.right"
          >
            <div class="flex-col">
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
            </div>
          </t-drawer>
        </div>
        <div class="flex items-center justify-center">
          <t-button
            @click="state.dialog.variant.top = !state.dialog.variant.top"
          >
            top
          </t-button>
          <t-drawer
            variant="top"
            @close="closeDialogVariant"
            :show="state.dialog.variant.top"
          >
            <div class="flex">
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
              <p>Lorem ipsum.</p>
            </div>
          </t-drawer>
        </div>
      </div>
      <div class="grid grid-cols-1 items-center justify-center gap-4 py-12">
        <div class="flex w-96 flex-col items-center justify-center space-y-4">
          <p>{{ state.slider.default }}</p>
          <t-slider
            :min="50"
            :defaultValue="70"
            :step="2"
            @update:defaultValue="updateSliderValue"
          ></t-slider>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4 py-12">
        <div class="flex items-center justify-center">
          <t-popover
            :show="state.popover.default"
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsum minus obcaecati? Maxime temporibus distinctio itaque, dolorum vero, quasi natus obcaecati laborum sapiente ut aspernatur."
          >
            <t-button @click="state.popover.default = !state.popover.default">
              <p>Popver</p>
            </t-button>
          </t-popover>
        </div>
      </div>
      <div class="grid grid-cols-3 items-center justify-center gap-4 py-12">
        <div class="flex items-center justify-center">Wrapper</div>
      </div>
    </div>
  </t-dark>
</template>
