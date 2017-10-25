<div class="add-author-tollbar">
    <div class="pull-left back-btn-container">
        <a class="btn btn-app" data-action="add-reviewer"  on-click="add-reviewer">
            <i class="fa fa-users"></i>
            Add Reviewer
        </a>
    </div>
</div>
<div class="row">
    {{#data.reviewers}}
    <div class="col-md-4">

        <div class="box box-widget widget-user-2">
            <!-- Add the bg color to the header using any of the bg-* classes -->

            <div class="widget-user-header bg-gray">
                <div class="widget-user-image">
                    <img class="img-circle" src="{{data.baseUrl}}{{reviewer.personne.img_url}}" alt="Reviewer picture">
                </div>
                <!-- /.widget-user-image -->
                <h3 class="widget-user-username">{{reviewer.personne.titre}} {{reviewer.personne.prenom}} {{reviewer.personne.nom}} </h3>
                <h5 class="widget-user-desc">{{reviewer.personne.institution}}</h5>
            </div>

            <div class="box-footer no-padding">
                <div class="row">
                    <div class="col-md-12 text-right">
                        <a on-click="edit-reviewer" class="btn btn-social-icon btn-primary" data-toggle="tooltip" title="Edit reviewer"><i class="fa fa-edit"></i></a>
                        <a on-click="remove-reviewer" class="btn btn-social-icon btn-danger" data-toggle="tooltip" title="Remove reviewer"><i class="fa fa-trash"></i></a>
                    </div>

                </div>

            </div>

        </div>
    </div>

    {{/data}}
</div>
