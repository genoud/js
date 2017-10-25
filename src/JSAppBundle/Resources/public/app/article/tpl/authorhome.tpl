<section class="content">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title" >New Submission</h3>
            <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example -->
                <button on-click='new' id="btn-edition-home-new-article" class="btn btn-flat btn-primary">
                    <i class="fa fa-plus"></i> New Submission</button>
            </div><!-- /.box-tools -->
        </div>
        <div class="box-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="bg-danger"><a href="#" on-click='sub1'><i class="fa fa-thumbs-down text-red"></i> Submission sent back to the Author
                        <span class="label label-danger pull-right">{{ data.soummission_retourne_auteur }}</span></a></li>
                <li class="bg-warning"><a href="#" on-click='sub2'><i class="fa fa-envelope-o"></i> Incomplete submissions
                        <span class="label label-warning pull-right">{{ data.soulission_incomplete }}</span></a></li>
                <li class="bg-warning"><a href="#" on-click='sub3'><i class="fa fa-thumbs-up"></i> Submission waiting for validation
                        <span class="label label-primary pull-right">{{ data.soumission_a_valider }}</span></a></li>
                <li class="bg-success"><a href="#" on-click='sub4'><i class="fa fa-spinner fa-spin text-green"></i> Submissions being processed <span
                                class="label label-success pull-right">{{ data.soumission_a_traiter }}</span></a>
                </li>
            </ul>
        </div>
        <!-- /.box-body -->
    </div>
    <div class="box box-warning">
        <div class="box-header with-border">
            <h3 class="box-title">Revisions</h3>
        </div>
        <div class="box-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="bg-warning">
                    <a href="#" on-click='rev1'><i class="fa fa-inbox"></i>Submission waiting for revision
                        <span class="label label-primary pull-right">{{ data.soumission_a_reviser }}</span>
                    </a>
                </li>
                <li class="bg-danger">
                    <a href="#" on-click='rev2'><i class="fa fa-thumbs-down text-red"></i>Revision sent back to the author
                        <span class="label label-danger pull-right">{{ data.revision_retournee }}</span>
                    </a>
                </li>
                <li class="bg-warning">
                    <a href="#" on-click='rev3'><i class="fa fa-envelope-o"></i> Incomplete revision
                        <span class="label label-warning pull-right">{{ data.revision_incomplete }}</span>
                    </a>
                </li>
                <li class="bg-warning"><a href="#" on-click='rev4'><i class=" fa fa-thumbs-up"></i> Revision waiting for validation
                        <span class="label label-primary pull-right">{{ data.revision_a_valider }}</span>
                    </a>
                </li>
                <li class="bg-success">
                    <a href="#" on-click='rev5'>
                        <i class="fa fa-spinner fa-spin text-green"></i> Revisions being processed
                        <span class="label label-success pull-right">{{ data.revision_a_traiter }}</span>
                    </a>
                </li>
                <li class="bg-danger">
                    <a href="#" on-click='rev6'><i class="fa fa-ban text-red"></i> Revision rejected <span
                                class="label label-success pull-right">{{ data.revision_refusee }}</span></a>
                </li>
            </ul>
        </div>
        <!-- /.box-body -->
    </div>

    <div class="box box-success">
        <div class="box-header with-border">
            <h3 class="box-title">Completed submission</h3>
        </div>
        <div class="box-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="bg-success"><a href="#" on-click='com1'><i class="fa fa-inbox"></i>Submission with a decision
                        <span class="label label-warning pull-right">{{ data.soumission_avec_decision }}</span></a></li>
                <li class="bg-success"><a href="#" on-click='com2'><i class="fa fa-check-circle text-green"></i>Submission with completed production
                        <span class="label label-success pull-right">{{ data.soumission_avec_production }}</span></a></li>
            </ul>
        </div>
        <!-- /.box-body -->
    </div>
    <!-- /.box -->
</section>