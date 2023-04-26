export type templatesProps = {
  index_vue: string;
  index_react: string;
  react: string;
  vue: string;
  css: string;
  react_demo: string;
  vue_demo: string;
  doc: string;
  page: string;
};
const template = (type: keyof templatesProps, name: string): string => {
  const templates: templatesProps = {
    index_vue: `
            import ${name} from './${name.toLowerCase()}.vue'
            export default ${name}
        `,
    index_react: `
            import {${name}} from './${name.toLowerCase()}'
            export default ${name}
        `,
    vue: `
		<style lang="scss" scoped>
			@import '../${name.toLowerCase()}.scss'	
		</style>
		<template>

		</template>
		<script lang="ts">
			import { PropType, CSSProperties, toRefs, computed } from 'vue';
			import createComponent from '@/utils/vue_component';
			const {componentName, create} = createComponent('${name.toLowerCase()}')
			export default create({
				props:{},emits:[],setup(props){}})
		</script>
	`,
    react: `
			//@ts-ignore
			import React, { FunctionComponent } from 'react'
			import '../${name.toLowerCase()}.scss'

			export interface ${name}Props {

			}
			const defaultProps = {} as ${name}Props
			export const ${name}: FunctionComponent<Partial<${name}Props> & React.HTMLAttributes<HTMLDivElement>> = (props) => {
			const { children } = { ...defaultProps, ...props }
			return <div className="cannonui-${name.toLowerCase()}">${name}</div>
			}

			${name}.defaultProps = defaultProps
			${name}.displayName = 'Cannonui${name}'
		`,
    css: `
			.cannonui-${name.toLowerCase()} {}
		`,
    react_demo: `
			import React from 'react'
			import { ${name} } from './${name.toLowerCase()}'

			const ${name}Demo = () => {
			return (
				<>
				<div className="demo">
					<h2>基础用法</h2>
					<${name}></${name}>
				</div>
				</>
			)
			}

			export default ${name}Demo
		`,
    vue_demo: `
		<style lang="scss" scoped>
		@import '../${name.toLowerCase()}.scss'
		</style>
		<template>
			<div class="phone">
				<div class="phone-top">${name}</div>
					<div class="phone-content">
						{/* TODO: add / update the cmp such as lang*/}
					</div>
				<div class="phone-bottom"></div>
			</div>
		</template>
		<script lang="ts">
		    import ${name} from './${name.toLowerCase()}.vue'
			export default {
				props: {},
				emits: [],
				components: {${name}},
                setup(props) {
                    return {
					}
				}
			}
		</script>
	`,
    page: `
---
title: ${name}
description: "Docs intro"
layout: "@/layouts/MainLayout.astro"
cname: ${name.toLowerCase()}
---

{/* TODO: remove unnessary cmp*/}
import ${name}React from '@/cmpStore/${name}/react/demo'
import ${name}Vue from '@/cmpStore/${name}/vue/demo.vue'

### Example Usages

{/* TODO: remove unnessary cmp*/}
<${name}React client:visible/>
<${name}Vue client:visible/>

Here’s an example of how to use the infinite component:

\`\`\`vue

\`\`\`

### Props
		
	`,
    doc: `#  ${name}组件

### 介绍

基于 xxxxxxx

### 安装

## 效果演示

<div class="phone">
  <div class="phone-top">Skeleton</div>
  <div class="phone-content">

  </div>
  <div class="phone-bottom"></div>
</div>

## 代码演示

### Props
		`,
  };

  return templates[type];
};

export default template;
