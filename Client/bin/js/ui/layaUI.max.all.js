var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var GameOverUI = /** @class */ (function (_super) {
        __extends(GameOverUI, _super);
        function GameOverUI() {
            return _super.call(this) || this;
        }
        GameOverUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.GameOverUI.uiView);
        };
        GameOverUI.uiView = { "type": "View", "props": { "width": 720, "top": 0, "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0, "alpha": 1 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "background/bg_rank.jpg", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0 } }, { "type": "Image", "props": { "y": 499, "x": 360, "skin": "img/clear_img_bg.png", "layoutEnabled": true, "centerY": -141, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 321, "x": 135, "skin": "img/clear_img_highest.png" }, "child": [{ "type": "Text", "props": { "y": 14, "x": 250, "width": 227, "var": "bestScoreText", "text": "00", "height": 31, "fontSize": 30, "font": "Arial", "color": "#747474", "align": "left" } }] }, { "type": "Image", "props": { "y": 816, "x": 280, "width": 164, "var": "showRank", "skin": "img/rank_pic.jpg", "mouseThrough": true, "mouseEnabled": true, "layoutEnabled": true, "height": 37, "alpha": 0 } }] }, { "type": "Label", "props": { "width": 228, "var": "scoreText", "top": 249, "text": "7851", "layoutEnabled": true, "height": 108, "fontSize": 103, "font": "Microsoft YaHei", "color": "000000", "centerX": -8, "align": "center" } }, { "type": "Image", "props": { "var": "challenge", "skin": "img/clear_btn_challenge.png", "centerX": -2, "bottom": 764 } }, { "type": "Image", "props": { "y": 1019, "x": 169, "var": "Back", "skin": "img/clear_btn_back.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 1019, "x": 478, "var": "Again", "skin": "img/clear_btn_resurrection.png", "anchorY": 0.5, "anchorX": 0.5 } }] };
        return GameOverUI;
    }(View));
    ui.GameOverUI = GameOverUI;
})(ui || (ui = {}));
(function (ui) {
    var HelpeUI = /** @class */ (function (_super) {
        __extends(HelpeUI, _super);
        function HelpeUI() {
            return _super.call(this) || this;
        }
        HelpeUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.HelpeUI.uiView);
        };
        HelpeUI.uiView = { "type": "View", "props": { "width": 720, "top": 0, "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0 }, "child": [{ "type": "Image", "props": { "top": 0, "skin": "background/bg_rank.jpg", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0 } }, { "type": "Image", "props": { "skin": "img/help_img_bg.png", "layoutEnabled": true, "centerY": 0, "centerX": 0 } }, { "type": "Image", "props": { "var": "backButton", "skin": "img/help_btn_back.png", "left": 0, "layoutEnabled": true, "centerY": 0 } }] };
        return HelpeUI;
    }(View));
    ui.HelpeUI = HelpeUI;
})(ui || (ui = {}));
(function (ui) {
    var RankUI = /** @class */ (function (_super) {
        __extends(RankUI, _super);
        function RankUI() {
            return _super.call(this) || this;
        }
        RankUI.prototype.createChildren = function () {
            View.regComponent("ui.RankItemUI", ui.RankItemUI);
            _super.prototype.createChildren.call(this);
            this.createView(ui.RankUI.uiView);
        };
        RankUI.uiView = { "type": "View", "props": { "width": 720, "top": 0, "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "bg", "top": 0, "skin": "background/bg_rank.jpg", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0 } }, { "type": "Image", "props": { "y": 99, "x": 27, "skin": "img/rank_img_bg.png", "layoutEnabled": true, "centerX": 0 }, "child": [{ "type": "Panel", "props": { "y": 272, "x": 20, "width": 636, "var": "item0", "height": 100 }, "child": [{ "type": "VBox", "props": { "var": "bestPlayer" }, "child": [{ "type": "RankItem", "props": { "runtime": "ui.RankItemUI" } }] }] }, { "type": "Panel", "props": { "y": 429, "x": 20, "width": 636, "var": "item1", "vScrollBarSkin": "img/vscroll.png", "height": 447 }, "child": [{ "type": "VBox", "props": { "y": 18, "x": 8, "var": "rankList", "space": 20 }, "child": [{ "type": "RankItem", "props": { "runtime": "ui.RankItemUI" } }, { "type": "RankItem", "props": { "runtime": "ui.RankItemUI" } }, { "type": "RankItem", "props": { "runtime": "ui.RankItemUI" } }, { "type": "RankItem", "props": { "runtime": "ui.RankItemUI" } }, { "type": "RankItem", "props": { "runtime": "ui.RankItemUI" } }, { "type": "RankItem", "props": { "runtime": "ui.RankItemUI" } }] }] }, { "type": "Label", "props": { "y": 147, "x": 271, "text": "最高分数", "layoutEnabled": true, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "bold": true } }, { "type": "Label", "props": { "y": 191, "x": 252, "var": "myBestScore", "text": "555555", "layoutEnabled": true, "fontSize": 48, "color": "#ffffff", "align": "center" } }, { "type": "Image", "props": { "y": 895, "x": 250, "var": "moreRankBtn", "skin": "img/rank_btn_more.png" } }] }, { "type": "Image", "props": { "y": 75, "x": 46, "var": "title", "skin": "img/rank_img_title.png", "centerX": 0 } }, { "type": "Image", "props": { "y": 1112, "var": "challengeBtn", "skin": "img/rank_btn_challenge.png", "layoutEnabled": true, "centerX": 0 } }, { "type": "Image", "props": { "var": "backBtn", "top": 18, "skin": "img/rank_btn_back.png", "left": 26, "layoutEnabled": true } }] };
        return RankUI;
    }(View));
    ui.RankUI = RankUI;
})(ui || (ui = {}));
(function (ui) {
    var RankItemUI = /** @class */ (function (_super) {
        __extends(RankItemUI, _super);
        function RankItemUI() {
            var _this = _super.call(this) || this;
            _this.createUI(ui.RankItemUI.uiView);
            return _this;
        }
        RankItemUI.prototype.createUI = function (uiData) {
            laya.utils.ClassUtils.createByJson(uiData, this, this);
        };
        RankItemUI.uiView = { "type": "Box", "props": { "y": 0, "x": 0, "width": 601, "height": 93 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "itemBg", "skin": "img/rank_listbg_04.png" }, "child": [{ "type": "Image", "props": { "y": 17, "x": 496, "var": "rankingIcon", "skin": "img/rank_place_04.png", "layoutEnabled": true }, "child": [{ "type": "Label", "props": { "y": 16, "x": 11, "width": 35, "var": "rankingNum", "text": "1", "layoutEnabled": true, "height": 30, "fontSize": 30, "color": "#000000", "bold": true, "align": "center" } }] }] }, { "type": "Image", "props": { "y": 7, "x": 26, "width": 78, "var": "playerUrl", "skin": "img/rank_pic.jpg", "height": 79 } }, { "type": "Label", "props": { "y": 16, "x": 117, "var": "nickname", "text": "昵称", "fontSize": 30, "color": "#d48928", "bold": true } }, { "type": "Label", "props": { "y": 48, "x": 117, "text": "分数：", "fontSize": 30, "color": "#b47d80", "bold": true }, "child": [{ "type": "Label", "props": { "y": 3, "x": 81, "width": 249, "var": "score", "text": "0000", "height": 30, "fontSize": 30, "color": "#b47d80", "bold": true, "align": "left" } }] }] };
        return RankItemUI;
    }(Laya.Box));
    ui.RankItemUI = RankItemUI;
})(ui || (ui = {}));
(function (ui) {
    var sceneUI = /** @class */ (function (_super) {
        __extends(sceneUI, _super);
        function sceneUI() {
            return _super.call(this) || this;
        }
        sceneUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.sceneUI.uiView);
        };
        sceneUI.uiView = { "x": 0, "type": "View", "selectedBox": 1, "selecteID": 24, "searchKey": "View", "props": { "width": 720, "value": -232, "top": 0, "sceneColor": "#000000", "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0 }, "nodeParent": -1, "maxID": 63, "label": "View", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 1, "child": [{ "x": 15, "type": "Image", "searchKey": "Image,player", "props": { "y": 1042, "x": 360, "width": 143, "var": "player", "skin": "img/main_img_plane.png", "layoutEnabled": true, "height": 128, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "nodeParent": 1, "label": "player", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 3, "child": [{ "type": "Box", "searchKey": "Box,launchPic", "props": { "visible": false, "var": "launchPic" }, "nodeParent": 3, "label": "launchPic", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 51, "child": [{ "type": "Image", "searchKey": "Image", "props": { "y": 73, "x": -18, "skin": "prop/main_img_emitter.png", "scaleX": -1, "rotation": 0 }, "nodeParent": 51, "label": "Image", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 47, "child": [] }, { "type": "Image", "searchKey": "Image", "props": { "y": 73, "x": 162, "skin": "prop/main_img_emitter.png" }, "nodeParent": 51, "label": "Image", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 48, "child": [] }] }] }, { "x": 15, "type": "Label", "searchKey": "Label,currentScore", "props": { "y": 153, "width": 166, "var": "currentScore", "text": "0", "layoutEnabled": true, "height": 60, "fontSize": 50, "color": "#ffffff", "centerX": 0, "bold": true, "align": "center" }, "nodeParent": 1, "label": "currentScore", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 60, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image", "props": { "top": 25, "skin": "img/main_plane_info.png", "left": 19, "layoutEnabled": true }, "nodeParent": 1, "label": "Image", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 30, "child": [{ "type": "Text", "searchKey": "Text,bulletPower", "props": { "y": 48, "x": 94, "width": 89, "var": "bulletPower", "valign": "middle", "text": "100%", "height": 20, "fontSize": 20, "color": "#ffffff", "bold": true, "align": "left" }, "nodeParent": 30, "label": "bulletPower", "isOpen": false, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 10, "child": [] }, { "type": "Text", "searchKey": "Text,bulletSpeed", "props": { "y": 6, "x": 111, "width": 76, "var": "bulletSpeed", "valign": "middle", "text": "10", "height": 19, "fontSize": 20, "color": "#fbfbfb", "bold": true, "align": "left" }, "nodeParent": 30, "label": "bulletSpeed", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 21, "child": [] }], "$LOCKED": false, "$HIDDEN": false }, { "x": 15, "type": "Text", "searchKey": "Text,nextCheckpointScore", "props": { "y": 261, "x": 360, "width": 166, "visible": false, "var": "nextCheckpointScore", "text": "text", "height": 12, "color": "#ffffff", "align": "left" }, "nodeParent": 1, "label": "nextCheckpointScore", "isOpen": false, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 13, "child": [] }, { "x": 15, "type": "Text", "searchKey": "Text", "props": { "y": 261, "x": 354, "visible": false, "text": "/", "color": "#ffffff" }, "nodeParent": 1, "label": "Text", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 14, "child": [] }, { "x": 15, "type": "Text", "searchKey": "Text,indexCheckpointScore", "props": { "y": 261, "x": 182, "width": 169, "visible": false, "var": "indexCheckpointScore", "text": "text", "height": 12, "color": "#ffffff", "align": "right" }, "nodeParent": 1, "label": "indexCheckpointScore", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 15, "child": [] }, { "x": 15, "type": "ProgressBar", "searchKey": "ProgressBar", "props": { "y": 220, "width": 342, "value": 0, "skin": "img/progressBar.png", "layoutEnabled": true, "height": 29, "centerX": 0 }, "nodeParent": 1, "label": "ProgressBar", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 40, "child": [{ "type": "ProgressBar", "searchKey": "ProgressBar,progress", "props": { "y": 6, "x": 6, "width": 329, "var": "progress", "value": 1, "skin": "img/progressBar.png", "scaleY": 0.6, "height": 29 }, "nodeParent": 40, "label": "progress", "isOpen": false, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 39, "child": [] }, { "type": "Image", "searchKey": "Image", "props": { "y": -9, "x": -37, "skin": "img/main_bar_03.png" }, "nodeParent": 40, "label": "Image", "isOpen": false, "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 41, "child": [] }, { "type": "Image", "searchKey": "Image", "props": { "y": -9, "x": 330, "skin": "img/main_bar_04.png" }, "nodeParent": 40, "label": "Image", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 42, "child": [] }] }, { "x": 15, "type": "Image", "searchKey": "Image,effectPicture_1", "props": { "visible": false, "var": "effectPicture_1", "top": 0, "skin": "img/main_warning.png", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0, "alpha": 1 }, "nodeParent": 1, "label": "effectPicture_1", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 56, "child": [], "$HIDDEN": false }, { "x": 15, "type": "Image", "searchKey": "Image,effectPicture_2", "props": { "visible": false, "var": "effectPicture_2", "top": 0, "skin": "img/main_warning_02.png", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0, "alpha": 1 }, "nodeParent": 1, "label": "effectPicture_2", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 57, "child": [], "$HIDDEN": false }, { "x": 15, "type": "Image", "searchKey": "Image,propTimeIcon", "props": { "y": 257, "x": 318, "width": 36, "visible": false, "var": "propTimeIcon", "skin": "prop/main_icon_launcher.png", "height": 36 }, "nodeParent": 1, "label": "propTimeIcon", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 62, "child": [{ "x": 30, "type": "Label", "searchKey": "Label,propTime", "props": { "y": -2, "x": 47, "var": "propTime", "text": "20", "fontSize": 36, "color": "#ffffff", "bold": true }, "nodeParent": 62, "label": "propTime", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 61, "child": [] }] }], "animations": [{ "nodes": [], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }] };
        return sceneUI;
    }(View));
    ui.sceneUI = sceneUI;
})(ui || (ui = {}));
(function (ui) {
    var StartSceneUI = /** @class */ (function (_super) {
        __extends(StartSceneUI, _super);
        function StartSceneUI() {
            return _super.call(this) || this;
        }
        StartSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.StartSceneUI.uiView);
        };
        StartSceneUI.uiView = { "x": 0, "type": "View", "selectedBox": 1, "selecteID": 43, "searchKey": "View", "props": { "y": 0, "width": 720, "top": 0, "sceneColor": "#000000", "right": 0, "left": 0, "layoutEnabled": true, "height": 1280, "bottom": 0 }, "nodeParent": -1, "maxID": 44, "label": "View", "isOpen": true, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 1, "child": [{ "x": 15, "type": "Image", "searchKey": "Image,bg", "props": { "var": "bg", "top": 0, "skin": "background/bg_start.jpg", "right": 0, "left": 0, "layoutEnabled": true, "bottom": 0 }, "nodeParent": 1, "label": "bg", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 19, "child": [], "$LOCKED": false, "$HIDDEN": false }, { "x": 15, "type": "Label", "searchKey": "Label,maxScore", "props": { "width": 236, "var": "maxScore", "top": 512, "text": "当前最高分：", "layoutEnabled": true, "height": 44, "fontSize": 36, "font": "Helvetica", "color": "#ffb739", "centerX": -28, "bold": true, "align": "left" }, "nodeParent": 1, "label": "maxScore", "isOpen": false, "isDirectory": true, "isAniNode": true, "hasChild": true, "compId": 26, "child": [{ "type": "Label", "searchKey": "Label,maxScoreText", "props": { "y": 3, "x": 203, "width": 145, "var": "maxScoreText", "text": "0", "layoutEnabled": true, "height": 39, "fontSize": 36, "color": "#ffffff", "bold": true, "align": "left" }, "nodeParent": 26, "label": "maxScoreText", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 27, "child": [] }] }, { "x": 15, "type": "Image", "searchKey": "Image,beginButton", "props": { "y": 670, "var": "beginButton", "skin": "img/start_btn_shartgame.png", "layoutEnabled": true, "centerX": 0 }, "nodeParent": 1, "label": "beginButton", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 37, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image,logo", "props": { "y": 200, "var": "logo", "skin": "img/start_img_logo.png", "layoutEnabled": true, "centerX": 0 }, "nodeParent": 1, "label": "logo", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 38, "child": [] }, { "x": 15, "type": "Image", "searchKey": "Image,rankingButton", "props": { "y": 938, "var": "rankingButton", "skin": "img/start_btn_rank.png", "left": 256, "layoutEnabled": true, "anchorY": 0.5, "anchorX": 0.5 }, "nodeParent": 1, "label": "rankingButton", "isDirectory": false, "isAniNode": true, "hasChild": false, "compId": 43, "child": [] }], "animations": [{ "nodes": [], "name": "ani1", "id": 1, "frameRate": 24, "action": 0 }], "$HIDDEN": false };
        return StartSceneUI;
    }(View));
    ui.StartSceneUI = StartSceneUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map