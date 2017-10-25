<div class="add-author-tollbar">
    <div class="pull-left back-btn-container">
        <a class="btn btn-app" data-action="add-author"  on-click="add-author">
            <i class="fa fa-users"></i>
            Add author
        </a>
    </div>
</div>
<div class="row">
    {{#data.coauteurs}}
    <div class="col-md-4">

        <div class="box box-widget widget-user-2">
            <!-- Add the bg color to the header using any of the bg-* classes -->
            {{#if principal}}
            <div class="widget-user-header bg-green">
                <div class="widget-user-image">
                    <img class="img-circle" src="{{data.baseUrl}}{{auteur.personne.img_url}}" alt="User Avatar">
                </div>
                <!-- /.widget-user-image -->
                <h3 class="widget-user-username">{{auteur.personne.titre}} {{auteur.personne.prenom}} {{auteur.personne.nom}} </h3>
                <h5 class="widget-user-desc">{{auteur.personne.institution}}</h5>
            </div>

            {{else}}
            <div class="widget-user-header bg-gray">
                <div class="widget-user-image">
                    <img class="img-circle" src="{{data.baseUrl}}{{auteur.personne.img_url}}" alt="User Avatar">
                </div>
                <!-- /.widget-user-image -->
                <h3 class="widget-user-username">{{auteur.personne.titre}} {{auteur.personne.prenom}} {{auteur.personne.nom}} </h3>
                <h5 class="widget-user-desc">{{auteur.personne.institution}}</h5>
            </div>
            {{/if}}


            <div class="box-footer no-padding">
                <div class="row">
                    <div class="col-md-12 text-right">
                        <a on-click="edit-author" class="btn btn-social-icon btn-primary" data-toggle="tooltip" title="Edit author"><i class="fa fa-edit"></i></a>
                        <a on-click="remove-author" class="btn btn-social-icon btn-danger" data-toggle="tooltip" title="Remove author"><i class="fa fa-trash"></i></a>
                        {{#if !principal}}
                            <a on-click="set-principal" class="btn btn-social-icon btn-success" data-toggle="tooltip" title="Mark author as principal"><i class="fa fa-check"></i></a>
                        {{/if}}

                    </div>

                </div>

            </div>

            <!--
            <div class="box-footer no-padding">
                <ul class="nav nav-stacked">
                    <li><a href="#">Projects <span class="pull-right badge bg-blue">31</span></a></li>
                    <li><a href="#">Tasks <span class="pull-right badge bg-aqua">5</span></a></li>
                    <li><a href="#">Completed Projects <span class="pull-right badge bg-green">12</span></a></li>
                    <li><a href="#">Followers <span class="pull-right badge bg-red">842</span></a></li>
                </ul>
            </div>
            -->
        </div>
    </div>

    <!--
        <div class="">
            <p>
                <b>{{auteur.personne.nom}}</b>
            </p>
            <h3 class="">{{auteur.personne.nom}}</h3>
            <h4 class="">{{auteur.personne.nom}}</h4>
            <p>
                <span>Creation Date: </span><span>{{date_creation}}</span>
            </p>
        </div>
        <div class="grid-button-bar">
            <button on-click='show-detail' class="btn btn-xs bg-navy">View</button>
            <button on-click='show-edit' class="btn btn-xs bg-olive">Edit</button>
            <button on-click='delete' class="btn btn-xs btn-danger">Delete</button>
        </div>
          -->
    {{/data}}
</div>
