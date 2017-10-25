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
                    <td >
                        <div class="">
                            <p>
                                <b>{{intitule}}</b>
                            </p>
                            <h3 class="">{{description}}</h3>
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