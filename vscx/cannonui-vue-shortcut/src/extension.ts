// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import type { ComponentMeta } from './componentMap';
import { componentMap } from './componentMap';
const files = ['javascript', 'vue', 'react', 'typescript'];
const provideCompletionItems = () => {
  const completionItem: vscode.CompletionItem[] = [];
  Object.keys(componentMap).forEach((key) => {
    completionItem.push(
      new vscode.CompletionItem(
        `cannonui-${key}`,
        vscode.CompletionItemKind.Field
      )
    );
  });
  return completionItem;
};
const resolveCompletionItem = (item: vscode.CompletionItem) => {
  const name = (<string>item.label).slice(9);
  const description: ComponentMeta = componentMap[name];
  const propsText = description.props.join(' ') || '';
  const closeTag = `</${item.label}>`;
  item.insertText = `<${item.label} ${propsText}>${closeTag}`;

  item.command = {
    title: 'cannonui-move-cursor',
    command: 'cannonui-move-cursor',
    arguments: [-closeTag.length - 2],
  };
  return item;
};
const moveCursor = (characterDelta: number) => {
  const active = vscode.window.activeTextEditor!.selection.active!;
  const position = active.translate({ characterDelta });
  vscode.window.activeTextEditor!.selection = new vscode.Selection(
    position,
    position
  );
};
function extractStyles(content: string) {
  // extract the <style> tag content using regex
  const regex = /<style.*?>([\s\S]*)<\/style>/g;
  const matches = [];
  let match;
  while ((match = regex.exec(content))) {
    matches.push(match[1]);
  }
  return matches.map((content) => ({ content, scoped: false }));
}
function parseVueFile(content: string) {
  const template = extractTemplate(content);
  console.log(template, 'template');
  const styles = extractStyles(content);
  console.log(styles, 'styles');
  const script = extractScript(content);
  console.log(script, 'script');
  return { template, script, styles };
}

function extractTemplate(content: string) {
  // extract the <template> tag content using regex
  const regex = /<template>([\s\S]*)<\/template>/;
  const matches = regex.exec(content);
  if (matches) {
    return matches[1];
  }
  return '';
}

function extractScript(content: string) {
  // extract the <script> tag content using regex
  const regex = /<script.*?>([\s\S]*)<\/script>/;
  const matches = regex.exec(content);
  if (matches) {
    const scriptContent = matches[1];
    // evaluate the script content as an ES module and return its export object
    console.log(scriptContent);
    const module = new Function(`return (${scriptContent})`)();
    console.log('123');

    const exportObj = module.__esModule ? module.default : module;
    if (exportObj.default) {
      return exportObj.default;
    }
    return exportObj;
  }
  return null;
}
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('cannonui-move-cursor', moveCursor);
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(files, {
      provideCompletionItems,
      resolveCompletionItem,
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
