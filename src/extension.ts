// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as tree from './tree';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const panel = vscode.window.createWebviewPanel(
		"nichigou",
		"nichigou2",
		vscode.ViewColumn.One,
		{}
	);

	vscode.commands.registerCommand("nichigou.selectNode", (item:string) => {
		updateToolPanel(panel, item);
	});

	vscode.window.createTreeView('nichigou', {
		treeDataProvider: new tree.Provider()
	});

}

function updateToolPanel(panel:vscode.WebviewPanel, item:string) {
	panel.webview.html = getWebviewContent(item);
}

function getWebviewContent(item: string): string {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Cat Coding</title>
  </head>
  <body>
	  ${item}
  </body>
  </html>`;
  }

// This method is called when your extension is deactivated
export function deactivate() {}
