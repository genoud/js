<div id="utilisateur-view">
    <div class="xfr-toolbar-action btn-group-sm pull-left">

        <button data-xfr-btn-new class="btn btn-primary " on-click="on-edit">
            <span class="fa fa-edit" aria-hidden="true"></span> Edit
        </button>

    </div>
    <div class="col-md-7">
        <div class="box box-primary">
            <div class="box-header with-border">
            <h3 class="box-title">Categorie informations</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">

                <div class="attachment-block clearfix user-widget">
                    <img class="attachment-img user-view-img" src="{{baseUrl}}{{categorie.img_url}}" alt="Categorie Picture">
                    <div class="attachment-pushed">
                        <h1 class="attachment-heading">{{categorie.intitule}}</h1>
                        <div class="attachment-text">
                            <h3 class="margin-5">
                                {{categorie.description}}
                            </h3>
                        </div>
                        <!-- /.attachment-text -->
                    </div>
                    <!-- /.attachment-pushed -->
                </div>
            </div>
            <!-- /.box-body -->
        </div>
    </div>
    <div class="col-md-5">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Manuscript of this categorie</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">

            </div>
            <!-- /.box-body -->
        </div>
    </div>




</div>
