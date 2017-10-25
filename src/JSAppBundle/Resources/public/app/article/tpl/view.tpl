{{#if showToolBar}}
<div data-xfr-crud-toolbar class="xfr-crud-toolbar btn-toolbar text-center ">
    <div class="xfr-toolbar-action btn-group-sm pull-left">

        {{#if author && (data.article.statut=="SOUMISSION_EN_ATTENTE_DE_VALIDATION" ||data.article.statut=="REVISION_EN_ATTENTE_DE_VALIDATION" ) }}
        <button data-xfr-btn-validate class="btn btn-success " on-click="validate-manuscript-view">
            <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Submit manuscript
        </button>
        {{/if}}

        {{#if author && helpers.isArticleEditable(data.article) }}
        <button data-xfr-btn-validate class="btn btn-primary " on-click="show-edit">
            <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit
        </button>
        {{/if}}

        {{#if editor}}
        <button data-xfr-btn-new class="btn btn-primary " on-click="assing-editor-view">
            <span class="fa fa-pencil-square" aria-hidden="true" ></span> Assign Editor
        </button>
        <button data-xfr-btn-validate class="btn btn-primary " on-click="propose-reviewer-view">
            <span class="fa fa-question-circle" aria-hidden="true" ></span> Propose reviewer
        </button>
        <button data-xfr-btn-validate class="btn btn-success " on-click="js-validate-view">
            <span class="fa fa-check" aria-hidden="true" ></span> Accept Article
        </button>
        <button data-xfr-btn-new-evaluation class="btn btn-warning " on-click="sent-back-to-author-view">
            <span class="fa fa-hand-o-left" aria-hidden="true" ></span> Send back to Author
        </button>

        <button data-xfr-btn-validate-evaluations class="btn btn-danger " on-click="js-cancel-view">
            <span class="fa fa-exclamation-triangle" aria-hidden="true" ></span> Reject Article
        </button>

        {{/if}}
        {{#if reviewer}}
        <button data-xfr-btn-validate class="btn btn-success " >
            <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Add review
        </button>

        {{/if}}

        {{#if data.article.statut=="SOUMISSION_EN_ATTENTE_DE_REVISION" && author }}
            <button data-xfr-btn-validate class="btn btn-primary " on-click="start-revision">
                <span class="fa fa-plus" aria-hidden="true"></span> Start Revision
            </button>
        {{/if}}


    </div>
</div>
{{/if}}

<div class="row">
    <div class="col-md-9">
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#title" data-toggle="tab">Title</a></li>
                <li><a href="#abstract" data-toggle="tab">Abstract</a></li>
                <li><a href="#additional" data-toggle="tab">Additional informations</a></li>
                <li><a href="#comments" data-toggle="tab">Comments</a></li>

            </ul>
            <div class="tab-content">
                <div class="active tab-pane" id="title">
                    <div class="js-article">
                        <span class="js-article-label">Article Type:</span> <span class="js-article-content">{{data.article.type_article.libelle}}</span>
                    </div>
                    <div class="js-article">
                        <span class="js-article-label">Short title:</span>
                        <h3 class="js-article-content">{{data.article.titre_court}}</h3>

                    </div>
                    <div class="js-article">
                        <span class="js-article-label">Long title:</span>
                        <h5 class="js-article-content">{{data.article.titre_complet}}</h5>

                    </div>
                </div>

                <!-- /.tab-pane -->




                <!-- /.tab-pane -->
                <div class="tab-pane" id="abstract">
                    {{{data.article.abstract}}}
                </div>



                <div class="tab-pane" id="additional">

                </div>
                <div class="tab-pane" id="comments">

                </div>


                <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
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
                            {{#data.article.fichiers}}
                            <li class="list-group-item">
                                <b>{{type_fichier.intitule}} &nbsp; <small>{{description}}</small></b> <a class="pull-right" href="{{data.baseUrl}}{{url}}" target="_blank">Download</a>
                            </li>
                            {{/data.article.fichiers}}
                        </ul>



                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Key words</h3>

                        <div class="box-tools pull-right">

                        </div>
                    </div>
                    <div class="box-body article-view-box">

                        <ul class="list-group list-group-unbordered">
                            {{#data.article.motscles.split(';'):index}}
                            <span class="label" style="
                                    background: {{data.getColor(index)}};margin: 2px;
                                    font-size:{{data.getFontSize(index)}};
                                    display: inline-block;">{{this}}</span>
                            {{/data}}
                        </ul>



                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Sections / Categories</h3>

                        <div class="box-tools pull-right">

                        </div>
                    </div>
                    <div class="box-body article-view-box">

                        <ul class="list-group list-group-unbordered">
                            {{#data.article.categories}}
                            <li class="list-group-item">
                                <img class="categorie-img img-responsive img-circle" src="{{data.baseUrl}}{{img_url}}" alt="Categorie picture">

                                <h3 class="categorie-title">{{intitule}}</h3>
                            </li>
                            {{/data.article.categories}}
                        </ul>



                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Financial informations</h3>

                        <div class="box-tools pull-right">

                        </div>
                    </div>
                    <div class="box-body article-view-box">

                        <ul class="list-group list-group-unbordered">
                            {{#data.article.funding}}
                            <li class="list-group-item">
                                <h3 class="">{{institution}}</h3>
                                {{number}}
                            </li>
                            {{/data.article.funding}}
                        </ul>



                    </div>
                </div>
            </div>
        </div>


    </div>


    <div class="col-md-3">

        {{#data.article.auteurs}}
        <!-- Profile Image -->
        <div class="box box-primary">
            <div class="box-body box-profile">
                <img class="profile-user-img img-responsive img-circle" src="{{data.baseUrl}}{{auteur.personne.img_url}}" alt="Author picture">

                <h3 class="profile-username text-center">{{auteur.personne.prenom? auteur.personne.prenom:''}} {{auteur.personne.nom}}</h3>

                <p class="text-muted text-center">{{auteur.personne.affiliation}}</p>

                <ul class="list-group list-group-unbordered">
                    <li class="list-group-item">
                        <b>{{auteur.personne.institution}}</b> <a class="pull-right"></a>
                    </li>
                    <li class="list-group-item">
                        <b>{{auteur.personne.departement}}</b> <a class="pull-right"></a>
                    </li>

                </ul>
            </div>
            <!-- /.box-body -->
        </div>
        <!-- /.box -->
        {{/data.article.auteurs}}
    </div>

</div>
