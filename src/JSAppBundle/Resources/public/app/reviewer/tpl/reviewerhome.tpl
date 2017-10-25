<section class="content">
    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title" >Manuscripts Reviews</h3>
            <div class="box-tools pull-right">
                <!-- Buttons, labels, and many other things can be placed here! -->
                <!-- Here is a label for example
                <button on-click='new' id="btn-reviewer-home-accept-all" class="btn btn-flat btn-success">
                    <i class="fa fa-plus"></i>Accept all</button>
                <button on-click='new' id="btn-reviewer-home-reject-all" class="btn btn-flat btn-danger">
                    <i class="fa fa-plus"></i>Reject all</button>-->
            </div><!-- /.box-tools -->
        </div>
        <div class="box-body">
            <ul class="nav nav-pills nav-stacked">
                <li class="bg-default"><a href="#" on-click='rev-request'><i class="fa fa-inbox"></i> Review requests
                        <span class="label label-danger pull-right">{{ data.reviewRequest }}</span></a></li>
                <li class="bg-warning"><a href="#" on-click='rev-in-progress'><i class="fa fa-spinner fa-spin text-yellow"></i> Reviews in progress
                        <span class="label label-warning pull-right">{{ data.reviewInProgress }}</span></a></li>
                <li class="bg-warning"><a href="#" on-click='submitted-review'><i class="fa fa-paper-plane text-yellow"></i> Submitted review
                        <span class="label label-primary pull-right">{{ data.submittedReviews }}</span></a></li>
                <li class="bg-success "><a href="#" on-click='validated-review'><i class="fa fa-check-circle text-green"></i> Validated reviews
                        <span class="label label-success pull-right">{{ data.validatedReviews }}</span></a></li>
                <li class="bg-danger"><a href="#" on-click='rejected-review'><i class="fa fa-ban text-red"></i> Rejected reviews
                        <span class="label label-danger pull-right">{{ data.rejectedReviews }}</span></a></li>
            </ul>
        </div>
        <!-- /.box-body -->
    </div>

</section>