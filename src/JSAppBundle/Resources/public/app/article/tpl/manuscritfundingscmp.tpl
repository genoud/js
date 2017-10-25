<div class="add-author-tollbar">
    <div class="pull-left back-btn-container">
        <a class="btn btn-app" data-action="add-funding"  on-click="add-funding" data-toggle="tooltip" title="Add a new funding">
            <i class="fa fa-users"></i>
            Add funding
        </a>
    </div>
</div>
<div class="row">
    {{#data.fundings}}
    <div class="col-md-4">

        <div class="box box-widget widget-user-2">
            <!-- Add the bg color to the header using any of the bg-* classes -->

            <div class="widget-user-header bg-gray">
                <!--
                <div class="widget-user-image">
                    <img class="img-circle" src="{{data.baseUrl}}{{auteur.personne.img_url}}" alt="User Avatar">
                </div>
                <!-- /.widget-user-image -->
                <h3 class="widget-user-username">{{institution}}  </h3>
                <h5 class="widget-user-desc">{{number}}</h5>
            </div>



            <div class="box-footer no-padding">
                <div class="row">
                    <div class="col-md-12 text-right">
                        <a on-click="edit-funding" class="btn btn-social-icon btn-primary" data-toggle="tooltip" title="Edit funding"><i class="fa fa-edit"></i></a>
                        <a on-click="remove-funding" class="btn btn-social-icon btn-danger" data-toggle="tooltip" title="Remove funding"><i class="fa fa-trash"></i></a>

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
    {{/data}}
</div>
