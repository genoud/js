<div class="grid-header row bg-navy-active">
    <div data-table-page-size class="no-padding col-lg-6 col-md-6 col-sm-6 col-xs-6 page-size">
    </div>
    <div data-table-form-search class="no-padding col-lg-6 col-md-6 col-sm-6 col-xs-6 form-search">
    </div>
</div>
<table class="table table-fixed table-hover table-striped table-condensed vbox-available-height table-custom">
    <tbody>
    {{#data}}
    <tr class="custom">
        <td >
            <div class="">
                <p>
                    <b>{{type_article.libelle}}</b>
                </p>
                <h3 class="">{{titre_court}}</h3>
                <h4 class="">{{titre_complet}}</h4>
                <p>
                    <span>Creation Date: </span><span>{{date_creation}}</span>
                </p>
            </div>
            <div class="grid-button-bar">
               <button on-click='show-detail' class="btn btn-xs bg-navy">
                   <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> View</button>
                {{#helpers.isArticleEditable(this)}}
                    <button on-click='show-edit' class="btn btn-xs bg-olive">
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>
                    <button on-click='delete' class="btn btn-xs btn-danger">
                        <span class="fa fa-trash" aria-hidden="true"></span> Delete</button>
                {{/if}}


            </div>
        </td>
    </tr>
    {{/data}}
    </tbody>
    <tfoot>
    <tr>

    </tr>
    </tfoot>
</table>
<div class="grid-paging" data-table-paging>
</div>

