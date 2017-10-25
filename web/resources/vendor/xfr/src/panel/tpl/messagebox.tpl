<div class="modal fade xfr-mask xfr-mask-{{size}}" role="dialog" id="message-window">
    <div class="modal-dialog modal-dialog-center">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" data-title=""> {{title}}</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 message" data-message="">
                        <i class=" pull-left xfr-inner-msg-icon {{icon}}"></i>
                        <span class="msg-box-message">{{{message}}}</span></div>

                    <div class="clear-fix"></div>

                </div>

            </div>
            <div class="modal-footer" >

                {{#btn}}
                <button type="button" class="btn btn-primary xfr-inner-msg-btn" data-dismiss="modal" btn-text="{{text}}">{{text}}</button>
                {{/btn}}
            </div>
        </div>
    </div>
</div>





