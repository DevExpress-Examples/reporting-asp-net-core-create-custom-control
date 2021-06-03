// Create and register a custom control.
function customizeToolbox(s, e, shortTypeName, fullTypeName) {
    // Get info objects which are common for most controls.
    // Info objects which are unnecessary for the current implementation are commented out.
    var controlsFactory = e.ControlsFactory;
    var labelInfo = controlsFactory.getControlInfo("XRLabel");
    //var textInfo = controlsFactory.getPropertyInfo("XRLabel", "Text");
    //var stringInfo = controlsFactory.getPropertyInfo("XRLabel", "Text");
    //var objectEditor = controlsFactory.getPropertyInfo("XRLabel", "Size").editor;
    var numberInfo = controlsFactory.getPropertyInfo("XRLabel", "Angle");

    var customNumberSerializationInfo = $.extend({}, numberInfo, {
        propertyName: "Number",
        modelName: "@Number",
        displayName: "Number",
        defaultVal: 0,
        localizationId: ""
    }
    );

    // Create the NumericLabel surface.
    var NumericLabelSurface = (function (_super) {
        __extends(NumericLabelSurface, _super);
        function NumericLabelSurface(control, context) {
            _super.call(this, control, context);
            this.contenttemplate = "numeric-label-content";
            this.displaySomeProperty = ko.computed(function () {
                var text = control["Number"] && control["Number"]();
                return text ? text : (control["text"] && control["text"]() || "");
            });
        }
        return NumericLabelSurface;
    })(labelInfo.surfaceType);

    // Create an object with information about the NumericLabel toolbox item.
    var numericLabelInfo = controlsFactory.inheritControl("XRLabel", {
        surfaceType: NumericLabelSurface,
        defaultVal: {
            "@ControlType": fullTypeName,
            "@SizeF": "200,50"
        },
        toolboxIndex: 1,
        info: [customNumberSerializationInfo],
        popularProperties: ["Number"]
    });

    // Register the NumericLabel in the Report Designer Toolbox.
    controlsFactory.registerControl(shortTypeName, numericLabelInfo);

    // Add the "Number" property to the Property panel's "Expressions" tab.
    var defaultExpression = controlsFactory.getPropertyInfo(shortTypeName, "Expression")
    defaultExpression.expressionName = "Number"
    // Specify the event in which the property should be available.
    controlsFactory.setExpressionBinding(shortTypeName, "Number", controlsFactory._beforePrintPrintOnPage);
    // Add the "Number" property to the Property panel's "Data Bindings" section.
    var dataBindings = controlsFactory.getPropertyInfo(shortTypeName, "Data Bindings");
    dataBindings.allDataBindings.push("Number");
    // Specify the default data binding property.
    var defaultBinding = controlsFactory.getPropertyInfo(shortTypeName, "Data Binding");
    defaultBinding.bindingName = "Number";
    // Add the "Number" property to the Property Grid's Data category.
    s.AddToPropertyGrid("Data", customNumberSerializationInfo);
}