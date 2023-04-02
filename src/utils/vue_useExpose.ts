import { ComponentPublicInstance, getCurrentInstance } from 'vue';

export default function useExpose(api: Record<string, any>) {
  const instance = getCurrentInstance();
  if (instance) {
    Object.assign(instance.proxy as ComponentPublicInstance, api);
  }
}
