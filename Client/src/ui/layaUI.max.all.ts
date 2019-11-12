
import View = laya.ui.View;
import Dialog = laya.ui.Dialog;
module ui {
	export class GameOverUI extends View {
		public bestScoreText: laya.display.Text;
		public showRank: Laya.Image;
		public scoreText: Laya.Label;
		public Back: Laya.Image;

		public static uiView: any = { "x": 0, "type": "View", "selectedBox": 1, "selecteID": 24, "searchKey": "View", "props": { "width": 720, "top": 0, "sceneColor": "#000000", "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0, "alpha": 1 }, "nodeParent": -1, "maxID": 28, "label": "View", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 1, "child": [{ "x": 15, "type": "Image", "searchKey": "Image", "props": { "top": 0, "skin": "background/bg_rank.jpg", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0 }, "nodeParent": 1, "label": "Image", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 18, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image", "props": { "y": 499, "x": 360, "skin": "img/clear_img_bg.png", "layoutEnabled": true, "centerY": -141, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "nodeParent": 1, "label": "Image", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 19, "child": [{ "x": 30, "type": "Image", "searchKey": "Image", "props": { "y": 363, "x": 132, "skin": "img/clear_img_highest.png" }, "nodeParent": 19, "label": "Image", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 23, "child": [{ "type": "Text", "searchKey": "Text,bestScoreText", "props": { "y": 14, "x": 250, "width": 227, "var": "bestScoreText", "text": "00", "height": 31, "fontSize": 30, "font": "Arial", "color": "#747474", "align": "left" }, "nodeParent": 23, "label": "bestScoreText", "isOpen": true, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 8, "child": [] }] }, { "x": 30, "type": "Image", "searchKey": "Image,showRank", "props": { "y": 816, "x": 280, "width": 164, "var": "showRank", "skin": "img/rank_pic.jpg", "mouseThrough": true, "mouseEnabled": true, "layoutEnabled": true, "height": 37, "alpha": 0 }, "nodeParent": 19, "label": "showRank", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 27, "child": [] }], "$HIDDEN": false }, { "x": 15, "type": "Label", "searchKey": "Label,scoreText", "props": { "width": 228, "var": "scoreText", "top": 303, "text": "7851", "layoutEnabled": true, "height": 108, "fontSize": 103, "font": "Microsoft YaHei", "color": "000000", "centerX": -8, "align": "center" }, "nodeParent": 1, "label": "scoreText", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 24, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image,Back", "props": { "y": 1029, "x": 352, "var": "Back", "skin": "img/clear_btn_back.png", "anchorY": 0.5, "anchorX": 0.5 }, "nodeParent": 1, "label": "Back", "isOpen": true, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 21, "child": [] }], "animations": [{ "nodes": [], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
		constructor() { super() }
		createChildren(): void {
			View.regComponent("Text", laya.display.Text);

			super.createChildren();
			this.createView(ui.GameOverUI.uiView);

		}

	}
}

module ui {
	export class HelpeUI extends View {
		public backButton: Laya.Image;

		public static uiView: any = { "type": "View", "props": { "width": 720, "top": 0, "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "background/bg_rank.jpg", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0 } }, { "type": "Image", "props": { "skin": "img/help_img_bg.png", "layoutEnabled": true, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "var": "backButton", "skin": "img/help_btn_back.png", "left": 0, "layoutEnabled": true, "centerY": 0 } }] };
		constructor() { super() }
		createChildren(): void {

			super.createChildren();
			this.createView(ui.HelpeUI.uiView);

		}

	}
}

module ui {
	export class RankUI extends View {
		public bg: Laya.Image;
		public item0: Laya.Panel;
		public bestPlayer: Laya.VBox;
		public rankList: Laya.List;
		public myBestScore: Laya.Label;
		public moreRankBtn: Laya.Image;
		public title: Laya.Image;
		public challengeBtn: Laya.Image;
		public backBtn: Laya.Image;

		public static uiView: any = { "x": 0, "type": "View", "selectedBox": 4, "selecteID": 12, "searchKey": "View", "props": { "width": 720, "top": 0, "sceneColor": "#000000", "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0 }, "nodeParent": -1, "maxID": 24, "label": "View", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 1, "child": [{ "x": 15, "type": "Image", "searchKey": "Image,bg", "props": { "var": "bg", "top": 0, "skin": "background/bg_rank.jpg", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0 }, "nodeParent": 1, "label": "bg", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 3, "child": [], "$HIDDEN": false }, { "x": 15, "type": "Image", "searchKey": "Image", "props": { "y": 99, "x": 27, "skin": "img/rank_img_bg.png", "layoutEnabled": true, "centerX": 0 }, "nodeParent": 1, "label": "Image", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 4, "child": [{ "x": 30, "type": "Panel", "searchKey": "Panel,item0", "props": { "y": 272, "x": 20, "width": 636, "var": "item0", "height": 100 }, "nodeParent": 4, "label": "item0", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 17, "child": [{ "x": 45, "type": "VBox", "searchKey": "VBox,bestPlayer", "props": { "var": "bestPlayer" }, "nodeParent": 17, "label": "bestPlayer", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 18, "child": [{ "x": 60, "type": "UIView", "source": "RankItem.ui", "searchKey": "UIView", "props": {}, "nodeParent": 18, "label": "UIView", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 19, "child": [] }] }] }, { "x": 30, "type": "List", "searchKey": "List,rankList", "props": { "y": 447, "x": 28, "width": 601, "var": "rankList", "vScrollBarSkin": "img/vscroll.png", "spaceY": 4, "space": 20, "repeatY": 99, "repeatX": 1, "height": 420 }, "nodeParent": 4, "label": "rankList", "isOpen": true, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 12, "child": [] }, { "x": 30, "type": "Label", "searchKey": "Label", "props": { "y": 147, "x": 271, "text": "最高分数", "layoutEnabled": true, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": true }, "nodeParent": 4, "label": "Label", "isOpen": true, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 20, "child": [] }, { "x": 30, "type": "Label", "searchKey": "Label,myBestScore", "props": { "y": 191, "x": 252, "var": "myBestScore", "text": "555555", "layoutEnabled": true, "fontSize": 48, "color": "#ffffff", "align": "center" }, "nodeParent": 4, "label": "myBestScore", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 21, "child": [] }, { "x": 30, "type": "Image", "searchKey": "Image,moreRankBtn", "props": { "y": 895, "x": 250, "var": "moreRankBtn", "skin": "img/rank_btn_more.png" }, "nodeParent": 4, "label": "moreRankBtn", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 6, "child": [] }], "$LOCKED": true }, { "x": 15, "type": "Image", "searchKey": "Image,title", "props": { "y": 75, "x": 46, "var": "title", "skin": "img/rank_img_title.png", "centerX": 0 }, "nodeParent": 1, "label": "title", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 5, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image,challengeBtn", "props": { "y": 1112, "var": "challengeBtn", "skin": "img/rank_btn_challenge.png", "layoutEnabled": true, "centerX": 0 }, "nodeParent": 1, "label": "challengeBtn", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 7, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image,backBtn", "props": { "var": "backBtn", "top": 18, "skin": "img/rank_btn_back.png", "left": 26, "layoutEnabled": true }, "nodeParent": 1, "label": "backBtn", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 8, "child": [] }], "animations": [{ "nodes": [], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
		constructor() { super() }
		createChildren(): void {
			View.regComponent("ui.RankItemUI", ui.RankItemUI);

			super.createChildren();
			this.createView(ui.RankUI.uiView);

		}

	}
}

module ui {
	export class RankItemUI extends Laya.Box {
		public itemBg: Laya.Image;
		public rankingNum: Laya.Label;
		public nickname: Laya.Label;
		public score: Laya.Label;

		public static uiView: any = { "x": 0, "type": "Box", "selectedBox": 1, "selecteID": 7, "searchKey": "Box", "props": { "y": 0, "x": 0, "width": 601, "height": 93 }, "nodeParent": -1, "maxID": 9, "label": "Box", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 1, "child": [{ "x": 15, "type": "Image", "searchKey": "Image,itemBg", "props": { "y": 0, "x": 0, "var": "itemBg", "skin": "img/rank_listbg_04.png" }, "nodeParent": 1, "label": "itemBg", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 2, "child": [{ "x": 30, "type": "Image", "searchKey": "Image,rankingIcon", "props": { "y": 17, "x": 496, "var": "rankingIcon", "skin": "img/rank_place_04.png", "layoutEnabled": true }, "nodeParent": 2, "label": "rankingIcon", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 3, "child": [{ "x": 45, "type": "Label", "searchKey": "Label,rankingNum", "props": { "y": 16, "x": 11, "width": 35, "var": "rankingNum", "text": "1", "layoutEnabled": true, "height": 30, "fontSize": 30, "color": "#000000", "bold": true, "align": "center" }, "nodeParent": 3, "label": "rankingNum", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 4, "child": [] }] }] }, { "x": 15, "type": "Label", "searchKey": "Label,nickname", "props": { "y": 16.5, "x": 68, "var": "nickname", "text": "昵称", "fontSize": 30, "color": "#d48928", "bold": true }, "nodeParent": 1, "label": "nickname", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 6, "child": [] }, { "x": 15, "type": "Label", "searchKey": "Label", "props": { "y": 49, "x": 68, "text": "分数：", "fontSize": 30, "color": "#b47d80", "bold": true }, "nodeParent": 1, "label": "Label", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 7, "child": [{ "x": 30, "type": "Label", "searchKey": "Label,score", "props": { "y": 3, "x": 81, "width": 249, "var": "score", "text": "0000", "height": 30, "fontSize": 30, "color": "#b47d80", "bold": true, "align": "left" }, "nodeParent": 7, "label": "score", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 8, "child": [] }] }], "animations": [{ "nodes": [], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
		constructor() { super(); this.createUI(ui.RankItemUI.uiView); }
		createUI(uiData: any): void {

			laya.utils.ClassUtils.createByJson(uiData, this, this);

		}

	}
}

module ui {
	export class sceneUI extends View {
		public player: Laya.Image;
		public launchPic: Laya.Box;
		public currentScore: Laya.Label;
		public bulletPower: laya.display.Text;
		public bulletSpeed: laya.display.Text;
		public nextCheckpointScore: laya.display.Text;
		public indexCheckpointScore: laya.display.Text;
		public progress: Laya.ProgressBar;
		public effectPicture_1: Laya.Image;
		public effectPicture_2: Laya.Image;
		public propTimeIcon: Laya.Image;
		public propTime: Laya.Label;

		public static uiView: any = { "x": 0, "type": "View", "selectedBox": 1, "selecteID": 24, "searchKey": "View", "props": { "width": 720, "value": -232, "top": 0, "sceneColor": "#000000", "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0 }, "nodeParent": -1, "maxID": 63, "label": "View", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 1, "child": [{ "x": 15, "type": "Image", "searchKey": "Image,player", "props": { "y": 1042, "x": 360, "width": 143, "var": "player", "skin": "img/main_img_plane.png", "layoutEnabled": true, "height": 128, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "nodeParent": 1, "label": "player", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 3, "child": [{ "type": "Box", "searchKey": "Box,launchPic", "props": { "visible": false, "var": "launchPic" }, "nodeParent": 3, "label": "launchPic", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 51, "child": [{ "type": "Image", "searchKey": "Image", "props": { "y": 73, "x": -18, "skin": "prop/main_img_emitter.png", "scaleX": -1, "rotation": 0 }, "nodeParent": 51, "label": "Image", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 47, "child": [] }, { "type": "Image", "searchKey": "Image", "props": { "y": 73, "x": 162, "skin": "prop/main_img_emitter.png" }, "nodeParent": 51, "label": "Image", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 48, "child": [] }] }] }, { "x": 15, "type": "Label", "searchKey": "Label,currentScore", "props": { "y": 153, "width": 166, "var": "currentScore", "text": "0", "layoutEnabled": true, "height": 60, "fontSize": 50, "color": "#ffffff", "centerX": 0, "bold": true, "align": "center" }, "nodeParent": 1, "label": "currentScore", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 60, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image", "props": { "top": 25, "skin": "img/main_plane_info.png", "left": 19, "layoutEnabled": true }, "nodeParent": 1, "label": "Image", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 30, "child": [{ "type": "Text", "searchKey": "Text,bulletPower", "props": { "y": 48, "x": 94, "width": 89, "var": "bulletPower", "valign": "middle", "text": "100%", "height": 20, "fontSize": 20, "color": "#ffffff", "bold": true, "align": "left" }, "nodeParent": 30, "label": "bulletPower", "isOpen": false, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 10, "child": [] }, { "type": "Text", "searchKey": "Text,bulletSpeed", "props": { "y": 6, "x": 111, "width": 76, "var": "bulletSpeed", "valign": "middle", "text": "10", "height": 19, "fontSize": 20, "color": "#fbfbfb", "bold": true, "align": "left" }, "nodeParent": 30, "label": "bulletSpeed", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 21, "child": [] }], "$LOCKED": false, "$HIDDEN": false }, { "x": 15, "type": "Text", "searchKey": "Text,nextCheckpointScore", "props": { "y": 261, "x": 360, "width": 166, "visible": false, "var": "nextCheckpointScore", "text": "text", "height": 12, "color": "#ffffff", "align": "left" }, "nodeParent": 1, "label": "nextCheckpointScore", "isOpen": false, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 13, "child": [] }, { "x": 15, "type": "Text", "searchKey": "Text", "props": { "y": 261, "x": 354, "visible": false, "text": "/", "color": "#ffffff" }, "nodeParent": 1, "label": "Text", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 14, "child": [] }, { "x": 15, "type": "Text", "searchKey": "Text,indexCheckpointScore", "props": { "y": 261, "x": 182, "width": 169, "visible": false, "var": "indexCheckpointScore", "text": "text", "height": 12, "color": "#ffffff", "align": "right" }, "nodeParent": 1, "label": "indexCheckpointScore", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 15, "child": [] }, { "x": 15, "type": "ProgressBar", "searchKey": "ProgressBar", "props": { "y": 220, "width": 342, "value": 0, "skin": "img/progressBar.png", "layoutEnabled": true, "height": 29, "centerX": 0 }, "nodeParent": 1, "label": "ProgressBar", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 40, "child": [{ "type": "ProgressBar", "searchKey": "ProgressBar,progress", "props": { "y": 6, "x": 6, "width": 329, "var": "progress", "value": 1, "skin": "img/progressBar.png", "scaleY": 0.6, "height": 29 }, "nodeParent": 40, "label": "progress", "isOpen": false, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 39, "child": [] }, { "type": "Image", "searchKey": "Image", "props": { "y": -9, "x": -37, "skin": "img/main_bar_03.png" }, "nodeParent": 40, "label": "Image", "isOpen": false, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 41, "child": [] }, { "type": "Image", "searchKey": "Image", "props": { "y": -9, "x": 330, "skin": "img/main_bar_04.png" }, "nodeParent": 40, "label": "Image", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 42, "child": [] }] }, { "x": 15, "type": "Image", "searchKey": "Image,effectPicture_1", "props": { "visible": false, "var": "effectPicture_1", "top": 0, "skin": "img/main_warning.png", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0, "alpha": 1 }, "nodeParent": 1, "label": "effectPicture_1", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 56, "child": [], "$HIDDEN": false }, { "x": 15, "type": "Image", "searchKey": "Image,effectPicture_2", "props": { "visible": false, "var": "effectPicture_2", "top": 0, "skin": "img/main_warning_02.png", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0, "alpha": 1 }, "nodeParent": 1, "label": "effectPicture_2", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 57, "child": [], "$HIDDEN": false }, { "x": 15, "type": "Image", "searchKey": "Image,propTimeIcon", "props": { "y": 257, "x": 318, "width": 36, "visible": false, "var": "propTimeIcon", "skin": "prop/main_icon_launcher.png", "height": 36 }, "nodeParent": 1, "label": "propTimeIcon", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 62, "child": [{ "x": 30, "type": "Label", "searchKey": "Label,propTime", "props": { "y": -2, "x": 47, "var": "propTime", "text": "20", "fontSize": 36, "color": "#ffffff", "bold": true }, "nodeParent": 62, "label": "propTime", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 61, "child": [] }] }], "animations": [{ "nodes": [], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
		constructor() { super() }
		createChildren(): void {
			View.regComponent("Text", laya.display.Text);

			super.createChildren();
			this.createView(ui.sceneUI.uiView);

		}

	}
}

module ui {
	export class StartSceneUI extends View {
		public bg: Laya.Image;
		public maxScore: Laya.Label;
		public maxScoreText: Laya.TextInput;
		public txtName: Laya.Label;
		public txtNameText: Laya.TextInput;

		public beginButton: Laya.Image;
		public logo: Laya.Image;
		public rankingButton: Laya.Image;

		public static uiView: any = { "x": 0, "type": "View", "selectedBox": 44, "selecteID": 48, "searchKey": "View", "props": { "y": 0, "width": 720, "top": 0, "sceneColor": "#000000", "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0 }, "nodeParent": -1, "maxID": 49, "label": "View", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 1, "child": [{ "x": 15, "type": "Image", "searchKey": "Image,bg", "props": { "var": "bg", "top": 0, "skin": "background/bg_start.jpg", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0 }, "nodeParent": 1, "label": "bg", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 19, "child": [], "$LOCKED": false, "$HIDDEN": false }, { "x": 15, "type": "Label", "searchKey": "Label,txtName", "props": { "width": 97, "var": "txtName", "top": 576, "text": "姓名:", "layoutEnabled": true, "height": 44, "fontSize": 36, "font": "Helvetica", "color": "#ffb739", "centerX": -4, "bold": true, "align": "right" }, "nodeParent": 1, "label": "txtName", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 26, "child": [{ "x": 30, "type": "TextInput", "searchKey": "TextInput,txtNameText,txtNameText", "props": { "y": 0, "x": 109, "width": 122, "var": "txtNameText", "skin": "covp/textinput.png", "name": "txtNameText", "height": 41, "fontSize": 20 }, "nodeParent": 26, "label": "txtNameText", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 47, "child": [] }] }, { "x": 15, "type": "Label", "searchKey": "Label,maxScore", "props": { "width": 236, "var": "maxScore", "top": 514, "text": "当前最高分：", "layoutEnabled": true, "height": 44, "fontSize": 36, "font": "Helvetica", "color": "#ffb739", "centerX": -29, "bold": true, "align": "left" }, "nodeParent": 1, "label": "maxScore", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 44, "child": [{ "x": 30, "type": "TextInput", "searchKey": "TextInput,maxScoreText", "props": { "y": 0, "x": 204, "width": 122, "var": "maxScoreText", "skin": "covp/textinput.png", "height": 41, "fontSize": 20 }, "nodeParent": 44, "label": "maxScoreText", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 48, "child": [] }] }, { "x": 15, "type": "Image", "searchKey": "Image,beginButton", "props": { "y": 670, "var": "beginButton", "skin": "img/start_btn_shartgame.png", "layoutEnabled": true, "centerX": 0 }, "nodeParent": 1, "label": "beginButton", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 37, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image,logo", "props": { "y": 200, "var": "logo", "skin": "img/start_img_logo.png", "layoutEnabled": true, "centerX": 0 }, "nodeParent": 1, "label": "logo", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 38, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image,rankingButton", "props": { "y": 938, "var": "rankingButton", "skin": "img/start_btn_rank.png", "left": 256, "layoutEnabled": true, "anchorY": 0.5, "anchorX": 0.5 }, "nodeParent": 1, "label": "rankingButton", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 43, "child": [] }], "animations": [{ "nodes": [], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "$HIDDEN": false };
		constructor() { super() }
		createChildren(): void {

			super.createChildren();
			this.createView(ui.StartSceneUI.uiView);

		}

	}
}
