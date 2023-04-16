## 创建 Visual Studio Code 插件的步骤

### 配置开发环境

1. 安装 Node.js 和 npm。
2. 安装 Yeoman 代码生成器：`npm install -g yo`。
3. 安装 Visual Studio Code 扩展生成器：`npm install -g generator-code`。

### 生成新的扩展项目

1. 打开终端并导航到要创建扩展项目的目录。
2. 运行生成器：`yo code`。
3. 按照提示配置项目。您需要提供名称、描述、作者名称和其他信息。

```json
"cannonui-card": {
    "prefix": "ccard",
    "body": ["<c-card>", "\t$1", "</c-card>"],
    "description": "ui Card component just for example"
}
```

### Develop the Extension

1. 在 Visual Studio Code 中打开项目目录。
2. 在代码根目录中创建一个新的 snippets/snippets.json 文件。
3. 添加所需的代码片段。以下是一个示例：

### Test the Extension (Optional)

1. 在 Visual Studio Code 中打开项目目录。
2. 按 F5 键启动 Visual Studio Code 的新实例，该实例已加载了您的扩展。
3. 测试扩展的功能。

### Configure Local Packaging Script

1. Install esbuild: `npm i --save-dev esbuild`.
2. Open `package.json` and add the following scripts and snippet configuration:

```json
"contributes": {
    "snippets": [
        {
            "language": "typescript",
            "path": "./snippets/snippets.json"
        }
    ]
},
"scripts": {
    "vscode:prepublish": "npm run esbuild --minify",
    "esbuild": "esbuild ./src/extension.ts --bundle --outfile=out/extension.js --external:vscode --format=cjs --platform=node",
    "test-compile": "tsc -p ./",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "pretest": "npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTest.js",
    "package": "vsce package --no-dependencies",
    "publish": "vsce publish --no-dependencies"
}
```

3. Package the source files and generate the installable file: `npm run package`.
4. The packaged source file is located at `out/extension.js`. This source file is not used for installation, but for testing purposes.
5. The installable file is located in the root directory and has the `.vsix` file extension.
6. Open VS Code and select "Install from vsix" under the "Extensions" menu.
7. Restart VS Code.

That's it!
## 创建 Visual Studio Code 插件的步骤

### 配置开发环境

1. 安装 Node.js 和 npm。
2. 安装 Yeoman 代码生成器：`npm install -g yo`。
3. 安装 Visual Studio Code 扩展生成器：`npm install -g generator-code`。

### 生成新的扩展项目

1. 打开终端并导航到要创建扩展项目的目录。
2. 运行生成器：`yo code`。
3. 按照提示配置项目。您需要提供名称、描述、作者名称和其他信息。

```json
"cannonui-card": {
    "prefix": "ccard",
    "body": ["<c-card>", "\t$1", "</c-card>"],
    "description": "ui Card component just for example"
}
```

### Develop the Extension

1. 在 Visual Studio Code 中打开项目目录。
2. 在代码根目录中创建一个新的 snippets/snippets.json 文件。
3. 添加所需的代码片段。以下是一个示例：

### Test the Extension (Optional)

1. 在 Visual Studio Code 中打开项目目录。
2. 按 F5 键启动 Visual Studio Code 的新实例，该实例已加载了您的扩展。
3. 测试扩展的功能。

### Configure Local Packaging Script

1. Install esbuild: `npm i --save-dev esbuild`.
2. Open `package.json` and add the following scripts and snippet configuration:

```json
"contributes": {
    "snippets": [
        {
            "language": "typescript",
            "path": "./snippets/snippets.json"
        }
    ]
},
"scripts": {
    "vscode:prepublish": "npm run esbuild --minify",
    "esbuild": "esbuild ./src/extension.ts --bundle --outfile=out/extension.js --external:vscode --format=cjs --platform=node",
    "test-compile": "tsc -p ./",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "pretest": "npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTest.js",
    "package": "vsce package --no-dependencies",
    "publish": "vsce publish --no-dependencies"
}
```

3. Package the source files and generate the installable file: `npm run package`.
4. The packaged source file is located at `out/extension.js`. This source file is not used for installation, but for testing purposes.
5. The installable file is located in the root directory and has the `.vsix` file extension.
6. Open VS Code and select "Install from vsix" under the "Extensions" menu.
7. Restart VS Code.

That's it!
