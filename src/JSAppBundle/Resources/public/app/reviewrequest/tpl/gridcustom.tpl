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
        <td>
            <div class="">
                <p>
                    <b>{{article.type_article.libelle}}</b>
                </p>
                <h3 class="">{{article.titre_court}}</h3>
                <h4 class="">{{article.titre_complet}}</h4>
                <p>
                    <span>Creation Date: </span><span>{{article.date_creation}}</span>
                </p>
            </div>
            <div class="grid-button-bar">
                <button on-click='show-detail' class="btn btn-xs bg-navy">
                    <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> View
                </button>

                <button on-click='accept-request' class="btn btn-xs btn-success">
                    <span class="fa fa-check-circle" aria-hidden="true"></span> Accept request
                </button>
                <button on-click='reject-request' class="btn btn-xs btn-danger">
                    <span class="fa fa-ban" aria-hidden="true"></span> Decline request
                </button>


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

