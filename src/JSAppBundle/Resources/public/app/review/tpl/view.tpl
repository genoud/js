<div data-xfr-crud-toolbar class="xfr-crud-toolbar btn-toolbar text-center ">
    <div class="xfr-toolbar-action btn-group-sm pull-left">
        {{#if review.statut=="REVIEW_IN_PROGRESS" && reviewer}}
        <button data-xfr-btn-validate class="btn btn-primary " on-click="edit-review">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
        </button>
        <button data-xfr-btn-validate class="btn btn-success " on-click="submit-review">
            <span class="fa fa-check-circle" aria-hidden="true"></span> Submit
        </button>
        {{/if}}

        {{#if review.statut=="REVIEW_SUBMITTED" && editor}}
        <button data-xfr-btn-validate class="btn btn-success " on-click="validate-review">
            <span class="fa fa-check-circle" aria-hidden="true"></span> Validate
        </button>
        <button data-xfr-btn-validate class="btn btn-danger " on-click="reject-review">
            <span class="fa fa-ban" aria-hidden="true"></span> Reject review
        </button>
        {{/if}}

        {{#if review.statut=="REVIEW_VALIDATED" && author }}
            <button data-xfr-btn-validate class="btn btn-primary " on-click="start-revision">
                <span class="fa fa-plus" aria-hidden="true"></span> Start Revision
            </button>
        {{/if}}



    </div>
</div>
<div class="row">
    <div class="col-md-9">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">Review details</h3>

                <div class="box-tools pull-right">

                    <!-- Show stars here-->

                </div>
            </div>
            <div class="box-body article-view-box">

                <h4>{{review.titre}}</h4>
                <p>
                    {{{review.content}}}
                </p>







            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Attachements</h3>

                        <div class="box-tools pull-right">

                        </div>
                    </div>
                    <div class="box-body article-view-box">

                        <ul class="list-group list-group-unbordered">
                            {{#if review.fichiers.length>0}}
                            {{#review.fichiers}}
                            <li class="list-group-item">
                                <b>{{type_fichier.intitule}} &nbsp; <small>{{description}}</small></b> <a class="pull-right" href="{{data.baseUrl}}{{url}}" target="_blank">Download</a>
                            </li>
                            {{/review.fichiers}}
                            {{else}}
                            <li class="list-group-item">
                                No attachement
                            </li>
                            {{/if}}
                        </ul>


                    </div>
                </div>
            </div>

        </div>

    </div>
    <div class="col-md-3">
        <!-- Profile Image -->
        <div class="box box-primary">
            <div class="box-body box-profile">
                <img class="profile-user-img img-responsive img-circle" src="{{data.baseUrl}}{{review.reviewer.personne.img_url}}" alt="Reviewer picture">

                <h3 class="profile-username text-center">{{review.reviewer.personne.prenom? review.reviewer.personne.prenom:''}} {{review.reviewer.personne.nom}}</h3>

                <p class="text-muted text-center">{{review.reviewer.personne.affiliation}}</p>

                <ul class="list-group list-group-unbordered">
                    <li class="list-group-item">
                        <b>{{review.reviewer.personne.institution}}</b> <a class="pull-right"></a>
                    </li>
                    <li class="list-group-item">
                        <b>{{review.reviewer.personne.departement}}</b> <a class="pull-right"></a>
                    </li>

                </ul>
            </div>
            <!-- /.box-body -->
        </div>
    </div>
</div>

<h3>Manuscript details</h3>
<div id="review-articleview-container">

</div>
