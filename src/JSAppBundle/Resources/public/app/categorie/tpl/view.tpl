<div id="utilisateur-view">
    <div class="xfr-toolbar-action btn-group-sm pull-left">

        <button data-xfr-btn-new class="btn btn-primary " on-click="on-edit">
            <span class="fa fa-edit" aria-hidden="true"></span> Edit
        </button>

    </div>
    <div class="col-md-7">
        <div class="box box-primary">
            <div class="box-header with-border">
            <h3 class="box-title">Article type informations</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <h1 class="attachment-heading">{{typearticle.libelle}}</h1>
                <div class="">
                    <h3 class="margin-5">
                        {{typearticle.description}}
                    </h3>

                </div>
            </div>
            <!-- /.box-body -->
        </div>
    </div>
    <div class="col-md-5">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Manuscript of this type</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">

            </div>
            <!-- /.box-body -->
        </div>
    </div>




</div>
