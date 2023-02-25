import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

class ElementInfo extends vscode.TreeItem {
    private fileType: number; //文件类型：1为文件夹，2为文件
    private fileName: string;
    private subElementList: ElementInfo[];
    

    constructor(fileType: number, fileName: string, collapsibleState?: vscode.TreeItemCollapsibleState) {
        super(fileName, collapsibleState);
        this.fileType = fileType;
        this.fileName = fileName;
        this.subElementList = new Array();
    };

    public addSubElement(element: ElementInfo) {
        this.subElementList.push(element);
    }

    public getSubElement(): ElementInfo[] {
        return this.subElementList;
    }

    public checkIsFolder(): boolean {
        if (this.fileType === 1) {
            return true;
        }
        return false;
    }
}

let rootElement: ElementInfo;

export class Provider implements vscode.TreeDataProvider<ElementInfo> {
    private initProvider() {
        let base64DecoderTool = new ElementInfo(2, "base64解码", vscode.TreeItemCollapsibleState.None);
        base64DecoderTool.command = {
            command: "nichigou.selectNode",
            title: "base64解码",
            arguments: ["base64-decoder"]
        };


        let encryptTool = new ElementInfo(1, "加解密", vscode.TreeItemCollapsibleState.Collapsed);
        encryptTool.addSubElement(base64DecoderTool);

        rootElement = new ElementInfo(1, "工具", vscode.TreeItemCollapsibleState.Collapsed);
        rootElement.addSubElement(encryptTool);
    }

    constructor() {
        this.initProvider();
    }


    getTreeItem(element: ElementInfo): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: ElementInfo): vscode.ProviderResult<ElementInfo[]> {
        // 允许传入来，表示这个元素能被展开，因此它是目录
        if (element) {
            return Promise.resolve(
                element.getSubElement()
            );
        }
        return Promise.resolve([rootElement]);
    }
}
