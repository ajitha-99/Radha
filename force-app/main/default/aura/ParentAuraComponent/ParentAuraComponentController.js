({
    handleClick : function(component, event, helper) {
        component.find("childlwc").showMessage("Hello from ParentAuraComponentController");
    }
});