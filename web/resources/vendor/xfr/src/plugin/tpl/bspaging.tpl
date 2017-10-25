<ul data-pagination class="pagination pagination-right">
    <li data-prev-page>
        <a class="icon icon-prev icon-arrow-left10"></a>
    </li>
    {{#data.pages}}
    <li data-page-num="{{pageNum}}"> <a>{{pageNum}}</a> </li>
    {{/data.pages}}
    <li data-next-page>
        <a class="icon icon-next icon-uniE91B"></a>
    </li>
    <li> <a>Showing {{ data.first }} to {{data.currentPageLength}} of {{data.totalCount}} entries</a> </li>
</ul>
