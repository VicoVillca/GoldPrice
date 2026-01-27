import {
  BaseComponent
} from "./chunk-6KPLM4MY.js";
import {
  BaseStyle
} from "./chunk-2Q3WSWWR.js";
import {
  SharedModule
} from "./chunk-FOT53IC7.js";
import {
  CommonModule,
  NgClass,
  NgIf,
  NgStyle,
  NgTemplateOutlet
} from "./chunk-DTRZVJQ6.js";
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input,
  NgModule,
  ViewEncapsulation$1,
  booleanAttribute,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵsetNgModuleScope,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-KIHTX5Y7.js";
import "./chunk-4N4GOYJH.js";
import "./chunk-5OPE3T2R.js";
import "./chunk-FHTVLBLO.js";
import "./chunk-CWYBPNCF.js";
import "./chunk-NJ25EVEJ.js";
import "./chunk-WDMUDEB6.js";

// node_modules/primeng/fesm2022/primeng-tag.mjs
var theme = ({
  dt
}) => `
.p-tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${dt("tag.primary.background")};
    color: ${dt("tag.primary.color")};
    font-size: ${dt("tag.font.size")};
    font-weight: ${dt("tag.font.weight")};
    padding: ${dt("tag.padding")};
    border-radius: ${dt("tag.border.radius")};
    gap: ${dt("tag.gap")};
}

.p-tag-icon {
    font-size: ${dt("tag.icon.size")};
    width: ${dt("tag.icon.size")};
    height:${dt("tag.icon.size")};
}

.p-tag-rounded {
    border-radius: ${dt("tag.rounded.border.radius")};
}

.p-tag-success {
    background: ${dt("tag.success.background")};
    color: ${dt("tag.success.color")};
}

.p-tag-info {
    background: ${dt("tag.info.background")};
    color: ${dt("tag.info.color")};
}

.p-tag-warn {
    background: ${dt("tag.warn.background")};
    color: ${dt("tag.warn.color")};
}

.p-tag-danger {
    background: ${dt("tag.danger.background")};
    color: ${dt("tag.danger.color")};
}

.p-tag-secondary {
    background: ${dt("tag.secondary.background")};
    color: ${dt("tag.secondary.color")};
}

.p-tag-contrast {
    background: ${dt("tag.contrast.background")};
    color: ${dt("tag.contrast.color")};
}
`;
var classes = {
  root: ({
    props
  }) => ["p-tag p-component", {
    "p-tag-info": props.severity === "info",
    "p-tag-success": props.severity === "success",
    "p-tag-warn": props.severity === "warn",
    "p-tag-danger": props.severity === "danger",
    "p-tag-secondary": props.severity === "secondary",
    "p-tag-contrast": props.severity === "contrast",
    "p-tag-rounded": props.rounded
  }],
  icon: "p-tag-icon",
  label: "p-tag-label"
};
var TagStyle = class _TagStyle extends BaseStyle {
  name = "tag";
  theme = theme;
  classes = classes;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTagStyle_BaseFactory;
    return function TagStyle_Factory(__ngFactoryType__) {
      return (ɵTagStyle_BaseFactory || (ɵTagStyle_BaseFactory = ɵɵgetInheritedFactory(_TagStyle)))(__ngFactoryType__ || _TagStyle);
    };
  })();
  static ɵprov = ɵɵdefineInjectable({
    token: _TagStyle,
    factory: _TagStyle.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TagStyle, [{
    type: Injectable
  }], null, null);
})();
var TagClasses;
(function(TagClasses2) {
  TagClasses2["root"] = "p-tag";
  TagClasses2["icon"] = "p-tag-icon";
  TagClasses2["label"] = "p-tag-label";
})(TagClasses || (TagClasses = {}));
var _c0 = ["*"];
function Tag_ng_container_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "span", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("ngClass", ctx_r0.icon);
  }
}
function Tag_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, Tag_ng_container_2_span_1_Template, 1, 1, "span", 4);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.icon);
  }
}
function Tag_span_3_1_ng_template_0_Template(rf, ctx) {
}
function Tag_span_3_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, Tag_span_3_1_ng_template_0_Template, 0, 0, "ng-template");
  }
}
function Tag_span_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "span", 6);
    ɵɵtemplate(1, Tag_span_3_1_Template, 1, 0, null, 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.iconTemplate);
  }
}
var Tag = class _Tag extends BaseComponent {
  /**
   * Inline style of the component.
   * @group Props
   */
  get style() {
    return this._style;
  }
  set style(value) {
    this._style = value;
    this.cd.markForCheck();
  }
  /**
   * Style class of the component.
   * @group Props
   */
  styleClass;
  /**
   * Severity type of the tag.
   * @group Props
   */
  severity;
  /**
   * Value to display inside the tag.
   * @group Props
   */
  value;
  /**
   * Icon of the tag to display next to the value.
   * @group Props
   * @deprecated since 15.4.2. Use 'icon' template.
   */
  icon;
  /**
   * Whether the corners of the tag are rounded.
   * @group Props
   */
  rounded;
  iconTemplate;
  _style;
  _componentStyle = inject(TagStyle);
  ngAfterContentInit() {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case "icon":
          this.iconTemplate = item.template;
          break;
      }
    });
  }
  containerClass() {
    return {
      "p-tag p-component": true,
      [`p-tag-${this.severity}`]: this.severity,
      "p-tag-rounded": this.rounded
    };
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTag_BaseFactory;
    return function Tag_Factory(__ngFactoryType__) {
      return (ɵTag_BaseFactory || (ɵTag_BaseFactory = ɵɵgetInheritedFactory(_Tag)))(__ngFactoryType__ || _Tag);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _Tag,
    selectors: [["p-tag"]],
    inputs: {
      style: "style",
      styleClass: "styleClass",
      severity: "severity",
      value: "value",
      icon: "icon",
      rounded: [2, "rounded", "rounded", booleanAttribute]
    },
    standalone: true,
    features: [ɵɵProvidersFeature([TagStyle]), ɵɵInputTransformsFeature, ɵɵInheritDefinitionFeature, ɵɵStandaloneFeature],
    ngContentSelectors: _c0,
    decls: 6,
    vars: 7,
    consts: [[3, "ngClass", "ngStyle"], [4, "ngIf"], ["class", "p-tag-icon", 4, "ngIf"], [1, "p-tag-label"], ["class", "p-tag-icon", 3, "ngClass", 4, "ngIf"], [1, "p-tag-icon", 3, "ngClass"], [1, "p-tag-icon"], [4, "ngTemplateOutlet"]],
    template: function Tag_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "span", 0);
        ɵɵprojection(1);
        ɵɵtemplate(2, Tag_ng_container_2_Template, 2, 1, "ng-container", 1)(3, Tag_span_3_Template, 2, 1, "span", 2);
        ɵɵelementStart(4, "span", 3);
        ɵɵtext(5);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap(ctx.styleClass);
        ɵɵproperty("ngClass", ctx.containerClass())("ngStyle", ctx.style);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", !ctx.iconTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.iconTemplate);
        ɵɵadvance(2);
        ɵɵtextInterpolate(ctx.value);
      }
    },
    dependencies: [CommonModule, NgClass, NgIf, NgTemplateOutlet, NgStyle, SharedModule],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tag, [{
    type: Component,
    args: [{
      selector: "p-tag",
      standalone: true,
      imports: [CommonModule, SharedModule],
      template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <ng-container *ngIf="!iconTemplate">
                <span class="p-tag-icon" [ngClass]="icon" *ngIf="icon"></span>
            </ng-container>
            <span class="p-tag-icon" *ngIf="iconTemplate">
                <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
            </span>
            <span class="p-tag-label">{{ value }}</span>
        </span>
    `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation$1.None,
      providers: [TagStyle]
    }]
  }], null, {
    style: [{
      type: Input
    }],
    styleClass: [{
      type: Input
    }],
    severity: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    rounded: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassDebugInfo(Tag, {
    className: "Tag"
  });
})();
var TagModule = class _TagModule {
  static ɵfac = function TagModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TagModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _TagModule
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [Tag, SharedModule, SharedModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TagModule, [{
    type: NgModule,
    args: [{
      imports: [Tag, SharedModule],
      exports: [Tag, SharedModule]
    }]
  }], null, null);
})();
(function() {
  (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(TagModule, {
    imports: [Tag, SharedModule],
    exports: [Tag, SharedModule]
  });
})();
export {
  Tag,
  TagClasses,
  TagModule,
  TagStyle
};
//# sourceMappingURL=primeng_tag.js.map
