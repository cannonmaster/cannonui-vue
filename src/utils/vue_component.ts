import {
  App,
  Component,
  ComponentPropsOptions,
  defineComponent,
  RenderFunction,
} from 'vue';

const cmpGenerate = (name: string) => {
  const componentName = 'chihuoui-' + name;
  return {
    componentName,
    create: function (partialComponent: {
      baseName?: string;
      name?: string;
      setup?(
        props: Readonly<ComponentPropsOptions>
      ): RenderFunction | Record<string, any> | any;
      install?: (vue: App) => void;
      emits?: String[];
    }) {
      partialComponent.baseName = name;
      partialComponent.name = componentName;
      partialComponent.install = (vue: App) => {
        vue.component(partialComponent.name as string, partialComponent);
      };

      return defineComponent(partialComponent as any);
    } as typeof defineComponent,
  };
};
export default cmpGenerate;
