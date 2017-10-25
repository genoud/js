<div id="utilisateur-view">
    <div class="xfr-toolbar-action btn-group-sm pull-left">

        <button data-xfr-btn-new class="btn btn-primary " on-click="on-edit">
            <span class="fa fa-edit" aria-hidden="true"></span> Edit
        </button>

    </div>
    <div class="col-md-7">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">User informations</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="attachment-block clearfix user-widget">
                    <img class="attachment-img user-view-img" src="{{baseUrl}}{{utilisateur.personne.img_url}}" alt="User Picture">
                    <div class="attachment-pushed">
                        <h1 class="attachment-heading">{{utilisateur.personne.prenom}} {{utilisateur.personne.nom}}</h1>
                        <div class="attachment-text">
                            <h3 class="margin-5">
                                <span class="text-teal">Username:</span> {{utilisateur.username}}
                                <br/>
                                <span class="text-teal">Email:</span> {{utilisateur.personne.email}}
                                <br/>
                                <span class="text-teal">Phone:</span>{{utilisateur.personne.telephone}}
                            </h3>
                            <p>
                                {{#utilisateur.roles_entity}}
                                <span class="label label-success">{{description}}</span>
                                {{/utilisateur.roles_entity}}
                            </p>
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
                <h3 class="box-title">My Manuscripts</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">

            </div>
            <!-- /.box-body -->
        </div>
    </div>




</div>
