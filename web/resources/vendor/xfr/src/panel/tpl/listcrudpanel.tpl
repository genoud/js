<div data-grid-tab class="list-crud-panel-grid-tab" style="height:100%">
    <div data-xfr-list-plugins-container class="list-crud-panel-header">
        <div class='{{ (canAddExist && canAddNew) ? "col-lg-10 col-sm-9 col-md-9 col-xs-9" : "col-lg-12 col-sm-12 col-md-12 col-xs-12" }} no-marg' data-multiselect-pos>
        </div>
        {{#if canAddNew}}
        <div class="col-lg-2 col-sm-3 col-md-3 col-xs-3 pull-right" data-add-new-pos>
        </div>
        {{/if}}
    </div>
    <div data-xfr-list-grid-container class="list-crud-panel-body">
    </div>
</div>
<div data-form-tab class="list-crud-panel-form-tab" style="height:100%">
    <div data-xfr-list-plugins-container class="list-crud-panel-header">
        <button type="button" aria-label="Back" data-button-back class="btn btn-warning btn-sm btn-icon col-lg-2 col-sm-3 col-md-3 col-xs-3 pull-left">
            <span class="glyphicon icon-arrow-left10" aria-hidden="true"></span>
            <span class="text">Back</span>
        </button>
        <button type="button" aria-label="Save" data-button-save class="btn btn-warning btn-sm btn-icon col-lg-2 col-sm-3 col-md-3 col-xs-3 pull-right">
            <span class="glyphicon icon-disk2" aria-hidden="true"></span>
            <span class="text">Save</span>
        </button>
    </div>
    <div data-xfr-list-form-container class="list-crud-panel-body">
    </div>
</div>
<!-- <div style="padding: 14px; display : none; height: 430px; overflow: hidden; width: auto;" data-xfr-list-form-container class="x-unsized xfr-cmp x-has-height">
    <button type="button" class="btn btn-default" aria-label="Close" id='button-close-list-form'>Close</button>
</div> -->
