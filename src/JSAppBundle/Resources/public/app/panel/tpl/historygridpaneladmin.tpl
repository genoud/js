
<div data-xfr-crud-toolbar class="xfr-crud-toolbar btn-toolbar text-center ">
    <div class="xfr-toolbar-action btn-group-sm pull-left">
        {{#data.buttons}}
            <button data-xfr-btn-new class="btn {{buttonClass}} " on-click="{{buttonAction}}">
                <span class="{{iconClass}}" aria-hidden="true"></span> {{buttonLabel}}
            </button>
        {{/data}}
        <!--
        <button data-xfr-btn-new class="btn btn-primary " >
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Assign Editor
        </button>
        <button data-xfr-btn-validate class="btn btn-success " >
            <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Propose reviewer
        </button>
        <button data-xfr-btn-new-evaluation class="btn btn-primary " >
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Send back to Author
        </button>
        <button data-xfr-btn-validate-evaluations class="btn btn-success " >
            <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Cancel
        </button>
        <button data-xfr-btn-print class="btn btn-primary">
            <span class="glyphicon glyphicon-print" aria-hidden="true"></span> Print
        </button>
        <button data-xfr-btn-export class="btn btn-primary">Export</button> -->
    </div>
    <div data-xfr-views-toolbar class="xfr-toolbar-viewtabs btn-group btn-group-sm pull-right hidden-sm hidden-md hidden-lg">
        <button data-xfr-btn-filter class="btn btn-primary btn-warning"><span class="icon form icon-filter"></span></button>
    </div>
</div>
<div class="xfr-crud-grid-form " data-xfr-crud-grid-form>
    <div class="xfr-crud-grid col-lg-8 col-md-8 col-sm-8 col-xs-12  available-height" data-xfr-grid-container style="padding-left:0">
    </div>
    <div class="xfr-crud-form col-lg-4 col-md-4 col-sm-4 grid-filter-panel available-height" data-xfr-form-container data-grid-filter>
        <div class="grid-filter text-center row">
            <span class="pull-left">Filter</span>
            <div class=" btn-group-sm pull-right">
                <button data-xfr-btn-reset class="btn btn-warning">
                    <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>  Reset
                </button>
                <button data-xfr-btn-apply class="btn btn-success">
                    <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>  Apply
                </button>
            </div>
            <div class="clear-fix"></div>
        </div>
        <div class="form-with-filters  row">
            <div data-filter-form-container>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
</div>
