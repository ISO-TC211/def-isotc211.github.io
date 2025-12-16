"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  // Requires accompanying CSS rules, based on classes on main container
  // (body) that style header, menu and trigger button.
  // Container classes used: .with-expandable-nav, .with-expanded-nav
  var NavTrigger = /*#__PURE__*/function () {
    function NavTrigger(_ref) {
      var triggerTemplateSelector = _ref.triggerTemplateSelector,
        onTriggerClick = _ref.onTriggerClick;
      _classCallCheck(this, NavTrigger);
      this.onTriggerClick = onTriggerClick;
      this.triggerTemplate = document.querySelector("".concat(triggerTemplateSelector));
      this.triggerEl = document.importNode(this.triggerTemplate.content, true);
    }
    return _createClass(NavTrigger, [{
      key: "render",
      value: function render() {
        var wrapper = this.triggerEl.children[0];
        wrapper.addEventListener('click', this.onTriggerClick);
        return wrapper;
      }
    }]);
  }();
  var ExpandableContainer = /*#__PURE__*/function () {
    function ExpandableContainer(_ref2) {
      var containerEl = _ref2.containerEl,
        headerEl = _ref2.headerEl,
        mainEl = _ref2.mainEl,
        footerEl = _ref2.footerEl,
        expandableNavEl = _ref2.expandableNavEl,
        priorityNavEl = _ref2.priorityNavEl,
        expandableHtmlClass = _ref2.expandableHtmlClass,
        expandedHtmlClass = _ref2.expandedHtmlClass;
      _classCallCheck(this, ExpandableContainer);
      this.toggle = this.toggle.bind(this);
      this.expandedHtmlClass = expandedHtmlClass;
      this.containerEl = containerEl;
      this.headerEl = headerEl;
      this.mainEl = mainEl;
      this.footerEl = footerEl;
      this.expandableNavEl = expandableNavEl;
      this.priorityNavEl = priorityNavEl;
      this.expandableNavBottomOffset = 20;
      this.containerEl.classList.add(expandableHtmlClass);
      this.expanded = false;
      this.animationTimeout = undefined;
    }
    return _createClass(ExpandableContainer, [{
      key: "toggle",
      value: function toggle() {
        this.expanded = !this.expanded;
        this.update();
      }
    }, {
      key: "update",
      value: function update() {
        var _this = this;
        if (this.expanded) {
          window.clearTimeout(this.animationTimeout);

          // Hold main position
          var mainTopOffset = this.mainEl.getBoundingClientRect().top + document.documentElement.scrollTop - (document.documentElement.clientTop || document.body.clientTop || 0);
          this.mainEl.style.marginTop = "".concat(mainTopOffset, "px");
          this.containerEl.classList.add(this.expandedHtmlClass);
          var expH = this.expandableNavEl ? this.expandableNavEl.getBoundingClientRect().height : 0;
          var prioH = this.priorityNavEl ? this.priorityNavEl.getBoundingClientRect().height : 0;
          var heightDifference = expH - prioH + this.expandableNavBottomOffset;
          this.headerEl.style.paddingBottom = "".concat(heightDifference, "px");
          this.headerEl.style.zIndex = '2';
          this.headerEl.style.position = 'absolute';
          this.headerEl.style.top = '0px';
          this.headerEl.style.left = '0px';
          this.headerEl.style.right = '0px';
        } else {
          this.containerEl.classList.remove(this.expandedHtmlClass);
          this.headerEl.style.removeProperty('padding-bottom');
          window.clearTimeout(this.animationTimeout);
          this.animationTimeout = window.setTimeout(function () {
            _this.mainEl.style.removeProperty('margin-top');
            _this.headerEl.style.removeProperty('z-index');
            _this.headerEl.style.removeProperty('position');
          }, 1000);
        }
      }
    }]);
  }();
  var body = document.querySelector('body');
  var headerEl = document.querySelector('body > header');
  var expandableNavEl = headerEl.querySelector('nav.expandable-nav');
  var committeeMenuEl = headerEl.querySelector('.committee-widget .committee-menu');
  if (expandableNavEl || committeeMenuEl) {
    var container = new ExpandableContainer({
      containerEl: body,
      expandableHtmlClass: 'with-expandable-nav',
      expandedHtmlClass: 'with-expanded-nav',
      headerEl: headerEl,
      footerEl: document.querySelector('body > footer'),
      mainEl: document.querySelector('body > main'),
      expandableNavEl: expandableNavEl,
      priorityNavEl: headerEl.querySelector('nav.priority-nav')
    });
    var trigger = new NavTrigger({
      triggerTemplateSelector: '#expandableNavTrigger',
      onTriggerClick: container.toggle
    });
    headerEl.appendChild(trigger.render());
  }
})();