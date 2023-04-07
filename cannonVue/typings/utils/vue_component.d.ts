import { defineComponent } from 'vue';
declare const cmpGenerate: (name: string) => {
    componentName: string;
    create: typeof defineComponent;
};
export default cmpGenerate;
