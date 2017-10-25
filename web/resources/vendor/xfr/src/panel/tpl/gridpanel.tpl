<div data-xfr-crud-toolbar class="xfr-crud-toolbar btn-toolbar text-center ">
    <div class="xfr-toolbar-action btn-group-sm pull-left">
        <!--<button data-xfr-btn-print class="btn btn-primary">{{appConfig.translations.print}}</button>-->
        <!-- <button data-xfr-btn-export class="btn btn-primary">Export</button> -->
    </div>
    <div data-xfr-views-toolbar class="xfr-toolbar-viewtabs btn-group btn-group-sm pull-right hidden-sm hidden-md hidden-lg">
        <button data-xfr-btn-filter class="btn btn-primary btn-warning"><span class="icon form icon-filter"></span></button>
    </div>
</div>
<div class="xfr-crud-grid-form " data-xfr-crud-grid-form>
    <div class="xfr-crud-grid col-lg-8 col-md-8 col-sm-8 col-xs-12  available-height" data-xfr-grid-container style="padding-left:0">
    </div>
    <div class="xfr-crud-form col-lg-4 col-md-4 col-sm-4 grid-filter-panel available-height" data-xfr-form-container data-grid-filter>
        <div class="grid-filter text-center">
            <span class="pull-left">{{appConfig.translations.filter}}</span>
            <div class=" btn-group-sm pull-right">
                <button data-xfr-btn-reset class="btn btn-warning">{{appConfig.translations.reset}}</button>
                <button data-xfr-btn-apply class="btn btn-warning">{{appConfig.translations.apply}}</button>
            </div>
            <div class="clear-fix"></div>
        </div>
        <div class="form-with-filters ">
            <div class="grid-panel-filter-toolbar btn-group-sm">
                {{#data.filterCategories}}
                <button data-btn-filter-action class="btn btn-default col-lg-6 col-md-6 col-sm-6 col-xs-11" data-param="{{param}}" data-description="{{description}}">{{libelle}}</button>
                {{/data.filterCategories}}
            </div>
            <div data-filter-form-container>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
</div>
