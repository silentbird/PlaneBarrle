var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
        GameOverUI.uiView = { "type": "View", "props": { "width": 512, "top": 0, "right": 0, "left": 0, "layoutEnabled": true, "height": 768, "bottom": 0, "alpha": 1 }, "child": [{ "type": "Label", "props": { "y": 338, "width": 117, "text": "本次得分：", "layoutEnabled": true, "height": 33, "fontSize": 25, "font": "Arial", "color": "#ea8a32", "centerX": 0, "bold": true, "align": "center" }, "child": [{ "type": "Text", "props": { "y": 5, "x": 117, "width": 227, "var": "scoreText", "text": "00", "height": 23, "fontSize": 20, "font": "Arial", "color": "#ff1b17", "align": "left" } }] }, { "type": "Label", "props": { "y": 265, "width": 138, "text": "最高得分：", "layoutEnabled": true, "height": 35, "fontSize": 30, "font": "Arial", "color": "#f93f3b", "centerX": 0, "bold": true, "align": "center" }, "child": [{ "type": "Text", "props": { "y": 7, "x": 138, "width": 227, "var": "bestScoreText", "text": "00", "height": 23, "fontSize": 20, "font": "Arial", "color": "#ff0703", "align": "left" } }] }, { "type": "Image", "props": { "y": 451, "var": "Again", "skin": "button_again01.png", "layoutEnabled": true, "centerX": -86 } }, { "type": "Image", "props": { "y": 451, "var": "Back", "skin": "button_back01.png", "layoutEnabled": true, "centerX": 106 } }] };
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
        HelpeUI.uiView = { "type": "View", "props": { "width": 512, "top": 0, "right": 0, "left": 0, "layoutEnabled": true, "height": 768, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "width": 512, "skin": "bgbg.png", "layoutEnabled": true, "height": 768, "centerX": 0 } }, { "type": "Label", "props": { "y": 288, "x": 132, "text": "HelpText", "layoutEnabled": true, "fontSize": 60, "color": "#ffffff", "centerX": 0, "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 287, "x": 1, "skin": "img7.png" } }] };
        return HelpeUI;
    }(View));
    ui.HelpeUI = HelpeUI;
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
        sceneUI.uiView = { "type": "View", "props": { "width": 512, "top": 0, "right": 0, "left": 0, "layoutEnabled": true, "height": 768, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 678, "x": -185, "width": 960, "skin": "floor.png", "sizeGrid": "28,0,0,0", "height": 91 } }, { "type": "Image", "props": { "y": 643, "width": 50, "var": "player", "skin": "plane02.png", "pivotY": 16, "pivotX": 25, "layoutEnabled": true, "height": 32, "centerX": 0 } }, { "type": "ProgressBar", "props": { "width": 285, "var": "progress", "value": 0, "top": 135, "skin": "progressBar.png", "layoutEnabled": true, "height": 15, "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": 17, "x": 135, "width": 166, "var": "nextCheckpointScore", "text": "text", "height": 12, "color": "#ffffff", "align": "left" } }, { "type": "Text", "props": { "y": 17, "x": 129, "text": "/", "color": "#ffffff" } }, { "type": "Text", "props": { "y": 17, "x": -43, "width": 169, "var": "indexCheckpointScore", "text": "text", "height": 12, "color": "#ffffff", "align": "right" } }] }, { "type": "Text", "props": { "y": 108, "x": 179, "width": 96, "text": "当前分数：", "height": 24, "fontSize": 20, "color": "#fbc826", "bold": true, "align": "center" }, "child": [{ "type": "Text", "props": { "y": 1, "x": 94, "width": 205, "var": "currentScore", "text": "0", "height": 20, "fontSize": 20, "color": "#ffffff", "align": "left" } }] }, { "type": "Text", "props": { "y": 15, "x": 321, "width": 34, "text": "最高分数：", "height": 14, "fontSize": 15, "color": "#fb4825", "bold": true, "align": "center" }, "child": [{ "type": "Text", "props": { "y": 1, "x": 74, "width": 199, "var": "MaxSocre", "text": "0", "height": 15, "fontSize": 15, "color": "#ffffff", "align": "left" } }] }, { "type": "Text", "props": { "y": 15, "x": 250, "var": "checkpointText", "text": "0", "fontSize": 20, "color": "#ffffff" } }, { "type": "Image", "props": { "var": "ui01", "top": 18, "skin": "face_16.png", "left": 24, "layoutEnabled": true, "height": 30 }, "child": [{ "type": "Text", "props": { "y": 5, "x": 33, "width": 56, "var": "bulletPower", "valign": "middle", "text": "0", "height": 20, "fontSize": 20, "color": "#ffffff", "bold": true, "align": "left" } }] }, { "type": "Image", "props": { "width": 29, "top": 56, "skin": "score_star0.png", "left": 24, "layoutEnabled": true, "height": 31 }, "child": [{ "type": "Text", "props": { "y": 9, "x": 33, "width": 58, "var": "bulletSpeed", "text": "0", "height": 15, "fontSize": 20, "color": "#fbfbfb", "bold": true, "align": "left" } }] }, { "type": "Image", "props": { "width": 61, "var": "invincible", "skin": "shield.png", "right": 40, "mouseThrough": true, "layoutEnabled": true, "hitTestPrior": true, "height": 59, "bottom": 10 }, "child": [{ "type": "Label", "props": { "y": 21, "var": "invincibleNumText", "valign": "middle", "text": "X2", "left": 63, "layoutEnabled": true, "fontSize": 25, "color": "#000000", "bold": true, "align": "center" } }, { "type": "Label", "props": { "visible": false, "var": "invincibleTime", "text": "60s", "layoutEnabled": true, "fontSize": 15, "color": "#000000", "centerY": 0, "centerX": 0, "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "x": 21, "var": "explosion", "skin": "champion.png", "mouseThrough": true, "left": 21, "layoutEnabled": true, "hitTestPrior": true, "bottom": 10 }, "child": [{ "type": "Label", "props": { "y": 29, "width": 36, "var": "explosionNumText", "valign": "middle", "text": "X0", "left": 64, "layoutEnabled": true, "height": 24, "fontSize": 25, "color": "#000000", "bold": true, "align": "left" } }, { "type": "Label", "props": { "visible": false, "var": "explosionTime", "top": 29, "text": "60s", "left": 18, "layoutEnabled": true, "fontSize": 15, "color": "#030303", "bold": true, "align": "center" } }] }] };
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
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.StartSceneUI.uiView);
        };
        StartSceneUI.uiView = { "type": "View", "props": { "y": 0, "width": 512, "top": 0, "right": 0, "left": 0, "layoutEnabled": true, "height": 768, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bg", "top": 0, "skin": "gamebg.jpg", "layoutEnabled": true, "centerX": 0, "bottom": 0 } }, { "type": "Label", "props": { "var": "logo", "valign": "middle", "top": 112, "text": "分裂吧血小板", "layoutEnabled": true, "height": 60, "fontSize": 50, "color": "#ffffff", "centerX": 0, "bold": true, "align": "center" } }, { "type": "Image", "props": { "var": "tubiao", "top": 608, "skin": "hero_fly1.png", "layoutEnabled": true, "centerX": 0, "bottom": 48 } }, { "type": "Image", "props": { "width": 79, "var": "help", "top": 30, "skin": "img7.png", "left": 21, "layoutEnabled": true, "height": 43 }, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "帮助", "right": 0, "left": 0, "layoutEnabled": true, "fontSize": 20, "color": "#ffffff", "bottom": 0, "bold": true, "align": "center" } }] }, { "type": "Label", "props": { "width": 149, "var": "maxScore", "top": 200, "text": "当前最高分数：", "layoutEnabled": true, "height": 24, "fontSize": 20, "color": "#ffffff", "centerX": 0, "bold": true, "align": "left" }, "child": [{ "type": "Label", "props": { "y": 1, "x": 138, "width": 145, "var": "maxScoreText", "text": "0", "layoutEnabled": true, "height": 20, "fontSize": 20, "color": "#ffffff", "bold": true, "align": "left" } }] }, { "type": "Image", "props": { "width": 184, "var": "beginButton", "top": 262, "skin": "img7.png", "mouseThrough": false, "mouseEnabled": true, "layoutEnabled": true, "height": 63, "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": 6, "x": 39, "text": "开始", "fontSize": 50, "color": "#fbfbfb" } }] }, { "type": "Image", "props": { "y": 354, "width": 184, "var": "rankingButton", "top": 354, "skin": "img7.png", "mouseThrough": false, "mouseEnabled": true, "layoutEnabled": true, "height": 63, "centerX": 0 }, "child": [{ "type": "Label", "props": { "valign": "middle", "top": 0, "text": "排行榜", "right": 0, "left": 0, "layoutEnabled": true, "fontSize": 40, "color": "#f9f9f9", "bottom": 0, "align": "center" } }] }, { "type": "Image", "props": { "y": 457, "width": 184, "var": "shareButton", "top": 457, "skin": "img7.png", "mouseThrough": false, "mouseEnabled": true, "layoutEnabled": true, "height": 63, "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": 6, "x": 39, "text": "分享", "fontSize": 50, "color": "#ffffff" } }] }] };
        return StartSceneUI;
    }(View));
    ui.StartSceneUI = StartSceneUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map