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

            <table class="table table-fixed table-hover table-striped table-condensed  table-custom">
                <tbody>
                {{#data}}
                <tr class="custom">
                    <td on-click="on-select">
                        <div class="attachment-block clearfix user-widget"  >
                            <img class="attachment-img" src="{{baseUrl}}{{personne.img_url}}" alt="User Picture">

                            <div class="attachment-pushed">
                                <h2 class="attachment-heading">{{personne.prenom}} {{personne.nom}}<small>&nbsp;{{username}}</small></h2>
                                <div class="attachment-text">
                                    <h5 class="margin-5">
                                        <span class="text-teal">Email:</span> {{personne.email}}
                                        &nbsp;<span class="text-teal">Phone:</span>{{personne.telephone}}
                                        &nbsp;<span class="text-teal">Zip code:</span>{{personne.code_postale}}
                                    </h5>
                                    <p>{{personne.affiliation}} {{personne.departement}} {{personne.institution}},
                                        {{personne.ville}} &nbsp;{{personne.pays}}</p>
                                    <p>
                                        {{#roles_entity}}
                                            <span class="label label-success">{{description}}</span>
                                        {{/roles_entity}}
                                    </p>
                                </div>
                                <!-- /.attachment-text -->
                            </div>
                            <!-- /.attachment-pushed -->
                        </div>

                        <!--
                        <div class="col-md-4">
                            <img width="50px" src="{{baseUrl}}{{personne.img_url}}" alt="User picture">
                        </div>
                        <div class="col-md-8">
                            <h2 class="">{{personne.prenom}} {{personne.nom}} <small>{{username}}</small></h2>
                        </div>
                        -->
                        <div class="grid-button-bar">

                            <button on-click='show-detail' class="btn btn-xs bg-navy">
                                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> View
                            </button>

                            <button on-click='show-edit' class="btn btn-xs bg-navy">
                                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
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