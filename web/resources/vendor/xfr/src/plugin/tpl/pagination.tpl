{{#if data.pageCount== 0}}
    <div class="paging-panel text-center">
        {{appConfig.translations.noDataToShow}}
    </div>
{{else}}
<ul data-pagination class="pagination paging-panel">
    <li data-first-page>
        <a class="icon icon-first-page">
            <span class="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
            <!--<span class="first icon-arrow-left10"></span><span class="second icon-arrow-left10"></span>-->
        </a>
    </li>
    <li data-prev-page>
        <a class="icon icon-prev icon-arrow-left10 ">
            <!--<span aria-hidden="true">&laquo;</span>-->
            <span class="glyphicon glyphicon-triangle-left" aria-hidden="true"></span>
        </a>
    </li>
    <li>
        <a class="">Page</a>
    </li>
    <li class="page-input-parent">
        <a class="a-input-container"><input type="text" name="current-page" value="{{data.currentPage}}" placeholder="" class="page-input"> </a>
    </li>
    <li>
        <a class="">of {{data.pageCount}}</a>
    </li>
    <li data-next-page>
        <a class="icon icon-next icon-uniE91B">
            <span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span>
        </a>
    </li>
    <li data-last-page>
        <a class="icon icon-last-page">
            <span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
            <!--<span class="first icon-uniE91B"></span><span class="second icon-uniE91B"></span>-->
        </a>
    </li>
</ul>
<div data-table-summary>
</div>
<ul class="pagination summary-panel">
    <li> <a>Showing {{ data.first }} to {{data.currentPageLength}} of {{data.totalCount}}</a> </li>
</ul>
<div class="clear"></div>
{{/if}}
