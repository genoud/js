<div class="box box-primary">
    <div class="box-header with-border">
        <div data-table-page-size class="no-padding col-lg-6 col-md-6 col-sm-6 col-xs-6 page-size">
        </div>
        <div class="box-tools pull-right col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <div data-table-form-search class=" has-feedback form-search">
            </div>
        </div>
        <!-- /.box-tools -->
    </div>
    <!-- /.box-header -->
    <div class="box-body no-padding">

        <div class="table-responsive mailbox-messages">

            <table class="table table-fixed table-hover table-striped table-condensed vbox-available-height table-custom">
                <tbody>
                {{#data}}
                <tr class="custom">
                    <td on-click="on-select">
                        <div class="">
                            <p>
                                <b>{{type_article.libelle}}</b>
                            </p>
                            <h3 class="">{{titre_court}}</h3>
                            <h4 class="">{{titre_complet}}</h4>
                            <p>
                                <span>Creation Date: </span><span>{{date_creation}}</span>
                            </p>
                            <p><span>Author(s):</span>
                                {{#auteurs}}
                                <span>{{auteur.personne.prenom}} {{auteur.personne.nom}}</span>&nbsp;|&nbsp;
                                {{/auteurs}}
                            </p>
                            <p class="text-right"><span>Editor: </span>{{editeur.personne.prenom}} &nbsp;&nbsp; {{editeur.personne.nom}}</p>


                        </div>
                        <div class="grid-button-bar">
                            <button on-click='show-detail' class="btn btn-xs bg-navy">
                                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> View
                            </button>

                            <button on-click='delete' class="btn btn-xs btn-danger">
                                <span class="fa fa-trash" aria-hidden="true"></span> Delete
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
            <!-- /.table -->
        </div>
        <!-- /.mail-box-messages -->
    </div>
    <!-- /.box-body -->
    <div class="box-footer">
        <div class="grid-paging" data-table-paging>
        </div>
    </div>
</div>








<!--
<div class="grid-header row">
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
               <button on-click='show-detail' class="btn btn-xs bg-navy">View</button>

                <button on-click='delete' class="btn btn-xs btn-danger">Delete</button>
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

-->

