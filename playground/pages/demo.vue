<script setup lang="ts">
import { reactive } from "vue";

const state = reactive({
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
  todos: 3,
});

const callbackToggle = (obj: { id: string; bool: boolean }) => {
  if (obj.bool) {
    state.todos--;
  } else {
    state.todos++;
  }
  console.log("🚀 ~ file: index.vue:60 ~ callbackToggle ~ obj:", obj);
  state.toggleMode[obj.id as keyof typeof state.toggleMode].done = obj.bool;
  console.log(
    "🚀 ~ file: index.vue:62 ~ callbackToggle ~ state.toggleMode[obj.id as keyof typeof state.toggleMode].done:",
    state.toggleMode[obj.id as keyof typeof state.toggleMode].done
  );
};
</script>

<template>
  <div class="flex h-screen items-center justify-center bg-slate-100">
    <div
      class="flex w-96 flex-col items-center justify-center space-y-12 rounded-md border-slate-300 bg-white p-12 shadow-lg"
    >
      <div class="flex flex-col items-center justify-center space-y-4">
        <t-badge
          :content="state.todos.toString()"
          :color="state.todos === 0 ? 'green' : 'red'"
        >
          <t-avatar
            src="https://images.unsplash.com/photo-1548361403-cb0c785eea54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
            size="xl"
          />
        </t-badge>
        <div class="flex flex-col items-center">
          <t-ypo variant="h3">Jane Doe</t-ypo>
          <t-ypo variant="small" class-name="text-slate-300"
            >Product Manager</t-ypo
          >
        </div>
      </div>
      <div class="flex flex-col justify-center space-y-6">
        <div v-for="item in state.toggleMode" :key="item.id">
          <tCheckbox :id="item.id" @toggled="callbackToggle">
            <div>
              <t-typo
                variant="h5"
                class="text-lg font-bold"
                :className="item.done ? 'line-through' : ''"
              >
                {{ item.name }}
              </t-typo>
              <t-typo variant="small">
                {{ item.description }}
              </t-typo>
            </div>
          </tCheckbox>
        </div>
      </div>
    </div>
  </div>
</template>
