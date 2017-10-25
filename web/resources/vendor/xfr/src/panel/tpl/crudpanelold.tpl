<div data-xfr-crud-toolbar class="xfr-crud-toolbar btn-toolbar text-center">
    <div class="xfr-toolbar-action btn-group-sm pull-left">
        {{#crudButtons}}
        <button  data-action-type="{{action}}" {{action == "create" ? "" : "" }} class="btn btn-primary mr-10">{{text}}</button>
        {{/crudButtons}}
        <button  data-action-type="save" class="btn btn-primary">Save</button>
        <button  data-action-type="cancel" class="btn btn-primary">Cancel</button>
    </div>
    <div data-xfr-views-toolbar class="xfr-toolbar-viewtabs btn-group btn-group-sm pull-right">
        <button data-xfr-btn-formview style="padding: 4px 12px;" class="btn btn-primary btn-warning"><span class="icon form icon-document"></span></button>
        <button data-xfr-btn-gridview style="padding: 4px 12px;" class="btn btn-primary btn-warning"><span class="icon grid icon-menu2"></span></button>
    </div>
</div>
<div class="xfr-crud-grid-form vbox-available-height" data-xfr-crud-grid-form>
    <div class="xfr-crud-grid available-height" data-xfr-grid-container>
    </div>
    <div class="xfr-crud-form available-height" data-xfr-form-container>
    </div>
    <div class="clearfix"></div>
</div>
