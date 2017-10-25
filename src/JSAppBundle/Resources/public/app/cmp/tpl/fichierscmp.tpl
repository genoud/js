<div class="add-author-tollbar">
    <div class="pull-left back-btn-container">
        <a class="btn btn-app" data-action="add-fichier"  on-click="add-fichier">
            <i class="fa fa-paperclip"></i>
            Add attachement
        </a>
    </div>
</div>
<div class="row">
    {{#data.fichiers}}
    <div class="col-md-4">

        <div class="box box-widget widget-user-2">
            <!-- Add the bg color to the header using any of the bg-* classes -->

            <div class="widget-user-header bg-gray">
                <!--
                <div class="widget-user-image">
                    <img class="img-circle" src="{{data.baseUrl}}{{typeFichier.personne.img_url}}" alt="Reviewer picture">
                </div>
                -->
                <!-- /.widget-user-image -->
                <h3 class="widget-user-username">{{type_fichier.intitule}} </h3>
                <h5 class="widget-user-desc">{{description}}</h5>
            </div>

            <div class="box-footer no-padding">
                <div class="row">
                    <div class="col-md-12 text-right">
                        <a class="btn btn-social-icon btn-primary" href="{{data.baseUrl}}{{url}}" target="_blank" data-toggle="tooltip" title="Download attachement"><i class="fa fa-download"></i></a>
                        <a on-click="edit-fichier" class="btn btn-social-icon btn-primary" data-toggle="tooltip" title="Edit attachement"><i class="fa fa-edit"></i></a>
                        <a on-click="remove-fichier" class="btn btn-social-icon btn-danger" data-toggle="tooltip" title="Remove attachement"><i class="fa fa-trash"></i></a>
                    </div>

                </div>

            </div>

        </div>
    </div>

    {{/data}}
</div>
