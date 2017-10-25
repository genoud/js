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
                    <b>{{titre}}</b>
                </p>
                <h4 class="">{{content}}</h4>
                <p><span>Manuscript title: </span> &nbsp;<span>{{article.titre_court}}</span></p>
            </div>
            <div class="grid-button-bar">
                <button on-click='show-detail' class="btn btn-xs bg-navy">
                    <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> View
                </button>

                <button on-click='edit-review' class="btn btn-xs btn-primary">
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit review
                </button>
                <button on-click='submit-review' class="btn btn-xs btn-success">
                    <span class="fa fa-check-circle" aria-hidden="true"></span> Submit review
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

